<template>
  <v-app>
    <v-layout full-height>
      <Sidebar v-if="user" />
      <v-main>
        <router-view />
      </v-main>
    </v-layout>
    <Settings v-if="user" />
  </v-app>
</template>

<script lang="ts">
  import Sidebar from "@/components/ui/sidebar/Sidebar.vue";
  import Settings from "@/components/ui/settings/Settings.vue";
  import useSupabaseSession from "./composables/useSupabaseSession.ts";

  export default {
    components: {
      Sidebar,
      Settings,
    },
    setup() {
      const { session, user } = useSupabaseSession();
      
      return {
        user,
        session,
      };
    },
  };
</script>

<style lang="scss" scoped></style>
