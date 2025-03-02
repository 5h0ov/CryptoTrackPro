Collecting workspace information# Setting Up Docusaurus Documentation for Your Crypto Tracker Project

I'll guide you through setting up Docusaurus documentation for your cryptocurrency tracking application, including all the required sections.

## Step 1: Install Docusaurus

First, create a new directory for your documentation within your project structure:

```bash
# Navigate to your project root
cd crypto-tracker/

# Create a docs directory
mkdir -p docs-site

# Navigate to the docs directory
cd docs-site

# Initialize a new Docusaurus site
npx create-docusaurus@latest . classic
```

## Step 2: Configure Docusaurus

Update the `docusaurus.config.js` file to customize it for your project:

```js
// docs-site/docusaurus.config.js
module.exports = {
  title: 'CryptoTrackPro Documentation',
  tagline: 'Documentation for the CryptoTrackPro project',
  url: 'https://your-domain.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'your-github-user', // Usually your GitHub org/user name.
  projectName: 'crypto-tracker', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'CryptoTrackPro',
      logo: {
        alt: 'CryptoTrackPro Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/your-github-user/crypto-tracker',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
            {
              label: 'API Integration',
              to: '/docs/api-integration',
            },
            {
              label: 'State Management',
              to: '/docs/state-management',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} CryptoTrackPro. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/your-github-user/crypto-tracker/edit/main/docs-site/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
```

## Step 3: Update the Sidebar Configuration

Configure the sidebar in `sidebars.js`:

```js
// docs-site/sidebars.js
module.exports = {
  docs: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      items: ['installation', 'project-structure'],
    },
    {
      type: 'category',
      label: 'Technical Documentation',
      items: ['api-integration', 'state-management', 'authentication'],
    },
    {
      type: 'category',
      label: 'Development',
      items: ['challenges-solutions', 'best-practices'],
    },
  ],
};
```

## Step 4: Create Documentation Pages

Now, create the documentation pages covering the requested topics:

### Introduction Page

```markdown
---
id: intro
title: Introduction
sidebar_label: Introduction
slug: /
---

# CryptoTrackPro Documentation

Welcome to the CryptoTrackPro documentation! This documentation will help you understand how to set up, run, and contribute to the CryptoTrackPro application.

CryptoTrackPro is a real-time cryptocurrency tracking application built with:

- **Frontend**: Next.js + React
- **State Management**: Zustand + React Query
- **Styling**: Tailwind CSS + shadcn/ui
- **Authentication**: Custom JWT authentication
- **Database**: PostgreSQL with Drizzle ORM

## Features

- Real-time cryptocurrency price tracking
- User authentication and account management
- Interactive dashboard with live updates
- Responsive design for mobile and desktop
- Search and filtering capabilities
```

### Installation Page

```markdown
---
id: installation
title: Installation & Setup
sidebar_label: Installation
---

# Installation & Setup

This guide will walk you through how to set up and run both the web and mobile applications of CryptoTrackPro.

## Prerequisites

- Node.js (v18 or later)
- npm or yarn
- PostgreSQL database
- Git

## Web App Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/crypto-tracker.git
cd crypto-tracker/web-app
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:
   - Copy the .env.example file to .env.local
   - Fill in the required variables:

```
DATABASE_URL=postgresql://username:password@localhost:5432/crypto_tracker
JWT_SECRET=your_jwt_secret
```

4. Set up the database:

```bash
# Run database migrations
npm run db:push
# or
yarn db:push
```

5. Start the development server:

```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Mobile App Setup (Future)

The mobile app is currently in development. Instructions will be provided when available.

## Running in Production

To build the application for production:

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| DATABASE_URL | PostgreSQL connection string | Yes |
| JWT_SECRET | Secret key for JWT token generation | Yes |
| NODE_ENV | Environment (development/production) | No |

```

### Project Structure Page

```markdown
---
id: project-structure
title: Project Structure
sidebar_label: Project Structure
---

# Project Structure

Understanding the project structure will help you navigate and contribute to the codebase more effectively.

## Directory Structure

```
crypto-tracker/
├── web-app/               # Next.js web application
│   ├── app/               # Next.js app directory
│   │   ├── api/           # API routes
│   │   ├── auth/          # Authentication pages
│   │   ├── dashboard/     # Dashboard pages
│   │   └── page.tsx       # Landing page
│   ├── components/        # React components
│   │   ├── ui/            # UI components (shadcn/ui)
│   │   └── ...            # Other components
│   ├── lib/               # Utility functions and modules
│   │   ├── db/            # Database configuration and schema
│   │   ├── hooks/         # Custom React hooks
│   │   ├── store/         # Zustand stores
│   │   ├── types/         # TypeScript type definitions
│   │   └── utils/         # Utility functions
│   ├── public/            # Static assets
│   ├── .env.example       # Example environment variables
│   ├── drizzle.config.ts  # Drizzle ORM configuration
│   ├── next.config.ts     # Next.js configuration
│   ├── tailwind.config.ts # Tailwind CSS configuration
│   └── tsconfig.json      # TypeScript configuration
└── docs-site/            # Documentation site
```

## Key Files

- `app/layout.tsx`: Root layout with providers
- `app/page.tsx`: Landing page
- `app/dashboard/page.tsx`: Main dashboard
- `lib/store/auth-store.ts`: Authentication state management
- `lib/utils/coincap.ts`: CoinCap API integration
- `components/ui`: Reusable UI components
```

### API Integration Page

```markdown
---
id: api-integration
title: API Integration
sidebar_label: API Integration
---

# API Integration

This document explains how CryptoTrackPro integrates with external APIs and handles data fetching.

## CoinCap API Integration

The application uses the [CoinCap API](https://docs.coincap.io/) to fetch real-time cryptocurrency data.

### API Client Implementation

The API client is implemented in `lib/utils/coincap.ts`:

```typescript
// Example implementation from your project
export async function fetchCryptocurrencies() {
  const response = await fetch('https://api.coincap.io/v2/assets');
  
  if (!response.ok) {
    throw new Error('Failed to fetch cryptocurrencies');
  }
  
  return await response.json();
}

// Type definition for cryptocurrency data
export interface Cryptocurrency {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
}
```

## Data Fetching Strategy

The application uses React Query to manage server state and data fetching:

```typescript
// From app/dashboard/page.tsx
const { 
  data, 
  isLoading, 
  isError, 
  error, 
  refetch, 
  isFetching,
  dataUpdatedAt
} = useQuery({
  queryKey: ['cryptocurrencies'],
  queryFn: fetchCryptocurrencies,
  refetchInterval: 3000, // Auto-refresh every 3 seconds
});
```

### Real-time Updates

Real-time updates are achieved through:

1. Short polling intervals (every 3 seconds)
2. Visual indicators for price changes
3. Optimized re-rendering with React's useEffect

```typescript
// From app/dashboard/page.tsx
useEffect(() => {
  if (data?.data) {
    const newChanges: string[] = [];
    const newPulseMap: Record<string, 'increase' | 'decrease' | null> = {};
    
    // Check for price changes and determine direction
    data.data.forEach((crypto: Cryptocurrency) => {
      const prevPrice = previousPrices[crypto.id];
      
      if (prevPrice !== undefined) {
        const currentPrice = parseFloat(crypto.priceUsd);
        const previousPrice = parseFloat(prevPrice);
        
        // Only detect significant changes to avoid floating point issues
        if (Math.abs(currentPrice - previousPrice) > 0.0000001) {
          newChanges.push(crypto.id);
          newPulseMap[crypto.id] = currentPrice > previousPrice ? 'increase' : 'decrease';
        }
      }
    });
    
    // Update state with new information
    // ...
  }
}, [data]);
```

## Authentication API

The application implements its own authentication API endpoints:

- `/api/auth/register`: User registration
- `/api/auth/login`: User login
- `/api/auth/logout`: User logout
- `/api/auth/checkAuth`: Authentication status check

These endpoints use JWT tokens for authentication, stored in HTTP-only cookies.
```

### State Management Page

```markdown
---
id: state-management
title: State Management
sidebar_label: State Management
---

# State Management

This document explains the state management approach used in CryptoTrackPro.

## Overview

The application uses a combination of state management solutions:

1. **Zustand**: For global application state (auth, theme)
2. **React Query**: For server state and data fetching
3. **React's useState/useEffect**: For component-level state

## Zustand for Global State

[Zustand](https://github.com/pmndrs/zustand) was chosen for global state management because it provides:

- Simple and lightweight API
- No boilerplate compared to Redux
- TypeScript support
- Built-in persistence

### Auth Store Example

```typescript
// From lib/store/auth-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-toastify';
import { User } from '@/lib/types/schema';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isChecking: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  checkAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<any>;
  register: (name: string, email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      isChecking: false,
      error: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      
      checkAuth: async () => {
        // Implementation...
      },
      
      login: async (email, password) => {
        // Implementation...
      },
      
      register: async (name, email, password) => {
        // Implementation...
      },
      
      logout: async () => {
        // Implementation...
      },
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

### Theme Store Example

```typescript
// From lib/store/theme.ts
import { create } from "zustand";

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDark: false,
  toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
}));
```

## React Query for Server State

[React Query](https://tanstack.com/query/latest) is used for managing server state because it provides:

- Automatic caching
- Refetching mechanisms
- Loading and error states
- Pagination support
- Devtools for debugging

```typescript
// From app/dashboard/page.tsx
const { 
  data, 
  isLoading, 
  isError, 
  error, 
  refetch, 
  isFetching,
  dataUpdatedAt
} = useQuery({
  queryKey: ['cryptocurrencies'],
  queryFn: fetchCryptocurrencies,
  refetchInterval: 3000, // Auto-refresh every 3 seconds
});
```

## Component-Level State

React's built-in state management (useState, useEffect) is used for component-specific state:

```typescript
// From app/dashboard/page.tsx
const [searchTerm, setSearchTerm] = useState('');
const debouncedSearchTerm = useDebounce(searchTerm, 500);
const [previousPrices, setPreviousPrices] = useState<Record<string, string>>({});
const [changedCryptos, setChangedCryptos] = useState<string[]>([]);
const [pricePulseMap, setPricePulseMap] = useState<Record<string, 'increase' | 'decrease' | null>>({});
const [page, setPage] = useState(1);
```

## Why This Approach?

This combined approach was chosen because:

1. **Separation of concerns**: Zustand manages application state, React Query handles server state
2. **Performance**: Each solution is optimized for its specific use case
3. **Developer experience**: Simple APIs and excellent TypeScript support
4. **Bundle size**: Both Zustand and React Query are lightweight
5. **Scalability**: This architecture scales well as the application grows
```

### Authentication Page

```markdown
---
id: authentication
title: Authentication
sidebar_label: Authentication
---

# Authentication

This document explains the authentication system implemented in CryptoTrackPro.

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
4. Token expiration is enforced
5. Environment variables are used for sensitive information
```

### Challenges and Solutions Page

```markdown
---
id: challenges-solutions
title: Challenges & Solutions
sidebar_label: Challenges & Solutions
---

# Challenges & Solutions

This document outlines the key challenges encountered during the development of CryptoTrackPro and the solutions implemented.

## Challenge 1: Real-time Data Updates

**Challenge**: Implementing real-time cryptocurrency price updates without overwhelming the API or causing excessive re-renders.

**Solution**:
- Used React Query with a reasonable polling interval (3 seconds) as a balance between freshness and performance
- Implemented visual indicators to highlight price changes
- Created a debounce mechanism for price change animations to prevent visual overload
- Added price change tracking to only update specific components

```typescript
// From app/dashboard/page.tsx
// Price change tracking with useEffect
useEffect(() => {
  if (data?.data) {
    const newChanges: string[] = [];
    const newPulseMap: Record<string, 'increase' | 'decrease' | null> = {};
    
    // Check for price changes and determine direction
    data.data.forEach((crypto: Cryptocurrency) => {
      const prevPrice = previousPrices[crypto.id];
      
      if (prevPrice !== undefined) {
        const currentPrice = parseFloat(crypto.priceUsd);
        const previousPrice = parseFloat(prevPrice);
        
        // Only detect significant changes to avoid floating point issues
        if (Math.abs(currentPrice - previousPrice) > 0.0000001) {
          newChanges.push(crypto.id);
          newPulseMap[crypto.id] = currentPrice > previousPrice ? 'increase' : 'decrease';
        }
      }
    });
    
    // Update previous prices for next comparison
    const newPrices: Record<string, string> = {};
    data.data.forEach((crypto: Cryptocurrency) => {
      newPrices[crypto.id] = crypto.priceUsd;
    });
    
    setPreviousPrices(newPrices);
    setPricePulseMap(newPulseMap);
    
    // Properly update the changedCryptos list
    if (newChanges.length > 0) {
      setChangedCryptos(prev => {
        // Remove any IDs from prev that are also in newChanges
        const filteredPrev = prev.filter(id => !newChanges.includes(id));
        // Add new changes at the beginning, keep only 5 in total
        return [...newChanges, ...filteredPrev].slice(0, 5);
      });
    }
    
    // Reset pulse effects after animation duration
    const timer = setTimeout(() => {
      setPricePulseMap({});
    }, 3000); // Match this with your animation duration
    
    return () => clearTimeout(timer);
  }
}, [data]);
```

## Challenge 2: Authentication System

**Challenge**: Implementing a secure, persistent authentication system with JWT.

**Solution**:
- Created a custom JWT-based authentication system
- Used HTTP-only cookies for secure token storage
- Implemented token verification on both client and server
- Added route protection with Next.js middleware
- Used Zustand with persist middleware for auth state management

```typescript
// JWT verification function
export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}
```

## Challenge 3: Responsive UI Design

**Challenge**: Creating a responsive UI that works well on both desktop and mobile devices.

**Solution**:
- Used Tailwind CSS for responsive design
- Implemented shadcn/ui components for consistent styling
- Created a responsive card grid that adapts to screen size
- Added mobile-friendly navigation
- Used CSS Grid and Flexbox for layout management

```tsx
// Responsive card grid example
<div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-5">
  {topCryptos.map((crypto) => (
    <CryptoCard 
      key={crypto.id} 
      crypto={crypto} 
      previousPrice={previousPrices[crypto.id]} 
      isRecent={changedCryptos.includes(crypto.id)}
      pulseDirection={pricePulseMap[crypto.id]}
    />
  ))}
</div>
```

## Challenge 4: Search and Pagination

**Challenge**: Implementing efficient search and pagination for potentially large datasets.

**Solution**:
- Added debounced search to prevent excessive filtering
- Implemented client-side pagination for better UX
- Optimized filtering logic to maintain performance
- Reset page when search term changes
- Added clear visual indicators for search and loading states

```typescript
// Debounce hook for search
const debouncedSearchTerm = useDebounce(searchTerm, 500);

// Search implementation
const filteredData = allCryptos.filter(crypto =>
  debouncedSearchTerm === '' || 
  crypto.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
  crypto.symbol.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
);

// Pagination logic
const totalPages = Math.ceil(filteredData.length / itemsPerPage);
const paginatedCryptos = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);
```

## Challenge 5: Database Schema Design

**Challenge**: Designing a database schema that supports user accounts and potentially user preferences.

**Solution**:
- Used Drizzle ORM for type-safe database operations
- Created a normalized schema to prevent data duplication
- Added proper indexes for query performance
- Implemented PostgreSQL with UUIDs for primary keys
- Designed the schema to be extensible for future features

```typescript
// Example schema definition
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
```

## Best Practices and Learnings

1. **Type Safety**: Using TypeScript throughout the project improved code quality and reduced bugs
2. **Component Reusability**: Creating reusable components reduced duplication and improved maintainability
3. **API Rate Limiting**: Implementing proper polling intervals to respect API limits
4. **Error Handling**: Adding comprehensive error handling improved user experience
5. **State Management**: Choosing the right state management tools for different parts of the application
```

### Best Practices Page

```markdown
---
id: best-practices
title: Best Practices
sidebar_label: Best Practices
---

# Best Practices

This document outlines the best practices followed in the CryptoTrackPro project.

## Code Organization

1. **Feature-Based Structure**: Code is organized by feature rather than by type
2. **Component Composition**: Using smaller components to build larger ones
3. **Separation of Concerns**: Keeping UI, state management, and business logic separate

## TypeScript Best Practices

1. **Strong Typing**: Using explicit types rather than `any`
2. **Interface Segregation**: Creating focused interfaces
3. **Type Guards**: Implementing proper type guards for safer code
4. **Discriminated Unions**: Using tagged union types for complex state

```typescript
// Example of discriminated union for auth state
type AuthState = 
  | { status: 'authenticated'; user: User; token: string }
  | { status: 'unauthenticated'; user: null; token: null }
  | { status: 'loading' };
```

## React Best Practices

1. **Functional Components**: Using functional components with hooks
2. **Custom Hooks**: Extracting reusable logic into custom hooks
3. **Memoization**: Using React.memo, useMemo, and useCallback where appropriate
4. **Error Boundaries**: Implementing error boundaries to catch rendering errors
5. **Key Props**: Using stable keys for lists

```typescript
// Custom hook for debouncing
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

## State Management Best Practices

1. **Minimal State**: Keeping state as minimal as possible
2. **Single Source of Truth**: Avoiding duplicate state
3. **Derived State**: Computing derived state rather than storing it
4. **Immutable Updates**: Using immutable patterns for state updates
5. **Selective Persistence**: Only persisting necessary state

```typescript
// Example of derived state
const filteredData = allCryptos.filter(crypto =>
  debouncedSearchTerm === '' || 
  crypto.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
  crypto.symbol.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
);
```

## API Integration Best Practices

1. **Centralized API Clients**: Using dedicated modules for API calls
2. **Error Handling**: Proper error handling for API requests
3. **Loading States**: Showing loading indicators during requests
4. **Data Transformation**: Transforming API data close to the source
5. **Caching Strategy**: Implementing appropriate caching with React Query

## Security Best Practices

1. **Input Validation**: Validating all user inputs with Zod
2. **HTTP-Only Cookies**: Using HTTP-only cookies for auth tokens
3. **CSRF Protection**: Implementing proper CSRF protection
4. **Environment Variables**: Storing secrets in environment variables
5. **SQL Injection Prevention**: Using parameterized queries with Drizzle ORM

## Performance Best Practices

1. **Code Splitting**: Using dynamic imports for code splitting

Similar code found with 3 license types