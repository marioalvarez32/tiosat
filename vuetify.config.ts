// vuetify.config.ts
// import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import type { ThemeDefinition } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader
import useSettings from './src/components/ui/settings/composables/useSettings';
import { VFileUpload } from 'vuetify/labs/VFileUpload';

const { settings } = useSettings();

const light: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#f5f5f5',
    primary: '#1173d4',
    secondary: '#03DAC6',
    error: '#B00020',
    surface: '#fdfdfd',
    onPrimary: '#fdfdfd',
    onSecondary: '#000000',
    onError: '#fdfdfd',
    onSurface: '#000000',
    sidebarPrimary: '#3b3b3b',
    sidebarBackground: '#fdfdfd',
  },
};

const vuetify = createVuetify({
  components: {
    ...components,
    VFileUpload,
  },
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light,
    },
  },
});

export default vuetify;
