import { router } from '@/utils/router'
import store from '@/utils/store'
import tooltip from '@/utils/tooltip'

import renderer from '@/utils/marked/renderer'
import extensions from '@/utils/marked/extensions'

import App from './App.vue'
import '@/index.css'

// 固定标题样式
const siteName = import.meta.env.BHS_SITE_NAME
useTitle(computed(() => store.state.title ? `${ store.state.title } - ${ siteName }` : siteName))

// 拓展marked
marked.use({ renderer })
marked.use(extensions)

createApp(App)
  .use(router)
  .use(tooltip)
  .mount('#app')
