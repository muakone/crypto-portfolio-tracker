# 🔐 Supabase Authentication Setup Guide

This guide will walk you through setting up authentication and database for your Crypto Portfolio Tracker.

---

## ✅ Current Status

- ✅ Environment variables configured (`.env`)
- ✅ Supabase client initialized (`app/plugins/supabase.ts`)
- ✅ Auth composables created (`app/composables/useSupabase.ts`)
- ✅ Login page with sleek UI (`app/pages/login.vue`)
- ✅ Auth middleware protecting routes (`app/middleware/auth.ts`)

---

## 🗄️ Step 1: Create Database Tables

Go to your Supabase project SQL Editor and run these commands:

### Create Users Table (Auto-created by Supabase Auth)

The `auth.users` table is automatically created. We'll reference it in our tables.

### Create Wallets Table

```sql
create table public.wallets (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  address text not null,
  chain text default 'ethereum' not null,
  label text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint wallets_user_address_unique unique (user_id, address, chain)
);

-- Enable Row Level Security
alter table public.wallets enable row level security;

-- Create policies
create policy "Users can view their own wallets"
  on public.wallets for select
  using (auth.uid() = user_id);

create policy "Users can insert their own wallets"
  on public.wallets for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own wallets"
  on public.wallets for update
  using (auth.uid() = user_id);

create policy "Users can delete their own wallets"
  on public.wallets for delete
  using (auth.uid() = user_id);
```

### Create Tokens Table

```sql
create table public.tokens (
  id uuid primary key default uuid_generate_v4(),
  wallet_id uuid references public.wallets(id) on delete cascade not null,
  symbol text not null,
  balance numeric not null default 0,
  usd_value numeric not null default 0,
  last_updated timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint tokens_wallet_symbol_unique unique (wallet_id, symbol)
);

-- Enable Row Level Security
alter table public.tokens enable row level security;

-- Create policies (tokens inherit wallet permissions)
create policy "Users can view tokens for their wallets"
  on public.tokens for select
  using (
    exists (
      select 1 from public.wallets
      where wallets.id = tokens.wallet_id
      and wallets.user_id = auth.uid()
    )
  );

create policy "Users can insert tokens for their wallets"
  on public.tokens for insert
  with check (
    exists (
      select 1 from public.wallets
      where wallets.id = tokens.wallet_id
      and wallets.user_id = auth.uid()
    )
  );

create policy "Users can update tokens for their wallets"
  on public.tokens for update
  using (
    exists (
      select 1 from public.wallets
      where wallets.id = tokens.wallet_id
      and wallets.user_id = auth.uid()
    )
  );

create policy "Users can delete tokens for their wallets"
  on public.tokens for delete
  using (
    exists (
      select 1 from public.wallets
      where wallets.id = tokens.wallet_id
      and wallets.user_id = auth.uid()
    )
  );
```

---

## 🔒 Step 2: Configure Authentication Settings

In your Supabase Dashboard:

### 2.1 Enable Email Auth

1. Go to **Authentication** → **Providers**
2. Ensure **Email** provider is enabled
3. **Disable** "Confirm email" for development (or configure SMTP)
   - For production: Enable email confirmation and configure SMTP

### 2.2 Configure Email Templates (Optional)

1. Go to **Authentication** → **Email Templates**
2. Customize:
   - **Confirm signup** - Email verification
   - **Magic Link** - Passwordless login
   - **Change Email Address** - Email change confirmation
   - **Reset Password** - Password reset

### 2.3 Set Site URL and Redirect URLs

1. Go to **Authentication** → **URL Configuration**
2. Set:
   - **Site URL**: `http://localhost:3000` (dev) or your production domain
   - **Redirect URLs**: Add:
     - `http://localhost:3000/auth/callback`
     - `http://localhost:3000/dashboard`
     - Your production URLs

---

## 🎨 Step 3: Enable Social Auth (Optional)

### Google OAuth

1. Go to **Authentication** → **Providers** → **Google**
2. Enable Google provider
3. Add your Google OAuth credentials:
   - Create OAuth app in Google Cloud Console
   - Copy Client ID and Client Secret
4. Update login page to use:

```typescript
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: "google",
  options: {
    redirectTo: `${window.location.origin}/auth/callback`,
  },
});
```

### GitHub OAuth

1. Go to **Authentication** → **Providers** → **GitHub**
2. Enable GitHub provider
3. Add your GitHub OAuth App credentials:
   - Create OAuth app in GitHub Settings
   - Copy Client ID and Client Secret
4. Update login page to use:

```typescript
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: "github",
  options: {
    redirectTo: `${window.location.origin}/auth/callback`,
  },
});
```

---

## 📧 Step 4: Email Confirmation Setup

### For Development (Skip Email Verification)

1. Go to **Authentication** → **Providers** → **Email**
2. **Disable** "Confirm email"
3. Users can login immediately after signup

### For Production (With Email Verification)

1. Go to **Authentication** → **Providers** → **Email**
2. **Enable** "Confirm email"
3. Configure SMTP in **Project Settings** → **Auth** → **SMTP Settings**:
   - Use SendGrid, Resend, or your email service
   - Or use Supabase's built-in email (limited)

---

## 🧪 Step 5: Test Your Setup

### Test Signup Flow

1. Run dev server: `pnpm dev`
2. Go to `http://localhost:3000/login`
3. Click "Don't have an account? Sign up"
4. Enter email and password (min 6 characters)
5. Click "Create Account"
6. Check for success message
7. If email confirmation is enabled, check your email

### Test Login Flow

1. Go to `http://localhost:3000/login`
2. Enter your credentials
3. Click "Sign In"
4. Should redirect to `/dashboard`

### Test Protected Routes

1. Log out or clear session
2. Try to access `/dashboard` directly
3. Should redirect to `/login`

### Test Logout

1. Add a logout button to your dashboard
2. Click logout
3. Should clear session and redirect to home/login

---

## 🔐 Security Best Practices

### Row Level Security (RLS)

✅ Already enabled on all tables

- Users can only access their own data
- All queries automatically filtered by `auth.uid()`

### Password Requirements

✅ Minimum 6 characters enforced in UI and Supabase

- Consider adding password strength indicator
- Enforce stronger passwords in production

### Session Management

✅ Handled by Supabase

- Sessions auto-refresh
- Stored in localStorage by default
- Can configure session duration in Supabase settings

---

## 🚀 Next Steps

1. **Test the auth flow** completely
2. **Configure email templates** for better UX
3. **Add password reset flow** (`forgot-password.vue`)
4. **Enable social auth** (Google, GitHub)
5. **Add user profile page** to view/edit account
6. **Set up email verification** for production
7. **Deploy to Vercel** with production Supabase URL

---

## 📝 Environment Variables Checklist

Make sure your `.env` file has:

```env
NUXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NUXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

✅ Your current `.env` is properly configured!

---

## 🐛 Troubleshooting

### "Invalid API key" error

- Check `.env` file has correct values
- Restart dev server after changing `.env`

### Email not sending

- Check SMTP configuration in Supabase
- Verify email templates are set
- Check spam folder

### RLS policy errors

- Make sure you're logged in
- Check Supabase logs for policy violations
- Verify policies match your auth flow

### Redirect not working

- Check URL configuration in Supabase
- Verify `redirectTo` matches allowed URLs
- Check middleware is not blocking redirects

---

## 📚 Useful Resources

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Email Templates](https://supabase.com/docs/guides/auth/auth-email-templates)
- [OAuth Providers](https://supabase.com/docs/guides/auth/social-login)
