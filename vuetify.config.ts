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
    background: '#FFFFFF',
    primary: '#1173d4',
    secondary: '#03DAC6',
    error: '#B00020',
    surface: '#FFFFFF',
    onPrimary: '#FFFFFF',
    onSecondary: '#000000',
    onError: '#FFFFFF',
    onSurface: '#000000',
    sidebarPrimary: '#3b3b3b',
    sidebarBackground: '#FFFFFF',
    'grey-lighten-2': '#E0E0E0',
    'grey-lighten-3': '#EEEEEE',
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
