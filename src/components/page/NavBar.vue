<template>
  <nav ref="nav" class="sticky w-full h-14 top-0 z-40
  flex items-center justify-between shadow-light-600/20 dark:shadow-light-300/20
  backdrop-blur transition-all" :class="classAppend">
    <MenuButton :type="isCurrentDarkMode ? 'primary' : 'secondary'">
      <template #icon>
        <ISolidBars/>
      </template>
    </MenuButton>
    <router-link to="/" class="select-none text-lg">{{ siteName }}</router-link>
    <div class="ml-2 hidden sm:block">{{ title }}</div>
    <div class="grow"/>
    <MenuButton ref="themeBtn" @click="toggleThemeMenu" :type="isCurrentDarkMode ? 'primary' : 'secondary'"
                :highlight="currentTheme !== 'system'">
      <template #icon>
        <IRegularMoonStars v-if="currentTheme === 'dark' || (currentTheme === 'system' && isCurrentDarkMode)"/>
        <IRegularSunBright v-if="currentTheme === 'light' || (currentTheme === 'system' && !isCurrentDarkMode)"/>
      </template>
    </MenuButton>
    <Menu ref="themeMenu" :items="menuItem"/>
  </nav>
</template>

<script lang="ts">
export default defineComponent({
  name: 'NavBar',
})
</script>

<script lang="ts" setup>
import { title, isCurrentDarkMode, currentTheme } from '@/utils/global'
import MenuButton from '@/components/ui/button/MenuButton.vue'
import Menu from '@/components/ui/menu/Menu.vue'
import gsap from 'gsap'

import IRegularSunBright from '~icons/regular/sun-bright'
import IRegularMoonStars from '~icons/regular/moon-stars'
import IRegularDisplay from '~icons/regular/display'

const siteName = import.meta.env.BHS_SITE_NAME

// theme switcher
const applyTheme = inject('applyTheme', Function, true)
const themeBtn = ref()
const themeMenu = ref()

const menuItem: MenuItemProps[] = [
  {
    type: 'action',
    onClick: () => applyTheme('light'),
    icon: IRegularSunBright,
    text: '亮色',
    highlight: computed(() => currentTheme.value === 'light'),
  },
  {
    type: 'action',
    onClick: () => applyTheme('dark'),
    icon: IRegularMoonStars,
    text: '暗色',
    highlight: computed(() => currentTheme.value === 'dark'),
  },
  {
    type: 'action',
    onClick: () => applyTheme('system'),
    icon: IRegularDisplay,
    text: '跟随系统',
    highlight: computed(() => currentTheme.value === 'system'),
  },
]

const toggleThemeMenu = (event: Event) => {
  themeMenu.value.toggle(event)
}

const classAppend = computed(() => {
  return {
    'shadow-sm': !isScrollDown.value,
    'shadow bg-dark-50/50 dark:bg-dark-900/50': isScrollDown.value,
  }
})

//  scroll event
const nav = ref()
const isScrollDown = ref(false)

function scrollEvent() {
  // change navbar backdrop-blur
  isScrollDown.value = window.scrollY > 10
}

onMounted(() => {
  gsap.ticker.add(scrollEvent)
})
</script>