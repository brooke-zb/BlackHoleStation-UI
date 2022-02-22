<template>
  <nav ref="nav" class="sticky w-full h-14 top-0 z-40
  flex items-center justify-between shadow-neutral-500/20 dark:shadow-neutral-300/20
  backdrop-blur-sm transition-all" :class="classAppend">
    <MenuButton :type="isCurrentDarkMode ? 'primary' : 'secondary'">
      <template #icon>
        <ISolidBars/>
      </template>
    </MenuButton>
    <router-link to="/" class="select-none text-lg">{{ siteName }}</router-link>
    <div class="grow"/>
    <MenuButton ref="themeBtn" @click="showThemeMenu" :type="isCurrentDarkMode ? 'primary' : 'secondary'"
                :highlight="currentTheme === 'system'">
      <template #icon>
        <ISolidMoon v-if="currentTheme === 'dark' || (currentTheme === 'system' && isCurrentDarkMode)"/>
        <ISolidSun v-if="currentTheme === 'light' || (currentTheme === 'system' && !isCurrentDarkMode)"/>
      </template>
    </MenuButton>
  </nav>
</template>

<script lang="ts">
export default defineComponent({
  name: 'NavBar',
})
</script>

<script lang="ts" setup>
import { siteName, isCurrentDarkMode, currentTheme } from '@/utils/global'
import MenuButton from '@/components/ui/button/MenuButton.vue'
import gsap from 'gsap'

// change theme
const applyTheme = inject('applyTheme', Function, true)
const themeBtn = ref()

function showThemeMenu() {

}

const classAppend = computed(() => {
  return {
    'shadow-sm': !isScrollDown.value,
    'shadow bg-dark-50/50 dark:bg-neutral-900/30': isScrollDown.value,
  }
})

// hidden navbar on scroll
const nav = ref()
let lastScrollY = 0
const isScrollDown = ref(false)

function computeNavBarPosition() {
  let scrollY = window.scrollY

  // change navbar backdrop-blur
  isScrollDown.value = scrollY > 10;

  // hidden navbar
  let scrollOffsetY = lastScrollY - scrollY
  if (scrollOffsetY > 7 || scrollY < 56)
    nav.value.classList.remove('-translate-y-full')
  else if (scrollOffsetY < -7)
    nav.value.classList.add('-translate-y-full')
  lastScrollY = scrollY
}

onMounted(() => {
  gsap.ticker.add(computeNavBarPosition)
})
</script>