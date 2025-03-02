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