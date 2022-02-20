import { router } from '@/utils/router'

import App from './App.vue'
import '@/index.css'

createApp(App)
  .use(router)
  .mount('#app')
