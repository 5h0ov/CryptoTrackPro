
// dummy shuimmer card for loading state
export function ShimmerCard() {
  return (
    <div className="rounded-md border bg-card p-4 shadow-sm animate-pulse">
      {/* icons and symbol name */}
      <div className="flex items-center gap-2">
        {/* logo */}
        <div className="h-8 w-8 rounded-full bg-muted"></div>
        <div>
          {/* name  */}
          <div className="h-4 w-20 bg-muted rounded"></div>
          {/* (BTC, ETH, etc.) */}
          <div className="h-3 w-12 bg-muted rounded mt-1"></div>
        </div>
      </div>
      
      {/* price and change */}
      <div className="mt-2">
        {/* price */}
        <div className="h-6 w-24 bg-muted rounded"></div>
        {/* 24h percentage */}
        <div className="h-3 w-16 bg-muted rounded mt-1"></div>
      </div>
    </div>
  );
}

// dummy shimmer table row for loading state
export function ShimmerTableRow() {
  return (
    <tr className="animate-pulse border-b">
      {/* rank */}
      <td className="py-3 px-4">
        <div className="h-5 w-5 bg-muted rounded"></div>
      </td>
      
      {/* icon + name + symbol */}
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 bg-muted rounded-full"></div>
          <div>
            <div className="h-4 w-32 bg-muted rounded mb-1"></div>
            <div className="h-3 w-16 bg-muted rounded"></div>
          </div>
        </div>
      </td>
      
      {/* price  - right aligned */}
      <td className="py-3 px-4 text-right">
        <div className="h-5 w-24 bg-muted rounded ml-auto"></div>
      </td>
      
      {/* 24h %  - right aligned */}
      <td className="py-3 px-4 text-right">
        <div className="h-5 w-16 bg-muted rounded ml-auto"></div>
      </td>
      
      {/* market cap  - right aligned */}
      <td className="py-3 px-4 text-right">
        <div className="h-5 w-20 bg-muted rounded ml-auto"></div>
      </td>
      
      {/* volume  - right aligned */}
      <td className="py-3 px-4 text-right">
        <div className="h-5 w-20 bg-muted rounded ml-auto"></div>
      </td>
    </tr>
  );
}