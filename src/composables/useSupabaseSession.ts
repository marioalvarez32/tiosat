import { ref, readonly } from "vue";
import { supabase } from "../lib/supabaseClient";
import type { Session, User } from "@supabase/supabase-js";

// Shared singleton state
const session = ref<Session | null>(null);
const user = ref<User | null>(null);
let initPromise: Promise<void> | null = null;

// Initialize session once and return a promise
function initializeSession(): Promise<void> {
  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      session.value = data.session;
      user.value = data.session?.user || null;
    } catch (error) {
      console.error("Failed to get session:", error);
      session.value = null;
      user.value = null;
    }

    // Set up listener only once
    supabase.auth.onAuthStateChange((_, _session) => {
      session.value = _session;
      user.value = _session?.user || null;
    });
  })();

  return initPromise;
}

export default function useSupabaseSession() {
  return {
    session: readonly(session),
    user: readonly(user),
    initialize: initializeSession,
  };
}