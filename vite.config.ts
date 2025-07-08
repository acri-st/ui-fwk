import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import fs from 'fs';

// Fixes the jwt format in url issue
const dotPathFixPlugin = () => ({
    name: 'dot-path-fix-plugin',
    configureServer: (server) => {
        server.middlewares.use((req, _, next) => {
            const reqPath = req.url.split('?', 2)[0];
            if (
                !req.url.startsWith('/@') 
                && !fs.existsSync(`.${reqPath}`)
                && !req.url.startsWith('/api')
            ) {
                req.url = '/';
            }
            next();
        });
    }
});

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        dotPathFixPlugin(),
    ],
    resolve: {
      alias: {
        buffer: 'buffer'
      }
    },
    optimizeDeps: {
        esbuildOptions: {
            // Node.js global to browser globalThis
            define: {
                global: 'globalThis'
            },
            // Enable esbuild polyfill plugins
            plugins: [
                NodeGlobalsPolyfillPlugin({
                    buffer: true
                })
            ]
        }
    },
})