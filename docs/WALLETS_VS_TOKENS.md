# Creating Dummy/Test Wallets for Development

## 🎯 Quick Answer

You have **3 options** to test your app:

1. ✅ **Use Mock Data** - Hardcode fake balances (fastest for development)
2. ✅ **Use Testnet Wallets** - Real blockchain testing with fake crypto (most realistic)
3. ✅ **Use Real Addresses with Small Amounts** - Test with actual crypto (production-ready)

---

## 🚀 Method 1: Mock Data (RECOMMENDED for Development)

### Option A: Add Mock Mode to Your App

Create a development mode that returns fake data instead of calling APIs.

#### Step 1: Create Mock Data File

```typescript
// app/mock/wallet-data.ts
export const MOCK_WALLETS = [
  {
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7",
    chain: "ethereum",
    label: "Main Wallet (Mock)",
    tokens: [
      {
        symbol: "ETH",
        name: "Ethereum",
        balance: 2.5432,
        price: 2645.32,
        usd_value: 6728.54,
        change_24h: 3.2,
      },
      {
        symbol: "USDT",
        name: "Tether",
        balance: 5000.0,
        price: 1.0,
        usd_value: 5000.0,
        change_24h: 0.01,
      },
      {
        symbol: "USDC",
        name: "USD Coin",
        balance: 2500.0,
        price: 1.0,
        usd_value: 2500.0,
        change_24h: -0.02,
      },
      {
        symbol: "UNI",
        name: "Uniswap",
        balance: 125.5,
        price: 8.45,
        usd_value: 1060.48,
        change_24h: 5.8,
      },
      {
        symbol: "LINK",
        name: "Chainlink",
        balance: 450.0,
        price: 12.34,
        usd_value: 5553.0,
        change_24h: -2.1,
      },
    ],
  },
  {
    address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    chain: "bitcoin",
    label: "Bitcoin Wallet (Mock)",
    tokens: [
      {
        symbol: "BTC",
        name: "Bitcoin",
        balance: 0.2534,
        price: 67234.56,
        usd_value: 17037.68,
        change_24h: 2.4,
      },
    ],
  },
  {
    address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    chain: "solana",
    label: "Solana Wallet (Mock)",
    tokens: [
      {
        symbol: "SOL",
        name: "Solana",
        balance: 156.78,
        price: 158.42,
        usd_value: 24841.28,
        change_24h: 6.7,
      },
      {
        symbol: "USDC",
        name: "USD Coin (Solana)",
        balance: 1000.0,
        price: 1.0,
        usd_value: 1000.0,
        change_24h: 0.0,
      },
    ],
  },
];

export const getMockWalletBalances = (address: string, chain: string) => {
  const wallet = MOCK_WALLETS.find(
    (w) => w.address === address && w.chain === chain
  );
  return wallet?.tokens || [];
};
```

#### Step 2: Update `usePortfolio.ts` to Use Mock Data

```typescript
// app/composables/usePortfolio.ts
import { MOCK_WALLETS, getMockWalletBalances } from "~/mock/wallet-data";

export const usePortfolio = () => {
  const USE_MOCK_DATA = true; // Toggle this for development

  const fetchWalletBalances = async (address: string, chain: string) => {
    if (USE_MOCK_DATA) {
      // Return mock data
      return getMockWalletBalances(address, chain);
    }

    // Real API calls (your existing code)
    // ...
  };

  return {
    // ... your existing code
  };
};
```

#### Step 3: Test with Mock Addresses

In your dashboard or add-wallet page, use these addresses:

**Ethereum:**

```
0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7
```

**Bitcoin:**

```
bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
```

**Solana:**

```
7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU
```

---

## 🧪 Method 2: Use Test Networks (Testnets)

Test networks are real blockchains but use fake crypto with zero value.

### Ethereum Sepolia Testnet

#### Step 1: Configure MetaMask for Testnet

1. Open MetaMask
2. Click network dropdown (top)
3. Enable "Show test networks"
4. Switch to **Sepolia Test Network**

#### Step 2: Get Free Test ETH

Visit a faucet to get free test ETH:

**Sepolia Faucets:**

- [Alchemy Sepolia Faucet](https://sepoliafaucet.com/) - 0.5 test ETH/day
- [Infura Sepolia Faucet](https://www.infura.io/faucet/sepolia) - 0.5 test ETH/day
- [QuickNode Faucet](https://faucet.quicknode.com/ethereum/sepolia) - 0.1 test ETH

**How to use:**

1. Copy your MetaMask address
2. Paste into faucet website
3. Click "Send me test ETH"
4. Wait 30-60 seconds
5. Check MetaMask - you'll have test ETH!

#### Step 3: Get Test ERC-20 Tokens

**Option A: Use existing test token contracts**

Add these to MetaMask (Import Tokens):

```
Test USDT on Sepolia:
0x7169D38820dfd117C3FA1f22a697dBA58d90BA06

Test USDC on Sepolia:
0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8
```

**Option B: Mint your own test tokens**

Use [OpenZeppelin Contracts Wizard](https://wizard.openzeppelin.com/) to create and deploy test tokens.

#### Step 4: Update Your App to Support Testnets

```typescript
// app/composables/useWallet.ts
export const useWallet = () => {
  const IS_TESTNET = true; // Toggle for development

  const getEthBalance = async (walletAddress: string): Promise<number> => {
    try {
      const rpcUrl = IS_TESTNET
        ? "https://sepolia.infura.io/v3/YOUR_INFURA_KEY"
        : "https://mainnet.infura.io/v3/YOUR_INFURA_KEY";

      // Fetch balance using testnet RPC
      const provider = new JsonRpcProvider(rpcUrl);
      const balance = await provider.getBalance(walletAddress);
      return Number(balance) / 1e18;
    } catch (err) {
      console.error("Error fetching balance:", err);
      return 0;
    }
  };
};
```

### Bitcoin Testnet

#### Step 1: Get Testnet Address

**Option A: Use Testnet Wallet**

- [Electrum Testnet](https://electrum.org/) - Desktop wallet with testnet mode
- [Bitcoin Testnet Wallet](https://testnet.blockchain.com/)

**Option B: Generate Address Manually**

Your MetaMask address won't work for Bitcoin - you need a Bitcoin-specific address.

**Example Testnet Addresses:**

```
tb1qw508d6qejxtdg4y5r3zarvary0c5xw7kxpjzsx
mkHS9ne12qx9pS9VojpwU5xtRd4T7X7ZUt
```

#### Step 2: Get Free Test BTC

**Bitcoin Testnet Faucets:**

- [Testnet Faucet](https://testnet-faucet.com/btc-testnet/)
- [Coinfaucet](https://coinfaucet.eu/en/btc-testnet/)
- [Bitcoin Testnet Sandbox](https://bitcoinfaucet.uo1.net/)

**Gives:** 0.001 - 0.01 test BTC (no real value)

#### Step 3: Update App for Bitcoin Testnet

```typescript
const getBtcBalance = async (btcAddress: string): Promise<number> => {
  const IS_TESTNET = true;
  const apiUrl = IS_TESTNET
    ? `https://api.blockcypher.com/v1/btc/test3/addrs/${btcAddress}/balance`
    : `https://api.blockcypher.com/v1/btc/main/addrs/${btcAddress}/balance`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return (data.balance || 0) / 1e8;
  } catch (err) {
    console.error("Error fetching BTC balance:", err);
    return 0;
  }
};
```

---

## 💰 Method 3: Use Real Addresses (Small Amounts)

For final testing before production, use real wallets with small amounts.

### Step 1: Create Real Wallet

1. Install MetaMask
2. Create new wallet
3. **SAVE SEED PHRASE** (never share it!)
4. Copy your address

### Step 2: Buy Small Amount of Crypto

**Where to buy:**

- Coinbase - $10 minimum
- Binance - $15 minimum
- Crypto.com - $1 minimum

**What to buy for testing:**

- $20-50 worth of ETH
- $10 worth of USDT/USDC
- $5-10 worth of other tokens

### Step 3: Test Your App

Use your real address in the app to fetch real balances!

**Example:**

```
Your real address: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7
Contains:
  - 0.0075 ETH ($20)
  - 10 USDT ($10)
  - 5 UNI ($40)
Total: $70
```

---

## 🎯 Recommended Approach for Each Stage

### During Initial Development

✅ **Use Method 1 (Mock Data)**

- Fastest iteration
- No API limits
- Complete control over test data
- Toggle with `USE_MOCK_DATA = true`

### During Feature Testing

✅ **Use Method 2 (Testnets)**

- Test real blockchain interactions
- Free test tokens
- Realistic but safe
- Good for testing edge cases

### Before Production Launch

✅ **Use Method 3 (Real + Small Amounts)**

- Final validation
- Test with actual prices
- Verify API integrations
- Use $50-100 total for complete testing

---

## 📝 Quick Start: Add Mock Data Now

Here's a complete example to add to your project right now:

### 1. Create Mock Data File

Create: `app/mock/wallet-data.ts`

```typescript
export const MOCK_ENABLED = true; // Set to false for production

export const MOCK_WALLETS = {
  // Ethereum wallet
  "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7": {
    chain: "ethereum",
    tokens: [
      {
        symbol: "ETH",
        balance: 2.5,
        price: 2650,
        usd_value: 6625,
        change_24h: 3.2,
      },
      {
        symbol: "USDT",
        balance: 5000,
        price: 1,
        usd_value: 5000,
        change_24h: 0,
      },
      {
        symbol: "USDC",
        balance: 2500,
        price: 1,
        usd_value: 2500,
        change_24h: 0,
      },
      {
        symbol: "UNI",
        balance: 125,
        price: 8.5,
        usd_value: 1062.5,
        change_24h: 5,
      },
    ],
  },
  // Bitcoin wallet
  bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh: {
    chain: "bitcoin",
    tokens: [
      {
        symbol: "BTC",
        balance: 0.25,
        price: 67000,
        usd_value: 16750,
        change_24h: 2.1,
      },
    ],
  },
};

export const getMockBalances = (address: string) => {
  return MOCK_WALLETS[address as keyof typeof MOCK_WALLETS]?.tokens || [];
};
```

### 2. Use in Dashboard

Update `dashboard.vue`:

```typescript
import { MOCK_ENABLED, getMockBalances } from "~/mock/wallet-data";

const loadPortfolio = async () => {
  if (MOCK_ENABLED) {
    // Use mock data
    const mockAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7";
    dummyTokens.value = getMockBalances(mockAddress).map((token, i) => ({
      id: `${i + 1}`,
      symbol: token.symbol,
      name: token.symbol,
      balance: token.balance,
      price: token.price,
      usd_value: token.usd_value,
      change_24h: token.change_24h,
      change_24h_value: (token.usd_value * token.change_24h) / 100,
    }));
  } else {
    // Fetch real data
    // ... your existing code
  }
};
```

### 3. Toggle for Production

When deploying:

```typescript
export const MOCK_ENABLED = import.meta.env.DEV; // Only in development
```

---

## 🎓 Summary

| Method       | Speed          | Realism     | Cost    | Best For         |
| ------------ | -------------- | ----------- | ------- | ---------------- |
| Mock Data    | ⚡⚡⚡ Instant | 🔵 Low      | Free    | Initial dev      |
| Testnets     | ⚡⚡ Fast      | 🔵🔵 Medium | Free    | Feature testing  |
| Real (Small) | ⚡ Slow        | 🔵🔵🔵 High | $50-100 | Final validation |

**Recommended Flow:**

1. Start with **Mock Data** (get UI working fast)
2. Move to **Testnets** (test blockchain integration)
3. Finish with **Real Wallets** (final production validation)

---

## ✅ Next Steps

1. **Copy mock data code above** into your project
2. **Set `MOCK_ENABLED = true`** in dashboard
3. **Use test addresses** to see data immediately
4. **Toggle to testnets** when ready for real blockchain testing
5. **Use real wallets** only before production launch

You now have everything you need to test your crypto portfolio tracker without spending money! 🎉

## 🤔 Common Confusion Explained

### The Question:

> "Which wallet address are we linking? Why is Ethereum in manual adding and not wallets? Why is actual crypto there - does it have an address too?"

Let me break this down clearly!

---

## 🏦 **1. Wallet Addresses (What You Add)**

### What is a Wallet Address?

A **wallet address** is like your **bank account number** for crypto. It's a long string that identifies where your crypto is stored on the blockchain.

**Examples:**

- Ethereum address: `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7`
- Bitcoin address: `bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh`
- Solana address: `7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU`

### What Wallets Hold These Addresses?

- **MetaMask** - Ethereum address
- **Trust Wallet** - Can have Ethereum, Bitcoin, Solana, etc.
- **Phantom Wallet** - Solana address
- **Ledger/Trezor** - Hardware wallets with multiple addresses

### When You "Connect MetaMask":

```
MetaMask stores: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7
                  ↓
Your app saves this address
                  ↓
Your app uses this to check: "What crypto is in this address?"
```

---

## ⛓️ **2. Blockchains (The Network)**

### What is a Blockchain?

A **blockchain** is the **network** where crypto lives. Think of it as different countries with different currencies.

**Major Blockchains:**

1. **Ethereum** - Network for ETH and ERC-20 tokens
2. **Bitcoin** - Network for BTC only
3. **Solana** - Network for SOL and SPL tokens
4. **Binance Smart Chain** - Network for BNB and BEP-20 tokens
5. **Polygon** - Network for MATIC and tokens

### Why Does "Chain" Matter?

Each blockchain has its own address format:

```
Ethereum addresses: Start with 0x (42 characters)
Bitcoin addresses:  Start with 1, 3, or bc1
Solana addresses:   Base58 encoded (32-44 characters)
```

**You can't use an Ethereum address on Bitcoin!**

---

## 🪙 **3. Tokens/Coins (The Actual Crypto)**

### What Are Tokens?

**Tokens** are the actual cryptocurrencies stored in your wallet address.

**One Ethereum address can hold:**

- ETH (Ethereum's native coin)
- USDT (Tether - ERC-20 token)
- USDC (USD Coin - ERC-20 token)
- UNI (Uniswap - ERC-20 token)
- LINK (Chainlink - ERC-20 token)
- ... hundreds of other ERC-20 tokens

**One Bitcoin address can hold:**

- BTC only (Bitcoin doesn't have tokens like Ethereum)

**One Solana address can hold:**

- SOL (Solana's native coin)
- USDC (SPL token)
- RAY (Raydium - SPL token)
- ... many SPL tokens

---

## 🎯 **How Your App Works**

### Step 1: User Adds Wallet Address

**Option A: Connect MetaMask**

```
User clicks "Connect MetaMask"
  ↓
MetaMask provides: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7
  ↓
Your app saves:
  - address: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7
  - chain: "ethereum"
```

**Option B: Manual Entry**

```
User chooses: "Ethereum"
User types: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7
  ↓
Your app saves:
  - address: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7
  - chain: "ethereum"
```

### Step 2: Fetch Tokens in That Address

```
Your app queries Ethereum blockchain:
"What tokens are in 0x742d35Cc...?"
  ↓
Blockchain returns:
  - 2.5 ETH
  - 1,000 USDT
  - 500 USDC
  - 10 UNI
```

### Step 3: Get Prices

```
Your app queries CoinGecko:
"What's the USD price of ETH, USDT, USDC, UNI?"
  ↓
Returns:
  - ETH: $2,500
  - USDT: $1.00
  - USDC: $1.00
  - UNI: $8.50
```

### Step 4: Calculate Total

```
2.5 ETH × $2,500 = $6,250
1,000 USDT × $1.00 = $1,000
500 USDC × $1.00 = $500
10 UNI × $8.50 = $85
―――――――――――――――――――――――
Total = $7,835
```

---

## 📊 **Database Structure**

### Wallets Table (Stores Addresses)

```sql
CREATE TABLE wallets (
  id: uuid
  user_id: uuid  -- Who owns this
  address: text  -- "0x742d35Cc..."
  chain: text    -- "ethereum" or "bitcoin"
  label: text    -- "My MetaMask" (optional)
)
```

**Example rows:**
| id | user_id | address | chain | label |
|----|---------|---------|-------|-------|
| 1 | user123 | 0x742d35... | ethereum | MetaMask Wallet |
| 2 | user123 | bc1qxy2k... | bitcoin | Hardware Wallet |
| 3 | user123 | 7xKXtg2... | solana | Phantom Wallet |

### Tokens Table (Stores Balances)

```sql
CREATE TABLE tokens (
  id: uuid
  wallet_id: uuid  -- Which wallet
  symbol: text     -- "ETH", "USDT", "BTC"
  balance: numeric -- 2.5
  usd_value: numeric -- $6,250
)
```

**Example rows:**
| id | wallet_id | symbol | balance | usd_value |
|----|-----------|--------|---------|-----------|
| 1 | wallet1 | ETH | 2.5 | $6,250 |
| 2 | wallet1 | USDT | 1,000 | $1,000 |
| 3 | wallet2 | BTC | 0.15 | $6,000 |
| 4 | wallet3 | SOL | 50 | $2,500 |

---

## 🔄 **Full Flow Diagram**

```
┌─────────────────────────────────────────────────────────┐
│ USER HAS MULTIPLE WALLETS                               │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  MetaMask Wallet                                       │
│  Address: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7  │
│  Blockchain: Ethereum                                   │
│  Contains:                                              │
│    - 2.5 ETH                                           │
│    - 1,000 USDT                                        │
│    - 500 USDC                                          │
│                                                         │
│  Ledger Wallet (Bitcoin)                               │
│  Address: bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh  │
│  Blockchain: Bitcoin                                    │
│  Contains:                                              │
│    - 0.15 BTC                                          │
│                                                         │
│  Phantom Wallet                                         │
│  Address: 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU │
│  Blockchain: Solana                                     │
│  Contains:                                              │
│    - 50 SOL                                            │
│    - 100 USDC (Solana version)                         │
│                                                         │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│ USER CONNECTS TO YOUR APP                               │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Step 1: Add MetaMask (auto-connects)                  │
│    Saves: 0x742d35... → ethereum                       │
│                                                         │
│  Step 2: Add Bitcoin (manual entry)                    │
│    Saves: bc1qxy2k... → bitcoin                        │
│                                                         │
│  Step 3: Add Solana (manual entry)                     │
│    Saves: 7xKXtg2... → solana                          │
│                                                         │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│ YOUR APP FETCHES BALANCES                               │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Ethereum Address → Alchemy API                        │
│    Returns: ETH, USDT, USDC balances                   │
│                                                         │
│  Bitcoin Address → Blockchain.info API                 │
│    Returns: BTC balance                                 │
│                                                         │
│  Solana Address → Solana RPC                           │
│    Returns: SOL, USDC balances                         │
│                                                         │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│ YOUR APP GETS PRICES                                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  CoinGecko API:                                        │
│    ETH = $2,500                                        │
│    BTC = $40,000                                       │
│    SOL = $50                                           │
│    USDT = $1                                           │
│    USDC = $1                                           │
│                                                         │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│ DASHBOARD SHOWS                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Total Portfolio: $16,335                              │
│                                                         │
│  Assets:                                                │
│  ┌────────────────────────────────────────┐           │
│  │ ETH     2.5      $6,250     38.2%     │           │
│  │ BTC     0.15     $6,000     36.7%     │           │
│  │ SOL     50       $2,500     15.3%     │           │
│  │ USDT    1,000    $1,000     6.1%      │           │
│  │ USDC    600      $600       3.7%      │           │
│  └────────────────────────────────────────┘           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🎓 **Your Add Wallet Page Explained**

### Current Code:

```vue
<select v-model="chain">
  <option value="ethereum">Ethereum</option>
  <option value="bitcoin">Bitcoin</option>
</select>
```

### What "Ethereum" Means Here:

**NOT** "Add ETH token"  
**YES** "This address is on the Ethereum blockchain"

### What Happens:

```javascript
// User selects "Ethereum" and enters: 0x742d35...
// Saves to database:
{
  address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7",
  chain: "ethereum"  // ← This is the BLOCKCHAIN, not the token
}

// Then your app queries:
"Give me ALL tokens in this Ethereum address"

// Returns:
- ETH (balance: 2.5)
- USDT (balance: 1,000)
- USDC (balance: 500)
- Any other ERC-20 tokens
```

---

## ✅ **Corrected Understanding**

### ❌ WRONG Thinking:

"I'm adding Ethereum (the cryptocurrency) to my app"

### ✅ CORRECT Thinking:

"I'm adding my Ethereum wallet address to my app, which contains ETH and other tokens"

---

## 🔍 **Real-World Analogy**

### Your Bank Account

```
Bank Account Number: 1234-5678-9012
Currency: USD
Balance: $5,000
```

### Your Crypto Wallet

```
Wallet Address: 0x742d35Cc...
Blockchain: Ethereum
Tokens:
  - 2.5 ETH ($6,250)
  - 1,000 USDT ($1,000)
  - 500 USDC ($500)
Total: $7,750
```

**The address is like the account number**  
**The blockchain is like the bank**  
**The tokens are like the money inside**

---

## 🎯 **Summary**

### What You're Adding:

✅ **Wallet Addresses** (like: 0x742d35Cc...)  
✅ **Blockchain Type** (Ethereum, Bitcoin, Solana)

### What You're NOT Adding:

❌ Individual tokens (ETH, USDT, etc.)

### What Happens Automatically:

✅ App fetches ALL tokens in that address  
✅ App gets prices for those tokens  
✅ App calculates total value

### The Flow:

1. User adds address + blockchain
2. App fetches tokens in that address
3. App displays all tokens found
4. User sees complete portfolio

---

## 💡 **Why This Design?**

**One address = Multiple tokens**

If you added tokens one by one:

- User adds ETH ❌
- User adds USDT ❌
- User adds USDC ❌
- Tedious! 😫

**Better approach (your app):**

- User adds Ethereum address once ✅
- App automatically finds ALL tokens ✅
- Easy! 🎉

---

## 🚀 **Next: Adding More Chains**

You can expand to:

```vue
<select v-model="chain">
  <option value="ethereum">Ethereum (ETH, USDT, USDC, etc.)</option>
  <option value="bitcoin">Bitcoin (BTC only)</option>
  <option value="solana">Solana (SOL, SPL tokens)</option>
  <option value="bsc">Binance Smart Chain (BNB, BEP-20)</option>
  <option value="polygon">Polygon (MATIC, tokens)</option>
</select>
```

Each chain requires different APIs to fetch balances!

---

**Does this clear up the confusion?**

The key insight:

- **Address** = Container
- **Blockchain** = Which network
- **Tokens** = What's inside (fetched automatically)
