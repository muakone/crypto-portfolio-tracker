# Debug: Wallet Foreign Key Constraint Issue

## Problem

Getting error: `insert or update on table "wallets" violates foreign key constraint "wallets_user_id_fkey"`

## Root Cause

The `wallets` table has a foreign key constraint that references `auth.users(id)`. This error occurs when:

1. The user_id being inserted doesn't exist in `auth.users` table
2. There's a mismatch between the user ID format
3. The auth session isn't properly established

## Solution Steps

### Step 1: Verify Auth User Exists

Run this in Supabase SQL Editor to check if your user exists:

```sql
-- Check if user exists in auth.users
SELECT id, email, created_at
FROM auth.users
ORDER BY created_at DESC
LIMIT 10;
```

Copy your user ID from the results.

### Step 2: Check Foreign Key Constraint

```sql
-- Verify the foreign key constraint
SELECT
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM
    information_schema.table_constraints AS tc
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
WHERE tc.table_name = 'wallets'
  AND tc.constraint_type = 'FOREIGN KEY';
```

Should show:

- table_name: `wallets`
- column_name: `user_id`
- foreign_table_name: `auth.users`
- foreign_column_name: `id`

### Step 3: Test Manual Insert

Try inserting a wallet manually with your user ID (replace `YOUR_USER_ID`):

```sql
-- Replace YOUR_USER_ID with your actual user ID from Step 1
INSERT INTO public.wallets (user_id, address, chain)
VALUES ('YOUR_USER_ID', '0x1234567890123456789012345678901234567890', 'ethereum')
RETURNING *;
```

If this works, the issue is in the application code.
If this fails, the issue is in the database setup.

### Step 4: Check RLS Policies

```sql
-- Verify RLS policies exist
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'wallets';
```

Should show 4 policies:

1. Users can view their own wallets (SELECT)
2. Users can insert their own wallets (INSERT)
3. Users can update their own wallets (UPDATE)
4. Users can delete their own wallets (DELETE)

### Step 5: Fix RLS Policy for INSERT

If the INSERT policy is too restrictive, recreate it:

```sql
-- Drop and recreate INSERT policy
DROP POLICY IF EXISTS "Users can insert their own wallets" ON public.wallets;

CREATE POLICY "Users can insert their own wallets"
  ON public.wallets
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
```

### Step 6: Verify Auth Session

In your browser console when on the add-wallet page, run:

```javascript
// Check if user is authenticated
const {
  data: { user },
} = await $fetch("/api/auth/user");
console.log("Current user:", user);
```

## Code Changes Made

### 1. Updated `useSupabase.ts` - `addWallet` function

- Now fetches the current authenticated user directly from Supabase
- Uses `auth.getUser()` instead of relying on passed `userId`
- Adds error logging

### 2. Updated `add-wallet.vue`

- Fetches fresh user session before adding wallet
- Adds detailed console logging for debugging
- Better error handling

## Testing Steps

1. **Clear browser cache and cookies** (important!)
2. **Logout and login again** to get a fresh session
3. Open browser DevTools Console (F12)
4. Try connecting MetaMask
5. Check console logs for:
   - User ID (should be a valid UUID)
   - Wallet address (should start with 0x)
   - Any error messages

## Common Issues & Fixes

### Issue 1: User ID is null or undefined

**Fix:** User isn't properly authenticated. Logout and login again.

### Issue 2: User ID format mismatch

**Fix:** Ensure the user ID is a valid UUID format.

### Issue 3: RLS policies blocking insert

**Fix:** Check the INSERT policy allows `authenticated` role and uses `auth.uid() = user_id`.

### Issue 4: Session expired

**Fix:** Refresh the page or logout/login to get a new session.

## Quick Database Reset (if needed)

If you need to recreate the wallets table:

```sql
-- Drop existing table (WARNING: This deletes all data!)
DROP TABLE IF EXISTS public.tokens CASCADE;
DROP TABLE IF EXISTS public.wallets CASCADE;

-- Recreate wallets table
CREATE TABLE public.wallets (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  address text NOT NULL,
  chain text DEFAULT 'ethereum' NOT NULL,
  label text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT wallets_user_address_unique UNIQUE (user_id, address, chain)
);

-- Enable RLS
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own wallets"
  ON public.wallets FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own wallets"
  ON public.wallets FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own wallets"
  ON public.wallets FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own wallets"
  ON public.wallets FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Recreate tokens table
CREATE TABLE public.tokens (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  wallet_id uuid REFERENCES public.wallets(id) ON DELETE CASCADE NOT NULL,
  symbol text NOT NULL,
  balance numeric NOT NULL DEFAULT 0,
  usd_value numeric NOT NULL DEFAULT 0,
  last_updated timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT tokens_wallet_symbol_unique UNIQUE (wallet_id, symbol)
);

-- Enable RLS for tokens
ALTER TABLE public.tokens ENABLE ROW LEVEL SECURITY;

-- Create token policies
CREATE POLICY "Users can view tokens for their wallets"
  ON public.tokens FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.wallets
      WHERE wallets.id = tokens.wallet_id
      AND wallets.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert tokens for their wallets"
  ON public.tokens FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.wallets
      WHERE wallets.id = tokens.wallet_id
      AND wallets.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update tokens for their wallets"
  ON public.tokens FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.wallets
      WHERE wallets.id = tokens.wallet_id
      AND wallets.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete tokens for their wallets"
  ON public.tokens FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.wallets
      WHERE wallets.id = tokens.wallet_id
      AND wallets.user_id = auth.uid()
    )
  );
```

## Next Steps

After applying the code changes:

1. Restart your dev server: `pnpm run dev`
2. Clear browser cache and localStorage
3. Logout and login again
4. Open browser console (F12)
5. Try connecting MetaMask again
6. Check the console logs for the user ID and any errors
7. If you see the user ID logged correctly but still get the error, run the SQL queries above in Supabase to verify the database setup

The error should now show detailed logging to help identify the exact issue!
