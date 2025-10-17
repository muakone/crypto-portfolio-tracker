# 🪙 Crypto Portfolio Tracker

A responsive web app built with **Nuxt 3**, **Supabase**, and **CoinGecko API** that lets users track all their cryptocurrencies in one dashboard — inspired by [CoinStats](https://coinstats.app/portfolio/).

![Nuxt 3](https://img.shields.io/badge/Nuxt-3-00DC82?logo=nuxt.js)
![Vue 3](https://img.shields.io/badge/Vue-3-4FC08D?logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css)

---

## 🚀 Features

- 🔐 **Supabase Authentication** - Secure login/signup
- 💼 **Multi-Wallet Support** - Connect MetaMask or add wallets manually
- 🪙 **Real-Time Prices** - Live crypto prices from CoinGecko API
- 📊 **Portfolio Analytics** - Total value, distribution charts, and token breakdown
- 🌑 **Dark Theme** - Beautiful CoinStats-inspired glassmorphism UI
- ☁️ **Easy Deployment** - Ready for Vercel deployment

---

## 🛠️ Tech Stack

| Layer       | Technology     | Purpose                 |
| ----------- | -------------- | ----------------------- |
| Frontend    | Nuxt 3 (Vue 3) | UI & routing            |
| Backend     | Supabase       | Auth & database         |
| Wallets     | ethers.js      | MetaMask integration    |
| Market Data | CoinGecko API  | Real-time prices        |
| Charts      | Chart.js       | Portfolio visualization |
| Styling     | TailwindCSS v4 | Modern UI               |
| Hosting     | Vercel         | Deployment              |

---

## 📋 Prerequisites

- **Node.js** 18+ and **pnpm** (or npm)
- **Supabase** account ([supabase.com](https://supabase.com))
- **MetaMask** browser extension (optional, for wallet connection)

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
# Clone the repository
git clone <your-repo-url>
cd crypto-portfolio-tracker

# Install dependencies
pnpm install
```

### 2. Setup Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **Settings** → **API** and copy your:

   - Project URL
   - Anon/Public Key

3. Run this SQL in the Supabase SQL Editor to create tables:

```sql
-- Users table (auto-created by Supabase Auth)

-- Wallets table
create table wallets (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  address text not null,
  chain text default 'ethereum',
  created_at timestamp default now()
);

-- Tokens table
create table tokens (
  id uuid primary key default uuid_generate_v4(),
  wallet_id uuid references wallets(id) on delete cascade,
  symbol text not null,
  balance numeric not null,
  usd_value numeric not null,
  last_updated timestamp default now()
);

-- Enable Row Level Security
alter table wallets enable row level security;
alter table tokens enable row level security;

-- Policies for wallets
create policy "Users can view their own wallets"
  on wallets for select
  using (auth.uid() = user_id);

create policy "Users can insert their own wallets"
  on wallets for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own wallets"
  on wallets for delete
  using (auth.uid() = user_id);

-- Policies for tokens
create policy "Users can view their own tokens"
  on tokens for select
  using (wallet_id in (
    select id from wallets where user_id = auth.uid()
  ));

create policy "Users can insert their own tokens"
  on tokens for insert
  with check (wallet_id in (
    select id from wallets where user_id = auth.uid()
  ));

create policy "Users can update their own tokens"
  on tokens for update
  using (wallet_id in (
    select id from wallets where user_id = auth.uid()
  ));
```

### 3. Environment Variables

Create a `.env` file in the project root:

```bash
NUXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NUXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
crypto-portfolio-tracker/
├── app/
│   ├── app.vue              # Root component with Navbar
│   └── assets/
│       └── css/
│           └── main.css     # Global styles with dark theme
├── pages/
│   ├── index.vue            # Landing page
│   ├── login.vue            # Authentication
│   ├── dashboard.vue        # Portfolio dashboard
│   └── add-wallet.vue       # Add/connect wallets
├── components/
│   ├── Navbar.vue           # Navigation bar
│   ├── PortfolioSummary.vue # Total value card
│   ├── TokenTable.vue       # Token list table
│   └── PortfolioChart.vue   # Distribution chart
├── composables/
│   ├── useSupabase.ts       # Auth & DB functions
│   ├── useWallet.ts         # MetaMask integration
│   ├── usePrices.ts         # CoinGecko API
│   └── usePortfolio.ts      # Portfolio calculations
└── docs/                    # Project documentation
```

---

## 🎨 UI Design

The app uses a **CoinStats-inspired dark theme** with:

- Gradient backgrounds (`bg-gradient-to-b from-gray-900 to-black`)
- **Glassmorphism** cards with backdrop blur
- Purple/indigo gradient buttons
- Smooth transitions and hover effects

### Custom CSS Classes

```css
.glass-card        /* Glassmorphism effect */
/* Glassmorphism effect */
.gradient-text; /* Purple gradient text */
```

---

## 🔧 Usage Guide

### 1. Create Account

1. Click **Get Started** on homepage
2. Sign up with email/password
3. Verify your email (check inbox)

### 2. Add Wallets

- **Option A**: Click "Connect MetaMask" (requires MetaMask extension)
- **Option B**: Manually enter wallet address for Ethereum or Bitcoin

### 3. View Portfolio

- Dashboard shows total portfolio value
- Token table displays all assets with balances
- Pie chart shows distribution

### 4. Refresh Prices

- Click **🔄 Refresh** to update token prices from CoinGecko

---

## 🚀 Deployment (Vercel)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repo
3. Add environment variables:
   - `NUXT_PUBLIC_SUPABASE_URL`
   - `NUXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
4. Deploy! 🎉

---

## 📊 API Integration

### CoinGecko (Free Tier)

- **Endpoint**: `https://api.coingecko.com/api/v3/simple/price`
- **Rate Limit**: 10-50 calls/minute (free tier)
- No API key required

### Etherscan (Optional)

- Get balance for Ethereum addresses
- Requires API key (free at [etherscan.io](https://etherscan.io/apis))

### BlockCypher (Optional)

- Get balance for Bitcoin addresses
- **Endpoint**: `https://api.blockcypher.com/v1/btc/main/addrs/{address}/balance`

---

## 🧪 Testing Checklist

- [ ] Supabase auth works (signup/login)
- [ ] Wallets can be added and saved
- [ ] Prices fetch correctly from CoinGecko
- [ ] Portfolio total calculates properly
- [ ] Dashboard displays data cleanly
- [ ] MetaMask connection works (if installed)
- [ ] Responsive on mobile and desktop

---

## 🐛 Troubleshooting

### "Cannot find name 'process'" error

✅ Already fixed! Uses Nuxt runtime config instead.

### MetaMask not connecting

- Ensure MetaMask extension is installed
- Check browser console for errors
- Try refreshing the page

### Prices not loading

- Check CoinGecko API rate limits
- Verify network connection
- Open browser console to see API errors

### Supabase errors

- Verify `.env` file has correct credentials
- Check Supabase dashboard for table structure
- Ensure RLS policies are set correctly

---

## 📝 License

MIT License – Free for learning and portfolio use.

---

## 🤝 Contributing

Feel free to submit issues and pull requests!

---

## 📚 Learn More

- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [CoinGecko API](https://www.coingecko.com/en/api)
- [Ethers.js Documentation](https://docs.ethers.org/)

---

**Built with ❤️ using Nuxt 3, Supabase, and TailwindCSS**
