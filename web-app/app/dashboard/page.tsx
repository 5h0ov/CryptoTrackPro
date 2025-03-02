'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCryptocurrencies } from '@/lib/utils/coincap';
import { Cryptocurrency } from '@/lib/types/schema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useDebounce } from '@/lib/hooks/use-debounce';
import { Loader2, RefreshCw, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuthStore } from '@/lib/store/auth-store';
import { ShimmerCard, ShimmerTableRow } from '@/components/dashboard/shimmer';

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [previousPrices, setPreviousPrices] = useState<Record<string, string>>({});
  const [changedCryptos, setChangedCryptos] = useState<string[]>([]);
  const [pricePulseMap, setPricePulseMap] = useState<Record<string, 'increase' | 'decrease' | null>>({});
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  
  const { 
    data: cryptoResponse, 
    isLoading, 
    isError, 
    error, 
    refetch, 
    isFetching,
    dataUpdatedAt
  } = useQuery({
    queryKey: ['cryptocurrencies'],
    queryFn: fetchCryptocurrencies,
    refetchInterval: 3000, // auto-refresh every 3 seconds
  });

  // console.log(cryptoResponse);
  // console.log(cryptoResponse.data);

  // to store previous prices and track changed cryptocurrencies
  useEffect(() => {
    if (cryptoResponse?.data) {
      // initialize previous prices on first load
      
      const newChanges: string[] = [];
      const newPulseMap: Record<string, 'increase' | 'decrease' | null> = {}; // to store pulse type
      
      // check for price changes and determine direction
      cryptoResponse.data.forEach((crypto: Cryptocurrency) => {
        const prevPrice = previousPrices[crypto.id];
        
        if (prevPrice !== undefined) {
          const currentPrice = parseFloat(crypto.priceUsd);
          const previousPrice = parseFloat(prevPrice);
          
          // only detect significant changes to avoid floating point issues
          if (Math.abs(currentPrice - previousPrice) > 0.0000001) {
            newChanges.push(crypto.id);
            newPulseMap[crypto.id] = currentPrice > previousPrice ? 'increase' : 'decrease';
          }
        }
      });
      
      // update previous prices for next comparison
      const newPrices: Record<string, string> = {};
      cryptoResponse.data.forEach((crypto: Cryptocurrency) => {
        newPrices[crypto.id] = crypto.priceUsd;
      });
      
      setPreviousPrices(newPrices);
      setPricePulseMap(newPulseMap);
      
      // properly update the changedCryptos list
      if (newChanges.length > 0) {
        setChangedCryptos(prev => {
          // remove any IDs from prev that are also in newChanges
          const filteredPrev = prev.filter(id => !newChanges.includes(id));
          // add new changes at the beginning, keep only 5 in total
          return [...newChanges, ...filteredPrev].slice(0, 5);
        });
      }
      
      // reset pulse map after animation duration
      const timer = setTimeout(() => {
        setPricePulseMap({});
      }, 3000); // 3 seconds [same as CSS animation duration in global.css]
      
      return () => clearTimeout(timer);
    }
  }, [cryptoResponse]);

  const allCryptos = cryptoResponse?.data || [];

  // filtering data based on search term
  const filteredData = allCryptos.filter(crypto =>
    debouncedSearchTerm === '' || 
    crypto.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  // get the most recently updated cryptocurrencies for the top cards
  const topCryptos = changedCryptos.length > 0
  ? changedCryptos
      .map(id => allCryptos.find(crypto => crypto.id === id))
      .filter((crypto): crypto is Cryptocurrency => crypto !== undefined) // this was added to fix the typescript error of crypto possibly being undefined
  : allCryptos.slice(0, 5);

  // pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedCryptos = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const lastUpdated = dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : '';

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">{user ? `Welcome, ${user.name}` : "CryptoCurrency Dashboard"}</h1>

        <div className="flex items-center gap-2">
          {lastUpdated && (
            <div className="text-sm text-muted-foreground">
              Last updated: {lastUpdated}
            </div>
          )}
          <Button 
            onClick={() => refetch()} 
            disabled={isLoading || isFetching}
            variant="outline"
            size="sm"
          >
            {(isLoading || isFetching) ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Refreshing</span>
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                <span>Refresh</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* 5 latest header */}
      <div className="rounded-lg border bg-card p-6 shadow-lg mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between border-b pb-3">
          <h3 className="text-xl font-medium">Live Updates</h3>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="animate-pulse rounded-full bg-chart-1 px-3 py-1 text-sm font-medium text-white mt-3 md:mt-0">
              LIVE
            </div>
            
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span>Price Decreases</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <span>Price Increases</span>
              </div>
            </div>
          </div>
        </div>
        {/* 5 latest cryptocurrencies */}
        {isLoading ? (
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-5">
            {[...Array(5)].map((_, index) => (
              <ShimmerCard key={index} />
            ))}
          </div>
        ) : isError ? (
          <div className="flex justify-center items-center h-48 text-red-500">
            Error: {(error as Error).message}
          </div>
        ) : topCryptos.length === 0 ? (
          <div className="flex justify-center items-center h-48 text-muted-foreground">
            No data available
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-5">
            {topCryptos.map((crypto) => (
              <CryptoCard 
                key={crypto.id} 
                crypto={crypto} 
                previousPrice={previousPrices[crypto.id]} 
                isRecent={changedCryptos.includes(crypto.id)}
                pulseType={pricePulseMap[crypto.id]}
              />
            ))}
          </div>
        )}
      </div>

      {/* search and table for the rest of the cryptocurrencies */}
      <div className="rounded-lg border bg-card p-6 shadow-lg mb-6">
        <h3 className="text-lg font-medium mb-4">All Cryptocurrencies</h3>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search cryptocurrencies..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="pl-10"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-left">Rank</th>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-right">Price (USD)</th>
                <th className="py-2 px-4 text-right">24h Change</th>
                <th className="py-2 px-4 text-right">Market Cap</th>
                <th className="py-2 px-4 text-right">Volume (24h)</th>
              </tr>
            </thead>
            
            {isLoading ? (
              <tbody>
                {[...Array(itemsPerPage)].map((_, index) => (
                  <ShimmerTableRow key={index} />
                ))}
              </tbody>
            ) : isError ? (
              <tbody>
                <tr>
                  <td colSpan={6} className="py-12 text-center text-red-500">
                    Error: {(error as Error).message}
                  </td>
                </tr>
              </tbody>
            ) : paginatedCryptos.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted-foreground">
                    No cryptocurrencies found matching &quot;{debouncedSearchTerm}&quot;
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {paginatedCryptos.map((crypto) => (
                  <CryptoTableRow 
                    key={crypto.id} 
                    crypto={crypto} 
                    previousPrice={previousPrices[crypto.id]} 
                    isRecent={changedCryptos.includes(crypto.id)}
                    pulseType={pricePulseMap[crypto.id]}
                  />
                ))}
              </tbody>
            )}
          </table>
        </div>

        {/* pagination */}
        {!isLoading && !isError && paginatedCryptos.length > 0 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {(page - 1) * itemsPerPage + 1} to {Math.min(page * itemsPerPage, filteredData.length)} of {filteredData.length} results
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="flex items-center px-2 text-sm">
                Page {page} of {totalPages || 1}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="text-center text-sm text-muted-foreground">
        Data provided by <a href="https://coincap.io" className="underline hover:text-foreground" target="_blank">CoinCap API</a>
      </div>
    </div>
  );
}

// seprate components for CryptoCard and CryptoTableRow to ensure reusability and modularity
function CryptoCard({ crypto,
   previousPrice,
  //  isRecent,
   pulseType
 }: { 
  crypto: Cryptocurrency,
  previousPrice?: string,
  isRecent?: boolean,
  pulseType?: 'increase' | 'decrease' | null,
}) {
  const currentPrice = parseFloat(crypto.priceUsd);
  const prevPrice = previousPrice ? parseFloat(previousPrice) : currentPrice;
  
  const priceChanged = prevPrice !== currentPrice;
  const priceIncreased = currentPrice > prevPrice;
  
  // formatting price to USD and 2 decimal places for compact notation
  const priceFormatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(currentPrice);

  const changePercent = parseFloat(crypto.changePercent24Hr || '0');
  const isPositive = changePercent >= 0;

  // random color generation logic based on name
  const chartColors = ['bg-chart-1', 'bg-chart-2', 'bg-chart-3', 'bg-chart-4', 'bg-chart-5'];
  const colorIndex = Math.abs(crypto.name.charCodeAt(0)) % chartColors.length;
  const colorClass = chartColors[colorIndex];

  const pulseClass = pulseType === 'increase' ? 'pulse-green' : pulseType === 'decrease' ? 'pulse-red' : '';

  return (
    <div className={`rounded-md border bg-card p-4 shadow-sm transition-all hover:shadow-md ${pulseClass}`}>
      <div className="flex items-center gap-2">
        <div className={`h-8 w-8 rounded-full ${colorClass} flex items-center justify-center text-white font-bold text-xs`}>
          {crypto.symbol.substring(0, 1)}
        </div>
        <div>
          <p className="text-sm font-medium">{crypto.name}</p>
          <p className="text-xs text-muted-foreground">{crypto.symbol}</p>
        </div>
      </div>
      <div className="mt-2">
        <p className={`text-lg font-bold ${priceChanged ? (priceIncreased ? 'text-red-500' : 'text-green-500') : ''} transition-colors duration-1000`}>
          {priceFormatted}
        </p>
        <p className={`text-xs ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
        </p>
      </div>
    </div>
  );
}

function CryptoTableRow({ crypto,
   previousPrice,
  //  isRecent,
   pulseType 
  }: { 
  crypto: Cryptocurrency; 
  previousPrice?: string;
  isRecent?: boolean;
  pulseType?: 'increase' | 'decrease' | null;
}) {
  const currentPrice = parseFloat(crypto.priceUsd);
  const prevPrice = previousPrice ? parseFloat(previousPrice) : currentPrice;
  
  const priceChanged = prevPrice !== currentPrice;
  const priceIncreased = currentPrice > prevPrice;
  
  const priceFormatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(currentPrice);
  
  const changePercent = parseFloat(crypto.changePercent24Hr || '0');
  const isPositive = changePercent >= 0;

  const marketCap = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 2
  }).format(parseFloat(crypto.marketCapUsd));

  const volume = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 2
  }).format(parseFloat(crypto.volumeUsd24Hr));

  const chartColors = ['bg-chart-1', 'bg-chart-2', 'bg-chart-3', 'bg-chart-4', 'bg-chart-5'];
  const colorIndex = Math.abs(crypto.name.charCodeAt(0)) % chartColors.length;
  const colorClass = chartColors[colorIndex];

  const pulseClass = pulseType === 'increase' ? 'pulse-green' : pulseType === 'decrease' ? 'pulse-red' : '';

  return (
    <tr className={`border-b hover:bg-muted/50 ${pulseClass}`}>
      <td className="py-3 px-4">{crypto.rank}</td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <div className={`h-6 w-6 rounded-full ${colorClass} flex items-center justify-center text-white font-bold text-xs`}>
            {crypto.symbol.substring(0, 1)}
          </div>
          <div>
            <p className="font-medium">{crypto.name}</p>
            <p className="text-xs text-muted-foreground">{crypto.symbol}</p>
          </div>
        </div>
      </td>
      <td className={`py-3 px-4 text-right font-medium ${priceChanged ? (priceIncreased ? 'text-red-500' : 'text-green-500') : ''} transition-colors duration-1000`}>
        {priceFormatted}
      </td>
      <td className={`py-3 px-4 text-right ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
      </td>
      <td className="py-3 px-4 text-right">{marketCap}</td>
      <td className="py-3 px-4 text-right">{volume}</td>
    </tr>
  );
}