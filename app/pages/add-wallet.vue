<template>
  <div class="min-h-screen px-4 py-8">
    <div class="max-w-2xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <NuxtLink
          to="/dashboard"
          class="text-gray-400 hover:text-white mb-4 inline-block"
        >
          ← Back to Dashboard
        </NuxtLink>
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
          Add Wallet
        </h1>
        <p class="text-gray-400">Connect your wallet or add it manually</p>
      </div>

      <!-- Add Wallet Card -->
      <div class="glass-card p-8 rounded-3xl">
        <!-- Connection Options -->
        <div class="space-y-6 mb-8">
          <!-- MetaMask Connection -->
          <div>
            <h3 class="text-xl font-semibold mb-4">Connect MetaMask</h3>
            <p class="text-sm text-gray-400 mb-4">
              Connect your MetaMask wallet to automatically import your Ethereum
              address and balance
            </p>
            <button
              class="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/20"
              :disabled="!isMetaMaskInstalled() || connecting"
              @click="handleMetaMaskConnect"
            >
              {{
                connecting
                  ? "Connecting..."
                  : isMetaMaskInstalled()
                  ? "Connect MetaMask"
                  : "MetaMask Not Installed"
              }}
            </button>
          </div>

          <div class="flex items-center gap-4">
            <div class="flex-1 h-px bg-white/10" />
            <span class="text-gray-400 text-sm">OR</span>
            <div class="flex-1 h-px bg-white/10" />
          </div>

          <!-- Manual Entry -->
          <div>
            <h3 class="text-xl font-semibold mb-4">Add Manually</h3>

            <!-- Error/Success Messages -->
            <div
              v-if="errorMessage"
              class="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm"
            >
              {{ errorMessage }}
            </div>
            <div
              v-if="successMessage"
              class="mb-4 p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-200 text-sm"
            >
              {{ successMessage }}
            </div>

            <form class="space-y-4" @submit.prevent="handleManualSubmit">
              <!-- Chain Selection -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  Blockchain
                </label>
                <select
                  v-model="chain"
                  class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="ethereum">Ethereum</option>
                  <option value="bitcoin">Bitcoin</option>
                </select>
              </div>

              <!-- Address Input -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  Wallet Address
                </label>
                <input
                  v-model="address"
                  type="text"
                  required
                  :placeholder="
                    chain === 'ethereum'
                      ? '0x...'
                      : chain === 'bitcoin'
                      ? 'bc1... or 1...'
                      : 'Enter address'
                  "
                  class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
                />
              </div>

              <button
                type="submit"
                :disabled="loading"
                class="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50"
              >
                {{ loading ? "Adding..." : "Add Wallet" }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from "@supabase/supabase-js";

const { getUser, addWallet, saveTokens } = useSupabase();
const {
  connectMetaMask,
  isMetaMaskInstalled,
  isValidEthAddress,
  isValidBtcAddress,
  getAllEthTokens,
  getBtcBalance,
} = useWallet();
const { fetchPricesBySymbols } = usePrices();
const router = useRouter();

const chain = ref("ethereum");
const address = ref("");
const loading = ref(false);
const connecting = ref(false);
const errorMessage = ref("");
const successMessage = ref("");
const user = ref<User | null>(null);

onMounted(async () => {
  user.value = await getUser();
  if (!user.value) {
    router.push("/login");
  }
});

const handleMetaMaskConnect = async () => {
  connecting.value = true;
  errorMessage.value = "";

  try {
    // Get fresh user session
    const currentUser = await getUser();
    if (!currentUser) {
      errorMessage.value = "Please login first";
      router.push("/login");
      return;
    }

    const walletAddress = await connectMetaMask();

    if (walletAddress) {
      console.log("Fetching tokens for:", walletAddress);

      // Add wallet to database
      const { data: walletData, error: walletError } = await addWallet(
        currentUser.id,
        walletAddress,
        "ethereum"
      );

      if (walletError) {
        console.error("Add wallet error:", walletError);
        errorMessage.value = walletError.message || "Failed to add wallet";
        return;
      }

      if (!walletData || walletData.length === 0) {
        errorMessage.value = "Failed to create wallet record";
        return;
      }

      const walletId = walletData[0].id;
      console.log("Wallet added with ID:", walletId);

      // Fetch real token balances from blockchain
      console.log("Fetching real balances...");
      const tokens = await getAllEthTokens(walletAddress);
      console.log(`Found ${tokens.length} tokens:`, tokens);

      if (tokens.length > 0) {
        // Get current prices
        const symbols = tokens.map((t) => t.symbol);
        const prices = await fetchPricesBySymbols(symbols);

        // Prepare token records with prices
        const tokenRecords = tokens.map((token) => {
          const { symbolToId, symbolToName } = usePrices();
          const coinId = symbolToId(token.symbol);
          const priceData = prices?.[coinId];
          const price = priceData?.usd || 0;
          const usdValue = token.balance * price;

          return {
            name: symbolToName(token.symbol) || token.name || token.symbol,
            symbol: token.symbol,
            balance: token.balance,
            price: price,
            usd_value: usdValue,
          };
        });

        // Save to database
        const { error: tokensError } = await saveTokens(walletId, tokenRecords);

        if (tokensError) {
          console.error("Error saving tokens:", tokensError);
        } else {
          console.log("Saved tokens to database");
        }
      }

      successMessage.value = `Wallet connected! Found ${tokens.length} tokens`;
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    }
  } catch (err: unknown) {
    console.error("MetaMask connection error:", err);
    errorMessage.value =
      err instanceof Error ? err.message : "Failed to connect MetaMask";
  } finally {
    connecting.value = false;
  }
};

const handleManualSubmit = async () => {
  errorMessage.value = "";
  successMessage.value = "";

  // Validate address format
  if (chain.value === "ethereum" && !isValidEthAddress(address.value)) {
    errorMessage.value = "Invalid Ethereum address format";
    return;
  }

  if (chain.value === "bitcoin" && !isValidBtcAddress(address.value)) {
    errorMessage.value = "Invalid Bitcoin address format";
    return;
  }

  // Get fresh user session
  const currentUser = await getUser();
  if (!currentUser) {
    errorMessage.value = "Please login first";
    router.push("/login");
    return;
  }

  loading.value = true;

  try {
    console.log("Adding wallet:", address.value);

    // Add wallet to database
    const { data: walletData, error: walletError } = await addWallet(
      currentUser.id,
      address.value,
      chain.value
    );

    if (walletError) {
      console.error("Add wallet error:", walletError);
      errorMessage.value = walletError.message || "Failed to add wallet";
      return;
    }

    if (!walletData || walletData.length === 0) {
      errorMessage.value = "Failed to create wallet record";
      return;
    }

    const walletId = walletData[0].id;
    console.log("Wallet added with ID:", walletId);

    // Fetch real balances based on blockchain
    let tokens: Array<{ symbol: string; name: string; balance: number }> = [];

    if (chain.value === "ethereum") {
      console.log("Fetching Ethereum tokens...");
      tokens = await getAllEthTokens(address.value);
    } else if (chain.value === "bitcoin") {
      console.log("Fetching Bitcoin balance...");
      const btcBalance = await getBtcBalance(address.value);
      if (btcBalance > 0) {
        tokens = [{ symbol: "BTC", name: "Bitcoin", balance: btcBalance }];
      }
    }

    console.log(`Found ${tokens.length} tokens:`, tokens);

    if (tokens.length > 0) {
      // Get current prices
      const symbols = tokens.map((t) => t.symbol);
      const prices = await fetchPricesBySymbols(symbols);

      // Prepare token records with prices
      const tokenRecords = tokens.map((token) => {
        const { symbolToId, symbolToName } = usePrices();
        const coinId = symbolToId(token.symbol);
        const priceData = prices?.[coinId];
        const price = priceData?.usd || 0;
        const usdValue = token.balance * price;

        return {
          name: symbolToName(token.symbol) || token.name || token.symbol,
          symbol: token.symbol,
          balance: token.balance,
          price: price,
          usd_value: usdValue,
        };
      });

      // Save to database
      const { error: tokensError } = await saveTokens(walletId, tokenRecords);

      if (tokensError) {
        console.error("Error saving tokens:", tokensError);
      } else {
        console.log("Saved tokens to database");
      }
    }

    successMessage.value = `Wallet added! Found ${tokens.length} tokens`;
    address.value = "";
    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  } catch (err: unknown) {
    console.error("Manual add error:", err);
    errorMessage.value =
      err instanceof Error ? err.message : "Failed to add wallet";
  } finally {
    loading.value = false;
  }
};

useHead({
  title: "Add Wallet",
});

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});
</script>
