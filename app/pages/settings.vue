<template>
  <div class="min-h-screen px-6 py-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-2">Settings</h1>
        <p class="text-gray-400">Manage your account and preferences</p>
      </div>

      <!-- Profile Settings -->
      <div
        class="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl overflow-hidden mb-6"
      >
        <div class="border-b border-white/10 px-6 py-4">
          <h2 class="text-xl font-semibold text-white flex items-center gap-2">
            <Icon name="mdi:account-circle" class="h-6 w-6 text-blue-400" />
            Profile Information
          </h2>
        </div>
        <div class="p-6 space-y-6">
          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <div class="flex items-center gap-3">
              <input
                type="email"
                :value="user?.email"
                disabled
                class="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white disabled:opacity-60 disabled:cursor-not-allowed"
              />
              <button
                class="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-white/20 transition-colors"
                disabled
              >
                <Icon name="mdi:pencil" class="h-5 w-5" />
              </button>
            </div>
            <p class="text-xs text-gray-500 mt-2">Email cannot be changed</p>
          </div>

          <!-- Display Name -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Display Name
            </label>
            <div class="flex items-center gap-3">
              <input
                v-model="displayName"
                type="text"
                placeholder="Enter your display name"
                class="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              <button
                @click="saveDisplayName"
                :disabled="saving"
                class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all disabled:opacity-50"
              >
                {{ saving ? "Saving..." : "Save" }}
              </button>
            </div>
          </div>

          <!-- User ID -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              User ID
            </label>
            <div class="flex items-center gap-3">
              <input
                type="text"
                :value="user?.id"
                disabled
                class="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white disabled:opacity-60 font-mono text-sm"
              />
              <button
                @click="copyUserId"
                class="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:border-white/20 transition-colors"
                title="Copy User ID"
              >
                <Icon name="mdi:content-copy" class="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Currency Settings -->
      <div
        class="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl overflow-hidden mb-6"
      >
        <div class="border-b border-white/10 px-6 py-4">
          <h2 class="text-xl font-semibold text-white flex items-center gap-2">
            <Icon name="mdi:currency-usd" class="h-6 w-6 text-green-400" />
            Currency & Region
          </h2>
        </div>
        <div class="p-6 space-y-6">
          <!-- Default Currency -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Default Currency
            </label>
            <select
              v-model="defaultCurrency"
              class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
            </select>
          </div>

          <!-- Timezone -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Timezone
            </label>
            <select
              v-model="timezone"
              class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="UTC">UTC - Coordinated Universal Time</option>
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="Europe/London">London (GMT)</option>
              <option value="Europe/Paris">Paris (CET)</option>
              <option value="Asia/Tokyo">Tokyo (JST)</option>
              <option value="Asia/Shanghai">Shanghai (CST)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Notifications -->
      <div
        class="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl overflow-hidden mb-6"
      >
        <div class="border-b border-white/10 px-6 py-4">
          <h2 class="text-xl font-semibold text-white flex items-center gap-2">
            <Icon name="mdi:bell" class="h-6 w-6 text-yellow-400" />
            Notifications
          </h2>
        </div>
        <div class="p-6 space-y-4">
          <!-- Email Notifications -->
          <div
            class="flex items-center justify-between py-3 border-b border-white/5"
          >
            <div>
              <p class="font-medium text-white">Email Notifications</p>
              <p class="text-sm text-gray-400">
                Receive portfolio updates via email
              </p>
            </div>
            <button
              @click="emailNotifications = !emailNotifications"
              :class="[
                'relative w-14 h-7 rounded-full transition-colors',
                emailNotifications ? 'bg-blue-600' : 'bg-white/10',
              ]"
            >
              <span
                :class="[
                  'absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform',
                  emailNotifications && 'translate-x-7',
                ]"
              />
            </button>
          </div>

          <!-- Price Alerts -->
          <div
            class="flex items-center justify-between py-3 border-b border-white/5"
          >
            <div>
              <p class="font-medium text-white">Price Alerts</p>
              <p class="text-sm text-gray-400">
                Get notified when prices hit your targets
              </p>
            </div>
            <button
              @click="priceAlerts = !priceAlerts"
              :class="[
                'relative w-14 h-7 rounded-full transition-colors',
                priceAlerts ? 'bg-blue-600' : 'bg-white/10',
              ]"
            >
              <span
                :class="[
                  'absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform',
                  priceAlerts && 'translate-x-7',
                ]"
              />
            </button>
          </div>

          <!-- Transaction Updates -->
          <div
            class="flex items-center justify-between py-3 border-b border-white/5"
          >
            <div>
              <p class="font-medium text-white">Transaction Updates</p>
              <p class="text-sm text-gray-400">Notify me of new transactions</p>
            </div>
            <button
              @click="transactionUpdates = !transactionUpdates"
              :class="[
                'relative w-14 h-7 rounded-full transition-colors',
                transactionUpdates ? 'bg-blue-600' : 'bg-white/10',
              ]"
            >
              <span
                :class="[
                  'absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform',
                  transactionUpdates && 'translate-x-7',
                ]"
              />
            </button>
          </div>

          <!-- Weekly Summary -->
          <div class="flex items-center justify-between py-3">
            <div>
              <p class="font-medium text-white">Weekly Summary</p>
              <p class="text-sm text-gray-400">Get a weekly portfolio report</p>
            </div>
            <button
              @click="weeklySummary = !weeklySummary"
              :class="[
                'relative w-14 h-7 rounded-full transition-colors',
                weeklySummary ? 'bg-blue-600' : 'bg-white/10',
              ]"
            >
              <span
                :class="[
                  'absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform',
                  weeklySummary && 'translate-x-7',
                ]"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- Security -->
      <div
        class="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl overflow-hidden mb-6"
      >
        <div class="border-b border-white/10 px-6 py-4">
          <h2 class="text-xl font-semibold text-white flex items-center gap-2">
            <Icon name="mdi:shield-lock" class="h-6 w-6 text-red-400" />
            Security
          </h2>
        </div>
        <div class="p-6 space-y-4">
          <!-- Change Password -->
          <div
            class="flex items-center justify-between py-3 border-b border-white/5"
          >
            <div>
              <p class="font-medium text-white">Change Password</p>
              <p class="text-sm text-gray-400">Update your account password</p>
            </div>
            <button
              class="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors"
            >
              Change
            </button>
          </div>

          <!-- Two-Factor Authentication -->
          <div
            class="flex items-center justify-between py-3 border-b border-white/5"
          >
            <div>
              <p class="font-medium text-white">Two-Factor Authentication</p>
              <p class="text-sm text-gray-400">
                Add an extra layer of security
              </p>
            </div>
            <button
              class="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors"
            >
              Enable
            </button>
          </div>

          <!-- Active Sessions -->
          <div class="flex items-center justify-between py-3">
            <div>
              <p class="font-medium text-white">Active Sessions</p>
              <p class="text-sm text-gray-400">Manage your logged-in devices</p>
            </div>
            <button
              class="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors"
            >
              View
            </button>
          </div>
        </div>
      </div>

      <!-- Privacy -->
      <div
        class="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl overflow-hidden mb-6"
      >
        <div class="border-b border-white/10 px-6 py-4">
          <h2 class="text-xl font-semibold text-white flex items-center gap-2">
            <Icon name="mdi:eye-off" class="h-6 w-6 text-purple-400" />
            Privacy
          </h2>
        </div>
        <div class="p-6 space-y-4">
          <!-- Portfolio Visibility -->
          <div
            class="flex items-center justify-between py-3 border-b border-white/5"
          >
            <div>
              <p class="font-medium text-white">Public Portfolio</p>
              <p class="text-sm text-gray-400">
                Allow others to view your portfolio
              </p>
            </div>
            <button
              @click="publicPortfolio = !publicPortfolio"
              :class="[
                'relative w-14 h-7 rounded-full transition-colors',
                publicPortfolio ? 'bg-blue-600' : 'bg-white/10',
              ]"
            >
              <span
                :class="[
                  'absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform',
                  publicPortfolio && 'translate-x-7',
                ]"
              />
            </button>
          </div>

          <!-- Data Sharing -->
          <div class="flex items-center justify-between py-3">
            <div>
              <p class="font-medium text-white">Analytics & Performance</p>
              <p class="text-sm text-gray-400">Share anonymous usage data</p>
            </div>
            <button
              @click="dataSharing = !dataSharing"
              :class="[
                'relative w-14 h-7 rounded-full transition-colors',
                dataSharing ? 'bg-blue-600' : 'bg-white/10',
              ]"
            >
              <span
                :class="[
                  'absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform',
                  dataSharing && 'translate-x-7',
                ]"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- Danger Zone -->
      <div
        class="rounded-2xl border border-red-500/30 bg-red-500/5 backdrop-blur-xl overflow-hidden mb-6"
      >
        <div class="border-b border-red-500/20 px-6 py-4">
          <h2
            class="text-xl font-semibold text-red-400 flex items-center gap-2"
          >
            <Icon name="mdi:alert-octagon" class="h-6 w-6" />
            Danger Zone
          </h2>
        </div>
        <div class="p-6 space-y-4">
          <!-- Export Data -->
          <div
            class="flex items-center justify-between py-3 border-b border-red-500/10"
          >
            <div>
              <p class="font-medium text-white">Export Your Data</p>
              <p class="text-sm text-gray-400">
                Download all your portfolio data
              </p>
            </div>
            <button
              class="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors"
            >
              Export
            </button>
          </div>

          <!-- Delete Account -->
          <div class="flex items-center justify-between py-3">
            <div>
              <p class="font-medium text-red-400">Delete Account</p>
              <p class="text-sm text-gray-400">
                Permanently delete your account and data
              </p>
            </div>
            <button
              @click="showDeleteConfirm = true"
              class="px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div
        v-if="showDeleteConfirm"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        @click.self="showDeleteConfirm = false"
      >
        <div
          class="rounded-2xl border border-red-500/30 bg-black/90 p-6 max-w-md w-full"
        >
          <div class="flex items-center gap-3 mb-4">
            <Icon name="mdi:alert-circle" class="h-8 w-8 text-red-400" />
            <h3 class="text-xl font-bold text-white">Delete Account?</h3>
          </div>
          <p class="text-gray-300 mb-6">
            This action cannot be undone. All your data, wallets, and
            transaction history will be permanently deleted.
          </p>
          <div class="flex gap-3">
            <button
              @click="showDeleteConfirm = false"
              class="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              class="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-xl text-white font-semibold transition-colors"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from "@supabase/supabase-js";

definePageMeta({
  layout: "dashboard",
});

const { getUser } = useSupabase();

const user = ref<User | null>(null);
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
  user.value = await getUser();
  if (user.value?.email) {
    displayName.value = user.value.email.split("@")[0];
  }
});

const saveDisplayName = () => {
  saving.value = true;
  // Simulate save
  setTimeout(() => {
    saving.value = false;
    // Show success notification (you can add a toast here)
    alert("Display name saved successfully!");
  }, 1000);
};

const copyUserId = () => {
  if (user.value?.id) {
    navigator.clipboard.writeText(user.value.id);
    // Show success notification (you can add a toast here)
    alert("User ID copied to clipboard!");
  }
};

useHead({
  title: "Settings",
});
</script>
