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