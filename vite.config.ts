import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import path from 'path'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

// define cdn
let alias: Record<string, string> = {
  '@/': `${ path.resolve(__dirname, 'src') }/`,
}
// if (process.env.NODE_ENV === 'production') {
//   alias['vue'] = 'https://cdn.jsdelivr.net/npm/vue@3.2.31/+esm'
//   alias['marked'] = 'https://cdn.jsdelivr.net/npm/marked@4.0.12/+esm'
//   alias['gsap'] = 'https://cdn.jsdelivr.net/npm/gsap@3.9.1/+esm'
// }

export default defineConfig({
  plugins: [
    vue(),
    Components({
      dirs: [],
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
          '@/utils/validation/index': [
            ['default', 'validate'],
          ],
          '@/utils/validation/rules': [
            'email',
            'notEmpty',
            'isEmpty',
            'minLength',
            'maxLength',
            'betweenLength',
            'or',
            'and',
          ],
          '@/api/article': [
            ['default', 'articleApi'],
          ],
          '@/api/comment': [
            ['default', 'commentApi'],
          ],
          '@/api/account': [
            ['default', 'accountApi'],
          ],
          '@/api/category': [
            ['default', 'categoryApi'],
          ],
          '@/api/tag': [
            ['default', 'tagApi'],
          ],
          '@/api/friend': [
            ['default', 'friendApi'],
          ],
          '@/api/admin/article': [
            ['default', 'articleAdminApi'],
          ],
          '@/api/admin/category': [
            ['default', 'categoryAdminApi'],
          ],
          '@/api/admin/comment': [
            ['default', 'commentAdminApi'],
          ],
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
    alias,
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://api.blog.brookezb.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  envDir: './src/env',
  envPrefix: 'BHS_',
})
