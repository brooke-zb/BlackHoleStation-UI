import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import path from 'path'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    Components({
      dts: './src/components.d.ts',
      resolvers: [
        IconsResolver({
          customCollections: ['regular', 'brands'],
        }),
      ],
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        {
          'axios': [
            ['default', 'axios'],
          ],
          'gsap': [
            ['default', 'tween'],
          ],
          'marked': ['marked'],
          'lodash-es': ['throttle', 'debounce'],
        },
      ],
      dts: './src/auto-import.d.ts',
    }),
    Icons({
      compiler: 'vue3',
      customCollections: {
        regular: FileSystemIconLoader('./src/icons/regular'),
        brands: FileSystemIconLoader('./src/icons/brands'),
      },
    }),
  ],
  base: '/',
  resolve: {
    alias: {
      '@/': `${ path.resolve(__dirname, 'src') }/`,
      // 'vue': 'https://cdn.jsdelivr.net/npm/vue@3.2.29/+esm',
      // 'vue-router': 'https://cdn.jsdelivr.net/npm/vue-router@4.0.12/+esm',
      // 'marked': 'https://cdn.jsdelivr.net/npm/marked@4.0.12/+esm',
      // 'gsap': 'https://cdn.jsdelivr.net/npm/gsap@3.9.1/+esm',
      // 'axios': 'https://cdn.jsdelivr.net/npm/axios@0.25.0/+esm',
    },
  },
  server: {
    host: '0.0.0.0',
  },
})
