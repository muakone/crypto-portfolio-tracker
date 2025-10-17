<template>
  <div class="app-shell text-slate-100">
    <!-- Background Effects -->
    <div class="app-shell__grid" aria-hidden="true" />
    <div class="app-shell__aurora" aria-hidden="true" />
    <div class="app-shell__beam" aria-hidden="true" />
    <div class="app-shell__orb app-shell__orb--violet" aria-hidden="true" />
    <div class="app-shell__orb app-shell__orb--teal" aria-hidden="true" />
    <div class="app-shell__orb app-shell__orb--blue" aria-hidden="true" />

    <!-- Sidebar -->
    <DashboardSidebar />

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
</template>

<script setup lang="ts">
const sidebarMargin = ref("lg:ml-64");

// Watch for sidebar collapse state changes
onMounted(() => {
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

useHead({
  titleTemplate: "%s - Crypto Portfolio Tracker",
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ],
});
</script>
