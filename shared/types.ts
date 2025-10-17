export interface TokenDistribution {
  symbol: string;
  value: number;
  percentage: number;
}

export interface TokenRecord {
  id?: string;
  wallet_id?: string;
  name: string; // Full name (e.g., "Bitcoin")
  symbol: string; // Symbol (e.g., "BTC")
  balance: number; // Amount held
  price: number; // Current USD price
  avg_purchase_price?: number; // Average buy price (optional)
  usd_value: number; // Current value (balance × price)
  change_24h?: number; // 24h price change percentage
  change_24h_value?: number; // 24h change in USD value
  last_updated?: string;
}

export interface PortfolioStats {
  totalValue: number;
  totalTokens: number;
  top3Tokens: TokenRecord[];
  distribution: TokenDistribution[];
}

export interface HistoricalDataPoint {
  timestamp: number;
  value: number;
}

export interface PriceData {
  usd: number;
  usd_24h_change?: number;
}
