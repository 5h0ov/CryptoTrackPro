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
    }, 3000); // 3 seconds [same as CSS animation duration in global.css]
    
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



## Best Practices and Learnings

1. **Type Safety**: Using TypeScript throughout the project improved code quality and reduced bugs
2. **Component Reusability**: Creating reusable components reduced duplication and improved maintainability
3. **API Rate Limiting**: Implementing proper polling intervals to respect API limits
4. **Error Handling**: Adding comprehensive error handling improved user experience
5. **State Management**: Choosing the right state management tools for different parts of the application