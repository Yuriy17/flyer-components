/* eslint-disable no-undef */
import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import { compile } from 'ejs';
import { readFile } from 'node:fs/promises';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
// import viteImagemin from '@vheemstra/vite-plugin-imagemin'
// // The minifiers you want to use:
// import imageminMozjpeg from 'imagemin-mozjpeg'
// import imageminWebp from 'imagemin-webp'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

// import bookEuropeCards from './bookEuropeCards.json';

const __dirname = path.dirname(__filename);
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd());

  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...env };

  return {
    base: '', // the path relative to its deployment directory
    root: 'src',
    publicDir: '../public',
    define: {
      'process.env': process.env,
    },
    build: {
      emptyOutDir: true,
      minify: false,
      sourcemap: 'inline',
      outDir: path.join(__dirname, 'dist'),
      rollupOptions: {
        input: {
          index: path.resolve(__dirname, 'src/index.html'),
          booking: path.resolve(__dirname, 'src/pages/booking/index.html'),
        },
        output: {
          // entryFileNames: `[name].js`,
          // chunkFileNames: `[name].js`,
          // assetFileNames: `[name].[ext]`
          assetFileNames: (assetInfo) => {
            let extType = assetInfo.name.split('.').at(1);
            if (/png|jpe?g|webp|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = 'images';
            }
            return `static/${extType}/[name][extname]`;
          },
          entryFileNames: 'static/js/[name].js',
          chunkFileNames: `static/js/[name].js`,
          // assetFileNames: `assets/js/[name].[ext]`,
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('axios')) {
                return 'axios';
              }
              if (id.includes('axios')) {
                return 'axios';
              }
              if (id.includes('swiper')) {
                return 'swiper';
              }
              if (id.includes('@shoelace-style')) {
                return '@shoelace-style';
              }
              if (id.includes('intl-tel-input')) {
                return 'intl-tel-input';
              }
              if (id.includes('floating-ui')) {
                return 'floating-ui';
              }
              // TODO check where is lit
              if (id.includes('/lit/') || id.includes('/@lit/') || id.includes('/lit-html/') || id.includes('/lit-element/')) {
                return 'lit';
              }
              if (id.includes('air-datepicker')) {
                return 'air-datepicker';
              }
              // eslint-disable-next-line no-undef
              console.log('🚀 ~ defineConfig ~ vendor id:', id);
              return 'vendor';
            }
          },
        },
      },
    },
    resolve: {
      alias: {
        // for absolute path solution
        src: path.resolve('src/'),
        '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
      },
    },
    server: {
      port: env.VITE_PORT || 5173, // Use the port from the .env file or default to 5173
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "./src/assets/css/config/_vars.scss";
            @import "./src/assets/css/config/_functions.scss";
            @import "./src/assets/css/config/_mixins.scss";
            @import "./src/assets/css/config/_fonts.scss";
            @import "./src/assets/css/vendor/_normalize.scss";
            @import "./src/assets/css/vendor/_custom-bootstrap.scss";
          `,
        },
      },
    },
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
            const localsName = 'env';
            const src = await readFile(id, 'utf-8');
            // const bookEuropeCards = await readFile(
            //   './bookEuropeCards.json',
            //   'utf-8'
            // );
            
            const code = compile(src, {
              client: true,
              strict: true,
              localsName,
              // async: 'true',
              // views: [path.resolve(__dirname, 'views')],
              filename: path.relative(__dirname, id),
              context: {
                checkLocalsName: (env) => typeof env !== 'undefined',
                // bookEuropeCards,
              },
            }).toString();
            return `export default ${code}`;
          }
        },
      },
      // viteImagemin({
      //   plugins: {
      //     jpg: imageminMozjpeg(),

      //   },
      //   makeWebp: {
      //     plugins: {
      //       jpg: imageminWebp(),
      //       // jpeg: imageminWebp(),
      //       png: imageminWebp(),
      //     },
      //   },
      // }),
    ],
  };
});
