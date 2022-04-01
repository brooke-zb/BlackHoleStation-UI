<template>
  <router-view/>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Admin',
})
</script>

<script lang="ts" setup>
import store from '@/utils/store'

const toast = useToast()
const route = useRoute()
const router = useRouter()

onMounted(() => {
  store.state.isShowBgImage = false
  checkRedirect()
})

onUnmounted(() => {
  store.state.isShowBgImage = true
})

onBeforeUpdate(checkRedirect)

function checkRedirect() {
  // 未登录重定向
  if (!store.state.user && route.name !== 'login') {
    useToast().add({
      type: 'danger',
      message: '您必须登录才能访问此页面',
      duration: 5000,
    })
    router.push({ path: '/admin/login', query: { redirect: route.fullPath } })
  }
  // 已登录重定向
  if (store.state.user && route.name === 'login') {
    router.push('/admin')
  }
}
</script>