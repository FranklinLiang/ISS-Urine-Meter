import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "https://blog.franklinliang.com/Live-ISS-Urine-Meter/",
})
