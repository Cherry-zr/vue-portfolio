import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const douguoProxy = {
  target: 'https://apis.netstart.cn',
  changeOrigin: true,
  rewrite: (path: string) => path.replace(/^\/douguo-api/, '/douguo'),
}

const pagesBase = '/vue-portfolio/douguo/'

// https://vite.dev/config/
export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? pagesBase : '/',
  plugins: [vue()],
  server: {
    port: 5174,
    proxy: {
      '/douguo-api': douguoProxy,
    },
  },
  preview: {
    proxy: {
      '/douguo-api': douguoProxy,
    },
  },
}))
