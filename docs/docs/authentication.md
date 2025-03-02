---
id: authentication
title: Authentication (Optional)
sidebar_label: Authentication (Optional)
---

# Authentication (Optional)

This document explains the addition of the authentication system implemented in CryptoTrackPro.

## Overview

The application uses a custom JWT-based authentication system with:

- Token-based authentication
- HTTP-only cookies for token storage
- Server-side token verification
- Middleware for route protection

## Authentication Flow

1. **Registration**: User submits name, email, and password
2. **Login**: User submits email and password, receives JWT
3. **Session Maintenance**: JWT is stored in HTTP-only cookies
4. **Logout**: JWT is removed from cookies

## Implementation

### Backend Routes

The authentication system is implemented through several API routes:

#### Register Endpoint

```typescript
// From app/api/auth/register/route.ts
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Check if user exists
    const [existingUser] = await db
      .select({ id: users.id, name: users.name, email: users.email })
      .from(users)
      .where(eq(users.email, email.toLowerCase()));

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const [newUser] = await db
      .insert(users)
      .values({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
      })
      .returning({
        id: users.id,
        email: users.email,
        name: users.name,
      });

    // Create JWT token
    const token = await createToken({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    });

    // Set cookie
    (await cookies()).set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 12 * 60 * 60 * 24 * 1000, // 12 days
      path: '/',
    });
    
    return NextResponse.json({
      user: newUser,
      token,
    }, { status: 201 });
  } catch (error: unknown) {
    console.error('Register failed:', error);
    return NextResponse.json(
      { message: error || "Internal server error" },
      { status: 500 }
    );
  }
}
```

#### Login Endpoint

Similar to the register endpoint, but verifies credentials against the database.

#### Check Auth Endpoint

```typescript
// From app/api/auth/checkAuth/route.ts
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ user: null, token: null });
    }

    const payload = await verifyToken(token);
    if (!payload || !payload.id) {
      return NextResponse.json({ user: null, token: null });
    }

    // Find user
    const [user] = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
      })
      .from(users)
      .where(eq(users.id, sql.raw(`'${payload.id}'::uuid`)));

    if (!user) {
      return NextResponse.json({ user: null, token: null });
    }

    return NextResponse.json({
      user,
      token
    });
  } catch (error: unknown) {
    console.error('Auth check failed:', error);
    return NextResponse.json(
      { message: "Auth check failed" },
      { status: 500 }
    );
  }
}
```

### Frontend State Management

The authentication state is managed using Zustand:

```typescript
// From lib/store/auth-store.ts (partial)
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // State properties...
      
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            credentials: 'include'
          });
          
          const data = await res.json();
          
          if (!res.ok) throw new Error(data.message || "Login failed");
          
          set({ user: data.user, token: data.token });
          toast.success("Login successful");
          return data;
        } catch (error: unknown) {
          console.error('Login failed:', error);
          set({ user: null, token: null  });
          toast.error("Login failed" );
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      // Other methods...
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token 
      })
    }
  )
);
```

## Route Protection

Protected routes are handled using Next.js middleware:

```typescript
// From middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/utils/auth';

export async function middleware(request: NextRequest) {
  // Implementation...
}

// Protected routes
export const config = {
  matcher: ['/auth/:path*'],
};
```

## Security Considerations

1. Passwords are hashed using bcrypt
2. JWT tokens are stored in HTTP-only cookies
3. CSRF protection via SameSite cookie attribute
4. Token expiration is enforced to 12 days
5. Environment variables are used for sensitive information


*This is optional for now, **users do not need to authenticate** to use the application.*