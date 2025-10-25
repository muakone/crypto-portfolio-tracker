import { ref, computed, onMounted, onUnmounted } from "vue";
import { useSupabase } from "~/composables/useSupabase";
import { usePortfolio } from "~/composables/usePortfolio";
import { useWallet } from "~/composables/useWallet";
import type {
  Token as SharedToken,
  Transaction as SharedTransaction,
} from "~~/shared/types";

export function useDashboard() {
  const { getUser, getWallets } = useSupabase();
  const {
    refreshPortfolio,
    loading: portfolioLoading,
    tokens,
    totalValue,
    distribution,
  } = usePortfolio();
  const { getTransactionHistory } = useWallet();

  // Local Wallet type
  type Wallet = {
    address: string;
    chain: string;
    [key: string]: unknown;
  };

  // Refs
  interface User {
    id: string;
    // Add other user properties as needed
  }
  const user = ref<User | null>(null); // Use 'User' type instead of 'any'
  const loading = ref<boolean>(true);
  const lastSync = ref<Date>(new Date());
  const transactions = ref<SharedTransaction[]>([]);
  const txLoading = ref<boolean>(false);
  const primaryWalletAddress = ref<string>("");
  const isSidebarCollapsed = ref<boolean>(false);

  const displayTokens = computed<SharedToken[]>(() => {
    return [...(tokens.value as SharedToken[])]
      .sort((a, b) => (b.usd_value || 0) - (a.usd_value || 0))
      .slice(0, 5);
  });
  const displayTotalValue = computed<number>(() => totalValue.value as number);
  const dummyDistribution = computed(() => distribution.value);

  const totalChange = computed<number>(() => {
    const arr = tokens.value as SharedToken[];
    if (arr.length === 0) return 0;
    const totalChangeValue = arr.reduce(
      (sum, token) => sum + (token.change_24h_value || 0),
      0
    );
    const total = totalValue.value as number;
    return total > 0 ? (totalChangeValue / total) * 100 : 0;
  });

  const totalChangeAmount = computed<number>(() => {
    const arr = tokens.value as SharedToken[];
    return arr.reduce((sum, token) => sum + (token.change_24h_value || 0), 0);
  });

  const loadTransactions = async (): Promise<void> => {
    if (!user.value) return;
    txLoading.value = true;
    try {
      const { data: wallets } = await getWallets(user.value.id);
      if (!wallets || wallets.length === 0) return;
      primaryWalletAddress.value = wallets[0].address;
      const allTxs: SharedTransaction[] = [];
      for (const wallet of wallets as Wallet[]) {
        const txs: SharedTransaction[] = await getTransactionHistory(
          wallet.address,
          wallet.chain,
          20
        );
        allTxs.push(...txs);
      }
      transactions.value = allTxs.sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
      console.error("Error loading transactions:", error);
    } finally {
      txLoading.value = false;
    }
  };

  const refresh = async (): Promise<void> => {
    const currentUser = user.value;
    if (currentUser) {
      await refreshPortfolio(currentUser.id);
      lastSync.value = new Date();
      await loadTransactions();
    }
  };

  onMounted(async () => {
    const updateCollapsedState = (): void => {
      isSidebarCollapsed.value =
        localStorage.getItem("sidebarCollapsed") === "true";
    };
    updateCollapsedState();
    const interval = setInterval(updateCollapsedState, 100);
    onUnmounted(() => {
      clearInterval(interval);
    });
    loading.value = true;
    user.value = await getUser();
    const currentUser = user.value;
    if (currentUser) {
      await refreshPortfolio(currentUser.id);
      lastSync.value = new Date();
      await loadTransactions();
    }
    loading.value = false;
  });

  return {
    user,
    loading,
    lastSync,
    transactions,
    txLoading,
    primaryWalletAddress,
    isSidebarCollapsed,
    displayTokens,
    displayTotalValue,
    dummyDistribution,
    totalChange,
    totalChangeAmount,
    portfolioLoading,
    refresh,
    loadTransactions,
  };
}
