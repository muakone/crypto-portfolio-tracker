<template>
  <div class="min-h-screen px-4 py-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold mb-8">🧪 Test Wallet Fetching</h1>

      <!-- Test Your Wallet -->
      <div class="glass-card p-8 rounded-3xl mb-8">
        <h2 class="text-2xl font-semibold mb-4">Test Wallet Fetching</h2>

        <!-- Blockchain Selection -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-300 mb-2">
            Select Blockchain
          </label>
          <div class="flex gap-4">
            <button
              @click="selectedChain = 'ethereum'"
              :class="[
                'px-6 py-3 rounded-xl font-semibold transition-all',
                selectedChain === 'ethereum'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              ]"
            >
              Ethereum
            </button>
            <button
              @click="selectedChain = 'bitcoin'"
              :class="[
                'px-6 py-3 rounded-xl font-semibold transition-all',
                selectedChain === 'bitcoin'
                  ? 'bg-gradient-to-r from-orange-600 to-yellow-600 text-white'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              ]"
            >
              Bitcoin
            </button>
          </div>
        </div>

        <!-- Address Display -->
        <p class="text-gray-400 mb-4">
          Testing {{ selectedChain }} wallet:
          <code class="text-purple-400 block mt-1 text-sm">{{ currentAddress }}</code>
        </p>

        <button
          @click="fetchTestWallet"
          :disabled="loading"
          class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all disabled:opacity-50"
        >
          {{ loading ? "Fetching..." : "Fetch Tokens" }}
        </button>

        <!-- Results -->
        <div v-if="tokens.length > 0" class="mt-8">
          <h3 class="text-xl font-semibold mb-4">
            ✅ Found {{ tokens.length }} Tokens
          </h3>

          <div class="space-y-3">
            <div
              v-for="(token, index) in tokens"
              :key="index"
              class="p-4 bg-white/5 rounded-xl border border-white/10"
            >
              <div class="flex items-center justify-between">
                <div>
                  <div class="font-semibold text-lg">{{ token.symbol }}</div>
                  <div class="text-sm text-gray-400">{{ token.name }}</div>
                </div>
                <div class="text-right">
                  <div class="font-semibold">
                    {{ token.balance.toFixed(6) }}
                  </div>
                  <div
                    v-if="token.usdValue"
                    class="text-sm text-gray-400"
                  >
                    ${{ token.usdValue.toFixed(2) }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl">
            <div class="text-lg font-semibold text-green-400">
              Total Portfolio Value: ${{ totalValue.toFixed(2) }}
            </div>
          </div>
        </div>

        <div v-else-if="!loading && attempted" class="mt-8">
          <div class="p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-xl">
            <p class="text-yellow-400">
              No tokens found. This wallet may be empty or have no transactions.
            </p>
          </div>
        </div>

        <!-- Error -->
        <div v-if="error" class="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl">
          <p class="text-red-400">{{ error }}</p>
          <p class="text-sm text-red-300 mt-2">
            Check browser console (F12) for detailed logs
          </p>
        </div>

        <!-- Debug Info -->
        <div class="mt-6 p-4 bg-gray-800/50 border border-gray-700 rounded-xl">
          <h4 class="text-sm font-semibold text-gray-400 mb-2">🔍 Debug Info</h4>
          <div class="text-xs text-gray-500 space-y-1 font-mono">
            <div>Blockchain: {{ selectedChain }}</div>
            <div>Wallet: {{ currentAddress }}</div>
            <div v-if="selectedChain === 'ethereum'">Etherscan API Key: {{ apiKeyStatus }}</div>
            <div v-else>BlockCypher API: No key required</div>
            <div>Status: {{ statusMessage }}</div>
          </div>
        </div>
      </div>

      <!-- Instructions -->
      <div class="glass-card p-8 rounded-3xl">
        <h3 class="text-xl font-semibold mb-4">📋 How It Works</h3>
        <ol class="space-y-2 text-gray-300">
          <li><strong>Ethereum:</strong></li>
          <li class="ml-4">1. Queries Etherscan API for ETH + ERC-20 tokens</li>
          <li class="ml-4">2. Gets current prices from CoinGecko</li>
          <li class="ml-4">3. Displays your portfolio value</li>
          <li class="mt-2"><strong>Bitcoin:</strong></li>
          <li class="ml-4">1. Queries BlockCypher API for BTC balance</li>
          <li class="ml-4">2. Gets current BTC price from CoinGecko</li>
          <li class="ml-4">3. Displays your BTC value</li>
        </ol>

        <div class="mt-6 p-4 bg-blue-500/20 border border-blue-500/50 rounded-xl">
          <p class="text-sm text-blue-300">
            <strong>Note:</strong> This is a test page. To actually add this wallet,
            go to <NuxtLink to="/add-wallet" class="underline">Add Wallet</NuxtLink> page.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { getAllEthTokens, getBtcBalance } = useWallet();
const { fetchPricesBySymbols, symbolToId } = usePrices();

// Test addresses
const ethAddress = ref("0x3B0Be24d6f270cC56CE41165c10b309bb55A88B6");
const btcAddress = ref("bc1qgdjqv0av3q56jvd82tkdjpy7gdp9ut8tlqmgrpmv24sq90ecnvqqjwvw97"); // Binance cold wallet (has balance)
const selectedChain = ref<"ethereum" | "bitcoin">("bitcoin"); // Start with Bitcoin

const currentAddress = computed(() => 
  selectedChain.value === "ethereum" ? ethAddress.value : btcAddress.value
);

const loading = ref(false);
const attempted = ref(false);
const error = ref("");
const tokens = ref<Array<{ symbol: string; name: string; balance: number; price?: number; usdValue?: number }>>([]);
const totalValue = ref(0);
const statusMessage = ref("Ready to fetch");

const apiKeyStatus = computed(() => {
  const config = useRuntimeConfig();
  const key = config.public.etherscanApiKey;
  return key ? `✅ Set (${key.substring(0, 8)}...)` : "❌ Not set";
});

const fetchTestWallet = async () => {
  loading.value = true;
  attempted.value = true;
  error.value = "";
  tokens.value = [];
  totalValue.value = 0;
  statusMessage.value = "Fetching...";

  try {
    console.log(`🔍 Fetching ${selectedChain.value} tokens for:`, currentAddress.value);

    let fetchedTokens = [];

    if (selectedChain.value === "ethereum") {
      console.log("📡 Using Etherscan API key:", useRuntimeConfig().public.etherscanApiKey ? "✅ Set" : "❌ Missing");
      statusMessage.value = "Calling Etherscan API...";
      
      // Fetch all tokens (ETH + ERC-20)
      fetchedTokens = await getAllEthTokens(currentAddress.value);
    } else if (selectedChain.value === "bitcoin") {
      console.log("📡 Using BlockCypher API (no key required)");
      statusMessage.value = "Calling BlockCypher API...";
      
      // Fetch BTC balance
      const btcBalance = await getBtcBalance(currentAddress.value);
      console.log("💰 BTC Balance:", btcBalance);
      
      if (btcBalance > 0) {
        fetchedTokens = [{
          symbol: "BTC",
          name: "Bitcoin",
          balance: btcBalance
        }];
      }
    }

    console.log("💰 Raw tokens:", fetchedTokens);
    console.log("📊 Token count:", fetchedTokens.length);

    if (fetchedTokens.length === 0) {
      console.warn("⚠️ No tokens found");
      statusMessage.value = "No tokens found";
      error.value = `No tokens found for this ${selectedChain.value} wallet. This could mean:\n1. Wallet has no balance\n2. Wallet has never made any transactions${selectedChain.value === 'ethereum' ? '\n3. Etherscan API rate limit reached\n4. API key issue' : '\n3. BlockCypher API issue'}`;
      return;
    }

    statusMessage.value = `Found ${fetchedTokens.length} tokens, fetching prices...`;

    // Get prices for all tokens
    const symbols = fetchedTokens.map((t) => t.symbol);
    const prices = await fetchPricesBySymbols(symbols);
    console.log("💵 Prices:", prices);

    statusMessage.value = "Calculating values...";

    // Calculate USD values
    const tokensWithPrices = fetchedTokens.map((token) => {
      const coinId = symbolToId(token.symbol);
      const priceData = prices[coinId];
      const price = priceData?.usd || 0;
      const usdValue = token.balance * price;

      return {
        ...token,
        price,
        usdValue,
      };
    });

    tokens.value = tokensWithPrices;
    totalValue.value = tokensWithPrices.reduce(
      (sum, t) => sum + t.usdValue,
      0
    );

    statusMessage.value = `✅ Success! Found ${tokens.value.length} tokens`;
    console.log("✅ Success! Total value:", totalValue.value);
  } catch (err: unknown) {
    console.error("❌ Error:", err);
    statusMessage.value = "Error occurred";
    error.value = err instanceof Error ? err.message : "Failed to fetch tokens";
  } finally {
    loading.value = false;
  }
};

useHead({
  title: "Test Wallet Fetching",
});
</script>
