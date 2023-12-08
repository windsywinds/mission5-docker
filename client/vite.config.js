import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    strictport: true,
    port: 5173,
  },
  plugins: [react()],
})
