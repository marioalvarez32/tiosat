<template>
  <v-dialog v-model='isSettingsOpen' class='settings' width='800' height='500'>
    <div class='settings__container'>
      <v-layout full-height>
        <SettingsSidebar />
        <SettingsMain />
      </v-layout>
      <div class='settings__close-btn'>
        <v-btn icon='mdi-window-close'
               variant='text'
               size='x-small'
               @click='toggleSettings'
        />
      </div>
    </div>
  </v-dialog>
</template>

<script lang="ts">
  import SettingsSidebar from '~/components/global/settings/components/SettingsSidebar.vue';
  import SettingsMain from '~/components/global/settings/components/SettingsMain.vue';
  import useSettingsModal from '~/composables/useSettingsModal';

  export default {
    components: {
      SettingsSidebar,
      SettingsMain,
    },
    setup() {
      const { isSettingsOpen, toggleSettings } = useSettingsModal();

      return {
        isSettingsOpen,
        toggleSettings,
      };
    },
  };
</script>

<style lang="scss" scoped>
.v-theme--dark :deep(.v-overlay__scrim) {
	background-color: rgb(var(--v-theme-background));
	opacity: 50%;
}

.settings__container {
	background-color: rgb(var(--v-theme-surface));
	height: 100%;
}

.settings__close-btn {
	position: absolute;
	right: 5px;
	top: 5px;
	z-index: 1000;
}
</style>
