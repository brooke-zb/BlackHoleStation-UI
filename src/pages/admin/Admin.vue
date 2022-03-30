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
  checkUser()
})

onUnmounted(() => {
  store.state.isShowBgImage = true
})

onBeforeUpdate(function() {
  checkUser()
})

function checkUser(this: any) {
  if (store.state.userLoading) {
    let unwatch = watch(() => store.state.userLoading, () => {
      redirect()
      unwatch()
    })
  } else {
    redirect()
  }
}

function redirect() {
  // 未登录重定向
  if (!store.state.user && route.name !== 'login') {
    useToast().add({
      type: 'danger',
      message: '您必须登录才能访问此页面',
      duration: 5000,
    })
    router.push('/admin/login')
  }
  // 已登录重定向
  if (store.state.user && route.name === 'login') {
    router.push('/admin')
  }
}
</script>