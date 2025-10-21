import type {
  PortfolioStats,
  TokenDistribution,
  TokenRecord,
} from "~~/shared/types";
import { formatCurrency, formatPercentage } from "~/utils/format";

interface PriceData {
  usd: number;
  usd_24h_change?: number;
}

export const usePortfolio = () => {
  const tokens = ref<TokenRecord[]>([]);
  const loading = ref(false);

  // Calculate total portfolio value
  const totalValue = computed(() => {
    return tokens.value.reduce(
      (sum: number, token: TokenRecord) => sum + token.usd_value,
      0
    );
  });

  // Get number of unique tokens
  const totalTokens = computed(() => {
    return tokens.value.length;
  });

  // Get top 3 tokens by value
  const top3Tokens = computed(() => {
    return [...tokens.value]
      .sort((a, b) => b.usd_value - a.usd_value)
      .slice(0, 3);
  });

  // Calculate token distribution for pie chart
  const distribution = computed<TokenDistribution[]>(() => {
    const total = totalValue.value;
    if (total === 0) return [];

    return tokens.value
      .map((token: TokenRecord) => ({
        symbol: token.symbol,
        value: token.usd_value,
        percentage: (token.usd_value / total) * 100,
      }))
      .sort((a: TokenDistribution, b: TokenDistribution) => b.value - a.value);
  });

  // Get portfolio stats
  const getStats = computed((): PortfolioStats => {
    return {
      totalValue: totalValue.value,
      totalTokens: totalTokens.value,
      top3Tokens: top3Tokens.value,
      distribution: distribution.value as TokenDistribution[],
    };
  });

  // Set tokens data
  const setTokens = (newTokens: TokenRecord[]) => {
    tokens.value = newTokens;
  };

  // Add a token
  const addToken = (token: TokenRecord) => {
    tokens.value.push(token);
  };

  // Remove a token
  const removeToken = (index: number) => {
    tokens.value.splice(index, 1);
  };

  // Update token prices
  const updatePrices = async (priceData: Record<string, PriceData>) => {
    const { symbolToId, symbolToName } = usePrices();

    tokens.value = tokens.value.map((token: TokenRecord) => {
      const coinId = symbolToId(token.symbol);
      const data = priceData[coinId];

      if (!data) return token;

      const price = data.usd || 0;
      const change24h = data.usd_24h_change || 0;
      const usdValue = token.balance * price;
      const change24hValue = (change24h / 100) * usdValue;

      return {
        ...token,
        name: token.name || symbolToName(token.symbol),
        price,
        usd_value: usdValue,
        change_24h: change24h,
        change_24h_value: change24hValue,
      };
    });
  };

  // Fetch and update all token data
  const refreshPortfolio = async (userId: string) => {
    loading.value = true;
    try {
      const { getWallets, getTokens } = useSupabase();
      const { fetchPricesBySymbols, symbolToId, symbolToName } = usePrices();

      console.log(" Refreshing portfolio for user:", userId);

      // Get all wallets for user
      const { data: wallets, error: walletsError } = await getWallets(userId);
      if (walletsError) {
        throw walletsError;
      }

      if (!wallets || wallets.length === 0) {
        tokens.value = [];
        return;
      }

      // Get tokens for all wallets
      const allTokens: TokenRecord[] = [];
      for (const wallet of wallets) {
        const { data: walletTokens, error: tokensError } = await getTokens(
          wallet.id
        );
        if (tokensError) {
          console.error("Error fetching tokens:", tokensError);
        }
        if (walletTokens) {
          console.log(
            `Tokens for wallet ${wallet.address}:`,
            walletTokens.length
          );
          allTokens.push(...walletTokens);
        }
      }

      console.log("Total tokens from DB:", allTokens.length);

      if (allTokens.length === 0) {
        console.warn("No tokens found in any wallet");
        tokens.value = [];
        return;
      }

      // Get unique symbols
      const symbols = [...new Set(allTokens.map((t) => t.symbol))];
      console.log("Fetching prices for:", symbols);

      // Fetch current prices
      const prices = await fetchPricesBySymbols(symbols);
      console.log("Prices received:", prices ? Object.keys(prices).length : 0);

      if (prices) {
        // Update token values with current prices and 24h changes
        tokens.value = allTokens.map((token) => {
          const coinId = symbolToId(token.symbol);
          const priceData = prices[coinId];

          if (!priceData) {
            console.warn(`No price data for ${token.symbol} (${coinId})`);
            return {
              ...token,
              name: token.name || symbolToName(token.symbol),
              price: 0,
              change_24h: 0,
              change_24h_value: 0,
            };
          }

          const price = priceData.usd || 0;
          const change24h = priceData.usd_24h_change || 0;
          const usdValue = token.balance * price;
          const change24hValue = (change24h / 100) * usdValue;

          return {
            ...token,
            name: token.name || symbolToName(token.symbol),
            price,
            usd_value: usdValue,
            change_24h: change24h,
            change_24h_value: change24hValue,
          };
        });

        console.log(
          "Portfolio refreshed successfully:",
          tokens.value.length,
          "tokens"
        );
      } else {
        // If no prices, just add names
        const { symbolToName: getName } = usePrices();
        tokens.value = allTokens.map((token) => ({
          ...token,
          name: token.name || getName(token.symbol),
          price: 0,
        }));
        console.log("No prices available, using default values");
      }
    } catch (err) {
      console.error("Error refreshing portfolio:", err);
    } finally {
      loading.value = false;
    }
  };

  // Format currency
  return {
    tokens,
    loading,
    totalValue,
    totalTokens,
    top3Tokens,
    distribution,
    getStats,
    setTokens,
    addToken,
    removeToken,
    updatePrices,
    refreshPortfolio,
    formatCurrency,
    formatPercentage,
  };
};
