import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), svgLoader()],
    base: '/',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            // 'vue': 'https://cdn.jsdelivr.net/npm/vue@3.2.29/+esm',
            // 'vue-router': 'https://cdn.jsdelivr.net/npm/vue-router@4.0.12/+esm',
            // 'marked': 'https://cdn.jsdelivr.net/npm/marked@4.0.12/+esm',
            // 'gsap': 'https://cdn.jsdelivr.net/npm/gsap@3.9.1/+esm',
            // 'axios': 'https://cdn.jsdelivr.net/npm/axios@0.25.0/+esm',
        },
    },
    server: {
        host: '0.0.0.0'
    }
})
