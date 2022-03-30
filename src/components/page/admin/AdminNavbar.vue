<template>
  <nav class="sticky w-full h-14 top-0 z-40 flex justify-between items-center
       shadow-sm dark:shadow-light-300/20 bg-light-100/70 dark:bg-dark-800/70">
    <div class="px-2">后台管理</div>
    <MenuButton v-tooltip="'主题'" ref="themeBtn" @click="toggleThemeMenu"
                :type="store.state.isDarkMode ? 'info' : 'secondary'" :highlight="store.state.theme !== 'system'">
      <template #icon>
        <IRegularMoonStars v-if="store.state.theme === 'dark' || (store.state.theme === 'system' && store.state.isDarkMode)"/>
        <IRegularSunBright v-if="store.state.theme === 'light' || (store.state.theme === 'system' && !store.state.isDarkMode)"/>
      </template>
    </MenuButton>
    <Menu ref="themeMenu" :items="menuItem"/>
  </nav>
</template>

<script lang="ts">
export default defineComponent({
  name: 'AdminNavbar',
})
</script>

<script lang="ts" setup>
import store from '@/utils/store'
import MenuButton from '@/components/ui/button/MenuButton.vue'
import Menu from '@/components/ui/menu/Menu.vue'

import IRegularSunBright from '~icons/regular/sun-bright'
import IRegularMoonStars from '~icons/regular/moon-stars'
import IRegularDisplay from '~icons/regular/display'

const menuItem: MenuItemProps[] = [
  {
    type: 'action',
    onClick: () => applyTheme('light'),
    icon: IRegularSunBright,
    text: '亮色',
    highlight: computed(() => store.state.theme === 'light'),
  },
  {
    type: 'action',
    onClick: () => applyTheme('dark'),
    icon: IRegularMoonStars,
    text: '暗色',
    highlight: computed(() => store.state.theme === 'dark'),
  },
  {
    type: 'action',
    onClick: () => applyTheme('system'),
    icon: IRegularDisplay,
    text: '跟随系统',
    highlight: computed(() => store.state.theme === 'system'),
  },
]

const applyTheme = inject('applyTheme', Function, true)
const themeBtn = ref()
const themeMenu = ref()

const toggleThemeMenu = (event: Event) => {
  themeMenu.value.toggle(event)
}
</script>