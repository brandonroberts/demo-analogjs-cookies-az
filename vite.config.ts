/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [analog({
    nitro: {
      // preset: 'azure',
      routeRules: {
        '/api/**': { proxy: { to: '/**' } }
      },
      externals: {
        inline: ['uuid', '@azure/msal-common', '@azure/msal-node', 'std-env']
      }
    }
  })],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
}));
