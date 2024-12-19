import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      // Add any aliases here if needed
    },
  },
  server: {
    port: 3000, // You can change this to your preferred port
    hmr: {
      overlay: true, // Enables the overlay for debugging
    },
  },
});
