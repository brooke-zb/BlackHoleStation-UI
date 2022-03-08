<template>
  <Background/>
  <SideMenu/>
  <NavBar/>
  <div class="my-2 container overflow-visible">
    <router-view v-slot="{ Component }">
      <transition
          mode="out-in"
          @before-enter="beforeEnter"
          @enter="enter"
          @leave="leave"
          :css="false"
      >
        <component :key="$route.path" :is="Component"/>
      </transition>
    </router-view>
  </div>
  <Footer/>
  <Loading/>
  <ToastContainer/>
  <TooltipContainer/>
</template>

<script setup lang="ts">
import NavBar from '@/components/page/NavBar.vue'
import Background from '@/components/page/Background.vue'
import Loading from '@/components/page/Loading.vue'
import Footer from '@/components/page/Footer.vue'
import ToastContainer from '@/components/ui/toast/ToastContainer.vue'
import TooltipContainer from '@/components/ui/tooltip/TooltipContainer.vue'
import SideMenu from '@/components/page/SideMenu.vue'
import store from '@/utils/store'
import gsap from 'gsap'

// 获取用户信息
store.getLoginUser()

// 页面切换动画
function beforeEnter(el: Element) {
  gsap.set(el, {
    scaleX: 0.8,
    scaleY: 0.8,
    opacity: 0,
  })
}

function enter(el: Element, done: () => void) {
  gsap.to(el, {
    duration: 0.2,
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    onComplete: done,
  })
}

function leave(el: Element, done: () => void) {
  gsap.to(el, {
    duration: 0.2,
    scaleX: 0.8,
    scaleY: 0.8,
    opacity: 0,
    onComplete: done,
  })
}

// 颜色主题
const isPreferredDark = usePreferredDark()

function applyTheme(theme?: 'dark' | 'light' | 'system') {
  // set theme
  if (theme) {
    store.state.theme = theme
  }

  switch (store.state.theme) {
    case 'system':
      if (isPreferredDark.value) {
        document.documentElement.classList.add('dark')
        store.state.isDarkMode = true
      } else {
        document.documentElement.classList.remove('dark')
        store.state.isDarkMode = false
      }
      break

    case 'dark':
      document.documentElement.classList.add('dark')
      store.state.isDarkMode = true
      break

    case 'light':
      document.documentElement.classList.remove('dark')
      store.state.isDarkMode = false
      break

    default:
      store.state.theme = 'system'
      applyTheme()
      break
  }
}

provide('applyTheme', applyTheme)

watch(isPreferredDark, () => {
  applyTheme()
}, { immediate: true })
</script>
