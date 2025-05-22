import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  "./apps/react-example-01/vite.config.ts",
  "./apps/react-example-01/vite.config.codesandbox.ts",
  "./apps/toss-stock/vite.config.ts",
  "./libs/design-system/react/vite.config.mts",
  "./libs/react/shadcn-ui/vite.config.mts",
  "./libs/design-system/core/vite.config.ts"
])
