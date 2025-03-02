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

The API client follows a secure architecture pattern where frontend components call our own API endpoints, which then interface with external services.

#### Frontend API Client

The frontend API client is implemented in `lib/utils/coincap.ts`:

```typescript
import { Cryptocurrency } from "../types/schema";

export interface CryptocurrencyResponse {
  data: Cryptocurrency[];
  timestamp: number;
}

export async function fetchCryptocurrencies(): Promise<CryptocurrencyResponse> {
  const response = await fetch('/api/cryptocurrencies');
  
  if (!response.ok) {
    throw new Error('Failed to fetch cryptocurrency data');
  }
  
  return response.json();
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

#### Backend API Route Handler

The API route handler in `app/api/cryptocurrencies/route.ts` manages the actual communication with the CoinCap API:

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.COINCAP_API_KEY;
    
    // Excluded limit and let it be default offered by CoinCap (100)
    const response = await fetch('https://api.coincap.io/v2/assets', {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      },
      // Ensured fresh data is sent to the client always
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch cryptocurrency data');
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
```

### Security Benefits

This architecture provides several security and performance advantages:

1. **API Key Protection**: API keys are stored as environment variables on the server and never exposed to the client
2. **Rate Limiting Control**: All client requests are funneled through the API, allowing better control of external API quota usage
3. **Response Transformation**: The server can transform, filter, or enhance API responses before sending to the client
4. **Error Handling**: Centralized error handling for external API issues

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

Due to the limitations of Free Public APIs, real-time updates have been achieved through:

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