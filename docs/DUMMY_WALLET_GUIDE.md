# Creating Dummy/Test Wallets for Development

## 🎯 Quick Answer

You have **3 options** to test your app:

1. ✅ **Use Mock Data** - Hardcode fake balances (fastest for development)
2. ✅ **Use Testnet Wallets** - Real blockchain testing with fake crypto (most realistic)
3. ✅ **Use Real Addresses with Small Amounts** - Test with actual crypto (production-ready)

---

## 🚀 Method 1: Mock Data (RECOMMENDED for Development)

### Step-by-Step: Add Mock Wallet Data to Your App

#### Step 1: Create Mock Data File

Create: `app/mock/wallet-data.ts`

```typescript
export const MOCK_ENABLED = true; // Set to false for production

export const MOCK_WALLETS = {
  // Ethereum wallet with multiple tokens
  "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7": {
    chain: "ethereum",
    label: "Main Wallet (Test)",
    tokens: [
      {
        symbol: "ETH",
        name: "Ethereum",
        balance: 2.5432,
        price: 2645.32,
        usd_value: 6728.54,
        change_24h: 3.2,
        change_24h_value: 215.31,
      },
      {
        symbol: "USDT",
        name: "Tether",
        balance: 5000.0,
        price: 1.0,
        usd_value: 5000.0,
        change_24h: 0.01,
        change_24h_value: 0.5,
      },
      {
        symbol: "USDC",
        name: "USD Coin",
        balance: 2500.0,
        price: 1.0,
        usd_value: 2500.0,
        change_24h: -0.02,
        change_24h_value: -0.5,
      },
      {
        symbol: "UNI",
        name: "Uniswap",
        balance: 125.5,
        price: 8.45,
        usd_value: 1060.48,
        change_24h: 5.8,
        change_24h_value: 61.51,
      },
      {
        symbol: "LINK",
        name: "Chainlink",
        balance: 450.0,
        price: 12.34,
        usd_value: 5553.0,
        change_24h: -2.1,
        change_24h_value: -116.61,
      },
    ],
  },

  // Bitcoin wallet
  bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh: {
    chain: "bitcoin",
    label: "Bitcoin Wallet (Test)",
    tokens: [
      {
        symbol: "BTC",
        name: "Bitcoin",
        balance: 0.2534,
        price: 67234.56,
        usd_value: 17037.68,
        change_24h: 2.4,
        change_24h_value: 408.9,
      },
    ],
  },

  // Solana wallet
  "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU": {
    chain: "solana",
    label: "Solana Wallet (Test)",
    tokens: [
      {
        symbol: "SOL",
        name: "Solana",
        balance: 156.78,
        price: 158.42,
        usd_value: 24841.28,
        change_24h: 6.7,
        change_24h_value: 1664.37,
      },
      {
        symbol: "USDC",
        name: "USD Coin (Solana)",
        balance: 1000.0,
        price: 1.0,
        usd_value: 1000.0,
        change_24h: 0.0,
        change_24h_value: 0.0,
      },
    ],
  },
};

export const getMockBalances = (address: string) => {
  const wallet = MOCK_WALLETS[address as keyof typeof MOCK_WALLETS];
  return wallet?.tokens || [];
};

export const getMockWalletInfo = (address: string) => {
  return MOCK_WALLETS[address as keyof typeof MOCK_WALLETS] || null;
};

// Easy-to-copy test addresses
export const TEST_ADDRESSES = {
  ethereum: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7",
  bitcoin: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  solana: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
};
```

#### Step 2: Update `dashboard.vue` to Use Mock Data

Replace your `dummyTokens` section with:

```typescript
import {
  MOCK_ENABLED,
  getMockBalances,
  TEST_ADDRESSES,
} from "~/mock/wallet-data";

// Use mock data when enabled
const loadMockData = () => {
  const ethTokens = getMockBalances(TEST_ADDRESSES.ethereum);
  const btcTokens = getMockBalances(TEST_ADDRESSES.bitcoin);
  const solTokens = getMockBalances(TEST_ADDRESSES.solana);

  const allTokens = [...ethTokens, ...btcTokens, ...solTokens];

  dummyTokens.value = allTokens.map((token, i) => ({
    id: `${i + 1}`,
    symbol: token.symbol,
    name: token.name,
    balance: token.balance,
    price: token.price,
    avg_purchase_price: token.price * 0.85, // Mock purchase price (15% gain)
    usd_value: token.usd_value,
    change_24h: token.change_24h,
    change_24h_value: token.change_24h_value,
  }));
};

onMounted(async () => {
  loading.value = true;
  user.value = await getUser();

  if (MOCK_ENABLED) {
    // Use mock data for development
    loadMockData();
  } else if (user.value) {
    // Fetch real data
    await refreshPortfolio(user.value.id);
  }

  loading.value = false;
});
```

#### Step 3: Test with Mock Addresses

You can now "connect" these addresses:

**Ethereum (has ETH, USDT, USDC, UNI, LINK):**

```
0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7
```

**Bitcoin (has BTC):**

```
bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
```

**Solana (has SOL, USDC):**

```
7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU
```

---

## 🧪 Method 2: Use Test Networks (Testnets)

Test networks are real blockchains but use fake crypto with zero value - **perfect for realistic testing!**

### Ethereum Sepolia Testnet

#### Step 1: Configure MetaMask for Testnet

1. **Open MetaMask extension**
2. **Click network dropdown** (top left, currently shows "Ethereum Mainnet")
3. Click **"Show test networks"** toggle
4. Select **"Sepolia Test Network"**

Your address is the same, but now you're on the test network!

#### Step 2: Get Free Test ETH

Visit these faucets (you can use multiple per day):

**Option 1: Alchemy Faucet** (Easiest)

- Visit: [https://sepoliafaucet.com/](https://sepoliafaucet.com/)
- Paste your MetaMask address
- Click "Send Me ETH"
- Receive: 0.5 test ETH

**Option 2: Infura Faucet**

- Visit: [https://www.infura.io/faucet/sepolia](https://www.infura.io/faucet/sepolia)
- Receive: 0.5 test ETH/day

**Option 3: QuickNode Faucet**

- Visit: [https://faucet.quicknode.com/ethereum/sepolia](https://faucet.quicknode.com/ethereum/sepolia)
- Receive: 0.1 test ETH

#### Step 3: Get Test ERC-20 Tokens (Optional)

**Add test USDT to MetaMask:**

1. Open MetaMask
2. Click "Import tokens"
3. Paste contract address: `0x7169D38820dfd117C3FA1f22a697dBA58d90BA06`
4. It will show "Test USDT"
5. Visit a token faucet or deploy your own

#### Step 4: Update App to Use Testnet

```typescript
// app/composables/useWallet.ts
export const useWallet = () => {
  // Toggle between mainnet and testnet
  const USE_TESTNET = import.meta.env.DEV; // Testnet in dev, mainnet in production

  const getEthBalance = async (walletAddress: string): Promise<number> => {
    const rpcUrl = USE_TESTNET
      ? "https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_KEY"
      : "https://eth-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY";

    // ... rest of your code
  };
};
```

### Bitcoin Testnet

#### Step 1: Get Testnet Wallet

**Option A: Electrum (Desktop Wallet)**

1. Download [Electrum](https://electrum.org/)
2. Create wallet → Select "Testnet" mode
3. Get your testnet address (starts with `tb1` or `m`)

**Option B: Use Online Wallet**

- [Bitcoin Testnet Wallet](https://testnet.blockchain.com/)

**Example testnet address:**

```
tb1qw508d6qejxtdg4y5r3zarvary0c5xw7kxpjzsx
```

#### Step 2: Get Free Test BTC

**Bitcoin Testnet Faucets:**

- [Testnet Faucet](https://testnet-faucet.com/btc-testnet/) - 0.01 test BTC
- [Coinfaucet](https://coinfaucet.eu/en/btc-testnet/) - 0.001 test BTC
- [Bitcoin Testnet Sandbox](https://bitcoinfaucet.uo1.net/) - 0.001 test BTC

Paste your testnet address and get free test BTC!

---

## 💰 Method 3: Real Wallets with Small Amounts

For final testing before production launch.

### Step 1: Create Real Wallet

**Using MetaMask:**

1. Install MetaMask
2. Create new wallet
3. **CRITICAL: Save your 12-word seed phrase** (write it down, store safely)
4. Never share your seed phrase with anyone!

### Step 2: Buy Small Amount of Real Crypto

**Where to buy (beginner-friendly):**

- **Coinbase** - $10 minimum, easy interface
- **Binance** - $15 minimum, more features
- **Crypto.com** - $1 minimum, credit card friendly

**What to buy for testing:**

```
$20 worth of ETH → Covers gas fees + testing
$10 worth of USDT → Stablecoin testing
$10 worth of another token (UNI, LINK) → Multi-token portfolio
――――――――――――――――――――――――――――――――――――――――――
Total: $40 → Complete testing setup
```

### Step 3: Send to Your Wallet

1. **Copy your MetaMask address** (starts with 0x...)
2. **Withdraw from exchange** to your address
3. **Wait 1-5 minutes** for confirmation
4. **Check MetaMask** - you'll see your tokens!

### Step 4: Test Your App

Now you can connect your real wallet with real balances!

---

## 🎯 Comparison Table

| Method           | Time to Setup | Cost    | Realism | Best For               |
| ---------------- | ------------- | ------- | ------- | ---------------------- |
| **Mock Data**    | 5 minutes     | Free    | Low     | Initial UI development |
| **Testnets**     | 10 minutes    | Free    | High    | Feature testing        |
| **Real (Small)** | 1 hour        | $40-100 | 100%    | Production validation  |

---

## 📝 Quick Start Guide (Choose One)

### 🚀 Fastest: Mock Data (Start Here!)

**Time: 5 minutes**

1. Copy the `wallet-data.ts` code above
2. Create file: `app/mock/wallet-data.ts`
3. Update `dashboard.vue` to import and use it
4. Restart dev server
5. ✅ See dummy portfolio immediately!

**Test addresses to use:**

```
Ethereum: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7
Bitcoin: bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
Solana: 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU
```

### 🧪 Most Realistic: Testnets

**Time: 10 minutes**

1. Open MetaMask → Enable "Show test networks"
2. Switch to "Sepolia Test Network"
3. Visit [sepoliafaucet.com](https://sepoliafaucet.com/)
4. Paste your address → Get free test ETH
5. ✅ Connect to your app with real testnet balance!

### 💎 Production-Ready: Real Crypto

**Time: 1 hour | Cost: $40-100**

1. Install MetaMask → Create wallet → Save seed phrase
2. Buy crypto on Coinbase/Binance
3. Withdraw to your MetaMask address
4. Wait for confirmation
5. ✅ Connect to your app with real balance!

---

## ⚙️ Toggle Between Mock/Real Data

Add this to your app for easy switching:

```typescript
// app/config/development.ts
export const DEV_CONFIG = {
  useMockData: true, // Toggle this
  useTestnet: false, // Or use testnets
  useRealData: false, // Or use production data
};
```

```typescript
// In your dashboard/composables
import { DEV_CONFIG } from "~/config/development";

if (DEV_CONFIG.useMockData) {
  loadMockData();
} else if (DEV_CONFIG.useTestnet) {
  fetchTestnetData();
} else {
  fetchRealData();
}
```

---

## ✅ Recommended Development Flow

**Week 1-2: Mock Data**

- ✅ Build UI with instant feedback
- ✅ Test all features with controlled data
- ✅ No API rate limits

**Week 3: Testnets**

- ✅ Test real blockchain integration
- ✅ Verify API calls work correctly
- ✅ Test error handling

**Week 4: Real (Small Amounts)**

- ✅ Final validation before launch
- ✅ Test with real prices
- ✅ Ensure production-ready

**Launch: Real Data Only**

- ✅ Disable all mock/testnet code
- ✅ Use production APIs
- ✅ Monitor with real user wallets

---

## 🎓 Summary

**Need to test NOW?** → Use **Mock Data** (5 minutes, free)  
**Need realistic testing?** → Use **Testnets** (10 minutes, free)  
**Ready for production?** → Use **Real Crypto** (1 hour, $40-100)

All methods work great - choose based on your current development stage!

Copy the mock data code above to get started in 5 minutes! 🚀
