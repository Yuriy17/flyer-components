import { defineConfig } from 'vite';
// import { createHtmlPlugin } from 'vite-plugin-html';
import dotenv from 'dotenv';
import { resolve, join, relative } from 'path';
import { compile } from 'ejs';
import { readFile } from 'node:fs/promises';
// import htmlTemplate from 'vite-plugin-html-template';
import { ViteEjsPlugin } from 'vite-plugin-ejs';

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
    // createHtmlPlugin({
    //   minify: true,
    //   pages: [
    //     {
    //       entry: 'src/pages/main.js',
    //       filename: 'index.html',
    //       template: 'src/pages/index.html',
    //       injectOptions: {
    //         // ejsOptions: {
    //         //   root: 'src/templates'
    //         // },
    //         data: {
    //           title: 'index',
    //           injectScript: `<script src="./main.js"></script>`
    //         },
    //         // tags: [
    //         //   {
    //         //     injectTo: 'body-prepend',
    //         //     tag: 'div',
    //         //     attrs: {
    //         //       id: 'tag1'
    //         //     }
    //         //   }
    //         // ]
    //       }
    //     },
    //     // {
    //     //   entry: 'pages/booking/main.js',
    //     //   filename: 'booking/index.html',
    //     //   template: 'pages/booking/index.html',
    //     //   injectOptions: {
    //     //     ejsOptions: {
    //     //       root: 'src/templates'
    //     //     },
    //     //     data: {
    //     //       title: 'booking page',
    //     //       injectScript: `<script src="./main.js"></script>`
    //     //     },
    //     //     tags: [
    //     //       {
    //     //         injectTo: 'body-prepend',
    //     //         tag: 'div',
    //     //         attrs: {
    //     //           id: 'tag2'
    //     //         }
    //     //       }
    //     //     ]
    //     //   }
    //     // }
    //   ]
    // }),
    ViteEjsPlugin(
      { title: 'My vue project!' },
      {
        ejs: (viteConfig) => {
          // viteConfig is the current viteResolved config.
          return {
            root: viteConfig.root,
            domain: 'example.com',
            title: 'My vue project!',
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
    // htmlTemplate.default({
    //   // where is the pages' root directory?
    //   pagesDir: 'src/pages',
    //   // define pages like it is done in vue-cli
    //   pages: {
    //     index: {
    //       template: './src/pages/index.html',
    //       title: 'Homepage'
    //     },
    //     subpage: {
    //       template: './src/pages/booking/index.html',
    //       title: 'booking'
    //     }
    //   },
    //   // expose to template
    //   data: {
    //     title: 'Homepage'
    //   }
    // }),
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
