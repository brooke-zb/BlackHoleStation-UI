import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { isLoading, isSideMenuOpen } from '@/utils/global'

// const Article = () => import('@/pages/Article.vue')

const routes: RouteRecordRaw[] = [
  // 主页
  {
    path: '/index.html',
    redirect: '/',
  },
  {
    path: '/',
    name: 'index',
    component: () => import('@/pages/Index.vue'),
  },

  {
    path: '/test',
    name: 'test',
    component: () => import('@/pages/test/Test.vue'),
    children: [
      // 按钮测试页面
      {
        path: 'btn',
        name: 'btn',
        component: () => import('@/pages/test/BtnTest.vue'),
      },
      // 通知测试页面
      {
        path: 'toast',
        name: 'toast',
        component: () => import('@/pages/test/ToastTest.vue'),
      },
      // 分页测试页面
      {
        path: 'page',
        name: 'page',
        component: () => import('@/pages/test/PageTest.vue'),
      },
    ]
  },

  // // 文章页面
  // {
  //   path: '/articles/:aid(\\d+)',
  //   name: 'article',
  //   component: Article,
  // },

  // 关于页面
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/About.vue'),
    props: true,
  },

  // 404页面
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/pages/error/404.vue'),
  },
]

export const routerHistory = createWebHistory()
export const router = createRouter({
  history: routerHistory,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
})

router.beforeEach(async (to, from) => {
  // avoid loading when playing out animate
  // if (to.fullPath !== from.fullPath || to.name !== from.name) {
  isLoading.value = true
  // }
  isSideMenuOpen.value = false
})
router.beforeResolve((to, from) => {
  isLoading.value = false
})