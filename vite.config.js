// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:7064',
        changeOrigin: true,
        secure: false, // если используете self-signed certificates
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
})