<template>
  <div>
    <v-navigation-drawer class="settings__navigation">
      <h4>Configuración</h4>
      <v-list v-for="settingPage in settingPages" :key="settingPage.Name" density="compact">
        <v-list-item link
                     color="primary"
                     density="compact"
                     :active="settingPage.Name === selectedSettingPage"
                     @click="changeSettingPage(settingPage)">
          <template #prepend>
            <v-icon :icon="settingPage.Icon"/>
          </template>
          <v-list-item-title v-text="settingPage.Label"/>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
  import { toRefs } from 'vue';
  import { useSettingsStore } from '../store/SettingsStore';
  import type SettingsPage from '../models/SettingsPage';

  export default {
    setup() {
      const settingsStore = useSettingsStore();
      const { selectedSettingPage, settingPages } = toRefs(settingsStore);

      function changeSettingPage(settingPage: SettingsPage) {
        selectedSettingPage.value = settingPage.Name;
      }
      return {
        settingPages,
        selectedSettingPage,
        changeSettingPage,
      };
    },
  };
</script>

<style lang="scss" scoped>
:deep(.v-navigation-drawer__content) {
  margin: 25px;
}
</style>
