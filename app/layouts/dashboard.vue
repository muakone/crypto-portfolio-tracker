<template>
  <div
    v-if="!isCheckingAuth && isAuthenticated"
    class="app-shell text-slate-100"
  >
    <!-- Background Effects -->
    <div class="app-shell__grid" aria-hidden="true" />
    <div class="app-shell__aurora" aria-hidden="true" />
    <div class="app-shell__beam" aria-hidden="true" />
    <div class="app-shell__orb app-shell__orb--violet" aria-hidden="true" />
    <div class="app-shell__orb app-shell__orb--teal" aria-hidden="true" />
    <div class="app-shell__orb app-shell__orb--blue" aria-hidden="true" />

    <!-- Sidebar (always visible on this layout) -->
    <DashboardSidebar ref="sidebarRef" />

    <!-- Mobile Navbar -->
    <DashboardMobileNav :page-title="pageTitle" @toggle-sidebar="openSidebar" />

    <!-- Main Content -->
    <div
      class="relative z-10 min-h-screen transition-all duration-300"
      :class="sidebarMargin"
    >
      <NuxtLoadingIndicator color="#3b82f6" />

      <!-- Main Content Area -->
      <main class="min-h-screen">
        <NuxtPage />
      </main>
    </div>
  </div>

  <!-- Loading State -->
  <div
    v-else-if="isCheckingAuth"
    class="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
  >
    <div class="text-center">
      <Icon
        name="mdi:loading"
        class="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4"
      />
      <p class="text-gray-400">Loading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const sidebarRef = ref();
const sidebarMargin = ref("lg:ml-64");
const isAuthenticated = ref(false);
const isCheckingAuth = ref(true);

// Check authentication
const checkAuth = async () => {
  const { getSession } = useSupabase();
  const session = await getSession();
  isAuthenticated.value = !!session;

  if (!session) {
    // Redirect to login if not authenticated
    await router.push("/login");
  }

  isCheckingAuth.value = false;
};

// Compute page title based on current route
const pageTitle = computed(() => {
  const titles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/analytics": "Analytics",
    "/assets": "All Assets",
    "/nfts": "NFT Gallery",
    "/transactions": "Transactions",
    "/defi": "DeFi Dashboard",
    "/settings": "Settings",
  };
  return titles[route.path] || "Dashboard";
});

// Open sidebar on mobile
const openSidebar = () => {
  if (sidebarRef.value) {
    sidebarRef.value.toggleSidebar();
  }
};

// Watch for sidebar collapse state changes
onMounted(async () => {
  // Check authentication first
  await checkAuth();

  const updateMargin = () => {
    const isCollapsed = localStorage.getItem("sidebarCollapsed") === "true";
    sidebarMargin.value = isCollapsed ? "lg:ml-20" : "lg:ml-64";
  };

  updateMargin();

  // Listen for storage changes
  window.addEventListener("storage", updateMargin);

  // Listen for custom event (for same-tab updates)
  const interval = setInterval(updateMargin, 100);

  onUnmounted(() => {
    window.removeEventListener("storage", updateMargin);
    clearInterval(interval);
  });
});

// Watch route changes to recheck auth
watch(
  () => route.path,
  async () => {
    if (route.path !== "/login") {
      await checkAuth();
    }
  }
);

useHead({
  titleTemplate: "%s - Crypto Portfolio Tracker",
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ],
});
</script>
