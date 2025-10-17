# 🧪 Web3 Wallet Testing Guide

## 🦊 How to Test Web3 Login (Step-by-Step)

You **don't need a real wallet with crypto** to test! Here's how to set up and test with dummy/test wallets:

---

## ✅ Option 1: MetaMask Test Wallet (RECOMMENDED - Easiest)

### Step 1: Install MetaMask

1. Go to https://metamask.io/download/
2. Click "Install MetaMask for Chrome/Firefox/Brave"
3. Add extension to browser
4. Click the MetaMask fox icon in browser toolbar

### Step 2: Create Test Wallet

1. Click "Create a new wallet"
2. Agree to terms
3. Create a password (remember this!)
4. **IMPORTANT**: Write down the Secret Recovery Phrase
   - This is just for testing
   - You can save it in a text file (for test only!)
5. Confirm recovery phrase
6. Done! ✅

### Step 3: Switch to Test Network (Optional but Recommended)

1. Click MetaMask extension
2. Click network dropdown (shows "Ethereum Mainnet")
3. Toggle "Show test networks" at bottom
4. Select **"Sepolia test network"** or **"Goerli"**

**Why?** Test networks are free and safe to play with!

### Step 4: Test the Login Flow

```bash
# 1. Start dev server
pnpm dev

# 2. Open browser
http://localhost:3001/login

# 3. Click "Connect Web3 Wallet" button
# 4. MetaMask popup will appear
# 5. Click "Next" → "Connect"
# 6. Sign the message (no gas fees!)
# 7. You're logged in! 🎉
```

**Your Test Address Will Look Like:**

```
0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
```

---

## ✅ Option 2: Browser DevTools (Quick Test - No Install)

Modern browsers have built-in Web3 simulation!

### For Chrome/Brave:

1. Open DevTools (F12)
2. Go to Console tab
3. Paste this:

```javascript
// Inject a dummy Web3 provider
window.ethereum = {
  isMetaMask: true,
  request: async ({ method, params }) => {
    if (method === "eth_requestAccounts") {
      return ["0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"];
    }
    if (method === "personal_sign") {
      return "0xdummysignature123456789";
    }
    return null;
  },
  on: () => {},
  removeListener: () => {},
};
```

4. Now click "Connect Web3 Wallet"
5. It will use the dummy address!

---

## ✅ Option 3: WalletConnect Test (Mobile Wallets)

### For Testing Mobile Wallets:

1. **Install Trust Wallet (Mobile)**

   - Download from App Store/Play Store
   - Create wallet (it's free, no crypto needed)
   - This is your test wallet!

2. **Test on Desktop:**
   - Go to login page
   - Click "Connect Web3 Wallet"
   - Select "WalletConnect"
   - QR code appears
   - Scan with Trust Wallet camera
   - Approve connection
   - Done! ✅

---

## 🧪 Full Testing Checklist

### ✅ Test Case 1: MetaMask Connection

```
1. Click "Connect Web3 Wallet"
2. MetaMask popup appears
3. Click "Next" → "Connect"
4. Wallet connected!
5. Check console for address: 0x123...abc
```

### ✅ Test Case 2: Sign Message

```
1. After connecting wallet
2. MetaMask asks to "Sign message"
3. Click "Sign"
4. Message signed!
5. Check success message: "Connected: 0x742d...bEb"
```

### ✅ Test Case 3: Login to App

```
1. Sign message (from Test Case 2)
2. App creates user in Supabase
3. Success message appears
4. Redirects to /dashboard
5. You're logged in! ✅
```

### ✅ Test Case 4: Rejected Connection

```
1. Click "Connect Web3 Wallet"
2. MetaMask popup appears
3. Click "Cancel" or "Reject"
4. Error message: "User rejected the request"
5. Can try again ✓
```

### ✅ Test Case 5: Logout & Re-login

```
1. After logging in, logout
2. Click "Connect Web3 Wallet" again
3. MetaMask auto-connects (already approved)
4. Sign message
5. Logged in again! ✓
```

---

## 🎯 Common Test Scenarios

### Scenario 1: First Time User (New Wallet)

```
User Action:
1. Never connected wallet before
2. Clicks "Connect Web3 Wallet"
3. MetaMask asks permission
4. User approves
5. Signs message
6. Account created in Supabase
7. Logged in → Dashboard

Expected Result:
✅ New user created with email: 0x742d...bEb@wallet.local
✅ Redirected to /dashboard
✅ Can see their portfolio
```

### Scenario 2: Returning User (Existing Wallet)

```
User Action:
1. Connected wallet before
2. Clicks "Connect Web3 Wallet"
3. MetaMask auto-connects
4. Signs message
5. Logs in (no signup)
6. Dashboard loads

Expected Result:
✅ Existing user found
✅ No new account created
✅ Logged in successfully
```

### Scenario 3: User Rejects Connection

```
User Action:
1. Clicks "Connect Web3 Wallet"
2. MetaMask asks permission
3. User clicks "Cancel"

Expected Result:
❌ Error: "User rejected the request"
✅ Can try again
✅ App doesn't crash
```

### Scenario 4: User Rejects Signature

```
User Action:
1. Connects wallet successfully
2. MetaMask asks to sign message
3. User clicks "Reject"

Expected Result:
❌ Error: "User rejected signature"
✅ Can try again
✅ Not logged in yet
```

---

## 🔍 Debug: What to Check

### Check Browser Console (F12):

```javascript
// You should see:
"Connecting wallet...";
"Wallet connected: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb";
"Signing message...";
"Message signed!";
"Authenticating with Supabase...";
"Login successful!";
```

### Check Network Tab:

```
POST /auth/v1/signup (or /signin)
Body: {
  email: "0x742d35cc6634c0532925a3b844bc9e7595f0beb@wallet.local",
  password: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
}
Response: 200 OK
```

### Check MetaMask:

```
1. Open MetaMask
2. Click menu (3 dots)
3. Go to "Connected sites"
4. Should see: localhost:3001
```

---

## 🐛 Troubleshooting

### ❌ "MetaMask not detected"

**Fix:**

```
1. Install MetaMask extension
2. Refresh page
3. Try again
```

### ❌ "Connection timeout"

**Fix:**

```
1. Check if MetaMask is locked (enter password)
2. Make sure you clicked "Connect" in MetaMask popup
3. Try again
```

### ❌ "User rejected request"

**Fix:**

```
This is normal! User cancelled.
Just click "Connect Web3 Wallet" again.
```

### ❌ "Failed to sign message"

**Fix:**

```
1. Make sure MetaMask is unlocked
2. Try clicking "Sign" button in MetaMask
3. Don't click "Reject"
```

### ❌ "Network error"

**Fix:**

```
1. Check internet connection
2. Check Supabase credentials in .env
3. Make sure dev server is running
```

---

## 📱 Testing on Mobile

### Option A: Use Browser DevTools Device Mode

```
1. Open Chrome DevTools (F12)
2. Click device icon (responsive mode)
3. Select iPhone/Android
4. Test Web3 button
5. Use MetaMask browser extension still works
```

### Option B: Use Real Phone

```
1. Make sure phone and computer on same WiFi
2. Find your computer's IP: ipconfig (Windows) or ifconfig (Mac)
3. Start dev server: pnpm dev --host
4. On phone browser: http://192.168.X.X:3001
5. Click "Connect Web3 Wallet"
6. Install Trust Wallet or MetaMask Mobile
7. Connect via WalletConnect QR code
```

---

## 🎨 Expected UI Flow

### Flow Diagram:

```
Login Page
    ↓
[Connect Web3 Wallet Button]
    ↓
Web3Modal Opens
    ↓
Choose: MetaMask | WalletConnect | Coinbase
    ↓
MetaMask Popup
    ↓
Click "Connect"
    ↓
Sign Message Popup
    ↓
Click "Sign"
    ↓
Success Message: "Connected: 0x742d...bEb"
    ↓
Loading... (1 second)
    ↓
Redirect to /dashboard
    ↓
✅ Logged In!
```

---

## 🧪 Advanced Testing

### Test Multiple Wallets:

```
1. Create account with MetaMask wallet
2. Logout
3. Create another account with different MetaMask wallet
4. Both should work independently
5. Each wallet = separate account
```

### Test Network Switching:

```
1. Connect on Ethereum Mainnet
2. Switch to Polygon in MetaMask
3. Reconnect
4. Should still work! (we support multi-chain)
```

### Test Browser Refresh:

```
1. Connect wallet
2. Refresh page
3. Session persists? ✅
4. Still logged in? ✅
```

---

## 📊 Test Data Examples

### Sample Test Addresses (Use These):

```javascript
// MetaMask Test Wallet 1
0x742d35cc6634c0532925a3b844bc9e7595f0beb;

// MetaMask Test Wallet 2
0x5aaeb6053f3e94c9b9a09f33669435e7ef1beaed;

// MetaMask Test Wallet 3
0x7892c6d92f1e7f7b2ba97ea3bc5b5c5c5c5c5c5c;
```

These are **test addresses** - no real crypto, safe to use!

---

## ✅ Success Criteria

Your Web3 auth is working if:

- ✅ MetaMask popup appears
- ✅ User can connect wallet
- ✅ Sign message popup appears
- ✅ Success message shows wallet address
- ✅ Redirects to dashboard
- ✅ User is logged in
- ✅ Can logout and re-login
- ✅ Different wallets create different accounts

---

## 🚀 Quick Start (TL;DR)

```bash
# 1. Install MetaMask
https://metamask.io/download/

# 2. Create test wallet (follow prompts)

# 3. Start dev server
pnpm dev

# 4. Go to login
http://localhost:3001/login

# 5. Click "Connect Web3 Wallet"

# 6. Approve in MetaMask → Sign message

# 7. Done! You're logged in! 🎉
```

---

## 💡 Pro Tips

1. **Use Test Networks**: Switch MetaMask to Sepolia/Goerli for testing
2. **Multiple Accounts**: Create multiple MetaMask accounts to test different users
3. **Browser Profiles**: Use Chrome profiles for testing multiple wallets simultaneously
4. **DevTools**: Keep console open to see detailed logs
5. **Test Mode**: Supabase email confirmation is disabled for easier testing

---

## 🎯 What You're Actually Testing

```typescript
// This is what happens under the hood:

1. User clicks button
   → Web3Modal opens

2. User selects MetaMask
   → MetaMask.request('eth_requestAccounts')
   → Returns: ['0x742d35...']

3. App asks to sign message
   → MetaMask.request('personal_sign', message)
   → Returns: '0xsignature123...'

4. App verifies signature
   → Creates user: 0x742d35...@wallet.local
   → Logs in with Supabase

5. User redirected to dashboard
   → Success! ✅
```

---

**You're ready to test!** 🚀

No real crypto needed. No testnet ETH needed. Just install MetaMask, create a wallet, and start testing! 🦊
