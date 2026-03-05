import { crx } from '@crxjs/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import manifest from './manifest.dev.json'

export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
    viteStaticCopy({
      targets: [
        { src: 'assets/locales', dest: './locales' },
      ],
    }),
  ],
  build: {
    outDir: 'extension',
  },
  resolve: {
    alias: {
      '~': '',
    },
  },
  server: {
    strictPort: true,
    port: 5174,
    hmr: {
      clientPort: 5174,
    },
  },
})
