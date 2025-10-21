export default defineNuxtRouteMiddleware(async (to) => {
  // Skip middleware on server-side rendering
  if (import.meta.server) {
    return;
  }

  const { getSession } = useSupabase();
  const session = await getSession();

  // Protected routes that require authentication (all dashboard pages)
  const protectedRoutes = [
    "/dashboard",
    "/add-wallet",
    "/analytics",
    "/assets",
    "/nfts",
    "/transactions",
    "/defi",
    "/settings",
  ];
  const isProtectedRoute = protectedRoutes.some((route) =>
    to.path.startsWith(route)
  );

  // If trying to access protected route without session, redirect to login
  if (isProtectedRoute && !session) {
    return navigateTo("/login");
  }

  // If logged in and trying to access login page, redirect to dashboard
  if (session && to.path === "/login") {
    return navigateTo("/dashboard");
  }
});
