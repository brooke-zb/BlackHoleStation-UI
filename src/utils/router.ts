import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { isLoading, isSideMenuOpen } from '@/utils/global'

const Index = () => import('@/pages/Index.vue')
const NotFound = () => import('@/pages/error/404.vue')
// const Article = () => import('@/pages/Article.vue')
const About = () => import('@/pages/About.vue')
const Btn = () => import('@/pages/Btn.vue')

const routes: RouteRecordRaw[] = [
  // 主页
  {
    path: '/index.html',
    redirect: '/',
  },
  {
    path: '/',
    name: 'index',
    component: Index,
  },

  // 按钮测试页面
  {
    path: '/btn',
    name: 'btn',
    component: Btn,
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
    component: About,
    props: true,
  },

  // 404页面
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: NotFound,
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