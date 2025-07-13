/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
    plugins: [solidPlugin()],
    server: {
        port: 8000,
    },
    build: {
        target: 'esnext',
        polyfillDynamicImport: false,
    },
    test: {
        environment: 'jsdom',
        globals: true,
        deps: {
            inline: [/solid-js/, /solid-testing-library/],
        },
    },
});
