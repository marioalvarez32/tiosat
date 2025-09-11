import { ref } from 'vue';

const isSettingsOpen = ref(false);

export default function useSettingsModal() {
  return {
    isSettingsOpen,
    toggleSettings,
  };
}

function toggleSettings() {
  console.log("🚀 ~ toggleSettings ~ isSettingsOpen.value:", isSettingsOpen.value)

  isSettingsOpen.value = !isSettingsOpen.value;
}
