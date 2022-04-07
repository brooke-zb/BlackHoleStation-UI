<template>
  <Background/>
  <router-view/>
  <Loading/>
  <ToastContainer/>
  <TooltipContainer/>
</template>

<script lang="ts" setup>
import store from '@/utils/store'
import Background from '@/components/page/Background.vue'
import Loading from '@/components/page/Loading.vue'
import ToastContainer from '@/components/ui/toast/ToastContainer.vue'
import TooltipContainer from '@/components/ui/tooltip/TooltipContainer.vue'

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
