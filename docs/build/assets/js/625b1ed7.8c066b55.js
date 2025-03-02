"use strict";(self.webpackChunkcrypto_tracker=self.webpackChunkcrypto_tracker||[]).push([[1831],{3341:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>u,frontMatter:()=>o,metadata:()=>t,toc:()=>c});const t=JSON.parse('{"id":"authentication","title":"Authentication (Optional)","description":"This document explains the addition of the authentication system implemented in CryptoTrackPro.","source":"@site/docs/authentication.md","sourceDirName":".","slug":"/authentication","permalink":"/docs/authentication","draft":false,"unlisted":false,"editUrl":"https://github.com/your-github-user/crypto-tracker/edit/main/docs-site/docs/authentication.md","tags":[],"version":"current","frontMatter":{"id":"authentication","title":"Authentication (Optional)","sidebar_label":"Authentication (Optional)"},"sidebar":"Sidebar","previous":{"title":"State Management","permalink":"/docs/state-management"},"next":{"title":"Challenges & Solutions","permalink":"/docs/challenges-solutions"}}');var s=r(4848),i=r(8453);const o={id:"authentication",title:"Authentication (Optional)",sidebar_label:"Authentication (Optional)"},a="Authentication (Optional)",l={},c=[{value:"Overview",id:"overview",level:2},{value:"Authentication Flow",id:"authentication-flow",level:2},{value:"Implementation",id:"implementation",level:2},{value:"Backend Routes",id:"backend-routes",level:3},{value:"Register Endpoint",id:"register-endpoint",level:4},{value:"Login Endpoint",id:"login-endpoint",level:4},{value:"Check Auth Endpoint",id:"check-auth-endpoint",level:4},{value:"Frontend State Management",id:"frontend-state-management",level:3},{value:"Route Protection",id:"route-protection",level:2},{value:"Security Considerations",id:"security-considerations",level:2}];function d(e){const n={code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"authentication-optional",children:"Authentication (Optional)"})}),"\n",(0,s.jsx)(n.p,{children:"This document explains the addition of the authentication system implemented in CryptoTrackPro."}),"\n",(0,s.jsx)(n.h2,{id:"overview",children:"Overview"}),"\n",(0,s.jsx)(n.p,{children:"The application uses a custom JWT-based authentication system with:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Token-based authentication"}),"\n",(0,s.jsx)(n.li,{children:"HTTP-only cookies for token storage"}),"\n",(0,s.jsx)(n.li,{children:"Server-side token verification"}),"\n",(0,s.jsx)(n.li,{children:"Middleware for route protection"}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"authentication-flow",children:"Authentication Flow"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Registration"}),": User submits name, email, and password"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Login"}),": User submits email and password, receives JWT"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Session Maintenance"}),": JWT is stored in HTTP-only cookies"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.strong,{children:"Logout"}),": JWT is removed from cookies"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"implementation",children:"Implementation"}),"\n",(0,s.jsx)(n.h3,{id:"backend-routes",children:"Backend Routes"}),"\n",(0,s.jsx)(n.p,{children:"The authentication system is implemented through several API routes:"}),"\n",(0,s.jsx)(n.h4,{id:"register-endpoint",children:"Register Endpoint"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"// From app/api/auth/register/route.ts\r\nexport async function POST(request: Request) {\r\n  try {\r\n    const body = await request.json();\r\n    const { name, email, password } = body;\r\n\r\n    // Check if user exists\r\n    const [existingUser] = await db\r\n      .select({ id: users.id, name: users.name, email: users.email })\r\n      .from(users)\r\n      .where(eq(users.email, email.toLowerCase()));\r\n\r\n    if (existingUser) {\r\n      return NextResponse.json(\r\n        { message: \"Email already registered\" },\r\n        { status: 400 }\r\n      );\r\n    }\r\n\r\n    // Hash password and create user\r\n    const hashedPassword = await bcrypt.hash(password, 10);\r\n    const [newUser] = await db\r\n      .insert(users)\r\n      .values({\r\n        name,\r\n        email: email.toLowerCase(),\r\n        password: hashedPassword,\r\n      })\r\n      .returning({\r\n        id: users.id,\r\n        email: users.email,\r\n        name: users.name,\r\n      });\r\n\r\n    // Create JWT token\r\n    const token = await createToken({\r\n      id: newUser.id,\r\n      email: newUser.email,\r\n      name: newUser.name,\r\n    });\r\n\r\n    // Set cookie\r\n    (await cookies()).set('token', token, {\r\n      httpOnly: true,\r\n      secure: process.env.NODE_ENV === 'production',\r\n      sameSite: 'lax',\r\n      maxAge: 12 * 60 * 60 * 24 * 1000, // 12 days\r\n      path: '/',\r\n    });\r\n    \r\n    return NextResponse.json({\r\n      user: newUser,\r\n      token,\r\n    }, { status: 201 });\r\n  } catch (error: unknown) {\r\n    console.error('Register failed:', error);\r\n    return NextResponse.json(\r\n      { message: error || \"Internal server error\" },\r\n      { status: 500 }\r\n    );\r\n  }\r\n}\n"})}),"\n",(0,s.jsx)(n.h4,{id:"login-endpoint",children:"Login Endpoint"}),"\n",(0,s.jsx)(n.p,{children:"Similar to the register endpoint, but verifies credentials against the database."}),"\n",(0,s.jsx)(n.h4,{id:"check-auth-endpoint",children:"Check Auth Endpoint"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"// From app/api/auth/checkAuth/route.ts\r\nexport async function GET(request: NextRequest) {\r\n  try {\r\n    const token = request.cookies.get('token')?.value;\r\n    if (!token) {\r\n      return NextResponse.json({ user: null, token: null });\r\n    }\r\n\r\n    const payload = await verifyToken(token);\r\n    if (!payload || !payload.id) {\r\n      return NextResponse.json({ user: null, token: null });\r\n    }\r\n\r\n    // Find user\r\n    const [user] = await db\r\n      .select({\r\n        id: users.id,\r\n        email: users.email,\r\n        name: users.name,\r\n      })\r\n      .from(users)\r\n      .where(eq(users.id, sql.raw(`'${payload.id}'::uuid`)));\r\n\r\n    if (!user) {\r\n      return NextResponse.json({ user: null, token: null });\r\n    }\r\n\r\n    return NextResponse.json({\r\n      user,\r\n      token\r\n    });\r\n  } catch (error: unknown) {\r\n    console.error('Auth check failed:', error);\r\n    return NextResponse.json(\r\n      { message: \"Auth check failed\" },\r\n      { status: 500 }\r\n    );\r\n  }\r\n}\n"})}),"\n",(0,s.jsx)(n.h3,{id:"frontend-state-management",children:"Frontend State Management"}),"\n",(0,s.jsx)(n.p,{children:"The authentication state is managed using Zustand:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:'// From lib/store/auth-store.ts (partial)\r\nexport const useAuthStore = create<AuthState>()(\r\n  persist(\r\n    (set) => ({\r\n      // State properties...\r\n      \r\n      login: async (email, password) => {\r\n        set({ isLoading: true, error: null });\r\n        \r\n        try {\r\n          const res = await fetch("/api/auth/login", {\r\n            method: "POST",\r\n            headers: { "Content-Type": "application/json" },\r\n            body: JSON.stringify({ email, password }),\r\n            credentials: \'include\'\r\n          });\r\n          \r\n          const data = await res.json();\r\n          \r\n          if (!res.ok) throw new Error(data.message || "Login failed");\r\n          \r\n          set({ user: data.user, token: data.token });\r\n          toast.success("Login successful");\r\n          return data;\r\n        } catch (error: unknown) {\r\n          console.error(\'Login failed:\', error);\r\n          set({ user: null, token: null  });\r\n          toast.error("Login failed" );\r\n          throw error;\r\n        } finally {\r\n          set({ isLoading: false });\r\n        }\r\n      },\r\n\r\n      // Other methods...\r\n    }),\r\n    {\r\n      name: \'auth-storage\',\r\n      partialize: (state) => ({\r\n        user: state.user,\r\n        token: state.token \r\n      })\r\n    }\r\n  )\r\n);\n'})}),"\n",(0,s.jsx)(n.h2,{id:"route-protection",children:"Route Protection"}),"\n",(0,s.jsx)(n.p,{children:"Protected routes are handled using Next.js middleware:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"// From middleware.ts\r\nimport { NextResponse } from 'next/server';\r\nimport type { NextRequest } from 'next/server';\r\nimport { verifyToken } from '@/lib/utils/auth';\r\n\r\nexport async function middleware(request: NextRequest) {\r\n  // Implementation...\r\n}\r\n\r\n// Protected routes\r\nexport const config = {\r\n  matcher: ['/auth/:path*'],\r\n};\n"})}),"\n",(0,s.jsx)(n.h2,{id:"security-considerations",children:"Security Considerations"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:"Passwords are hashed using bcrypt"}),"\n",(0,s.jsx)(n.li,{children:"JWT tokens are stored in HTTP-only cookies"}),"\n",(0,s.jsx)(n.li,{children:"CSRF protection via SameSite cookie attribute"}),"\n",(0,s.jsx)(n.li,{children:"Token expiration is enforced to 12 days"}),"\n",(0,s.jsx)(n.li,{children:"Environment variables are used for sensitive information"}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsxs)(n.em,{children:["This is optional for now, ",(0,s.jsx)(n.strong,{children:"users do not need to authenticate"})," to use the application."]})})]})}function u(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},8453:(e,n,r)=>{r.d(n,{R:()=>o,x:()=>a});var t=r(6540);const s={},i=t.createContext(s);function o(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);