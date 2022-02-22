<template>
  <Background/>
  <!--  <SideMenu/>-->
    <NavBar/>
  <div class="overflow-hidden mt-4">
    <div class="container overflow-visible flex justify-center">
      <router-view v-slot="{ Component }">
        <transition
            mode="out-in"
            @before-enter="beforeEnter"
            @enter="enter"
            @leave="leave"
            :css="false"
        >
          <!-- <keep-alive> -->
          <component :key="$route.path" :is="Component"/>
          <!-- </keep-alive> -->
        </transition>
      </router-view>
    </div>
  </div>
  <transition
      @before-enter="beforeLoading"
      @enter="enterLoading"
      @leave="leaveLoading"
      :css="false"
  >
    <keep-alive>
      <Loading v-show="isLoading"/>
    </keep-alive>
  </transition>
  <!--  <Footer/>-->
</template>

<script setup lang="ts">
import NavBar from '@/components/page/NavBar.vue'
import Background from '@/components/page/Background.vue'
import Loading from '@/components/page/Loading.vue'
// import Footer from '@/components/page/Footer.vue'
// import SideMenu from '@/components/page/SideMenu.vue'
import { isLoading, currentTheme, isCurrentDarkMode } from '@/utils/global'
import gsap from 'gsap'

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

// loading transition
function beforeLoading(el: Element) {
  gsap.set(el, {
    opacity: 0,
  })
}

function enterLoading(el: Element, done: () => void) {
  gsap.to(el, {
    duration: 0.4,
    opacity: 1,
    onComplete: done,
  })
}

function leaveLoading(el: Element, done: () => void) {
  gsap.to(el, {
    duration: 0.4,
    opacity: 0,
    onComplete: done,
  })
}

// 颜色主题
const isPreferredDark = usePreferredDark()

function applyTheme(theme?: 'dark' | 'light' | 'system') {
  // set theme
  if (theme) {
    currentTheme.value = theme
  }

  switch (currentTheme.value) {
    case 'system':
      if (isPreferredDark.value) {
        document.documentElement.classList.add('dark')
        isCurrentDarkMode.value = true
      } else {
        document.documentElement.classList.remove('dark')
        isCurrentDarkMode.value = false
      }
      break

    case 'dark':
      document.documentElement.classList.add('dark')
      isCurrentDarkMode.value = true
      break

    case 'light':
      document.documentElement.classList.remove('dark')
      isCurrentDarkMode.value = false
      break

    default:
      currentTheme.value = 'system'
      applyTheme()
      break
  }
}

provide('applyTheme', applyTheme)

watch(isPreferredDark, () => {
  applyTheme()
}, { immediate: true })
</script>
