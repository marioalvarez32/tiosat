// File: app/middleware/auth.global.ts

export default defineNuxtRouteMiddleware((to, from) => {
  // We'll use a Supabase composable to check for the current user.
  // This composable would typically get the user from a cookie.
  const user = useSupabaseUser();

  // If the user is not logged in and is trying to access any page
  // that is NOT the login page, redirect them to the login page.
  if (!user.value && to.path !== '/login') {
    // The `MapsTo` helper is Nuxt's built-in way to redirect.
    return navigateTo('/login');
  }

  // If the user IS logged in and tries to visit the login page,
  // redirect them to a protected page, like the dashboard.
  if (user.value && to.path === '/login') {
    return navigateTo('/');
  }

  // If none of the above conditions are met, the user can proceed.
});