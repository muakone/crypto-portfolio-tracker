import { ref, computed, onMounted } from "vue";
import { useSupabase } from "~/composables/useSupabase";
import { useWallet } from "~/composables/useWallet";

export const useTransactions = () => {
  const { getUser, getWallets } = useSupabase();
  const { getTransactionHistory } = useWallet();

  const user = ref(null);
  const wallets = ref<any[]>([]);
  const transactions = ref<any[]>([]);
  const loading = ref(true);

  const selectedWallet = ref("all");
  const selectedType = ref("all");

  const currentPage = ref(1);
  const itemsPerPage = ref(20);

  const filteredTransactions = computed(() => {
    let filtered = transactions.value;

    if (selectedWallet.value !== "all") {
      const wallet = wallets.value.find((w) => w.id === selectedWallet.value);
      if (wallet) {
        filtered = filtered.filter(
          (tx) =>
            tx.from.toLowerCase() === wallet.address.toLowerCase() ||
            tx.to.toLowerCase() === wallet.address.toLowerCase()
        );
      }
    }

    if (selectedType.value !== "all") {
      filtered = filtered.filter((tx) => {
        if (selectedType.value === "sent") return tx.isOutgoing;
        if (selectedType.value === "received") return !tx.isOutgoing;
        return true;
      });
    }

    return filtered;
  });

  const paginatedTransactions = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredTransactions.value.slice(start, end);
  });

  const totalPages = computed(() =>
    Math.ceil(filteredTransactions.value.length / itemsPerPage.value)
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) currentPage.value = page;
  };

  const loadTransactions = async () => {
    loading.value = true;
    try {
      const currentUser = await getUser();
      if (!currentUser) {
        // leave navigation to caller
        return;
      }
      user.value = currentUser;

      const { data: walletsData } = await getWallets(currentUser.id);
      if (walletsData) {
        wallets.value = walletsData;

        const allTransactions: any[] = [];
        for (const wallet of walletsData) {
          const txs = await getTransactionHistory(
            wallet.address,
            wallet.chain,
            100
          );
          const txsWithInfo = txs.map((tx: any) => ({
            ...tx,
            walletId: wallet.id,
            walletAddress: wallet.address,
            isOutgoing: tx.from.toLowerCase() === wallet.address.toLowerCase(),
          }));
          allTransactions.push(...txsWithInfo);
        }

        transactions.value = allTransactions.sort(
          (a, b) => b.timestamp - a.timestamp
        );
      }
    } catch (err) {
      console.error("Error loading transactions:", err);
    } finally {
      loading.value = false;
    }
  };

  const refreshTransactions = async () => {
    currentPage.value = 1;
    await loadTransactions();
  };

  // Formatting helpers
  const formatAddress = (address: string) => {
    if (!address || address.length < 10) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatHash = (hash: string) =>
    `${hash.slice(0, 10)}...${hash.slice(-8)}`;

  const formatFullTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getExplorerLink = (tx: any) => {
    if (tx.type === "ETH") return `https://etherscan.io/tx/${tx.hash}`;
    if (tx.type === "BTC")
      return `https://www.blockchain.com/btc/tx/${tx.hash}`;
    return "#";
  };

  onMounted(() => {
    loadTransactions();
  });

  return {
    user,
    wallets,
    transactions,
    loading,
    selectedWallet,
    selectedType,
    currentPage,
    itemsPerPage,
    filteredTransactions,
    paginatedTransactions,
    totalPages,
    goToPage,
    loadTransactions,
    refreshTransactions,
    formatAddress,
    formatHash,
    formatFullTime,
    getExplorerLink,
  };
};

export type UseTransactionsReturn = ReturnType<typeof useTransactions>;
