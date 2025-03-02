import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.COINCAP_API_KEY;
    
    // excluded limit and let it be default offered by CoinCap (100)
    const response = await fetch('https://api.coincap.io/v2/assets', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept-Encoding': 'gzip, deflate' // added this for compression as optionally offered by CoinCap
      },
      // ensure fresh data is sent to the client always
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