import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import path from 'path'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      // dirs: [],
      resolvers: [
        IconsResolver({
          customCollections: ['regular', 'solid', 'brands'],
        }),
      ],
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        {
          'marked': ['marked'],
          'lodash-es': ['throttle', 'debounce'],
          '@/utils/toast': ['useToast'],
        },
      ],
    }),
    Icons({
      compiler: 'vue3',
      customCollections: {
        regular: FileSystemIconLoader('./src/icons/regular'),
        solid: FileSystemIconLoader('./src/icons/solid'),
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
  envDir: './src/env',
  envPrefix: 'BHS_',
})
