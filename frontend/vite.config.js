import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,         // 🔥 This makes the server visible over network
    port: 5173,              // Optional: make sure you know the port
    proxy: {
      '/api': {
        target: 'http://localhost:3000/', // points to backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
})