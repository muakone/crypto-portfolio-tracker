import { ref, computed, onMounted } from "vue";
import { useSupabase } from "~/composables/useSupabase";
import { usePortfolio } from "~/composables/usePortfolio";
import { formatCurrency, formatAmount } from "~/utils/format";

export const useAssets = () => {
  const { getUser, getWallets } = useSupabase();
  const { refreshPortfolio, tokens, totalValue, loading } = usePortfolio();

  const user = ref<any | null>(null);
  const wallets = ref<any[]>([]);

  // Pagination
  const currentPage = ref(1);
  const itemsPerPage = ref(10);

  const sortedTokens = computed(() => {
    return [...tokens.value].sort(
      (a: any, b: any) => (b.usd_value || 0) - (a.usd_value || 0)
    );
  });

  const paginatedTokens = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return sortedTokens.value.slice(start, end);
  });

  const totalPages = computed(() =>
    Math.ceil(sortedTokens.value.length / itemsPerPage.value)
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) currentPage.value = page;
  };

  const topAsset = computed(() => sortedTokens.value[0]);

  const total24hChange = computed(() => {
    if (tokens.value.length === 0) return 0;
    const totalChangeValue = tokens.value.reduce(
      (sum: number, token: any) => sum + (token.change_24h_value || 0),
      0
    );
    return totalValue.value > 0
      ? (totalChangeValue / totalValue.value) * 100
      : 0;
  });

  const getTokenIcon = (symbol: string) => {
    const icons: Record<string, string> = {
      BTC: "₿",
      ETH: "Ξ",
      USDT: "₮",
      BNB: "◆",
      SOL: "◎",
      XRP: "✕",
      ADA: "₳",
      DOGE: "Ð",
      DOT: "●",
      MATIC: "◇",
    };
    return icons[symbol?.toUpperCase()] || "◆";
  };

  const getAllocation = (value: number): number => {
    return totalValue.value > 0 ? (value / totalValue.value) * 100 : 0;
  };

  const refresh = async () => {
    if (user.value) {
      await refreshPortfolio(user.value.id);
    }
  };

  onMounted(async () => {
    const currentUser = await getUser();
    if (!currentUser) {
      // leave navigation to the page that owns this composable
      return;
    }
    user.value = currentUser as any;
    await refreshPortfolio(currentUser.id);

    const { data } = await getWallets(currentUser.id);
    if (data) wallets.value = data;
  });

  return {
    user,
    wallets,
    tokens,
    totalValue,
    loading,
    currentPage,
    itemsPerPage,
    sortedTokens,
    paginatedTokens,
    totalPages,
    goToPage,
    topAsset,
    total24hChange,
    getTokenIcon,
    getAllocation,
    refresh,
    formatCurrency,
    formatAmount,
  };
};

export type UseAssetsReturn = ReturnType<typeof useAssets>;
