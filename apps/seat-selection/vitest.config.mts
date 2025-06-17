import { defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config.mjs';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      watch: false,
      globals: true,
      environment: 'jsdom',
      include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      reporters: ['default'],
      coverage: {
        reportsDirectory: '../../coverage/apps/seat-selection',
        provider: 'v8' as const,
      },
      setupFiles: ['./vitest-setup.ts'],
    },
  }),
);
