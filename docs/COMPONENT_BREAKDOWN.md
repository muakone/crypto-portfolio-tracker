# Dashboard Component Breakdown

## Overview

The dashboard page has been refactored from a single 478-line file into smaller, maintainable components. This improves code organization, reusability, and makes testing easier.

## New Component Structure

### 1. **DashboardHeader.vue** (58 lines)

**Location:** `app/components/DashboardHeader.vue`

**Purpose:** Displays the top action buttons bar

**Features:**

- Receive, Earn, Buy Crypto, Swap, Manage, and Share buttons
- Consistent styling with glassmorphism effects
- Responsive button layout

**Usage:**

```vue
<DashboardHeader />
```

### 2. **PortfolioWorth.vue** (77 lines)

**Location:** `app/components/PortfolioWorth.vue`

**Purpose:** Shows total portfolio worth and sync controls

**Props:**

- `totalValue: number` - Total portfolio value in USD
- `change: number` - 24H percentage change
- `changeAmount: number` - 24H change in USD
- `loading?: boolean` - Loading state for sync button
- `lastSyncTime?: Date` - Last sync timestamp

**Events:**

- `@refresh` - Emitted when sync button is clicked

**Features:**

- Large total worth display
- Green/red badge for 24H change
- Sync All button with loading spinner
- Auto-formatted relative sync time
- Time range selector (24H)

**Usage:**

```vue
<PortfolioWorth
  :total-value="110007.36"
  :change="3.42"
  :change-amount="3752.65"
  :loading="portfolioLoading"
  :last-sync-time="lastSync"
  @refresh="handleRefresh"
/>
```

### 3. **AssetsTable.vue** (141 lines)

**Location:** `app/components/AssetsTable.vue`

**Purpose:** Displays the assets table with token details

**Props:**

- `tokens: Token[]` - Array of token objects

**Token Interface:**

```typescript
interface Token {
  id: string;
  symbol: string;
  name?: string;
  balance: number;
  price: number;
  usd_value: number;
  change_24h?: number;
  change_24h_value?: number;
}
```

**Features:**

- Table with columns: Name, Price, Amount, Total, 24H P/L, Actions
- Token icon mapping (₿, Ξ, ₮, etc.)
- Color-coded 24H changes (green/red)
- Empty state with "Add Wallet" CTA
- Hover effects on rows
- Action menu button (dots-vertical)

**Usage:**

```vue
<AssetsTable :tokens="displayTokens" />
```

### 4. **PortfolioChart.vue** (existing, 180 lines)

**Location:** `app/components/PortfolioChart.vue`

**Purpose:** Pie chart showing portfolio distribution

**Props:**

- `distribution: TokenDistribution[]` - Array of token distribution data

**Features:**

- Chart.js doughnut chart
- Custom legend showing top 5 tokens
- Responsive sizing
- Tooltips with formatted values
- Blue/purple color scheme

## Updated Dashboard Page

**dashboard.vue** (216 lines, down from 478 lines)

**Simplified Structure:**

```vue
<template>
  <div class="min-h-screen">
    <DashboardHeader />

    <div class="px-6 py-8">
      <!-- Loading State -->
      <div v-if="loading">...</div>

      <!-- Dashboard Content -->
      <div v-else-if="user">
        <PortfolioWorth ... />

        <div class="grid lg:grid-cols-3 gap-8">
          <div class="lg:col-span-1">
            <PortfolioChart :distribution="dummyDistribution" />
          </div>
          <div class="lg:col-span-2">
            <AssetsTable :tokens="displayTokens" />
          </div>
        </div>
      </div>

      <!-- Not Logged In -->
      <div v-else>...</div>
    </div>
  </div>
</template>
```

**Responsibilities:**

- State management (user, loading, tokens)
- Data computation (totals, distributions, changes)
- Lifecycle hooks (onMounted, refresh)
- Composable integration (useSupabase, usePortfolio)

## Utility Functions

**format.ts** - Shared formatting utilities

Added:

```typescript
export const formatAmount = (value: number): string => {
  if (!value) return "0";
  if (value < 0.01) return value.toFixed(8);
  if (value < 1) return value.toFixed(6);
  if (value < 100) return value.toFixed(4);
  return value.toFixed(2);
};
```

Existing:

- `formatCurrency(value: number): string`
- `formatPercentage(value: number, fractionDigits = 2): string`
- `formatBalance(balance: number): string`

## Benefits of This Refactoring

1. **Maintainability**: Each component has a single responsibility
2. **Reusability**: Components can be used in other pages/views
3. **Testability**: Easier to write unit tests for isolated components
4. **Readability**: Dashboard.vue is now ~55% smaller and easier to understand
5. **Scalability**: Easy to add new features to specific components
6. **Type Safety**: Clear prop interfaces and TypeScript support

## File Size Comparison

| File          | Before    | After     | Reduction       |
| ------------- | --------- | --------- | --------------- |
| dashboard.vue | 478 lines | 216 lines | **55% smaller** |

**Total Component Lines:** 216 + 58 + 77 + 141 = 492 lines
(Slightly more due to prop definitions and better organization, but much more maintainable)

## Next Steps

- Add sorting functionality to AssetsTable
- Make action buttons in DashboardHeader functional
- Add click handlers to table rows for token details
- Implement the three-dot action menu
- Add animations/transitions between components
