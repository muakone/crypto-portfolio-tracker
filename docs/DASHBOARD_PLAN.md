# 📊 Dashboard Implementation Plan

## 🎯 Goal

Create a professional cryptocurrency portfolio dashboard following the reference UI structure while maintaining the blue/purple theme.

---

## 📐 Dashboard Layout Structure

### 1. **Left Sidebar Navigation** ✅ COMPLETED

- ✅ Logo and branding
- ✅ Navigation links (Dashboard, Analytics, Assets, NFTs, Transactions, DeFi, Swap, Settings)
- ✅ User profile section with logout
- ✅ Mobile responsive with hamburger menu

### 2. **Top Action Bar** ✅ COMPLETED

- ✅ Action buttons: Receive, Earn, Buy Crypto, Swap (primary CTA), Manage, Share
- ✅ Blue/purple theme applied

### 3. **Main Content Area** (IN PROGRESS)

#### A. Total Worth Section

**Status**: PARTIALLY COMPLETED

- ✅ Large display of total portfolio value
- ✅ 24H change indicator with arrow and percentage
- ✅ Time period selector (24H dropdown)
- ✅ Sync button with last updated time
- ⏳ **NEEDS**: Interactive line chart showing portfolio value over time
- ⏳ **NEEDS**: Real 24H change calculation from historical data

#### B. Assets Table

**Status**: PARTIALLY COMPLETED

- ✅ Table structure with columns: Name, Avg Price, Amount, Price, Total, 24H P/L
- ✅ Token icons with gradient backgrounds
- ✅ Color-coded profit/loss
- ✅ Three-dot menu for actions
- ✅ Empty state with CTA
- ⏳ **NEEDS**: Sortable columns functionality
- ⏳ **NEEDS**: Price and name fields need proper data (currently showing duplicate price)
- ⏳ **NEEDS**: 24H change data from API
- ⏳ **NEEDS**: Average purchase price tracking

---

## 🔧 Technical Implementation Tasks

### Phase 1: Data Structure Enhancement (PRIORITY)

**Goal**: Enhance token data model to support all table columns

1. **Update Types** (`shared/types.ts`)

   ```typescript
   export interface TokenRecord {
     id?: string;
     wallet_id?: string;
     name: string; // Full name (e.g., "Bitcoin")
     symbol: string; // Symbol (e.g., "BTC")
     balance: number; // Amount held
     price: number; // Current price
     avg_purchase_price?: number; // Average buy price
     usd_value: number; // Current value (balance × price)
     change_24h?: number; // 24h price change percentage
     change_24h_value?: number; // 24h change in USD
     last_updated?: string;
   }
   ```

2. **Update Supabase Schema**
   - Add `name` column to tokens table
   - Add `price` column to tokens table
   - Add `avg_purchase_price` column to tokens table
   - Add `change_24h` column to tokens table

### Phase 2: Enhanced Price Fetching

**Goal**: Get comprehensive price data including 24h changes

1. **Update `usePrices.ts`**

   - Fetch not just price, but also 24h change
   - Add historical price fetching for chart
   - CoinGecko API endpoint: `/simple/price?ids=...&vs_currencies=usd&include_24hr_change=true`

2. **Add Historical Data Fetching**
   - CoinGecko market chart API for portfolio value over time
   - Store/cache historical data for chart rendering

### Phase 3: Interactive Portfolio Chart

**Goal**: Replace static chart area with interactive line chart

1. **Create `PortfolioValueChart.vue` component**

   - Use Chart.js with line chart
   - Show portfolio value over selected time period (24H, 7D, 30D, ALL)
   - Gradient fill under line
   - Responsive and interactive tooltips
   - Blue/purple gradient theme

2. **Add Time Range Selector**
   - Buttons for: 24H, 7D, 30D, 3M, 1Y, ALL
   - Fetch appropriate historical data per selection
   - Smooth transitions between views

### Phase 4: Enhanced Token Display

**Goal**: Show complete token information

1. **Token Name Display**

   - Fetch full token names from CoinGecko
   - Show icon (emoji or actual logo)
   - Display: "Bitcoin • BTC" format

2. **Average Purchase Price**

   - Add manual entry option when adding wallet
   - Calculate weighted average for multiple purchases
   - Show profit/loss based on avg price vs current price

3. **Sortable Table Columns**
   - Click column headers to sort
   - Visual indicator for sort direction
   - Maintain sort state

### Phase 5: Real-time Updates & Sync

**Goal**: Live data updates without full page refresh

1. **Auto-refresh Mechanism**

   - Poll price data every 60 seconds
   - Show sync indicator animation
   - Update "Last Updated" timestamp

2. **Manual Sync Button**
   - Force immediate refresh
   - Show loading state on button
   - Update all token prices

### Phase 6: Additional Features

**Goal**: Extra functionality for better UX

1. **Search & Filter**

   - Search tokens by name/symbol
   - Filter by token type, chain, etc.
   - Show/hide small balances

2. **Token Actions Menu (3-dot)**

   - View transaction history
   - Remove from portfolio
   - Set price alerts
   - View on block explorer

3. **Portfolio Insights Sidebar** (Optional)
   - Top gainers/losers
   - Recent transactions
   - Portfolio suggestions
   - Risk metrics

---

## 🎨 Theme Consistency Checklist

- ✅ Primary gradient: Blue (#3b82f6) to Purple (#8b5cf6)
- ✅ Background: Black/dark with subtle grid pattern
- ✅ Cards: Glass morphism with border-white/10
- ✅ Text: White for primary, gray-400 for secondary
- ✅ Hover states: Blue accent borders
- ✅ Success/gain: Green-400
- ✅ Error/loss: Red-400
- ✅ Shadows: Blue/purple glows on primary actions

---

## 📋 Immediate Next Steps

### Step 1: Update Token Data Model ⏳

1. Update `shared/types.ts` with enhanced TokenRecord
2. Update database schema in Supabase
3. Update `usePortfolio.ts` to handle new fields

### Step 2: Enhance Price Fetching ⏳

1. Update `usePrices.ts` to fetch 24h change data
2. Add token name fetching
3. Test with real API data

### Step 3: Create Portfolio Value Chart ⏳

1. Create new component `PortfolioValueChart.vue`
2. Implement Chart.js line chart
3. Add time range selector
4. Integrate with dashboard

### Step 4: Fix Assets Table ⏳

1. Show proper token names
2. Display current price (separate from avg price)
3. Calculate and show 24h P/L
4. Add sorting functionality

---

## 🚀 Success Criteria

- [ ] Dashboard loads with real data from Supabase
- [ ] All token information displays correctly (name, symbol, balance, price, value, 24h change)
- [ ] Portfolio value chart shows accurate historical data
- [ ] Table columns are sortable
- [ ] Auto-refresh updates data every 60 seconds
- [ ] Manual sync button works
- [ ] Theme is consistent throughout
- [ ] Mobile responsive
- [ ] Empty states handled gracefully
- [ ] Loading states show appropriately

---

## 📝 Notes

- Keep CoinGecko API rate limits in mind (50 calls/minute for free tier)
- Cache price data to reduce API calls
- Consider WebSocket for real-time updates in future
- Add error boundaries for API failures
- Implement retry logic for failed requests
