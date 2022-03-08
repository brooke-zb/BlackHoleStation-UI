import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '@/utils/store'

const routes: RouteRecordRaw[] = [
  // 主页
  {
    path: '/index.html', redirect: '/',
  },
  {
    path: '/', name: 'index',
    component: () => import('@/pages/index/Index.vue'),
  },

  {
    path: '/test', name: 'test',
    component: () => import('@/pages/test/Test.vue'),
    children: [
      // 按钮测试页面
      {
        path: 'btn', name: 'btn',
        component: () => import('@/pages/test/BtnTest.vue'),
      },
      // 通知测试页面
      {
        path: 'toast', name: 'toast',
        component: () => import('@/pages/test/ToastTest.vue'),
      },
      // 分页测试页面
      {
        path: 'page', name: 'page',
        component: () => import('@/pages/test/PageTest.vue'),
      },
    ],
  },

  // 文章页面
  {
    path: '/articles/:aid(\\d+)', name: 'article',
    component: () => import('@/pages/article/Article.vue'),
    props: (route) => ({
      aid: Number(route.params.aid),
    }),
  },

  // 关于页面
  {
    path: '/about', name: 'about',
    component: () => import('@/pages/about/About.vue'),
    props: true,
  },

  // 404页面
  {
    path: '/:pathMatch(.*)*', name: '404',
    component: () => import('@/pages/error/404.vue'),
  },

  // 管理员登录
  {
    path: '/admin/login', name: 'adminLogin',
    component: () => import('@/pages/admin/Login.vue'),
  },
]

export const routerHistory = createWebHistory()
export const router = createRouter({
  history: routerHistory,
  routes,
})

router.beforeEach(async (to, from) => {
  // avoid loading when playing out animate
  // if (to.fullPath !== from.fullPath || to.name !== from.name) {
  store.state.isPageLoading = true
  // }
  store.state.isSideMenuOpen = false
  // await sleep(500)
})
router.beforeResolve((to, from) => {
  store.state.isPageLoading = false
})

// DEBUG
function sleep(ms: number) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}