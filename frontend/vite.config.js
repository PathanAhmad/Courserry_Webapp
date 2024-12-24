import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Add any aliases here if needed
    },
  },
  server: {
    port: 3000,
    hmr: {
      overlay: true,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5000',  // Backend URL
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api')  // Ensure /api is preserved
      },
    },
  },
  build: {
    outDir: 'dist', // Ensure your output directory is correctly named
  },
  base: '/', // Set the base path for your app
  preview: {
    port: 3000,
    open: true,
  },
});
