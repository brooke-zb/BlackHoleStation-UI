<template>
  <nav ref="nav" class="sticky w-full h-14 top-0 z-40
  flex items-center justify-between transition-bg
  shadow-light-600/20 dark:shadow-light-300/20" :class="classAppend">
    <MenuButton :type="state.isDarkMode ? 'info' : 'secondary'">
      <template #icon>
        <ISolidBars/>
      </template>
    </MenuButton>
    <router-link to="/" class="select-none text-lg">{{ siteName }}</router-link>
    <div class="ml-2 hidden sm:block">{{ state.title }}</div>
    <div class="grow"/>
    <MenuButton title="切换主题" ref="themeBtn" @click="toggleThemeMenu" :type="state.isDarkMode ? 'info' : 'secondary'"
                :highlight="state.theme !== 'system'">
      <template #icon>
        <IRegularMoonStars v-if="state.theme === 'dark' || (state.theme === 'system' && state.isDarkMode)"/>
        <IRegularSunBright v-if="state.theme === 'light' || (state.theme === 'system' && !state.isDarkMode)"/>
      </template>
    </MenuButton>
    <Menu ref="themeMenu" :items="menuItem"/>
    <MenuButton title="登录" @click="$router.push('/admin/login')" :type="state.isDarkMode ? 'info' : 'secondary'">
      <template #icon>
        <IRegularRightToBracket/>
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
import state from '@/utils/store'
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
    highlight: computed(() => state.theme === 'light'),
  },
  {
    type: 'action',
    onClick: () => applyTheme('dark'),
    icon: IRegularMoonStars,
    text: '暗色',
    highlight: computed(() => state.theme === 'dark'),
  },
  {
    type: 'action',
    onClick: () => applyTheme('system'),
    icon: IRegularDisplay,
    text: '跟随系统',
    highlight: computed(() => state.theme === 'system'),
  },
]

const toggleThemeMenu = (event: Event) => {
  themeMenu.value.toggle(event)
}

const classAppend = computed(() => ({
  'shadow-sm': !isScrollDown.value,
  'shadow nav-scrolldown': isScrollDown.value,
}))

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

<style scoped>
@supports (backdrop-filter: blur(8px)) {
  .nav-scrolldown {
    @apply backdrop-blur bg-dark-50/60 dark:bg-dark-900/60;
  }
}

@supports not (backdrop-filter: blur(8px)) {
  .nav-scrolldown {
    @apply bg-dark-50/95 dark:bg-dark-900/95;
  }
}
</style>