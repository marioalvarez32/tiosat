import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import ReceiptViewer from '../views/ReceiptViewer.vue';
import Uploader from '../views/Uploader.vue';
import { supabase } from '../lib/supabaseClient.ts';
import useSupabaseSession from '@/composables/useSupabaseSession.ts';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { 
        requiresAuth: true, 
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/receipt-viewer',
      name: 'receipt-viewer',
      component: ReceiptViewer,
      meta: { 
        requiresAuth: true, 
      },
    },
    {
      path: '/uploader',
      name: 'uploader',
      component: Uploader,
      meta: { 
        requiresAuth: false, 
      },
    },
  ],
});

// This is your new "auth middleware"
router.beforeEach(async (to, from, next) => {
  // Get the current user session
  const { user, initialize } = useSupabaseSession();
  await initialize();

  // Check if the route requires authentication
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);


  // 1. If the user is not logged in and the route requires auth, redirect to login
  if (requiresAuth && !user.value) {
    next({ name: 'login' });
  }  else if (to.name === 'login' && user.value) {
    next({ name: 'home' });
  }
  // 3. Otherwise, let the user proceed
  else {
    next();
  }
});

export default router;
