import type { PriceData, HistoricalDataPoint } from "~~/shared/types";

export const usePrices = () => {
  const prices = ref<Record<string, PriceData>>({});
  const tokenNames = ref<Record<string, string>>({});
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Fetch comprehensive price data including 24h changes from CoinGecko
  const fetchPrices = async (tokenIds: string[]) => {
    loading.value = true;
    error.value = null;

    try {
      const ids = tokenIds.join(",");
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch prices");
      }

      const data = await response.json();

      // Transform to format: { bitcoin: { usd: 45000, usd_24h_change: 2.5 } }
      const priceMap: Record<string, PriceData> = {};
      for (const [key, value] of Object.entries(data)) {
        priceMap[key] = {
          usd: (value as any).usd,
          usd_24h_change: (value as any).usd_24h_change || 0,
        };
      }

      prices.value = priceMap;
      return priceMap;
    } catch (err: any) {
      error.value = err.message;
      console.error("Error fetching prices:", err);
      return null;
    } finally {
      loading.value = false;
    }
  };

  // Fetch token names and metadata
  const fetchTokenNames = async (tokenIds: string[]) => {
    try {
      const ids = tokenIds.join(",");
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch token names");
      }

      const data = await response.json();

      // Map id to name: { bitcoin: "Bitcoin", ethereum: "Ethereum" }
      const nameMap: Record<string, string> = {};
      for (const token of data) {
        nameMap[token.id] = token.name;
      }

      tokenNames.value = nameMap;
      return nameMap;
    } catch (err: any) {
      console.error("Error fetching token names:", err);
      return null;
    }
  };

  // Fetch historical data for portfolio chart
  const fetchHistoricalData = async (
    tokenId: string,
    days: number = 1
  ): Promise<HistoricalDataPoint[] | null> => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${tokenId}/market_chart?vs_currency=usd&days=${days}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch historical data");
      }

      const data = await response.json();

      // Convert to our format
      return data.prices.map(([timestamp, value]: [number, number]) => ({
        timestamp,
        value,
      }));
    } catch (err: any) {
      console.error("Error fetching historical data:", err);
      return null;
    }
  };

  // Get price for a single token
  const getPrice = (tokenId: string): number => {
    return prices.value[tokenId]?.usd || 0;
  };

  // Get 24h change for a single token
  const get24hChange = (tokenId: string): number => {
    return prices.value[tokenId]?.usd_24h_change || 0;
  };

  // Get token name
  const getTokenName = (tokenId: string): string => {
    return tokenNames.value[tokenId] || tokenId;
  };

  // Common token symbol to CoinGecko ID mapping
  const symbolToId = (symbol: string): string => {
    const mapping: Record<string, string> = {
      BTC: "bitcoin",
      ETH: "ethereum",
      USDT: "tether",
      USDC: "usd-coin",
      BNB: "binancecoin",
      ADA: "cardano",
      SOL: "solana",
      DOT: "polkadot",
      MATIC: "matic-network",
      LINK: "chainlink",
      UNI: "uniswap",
      AVAX: "avalanche-2",
      DOGE: "dogecoin",
      SHIB: "shiba-inu",
      XRP: "ripple",
      LTC: "litecoin",
      TRX: "tron",
      ATOM: "cosmos",
      DAI: "dai",
    };
    return mapping[symbol.toUpperCase()] || symbol.toLowerCase();
  };

  // Get default token name from symbol
  const symbolToName = (symbol: string): string => {
    const mapping: Record<string, string> = {
      BTC: "Bitcoin",
      ETH: "Ethereum",
      USDT: "Tether",
      USDC: "USD Coin",
      BNB: "Binance Coin",
      ADA: "Cardano",
      SOL: "Solana",
      DOT: "Polkadot",
      MATIC: "Polygon",
      LINK: "Chainlink",
      UNI: "Uniswap",
      AVAX: "Avalanche",
      DOGE: "Dogecoin",
      SHIB: "Shiba Inu",
      XRP: "Ripple",
      LTC: "Litecoin",
      TRX: "Tron",
      ATOM: "Cosmos",
      DAI: "Dai",
    };
    return mapping[symbol.toUpperCase()] || symbol;
  };

  // Fetch prices by token symbols (BTC, ETH, etc.)
  const fetchPricesBySymbols = async (symbols: string[]) => {
    const ids = symbols.map(symbolToId);
    const priceData = await fetchPrices(ids);
    await fetchTokenNames(ids); // Also fetch names
    return priceData;
  };

  return {
    prices,
    tokenNames,
    loading,
    error,
    fetchPrices,
    fetchTokenNames,
    fetchHistoricalData,
    getPrice,
    get24hChange,
    getTokenName,
    symbolToId,
    symbolToName,
    fetchPricesBySymbols,
  };
};
