<template>
  <nav ref="nav" class="fixed w-full h-14 left-0 top-0 z-40
  flex items-center justify-between
  bg-secondary-200/30 dark:bg-primary-600/20
  backdrop-blur shadow-md transition-transform">
    <MenuButton :type="isCurrentDarkMode ? 'primary' : 'secondary'">
      <template #icon>
        <ISolidBars/>
      </template>
    </MenuButton>
    <router-link to="/" class="select-none text-lg">{{ siteName }}</router-link>
    <div class="grow"/>
    <MenuButton ref="themeBtn" @click="showThemeMenu" :type="isCurrentDarkMode ? 'primary' : 'secondary'" :highlight="currentTheme === 'system'">
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

// change theme
const applyTheme = inject('applyTheme', Function, true)
const themeBtn = ref()

function showThemeMenu() {

}

// hidden navbar on scroll
const nav = ref()
let lastScrollY = 0

const computeNavBarPosition = throttle(() => {
  let scrollY = window.scrollY
  let scrollOffsetY = lastScrollY - scrollY
  if (scrollOffsetY > 7 || scrollY < 56)
    nav.value.classList.remove('-translate-y-full')
  else if (scrollOffsetY < -7)
    nav.value.classList.add('-translate-y-full')
  lastScrollY = scrollY
}, 20)

function scrollHandler() {
  computeNavBarPosition()
  window.requestAnimationFrame(scrollHandler)
}

onMounted(() => {
  window.requestAnimationFrame(scrollHandler)
})
</script>