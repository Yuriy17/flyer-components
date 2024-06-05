import { defineConfig } from 'vite';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
  root: 'src',
  server: {
    port: process.env.VITE_PORT || 5173 // Use the port from the .env file or default to 5173
  },
  css: {
    preprocessorOptions: {
      scss: {}
    }
  }
});
