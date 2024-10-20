// app/api/marketData/route.js
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const timeFrame = searchParams.get('timeFrame') || '1h'; // Default to 1-hour if no parameter is provided
    const limit = searchParams.get('limit') || '20'; // Default to 20 candles if not specified
    
    try {
      const response = await fetch(`https://api.freecryptoapi.com/v1/getData?symbol=BTC+USD+USDBTC@binance&timeFrame=${timeFrame}&limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${process.env.FREE_CRYPTO_API_KEY}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      
      // Log the fetched data structure to the console
      console.log('Fetched Data:', data);
  
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error fetching market data:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }
  