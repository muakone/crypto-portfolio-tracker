# 🧠 Project Details

## Purpose
Allow users to view and analyze their crypto holdings (BTC, ETH, etc.) in one dashboard — total value, distribution, and history — just like CoinStats.

---

## APIs Used
| API | Purpose | Example Endpoint |
|------|----------|------------------|
| CoinGecko | Get token prices | `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd` |
| Etherscan | ETH balances | `https://api.etherscan.io/api?module=account&action=balance&address=<wallet>` |
| BlockCypher | BTC balances | `https://api.blockcypher.com/v1/btc/main/addrs/<wallet>/balance` |

---

## Supabase Schema
```sql
create table users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  created_at timestamp default now()
);

create table wallets (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  address text not null,
  chain text default 'ethereum',
  created_at timestamp default now()
);

create table tokens (
  id uuid primary key default uuid_generate_v4(),
  wallet_id uuid references wallets(id),
  symbol text,
  balance numeric,
  usd_value numeric,
  last_updated timestamp default now()
);
