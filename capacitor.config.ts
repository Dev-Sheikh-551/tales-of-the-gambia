import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.talesofthegambia.app',
  appName: 'Tales of The Gambia',
  webDir: 'out',
  backgroundColor: '#12100E',
  server: {
    androidScheme: 'https',
    cleartext: false,
  },
  android: {
    backgroundColor: '#12100E',
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: process.env.NODE_ENV !== 'production',
  },
  plugins: {
    StatusBar: {
      backgroundColor: '#12100E',
      style: 'DARK', // DARK style means light text/icons on dark background
    },
    Keyboard: {
      resize: 'body',
    },
  },
};

export default config;

