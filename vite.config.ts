//vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://platform-backend.getalchemystai.com',
        changeOrigin: true,
        secure: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});