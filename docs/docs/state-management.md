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
- Loading and error states -> Better Error Handling
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
