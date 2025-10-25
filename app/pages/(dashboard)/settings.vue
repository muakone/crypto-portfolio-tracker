<template>
  <div class="min-h-screen px-6 py-8 lg:py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header (Desktop Only) -->
      <div class="mb-8 hidden lg:block">
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
          Settings
        </h1>
        <p class="text-gray-400">Manage your account and preferences</p>
      </div>

      <SettingsProfile
        :user="user"
        :display-name="displayName"
        :saving="saving"
        @update:displayName="(v) => (displayName = v)"
        @save="saveDisplayName"
        @copy-user-id="copyUserId"
      />

      <SettingsCurrency
        :default-currency="defaultCurrency"
        :timezone="timezone"
        @update:defaultCurrency="(v) => (defaultCurrency = v)"
        @update:timezone="(v) => (timezone = v)"
      />

      <SettingsNotifications
        :email-notifications="emailNotifications"
        :price-alerts="priceAlerts"
        :transaction-updates="transactionUpdates"
        :weekly-summary="weeklySummary"
        @update:emailNotifications="(v) => (emailNotifications = v)"
        @update:priceAlerts="(v) => (priceAlerts = v)"
        @update:transactionUpdates="(v) => (transactionUpdates = v)"
        @update:weeklySummary="(v) => (weeklySummary = v)"
      />

      <SettingsSecurity />

      <SettingsPrivacy
        :public-portfolio="publicPortfolio"
        :data-sharing="dataSharing"
        @update:publicPortfolio="(v) => (publicPortfolio = v)"
        @update:dataSharing="(v) => (dataSharing = v)"
      />

      <SettingsDangerZone @confirm-delete="showDeleteConfirm = true" />

      <SettingsDeleteModal
        :show="showDeleteConfirm"
        @close="showDeleteConfirm = false"
        @delete="handleDelete"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import SettingsProfile from "~/components/SettingsProfile.vue";
import SettingsCurrency from "~/components/SettingsCurrency.vue";
import SettingsNotifications from "~/components/SettingsNotifications.vue";
import SettingsSecurity from "~/components/SettingsSecurity.vue";
import SettingsPrivacy from "~/components/SettingsPrivacy.vue";
import SettingsDangerZone from "~/components/SettingsDangerZone.vue";
import SettingsDeleteModal from "~/components/SettingsDeleteModal.vue";
import { useSettings } from "~/composables/useSettings";

definePageMeta({ layout: "dashboard", middleware: "auth" });

const {
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
} = useSettings();

useHead({ title: "Settings" });

const handleDelete = async () => {
  try {
    showDeleteConfirm.value = false;
    // TODO: implement deletion (Supabase / API). Placeholder log for now.
    console.log("Delete confirmed — implement deletion logic here");
  } catch (err) {
    console.error("Delete error:", err);
  }
};
</script>
