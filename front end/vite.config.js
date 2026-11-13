import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Send /api requests to the Express backend
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
})
