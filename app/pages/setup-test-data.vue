<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div
        class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl"
      >
        <h1 class="text-2xl font-bold text-white mb-6">
          Setup Test Portfolio Data
        </h1>

        <div v-if="!user" class="text-gray-400">
          Please
          <NuxtLink to="/login" class="text-blue-400 hover:text-blue-300"
            >log in</NuxtLink
          >
          first.
        </div>

        <div v-else class="space-y-4">
          <div class="text-sm text-gray-400">
            Logged in as: <span class="text-white">{{ user.email }}</span>
          </div>

          <div
            v-if="message"
            class="p-4 rounded-lg"
            :class="
              messageType === 'success'
                ? 'bg-green-500/20 text-green-300'
                : 'bg-red-500/20 text-red-300'
            "
          >
            {{ message }}
          </div>

          <button
            @click="createTestData"
            :disabled="loading"
            class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? "Creating..." : "Create Test Portfolio" }}
          </button>

          <div class="text-xs text-gray-500">
            This will create a test wallet with sample tokens (BTC, ETH, USDT,
            BNB, SOL)
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from "@supabase/supabase-js";

const { getUser, addWallet, saveTokens } = useSupabase();

const user = ref<User | null>(null);
const loading = ref(false);
const message = ref("");
const messageType = ref<"success" | "error">("success");

onMounted(async () => {
  user.value = await getUser();
});

const createTestData = async () => {
  loading.value = true;
  message.value = "";

  try {
    if (!user.value) {
      throw new Error("User not logged in");
    }

    // Create a test wallet
    const testAddress = "0x" + Math.random().toString(16).substring(2, 42);
    const { data: wallet, error: walletError } = await addWallet(
      user.value.id,
      testAddress,
      "ethereum"
    );

    if (walletError) throw walletError;
    if (!wallet || wallet.length === 0)
      throw new Error("Failed to create wallet");

    console.log("Wallet created:", wallet[0]);

    // Create test tokens
    const testTokens = [
      { symbol: "BTC", balance: 0.5 },
      { symbol: "ETH", balance: 5 },
      { symbol: "USDT", balance: 10000 },
      { symbol: "BNB", balance: 20 },
      { symbol: "SOL", balance: 100 },
    ];

    // Fetch current prices to calculate USD values
    const { fetchPricesBySymbols, symbolToId, symbolToName } = usePrices();
    const symbols = testTokens.map((t) => t.symbol);
    const prices = await fetchPricesBySymbols(symbols);

    const tokensWithValues = testTokens.map((token) => {
      const coinId = symbolToId(token.symbol);
      const priceData = prices?.[coinId];
      const price = priceData?.usd || 0;

      return {
        wallet_id: wallet[0].id,
        name: symbolToName(token.symbol) || token.symbol,
        symbol: token.symbol,
        balance: token.balance,
        price: price,
        usd_value: token.balance * price,
      };
    });

    const { error: tokensError } = await saveTokens(
      wallet[0].id,
      tokensWithValues
    );

    if (tokensError) throw tokensError;

    message.value =
      "Test portfolio created successfully! Go to the dashboard to view it.";
    messageType.value = "success";

    // Redirect to dashboard after 2 seconds
    setTimeout(() => {
      navigateTo("/dashboard");
    }, 2000);
  } catch (err: unknown) {
    console.error("Error creating test data:", err);
    const errorMessage =
      err instanceof Error ? err.message : "Failed to create test data";
    message.value = errorMessage;
    messageType.value = "error";
  } finally {
    loading.value = false;
  }
};

useHead({
  title: "Setup Test Data",
});
</script>
