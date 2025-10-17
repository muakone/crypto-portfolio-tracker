# Fix: Wallets Foreign Key References Wrong Table

## The Problem

Your `wallets` table foreign key is referencing `public.users` instead of `auth.users`.

**Error Message:**

```
Key (user_id)=(72d47271-0bea-423a-b68d-b482da90140d) is not present in table "users".
```

Notice it says table **"users"** (which is `public.users`), NOT **"auth.users"**.

## Solution: Fix the Foreign Key Constraint

### Step 1: Verify the Current Constraint

Run this in Supabase SQL Editor to see what it's currently referencing:

```sql
-- Check current foreign key constraint
SELECT
    tc.constraint_name,
    tc.table_name,
    kcu.column_name,
    ccu.table_schema AS foreign_table_schema,
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

You'll probably see:

- `foreign_table_schema`: `public`
- `foreign_table_name`: `users` ❌ (WRONG - should be `auth.users`)

### Step 2: Drop the Incorrect Constraint

```sql
-- Drop the incorrect foreign key constraint
ALTER TABLE public.wallets
DROP CONSTRAINT IF EXISTS wallets_user_id_fkey;
```

### Step 3: Add the Correct Constraint

```sql
-- Add the correct foreign key constraint pointing to auth.users
ALTER TABLE public.wallets
ADD CONSTRAINT wallets_user_id_fkey
FOREIGN KEY (user_id)
REFERENCES auth.users(id)
ON DELETE CASCADE;
```

### Step 4: Verify the Fix

```sql
-- Verify it now points to auth.users
SELECT
    tc.constraint_name,
    tc.table_name,
    kcu.column_name,
    ccu.table_schema AS foreign_table_schema,
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

Should now show:

- `foreign_table_schema`: `auth` ✅
- `foreign_table_name`: `users` ✅

### Step 5: Test the Insert Again

```sql
-- Test inserting a wallet (use YOUR user_id from auth.users)
INSERT INTO public.wallets (user_id, address, chain)
VALUES ('72d47271-0bea-423a-b68d-b482da90140d', '0x1234567890123456789012345678901234567890', 'ethereum')
RETURNING *;
```

This should now work! ✅

## Quick Fix Script (All-in-One)

Run this entire script in Supabase SQL Editor:

```sql
-- Fix the foreign key constraint for wallets table

-- Step 1: Drop the incorrect constraint
ALTER TABLE public.wallets
DROP CONSTRAINT IF EXISTS wallets_user_id_fkey;

-- Step 2: Add the correct constraint pointing to auth.users
ALTER TABLE public.wallets
ADD CONSTRAINT wallets_user_id_fkey
FOREIGN KEY (user_id)
REFERENCES auth.users(id)
ON DELETE CASCADE;

-- Step 3: Verify the fix
SELECT
    tc.constraint_name,
    tc.table_name,
    kcu.column_name,
    ccu.table_schema AS foreign_table_schema,
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

-- Step 4: Test insert (replace with YOUR user_id)
-- INSERT INTO public.wallets (user_id, address, chain)
-- VALUES ('YOUR_USER_ID', '0x1234567890123456789012345678901234567890', 'ethereum')
-- RETURNING *;
```

## Why This Happened

When you created the `wallets` table, you probably used:

```sql
-- INCORRECT (references public.users)
user_id uuid references users(id) on delete cascade not null,
```

Instead of:

```sql
-- CORRECT (references auth.users)
user_id uuid references auth.users(id) on delete cascade not null,
```

The `users` table defaults to `public.users` when you don't specify the schema. Supabase stores actual users in `auth.users`, not `public.users`.

## After Fixing

Once you've run the fix script above:

1. ✅ The foreign key will point to `auth.users`
2. ✅ You'll be able to insert wallets
3. ✅ MetaMask connection will work
4. ✅ Manual wallet entry will work

No code changes needed - the issue was purely in the database schema!

## Test Again

After applying the fix:

1. Go to your app
2. Try connecting MetaMask
3. It should work now! 🎉

The error message will be gone and your wallet will be saved successfully.
