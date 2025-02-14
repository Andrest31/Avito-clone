import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    watch: {
      usePolling: true,
      interval: 1000,
  },
    proxy: {
      '/api': 'http://server:5000', // Проксируем запросы к API
    },
  },
});
