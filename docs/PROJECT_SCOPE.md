# Project Scope: Crypto Portfolio Tracker

## 🎯 Vision Statement

**A comprehensive crypto portfolio tracker that aggregates wallet balances across multiple blockchains, providing users with a unified view of their cryptocurrency holdings, real-time prices, and portfolio performance.**

---

## ✅ What This Project IS

### Core Purpose

A **read-only portfolio aggregator** that helps crypto investors:

- View all their crypto holdings in one place
- Track portfolio value and performance over time
- Monitor prices and 24H changes
- Analyze asset distribution
- Support multiple wallets across different blockchains

### Key Features

#### 1. **Wallet Connection & Management**

- Connect wallet addresses via:
  - ✅ MetaMask (browser extension)
  - 🚧 WalletConnect (Trust Wallet, Phantom, Rainbow, etc.)
  - ✅ Manual address entry (Ethereum, Bitcoin, Solana, etc.)
- Support multiple wallets per user
- Label wallets for organization ("Hardware Wallet", "Trading Wallet", etc.)

#### 2. **Portfolio Dashboard**

- Total portfolio value in USD
- 24H price changes and P/L
- Asset allocation pie chart
- Token list with:
  - Name, symbol, icon
  - Current price
  - Holdings amount
  - Total value
  - 24H price change
- Portfolio distribution visualization

#### 3. **Multi-Chain Support**

- Ethereum (ERC-20 tokens)
- Bitcoin
- Planned: Solana, Binance Smart Chain, Polygon, etc.

#### 4. **Price Tracking**

- Real-time token prices via CoinGecko/CoinMarketCap APIs
- Historical price data
- 24H/7D/30D price changes

#### 5. **Authentication**

- Email/password signup
- OAuth (Google, GitHub)
- Web3 wallet login (sign message with MetaMask)

#### tokens6. **Data Persistence**

- Save wallet addresses to database
- Store historical balance snapshots
- Track portfolio value over time

---

## ❌ What This Project is NOT

### Not a Wallet

- ❌ Does NOT store private keys
- ❌ Does NOT send/receive crypto
- ❌ Does NOT sign transactions
- ❌ Does NOT custody funds

### Not a Trading Platform

- ❌ No staking or DeFi integrations (initially)

### Not a Full DeFi Dashboard

- ❌ No complex DeFi position tracking (for v1)
- ❌ No NFT gallery (for v1)
- ❌ No yield farming analytics (for v1)

**Focus:** Simple, clean portfolio tracking first. Advanced features later.

---

## 🔐 Security Model

### Read-Only Access

- Only **reads** public blockchain data
- Never requests private keys or seed phrases
- Uses public wallet addresses only

### What Users Share

- ✅ Wallet addresses (public on blockchain anyway)
- ✅ Email (for account creation)
- ❌ Private keys (NEVER)
- ❌ Seed phrases (NEVER)

### Wallet Connection Methods

#### MetaMask Connection

1. User clicks "Connect MetaMask"
2. MetaMask prompts to connect
3. User approves connection
4. App receives wallet address
5. App fetches balances from blockchain APIs

**User retains full control** - they're just sharing their public address.

---

## 📊 Data Flow

```
┌──────────────┐
│   User       │
└──────┬───────┘
       │ 1. Connects wallet
       ▼
┌──────────────────┐
│  Your App        │
│  (Frontend)      │
└──────┬───────────┘
       │ 2. Saves address to DB
       ▼
┌──────────────────┐
│  Supabase DB     │
│  (wallets table) │
└──────────────────┘
       │ 3. Fetches balances
       ▼
┌──────────────────┐
│  Blockchain APIs │
│  (Alchemy, etc.) │
└──────┬───────────┘
       │ 4. Returns token balances
       ▼
┌──────────────────┐
│  Price APIs      │
│  (CoinGecko)     │
└──────┬───────────┘
       │ 5. Returns USD prices
       ▼
┌──────────────────┐
│  Dashboard       │
│  (Shows total)   │
└──────────────────┘
```

---

## 🎨 User Stories

### Primary User Persona

**Sarah - Crypto Investor**

- Owns crypto in 3+ wallets (MetaMask, Ledger, exchange)
- Wants to see total portfolio value
- Checks daily for price changes
- Needs organized view of holdings

### User Journey

1. **Sign Up**

   - Sarah creates account with email
   - OR signs in with Google
   - OR logs in with MetaMask

2. **Add First Wallet**

   - Clicks "Add Wallet"
   - Chooses "Connect MetaMask"
   - Approves connection
   - Wallet address saved

3. **View Dashboard**

   - Sees total portfolio worth: $45,234.56
   - Sees 24H change: +$1,234.23 (+2.8%)
   - Views asset breakdown:
     - 45% ETH ($20,355)
     - 30% BTC ($13,570)
     - 15% USDT ($6,785)
     - 10% Others ($4,524)

4. **Add More Wallets**

   - Adds Bitcoin address manually
   - Adds Solana wallet via manual entry
   - Labels each wallet ("Hardware", "Hot Wallet", etc.)

5. **Track Over Time**
   - Views historical portfolio chart
   - Sees 7-day performance
   - Compares to previous months

---

## 🚀 Feature Roadmap

### ✅ Phase 1: MVP (Current)

- [x] User authentication (email, OAuth)
- [x] MetaMask wallet connection
- [x] Manual wallet address entry
- [x] Basic dashboard with total value
- [x] Token list display
- [x] Portfolio distribution chart
- [x] 24H price changes

### 🚧 Phase 2: Enhanced Tracking

- [ ] Historical portfolio value chart
- [ ] Multiple wallet support per user
- [ ] Wallet labels/organization
- [ ] Auto-refresh balances
- [ ] More blockchain support (Solana, BSC, Polygon)
- [ ] Transaction history view

### 🔮 Phase 3: Advanced Features

- [ ] WalletConnect integration (Trust Wallet, Rainbow, etc.)
- [ ] Price alerts
- [ ] Export portfolio data (CSV, PDF)
- [ ] Portfolio sharing (public view link)
- [ ] Mobile responsive design improvements
- [ ] Dark/light theme toggle

### 💎 Phase 4: Premium Features

- [ ] DeFi position tracking (Uniswap LP, Aave deposits, etc.)
- [ ] NFT gallery
- [ ] Tax reporting tools
- [ ] Advanced analytics (ROI, cost basis, etc.)
- [ ] Multi-user accounts (family portfolio)

---

## 🛠️ Technical Stack

### Frontend

- **Nuxt 4** - Vue.js framework
- **Tailwind CSS** - Styling
- **Chart.js** - Data visualization
- **ethers.js / web3.js** - Ethereum interaction
- **viem** - Modern Ethereum library

### Backend

- **Supabase** - Database & Auth
- **Alchemy/Infura** - Ethereum RPC
- **CoinGecko API** - Price data
- **Blockchain.info API** - Bitcoin data

### Deployment

- **Vercel** - Hosting
- **Supabase Cloud** - Database

---

## 📏 Success Metrics

### User Engagement

- Daily active users
- Number of wallets connected per user
- Dashboard views per day
- Average session duration

### Technical Performance

- Balance fetch time < 2 seconds
- Dashboard load time < 1 second
- 99.9% uptime
- Real-time price updates

### Growth

- User signups per week
- Wallet connections per week
- Supported blockchain count
- Token coverage (# of tokens supported)

---

## 🎯 Core Value Proposition

**"See all your crypto in one place, with real-time prices and beautiful charts."**

### Why Users Choose This App

1. **Simplicity** - Easy wallet connection, clean UI
2. **Privacy** - Read-only, no keys required
3. **Multi-Chain** - All blockchains in one view
4. **Free** - No fees for basic tracking
5. **Secure** - Never touches user funds

---

## 🔒 What You'll Never Do

To maintain trust and security:

1. **Never request private keys or seed phrases**
2. **Never custody user funds**
3. **Never sign transactions without explicit user approval**
4. **Never sell user wallet data**
5. **Never make promises about investment returns**

Your app is a **passive observer** of public blockchain data, helping users understand their holdings.

---

## 🎓 Comparison to Similar Apps

### Like CoinStats / Blockfolio / Delta

- Portfolio tracking ✅
- Multi-wallet support ✅
- Price alerts ✅

### Unlike Crypto Wallets (MetaMask, Trust Wallet)

- NOT a wallet (doesn't hold keys) ✅
- Multi-chain aggregation ✅
- Historical tracking & analytics ✅

### Unlike Exchanges (Coinbase, Binance)

- No buying/selling ✅
- No custody ✅
- Tracks ALL wallets (not just exchange) ✅

---

## 📋 Summary

**Your Project = Portfolio Tracker, NOT a Wallet**

✅ Connects to existing wallets (MetaMask, etc.)  
✅ Reads balances from blockchain  
✅ Displays aggregated portfolio  
✅ Shows prices and changes  
✅ Tracks performance over time

❌ Does NOT hold crypto  
❌ Does NOT send/receive  
❌ Does NOT trade

**Think:** "Mint.com for Crypto" or "Personal Capital for Blockchain"

You're building a **dashboard** that gives users **visibility** into their crypto holdings, not a wallet or trading platform.

---

**Questions to ask yourself when adding features:**

1. Does this help users **understand** their portfolio?
2. Does this require **read-only** blockchain access?
3. Would this be useful for someone with **multiple wallets**?

If yes to all three → Good feature for your app! ✅
