import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { compile } from 'ejs';
import { readFile } from 'node:fs/promises';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import { fileURLToPath } from 'url';
const __dirname = fileURLToPath(import.meta.url);

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
  plugins: [
    // render in html ejs templates
    ViteEjsPlugin(
      // { title: 'My vue project!' },
      {
        ejs: (viteConfig) => {
          // viteConfig is the current viteResolved config.
          return {
            root: viteConfig.root,
            beautify: true,
            // domain: 'example.com',
          };
        },
      }
    ),
    // render in js ejs templates
    // https://medium.com/@koistya/using-ejs-with-vite-7502a4f79e44
    {
      name: 'ejs',
      async transform(_, id) {
        if (id.endsWith('.ejs')) {
          const src = await readFile(id, 'utf-8');
          const code = compile(src, {
            client: true,
            strict: true,
            localsName: 'env',
            async: 'true',
            // views: [path.resolve(__dirname, 'views')],
            filename: path.relative(__dirname, id),
          }).toString();
          return `export default ${code}`;
        }
      },
    },
  ],
  build: {
    emptyOutDir: false,
    outDir: path.join(__dirname, 'dist'),
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'src/index.html'),
        booking: path.resolve(__dirname, 'src/booking/index.html'),
      },
      output: {
        // entryFileNames: `[name].js`,
        // chunkFileNames: `[name].js`,
        // assetFileNames: `[name].[ext]`
      },
    },
  },
  root: 'src',
  server: {
    // eslint-disable-next-line no-undef
    port: process.env.VITE_PORT || 5173, // Use the port from the .env file or default to 5173
  },
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
});
