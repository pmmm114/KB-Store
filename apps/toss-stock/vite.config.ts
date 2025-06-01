/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';
import * as path from 'path';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/toss-stock',
  server: {
    port: 4200,
    host: 'localhost',
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  plugins: [
    react(),
    nxCopyAssetsPlugin(['*.md', 'package.json']),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.app.json'),
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // '@kb-store/react-shadcn-ui': path.resolve(
      //   __dirname,
      //   '../../libs/react/shadcn-ui',
      // ),
      '@kb-store/react-shadcn-ui/styles': path.resolve(
        __dirname,
        '../../libs/react/shadcn-ui/src/styles/_global.css',
      ),
      '@kb-store/design-system-core': path.resolve(
        __dirname,
        '../../libs/design-system/core/src/styles/_core.css',
      ),
    },
  },
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      name: '@kb-store/toss-stock',
      entry: 'src/main.tsx',
      formats: ['es' as const],
    },
  },
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/apps/toss-stock',
      provider: 'v8' as const,
    },
  },
}));
