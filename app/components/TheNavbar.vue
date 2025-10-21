<template>
  <nav
    class="sticky top-0 z-40 border-b border-white/10 bg-black/30 backdrop-blur-2xl"
  >
    <div
      class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
    >
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-3 text-white flex-shrink-0">
        <span
          class="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 shadow-lg"
        >
          <Icon name="logos:nuxt-icon" class="h-6 w-6" />
        </span>
        <span class="hidden sm:flex flex-col leading-tight">
          <span class="text-xs uppercase tracking-[0.45em] text-gray-400">
            CoinFlow
          </span>
          <span class="text-lg font-semibold">Portfolio</span>
        </span>
      </NuxtLink>

      <!-- Center Section - Search Bar OR Navigation Links -->
      <div class="hidden lg:flex items-center flex-1 justify-center px-8">
        <!-- Search Bar (only if not logged in) -->
        <div v-if="!user" class="relative w-full max-w-md">
          <span
            class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            <Icon name="mdi:magnify" class="h-4 w-4" />
          </span>
          <input
            class="w-full rounded-2xl border border-white/10 bg-white/5 py-2 pl-11 pr-4 text-sm text-gray-200 placeholder:text-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
            placeholder="Search assets..."
            type="search"
            name="navbar-search"
          />
        </div>

        <!-- Navigation Links (when logged in) -->
        <div v-else class="flex items-center gap-1">
          <NuxtLink to="/dashboard" :class="linkClass('/dashboard')">
            <Icon name="mdi:view-dashboard" class="h-4 w-4" />
            <span>Dashboard</span>
          </NuxtLink>
          <NuxtLink to="/assets" :class="linkClass('/assets')">
            <Icon name="mdi:wallet" class="h-4 w-4" />
            <span>Assets</span>
          </NuxtLink>
          <NuxtLink to="/transactions" :class="linkClass('/transactions')">
            <Icon name="mdi:swap-horizontal" class="h-4 w-4" />
            <span>Transactions</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Right Side Actions -->
      <div class="flex items-center gap-3 flex-shrink-0">
        <template v-if="user">
          <!-- Add Wallet Button -->
          <NuxtLink
            to="/add-wallet"
            class="hidden md:flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:from-blue-700 hover:to-purple-700"
          >
            <Icon name="mdi:plus" class="h-4 w-4" />
            <span>Add Wallet</span>
          </NuxtLink>

          <!-- User Menu -->
          <div class="relative group">
            <button
              class="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 transition-all hover:bg-white/10 hover:border-white/20"
            >
              <span
                class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-purple-500 text-xs font-semibold text-white"
              >
                {{ userInitials }}
              </span>
              <span
                class="hidden sm:block text-sm font-medium text-white max-w-[100px] truncate"
              >
                {{ userName }}
              </span>
              <Icon
                name="mdi:chevron-down"
                class="h-4 w-4 text-gray-400 flex-shrink-0"
              />
            </button>

            <!-- Dropdown Menu -->
            <div
              class="absolute right-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 rounded-xl border border-white/10 bg-black/90 backdrop-blur-xl shadow-xl overflow-hidden"
            >
              <div class="p-3 border-b border-white/10">
                <p class="text-xs text-gray-400">Signed in as</p>
                <p class="text-sm font-medium text-white truncate">
                  {{ user.email }}
                </p>
              </div>
              <div class="p-2">
                <NuxtLink
                  to="/settings"
                  class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Icon name="mdi:cog" class="h-5 w-5" />
                  Settings
                </NuxtLink>
                <button
                  class="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                  @click="handleSignOut"
                >
                  <Icon name="mdi:logout" class="h-5 w-5" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </template>

        <template v-else>
          <NuxtLink
            to="/login"
            class="rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition-transform hover:scale-105"
          >
            Login
          </NuxtLink>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
const { getUser, signOut } = useSupabase();
const router = useRouter();
const route = useRoute();
const user = ref(null);

onMounted(async () => {
  user.value = await getUser();
});

const userInitials = computed(() => {
  if (!user.value?.email) {
    return "";
  }
  return user.value.email.charAt(0).toUpperCase();
});

const userName = computed(() => {
  if (!user.value?.email) return "User";
  const emailName = user.value.email.split("@")[0];
  return emailName.charAt(0).toUpperCase() + emailName.slice(1);
});

const linkClass = (path) => {
  const isActive = route.path === path;
  return [
    "flex items-center gap-2 rounded-xl px-4 py-2 transition-all text-sm font-medium",
    isActive
      ? "bg-white/15 text-white"
      : "text-gray-400 hover:text-white hover:bg-white/10",
  ];
};

const handleSignOut = async () => {
  await signOut();
  user.value = null;
  router.push("/");
};
</script>
