<template>
  <aside
    class="fixed left-0 top-0 z-40 h-screen border-r border-white/10 bg-black/40 backdrop-blur-xl transition-all duration-300 flex flex-col"
    :class="[
      isCollapsed ? 'w-20' : 'w-64',
      !isOpen && 'max-lg:-translate-x-full',
    ]"
  >
    <!-- Logo/Brand with Close Button (Mobile) -->
    <div
      class="flex h-16 items-center border-b border-white/10 px-6 flex-shrink-0 justify-between"
      :class="{ 'justify-center px-0': isCollapsed }"
    >
      <NuxtLink
        to="/"
        class="flex items-center hover:opacity-80 transition-opacity"
        :class="{ 'mx-auto': isCollapsed }"
      >
        <div
          class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"
            />
          </svg>
        </div>
        <div v-if="!isCollapsed" class="ml-3">
          <h1 class="text-sm font-bold text-white">CoinFLow</h1>
          <p class="text-xs text-gray-400">Crypto Tracker Portfolio</p>
        </div>
      </NuxtLink>

      <!-- Close Button (Mobile Only) -->
      <button
        aria-label="Close sidebar"
        class="lg:hidden flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
        @click="toggleSidebar"
      >
        <Icon name="mdi:close" class="h-5 w-5" />
      </button>
    </div>

    <!-- Collapse Toggle Button (Desktop) -->
    <button
      class="hidden lg:flex absolute -right-3 top-20 h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all z-50"
      title="Toggle sidebar"
      @click="toggleCollapse"
    >
      <Icon
        :name="isCollapsed ? 'mdi:chevron-right' : 'mdi:chevron-left'"
        class="h-4 w-4"
      />
    </button>

    <!-- Navigation - Scrollable Area -->
    <nav class="flex-1 overflow-y-auto space-y-1 p-4">
      <NuxtLink
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-all"
        :class="[
          isActive(item.path)
            ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white shadow-lg shadow-blue-500/10 border border-blue-500/30'
            : 'text-gray-400 hover:bg-white/5 hover:text-white',
          isCollapsed ? 'justify-center' : 'gap-3',
        ]"
        :title="isCollapsed ? item.label : ''"
      >
        <Icon :name="item.icon" class="h-5 w-5 flex-shrink-0" />
        <span v-if="!isCollapsed">{{ item.label }}</span>
      </NuxtLink>
    </nav>

    <!-- User Profile - Always at Bottom -->
    <div class="border-t border-white/10 p-4 flex-shrink-0">
      <div
        class="flex items-center rounded-xl bg-white/5 p-3"
        :class="{ 'flex-col gap-2': isCollapsed, 'gap-3': !isCollapsed }"
      >
        <div
          class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white flex-shrink-0"
        >
          {{ userInitial }}
        </div>
        <div v-if="!isCollapsed" class="flex-1 min-w-0">
          <p class="text-sm font-medium text-white truncate">{{ userName }}</p>
          <p class="text-xs text-gray-400 truncate">{{ userEmail }}</p>
        </div>
        <button
          :title="isCollapsed ? 'Logout' : ''"
          class="text-gray-400 hover:text-white transition-colors flex-shrink-0"
          @click="handleLogout"
        >
          <Icon name="mdi:logout" class="h-5 w-5" />
        </button>
      </div>
    </div>
  </aside>

  <!-- Mobile Overlay -->
  <div
    v-if="isOpen"
    class="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
    @click="toggleSidebar"
  />
</template>

<script setup lang="ts">
import type { User } from "@supabase/supabase-js";

const route = useRoute();
const router = useRouter();
const { signOut, getUser } = useSupabase();

const isOpen = ref(false);
const isCollapsed = ref(false);
const user = ref<User | null>(null);

onMounted(async () => {
  user.value = await getUser();

  // Load collapsed state from localStorage
  const savedState = localStorage.getItem("sidebarCollapsed");
  if (savedState !== null) {
    isCollapsed.value = savedState === "true";
  }
});

const navItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: "mdi:view-dashboard",
  },
  {
    label: "Analytics",
    path: "/analytics",
    icon: "mdi:chart-line",
  },
  {
    label: "Assets",
    path: "/assets",
    icon: "mdi:wallet",
  },
  {
    label: "NFTs",
    path: "/nfts",
    icon: "mdi:image-multiple",
  },
  {
    label: "Transactions",
    path: "/transactions",
    icon: "mdi:swap-horizontal",
  },
  {
    label: "DeFi",
    path: "/defi",
    icon: "mdi:currency-usd",
  },
  {
    label: "Settings",
    path: "/settings",
    icon: "mdi:cog",
  },
];

const isActive = (path: string) => {
  return route.path === path;
};

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
  // Save state to localStorage
  localStorage.setItem("sidebarCollapsed", String(isCollapsed.value));
};

const userName = computed(() => {
  if (!user.value) return "Guest";
  return user.value.email?.split("@")[0] || "User";
});

const userEmail = computed(() => {
  if (!user.value) return "";
  return user.value.email || "";
});

const userInitial = computed(() => {
  return userName.value.charAt(0).toUpperCase();
});

const handleLogout = async () => {
  await signOut();
  router.push("/login");
};

// Expose toggleSidebar to parent components
defineExpose({
  toggleSidebar,
});
</script>
