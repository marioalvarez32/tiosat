<template>
  <v-app>
    <v-layout full-height>
      <Sidebar v-if="user" />
      <v-main>
        <NuxtPage />
      </v-main>
    </v-layout>
    <Settings v-if="user" />
  </v-app>
</template>

<script lang="ts">
import Sidebar from "~/components/global/Sidebar/Sidebar.vue";
import Settings from "~/components/global/Settings/Settings.vue";

export default {
  components: {
    Sidebar,
    Settings,
  },
  setup() {
    const user = useSupabaseUser();
    const session = useSupabaseSession();

    return {
      user,
      session,
    };
  },
};
</script>

<style lang="scss" scoped></style>
