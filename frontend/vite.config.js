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
  },
  build: {
    outDir: 'dist', // Ensure your output directory is correctly named
  },
  base: '/', // Set the base path for your app
  preview: {
    // Add this section for preview fallback
    port: 3000,
    open: true,
  },
});