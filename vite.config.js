import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname),
      '@': path.resolve(__dirname, './src'),
      '@abi': path.resolve(__dirname, './artifacts/contracts'),
    },
  },
  build: {
    minify: false,
  },

  // https://github.com/vitejs/vite/issues/5519
  css: { preprocessorOptions: { scss: { charset: false } } },
})
