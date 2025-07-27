import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import postCssImport from 'postcss-import';
import mkcert from 'vite-plugin-mkcert';
import copy from 'rollup-plugin-copy'; //https://www.npmjs.com/package/rollup-plugin-copy

export default defineConfig({
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: true,
        rollupOptions: {
            output: {
                entryFileNames: '[name].js',
                assetFileNames: '[name].[ext]',
                chunkFileNames: '[name].js',
                manualChunks: (id) => {
                    if (id.includes('node_modules')) {
                        return 'deps';
                    }
                },
            },
        },
    },
    plugins: [
        copy({
            targets: [{ src: '../assets/**/*', dest: '../dist' }],
            verbose: true,
            hook: 'writeBundle', //runs after cleanup dist
        }),
        solidPlugin(),
        mkcert(),
        postCssImport(),
    ],
    server: {
        port: 443,
        https: true,
        host: '0.0.0.0',
        open: '../dist/index.html',
    },
});
