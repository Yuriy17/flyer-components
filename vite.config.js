import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import { resolve, join, relative } from 'path';
import { compile } from 'ejs';
import { readFile } from 'node:fs/promises';
import { ViteEjsPlugin } from 'vite-plugin-ejs';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
  plugins: [
    ViteEjsPlugin(
      // { title: 'My vue project!' },
      {
        ejs: (viteConfig) => {
          // viteConfig is the current viteResolved config.
          return {
            root: viteConfig.root,
            domain: 'example.com',
            beautify: true
          };
        }
      }
    ),
    {
      name: 'ejs',
      async transform(_, id) {
        if (id.endsWith('.ejs')) {
          console.log("🚀 ~ transform ~ id:", id)
          console.log("🚀 ~ transform ~ _:", _)
          const src = await readFile(id, 'utf-8');
          const code = compile(src, {
            client: true,
            strict: true,
            localsName: 'env',
            views: [resolve(__dirname, 'views')],
            filename: relative(__dirname, id)
          }).toString();
          return `export default ${code}`;
        }
      }
    }
  ],
  build: {
    emptyOutDir: false,
    outDir: join(__dirname, 'dist'),
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.html'),
        booking: resolve(__dirname, 'src/booking/index.html')
      },
      output: {
        // entryFileNames: `[name].js`,
        // chunkFileNames: `[name].js`,
        // assetFileNames: `[name].[ext]`
      }
    }
  },
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
