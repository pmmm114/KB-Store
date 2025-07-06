import { defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  {
    root: __dirname,
  },
  defineConfig({
    test: {
      watch: false,
      globals: true,
      environment: 'jsdom',
      include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      reporters: ['default'],
      coverage: {
        reportsDirectory: '../../coverage/apps/tarote',
        provider: 'v8' as const,
      },
      setupFiles: ['./vitest-setup.ts'],
    },
    optimizeDeps: {
      include: ['sb-original/image-context'],
    },
  }),
);
