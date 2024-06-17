import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import dotenv from 'dotenv';
import { resolve, join } from 'path';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
  plugins: [
    // handlebars({
    //   partialDirectory: [resolve(__dirname, 'src/templates'), resolve(__dirname, 'src/templates/mainForm')],
    //   helpers: {
    //     ifEqual: (a, b, options) => {
    //       console.log('ifEqual helper called with:', a, b);
    //       if (a == b) {
    //         return options.fn(this);
    //       } else {
    //         return options.inverse(this);
    //       }
    //     }
    //   },
    //   context: {
    //     title: 'Hello, world!'
    //   }
    // })
    createHtmlPlugin({
      minify: true,
      pages: [
        {
          entry: 'src/pages/main.js',
          filename: 'index.html',
          template: join(__dirname, 'public', 'index.html'),
          injectOptions: {
            data: {
              title: 'index',
              injectScript: `<script src="./main.js"></script>`
            },
            tags: [
              {
                injectTo: 'body-prepend',
                tag: 'div',
                attrs: {
                  id: 'tag1'
                }
              }
            ]
          }
        },
        {
          entry: 'src/booking/main.js',
          filename: 'booking/index.html',
          template: 'public/booking/index.html',
          injectOptions: {
            data: {
              title: 'booking page',
              injectScript: `<script src="./main.js"></script>`
            },
            tags: [
              {
                injectTo: 'body-prepend',
                tag: 'div',
                attrs: {
                  id: 'tag2'
                }
              }
            ]
          }
        }
      ]
    })
  ],
  build: {
    emptyOutDir: false,
    outDir: join(__dirname, 'dist'),
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'public/index.html'),
        booking: resolve(__dirname, 'public/booking/index.html')
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
