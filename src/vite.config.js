import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import basicSsl from '@vitejs/plugin-basic-ssl';
import copy from 'rollup-plugin-copy' //https://www.npmjs.com/package/rollup-plugin-copy

export default defineConfig({
  build: {
    outDir: '../dist',
    sourcemap: false,
    rollupOptions: {
        output: {
          entryFileNames: '[name].js',
          assetFileNames: '[name].[ext]',
          chunkFileNames: '[name].js',
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              return 'deps';
            }
          }
        }
    },
  },
  plugins: [
    copy({
        targets: [
          { src: '../assets/**/*', dest: '../dist' }
        ],
        verbose: true,
        hook: 'writeBundle', //runs after cleanup dist
    }),
    solidPlugin(), 
    basicSsl(),
    ],
  server: {
    port: 44300,
    https: true,
    host: '0.0.0.0',
    open: '../dist/index.html',
  },
});