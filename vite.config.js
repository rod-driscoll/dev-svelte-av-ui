import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [svelte()],
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
      },
      external: [
        './js/svg-inject.js',
        './js/hls.js',
        './js/jsmpeg.min.js',
        './sw.js',
        './pwa/sw-start.js'
      ]
    }
  },
  // Ensure these files are treated as public assets
  publicDir: 'public'
})
