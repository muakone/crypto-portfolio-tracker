import { ref, onMounted } from "vue";
import { useSupabase } from "~/composables/useSupabase";

export const useSettings = () => {
  const { getUser } = useSupabase();

  const user = ref<any | null>(null);
  const displayName = ref("");
  const saving = ref(false);
  const showDeleteConfirm = ref(false);

  // Currency & Region
  const defaultCurrency = ref("USD");
  const timezone = ref("UTC");

  // Notifications
  const emailNotifications = ref(true);
  const priceAlerts = ref(true);
  const transactionUpdates = ref(false);
  const weeklySummary = ref(true);

  // Privacy
  const publicPortfolio = ref(false);
  const dataSharing = ref(true);

  onMounted(async () => {
    try {
      const u = await getUser();
      user.value = u;
      if (user.value?.email) {
        const parts = user.value.email.split("@");
        displayName.value = parts[0] || "";
      }
    } catch (err) {
      console.error("useSettings: failed to load user", err);
    }
  });

  const saveDisplayName = async () => {
    saving.value = true;
    // TODO: persist display name to backend when available
    await new Promise((r) => setTimeout(r, 800));
    saving.value = false;
    return true;
  };

  const copyUserId = async () => {
    if (user.value?.id) {
      await navigator.clipboard.writeText(user.value.id);
      return true;
    }
    return false;
  };

  return {
    user,
    displayName,
    saving,
    showDeleteConfirm,
    defaultCurrency,
    timezone,
    emailNotifications,
    priceAlerts,
    transactionUpdates,
    weeklySummary,
    publicPortfolio,
    dataSharing,
    saveDisplayName,
    copyUserId,
  };
};

export type UseSettingsReturn = ReturnType<typeof useSettings>;
