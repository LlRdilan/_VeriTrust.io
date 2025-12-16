import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración de Vite
// Añadimos `server.proxy` para redirigir llamadas a `/api` hacia el
// backend Spring Boot que corre en http://localhost:8080 durante desarrollo.
// Esto evita problemas de CORS y simplifica llamadas desde el frontend.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Todas las llamadas a /api/* serán proxied a http://localhost:8080
      // Ajusta `rewrite` si tu backend no espera el prefijo `/api`.
      '/api': {
        target: 'http://localhost:8080/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
})
