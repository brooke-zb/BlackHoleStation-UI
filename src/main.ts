import { router } from '@/utils/router'
import store from '@/utils/store'
import renderer from '@/utils/renderer'
import tooltip from '@/utils/tooltip'

import App from './App.vue'
import '@/index.css'

// 固定标题样式
const siteName = import.meta.env.BHS_SITE_NAME
useTitle(computed(() => store.state.title ? `${ store.state.title } - ${ siteName }` : siteName))

// 设置marked渲染器
marked.use({ renderer })

createApp(App)
  .use(router)
  .use(tooltip)
  .mount('#app')
