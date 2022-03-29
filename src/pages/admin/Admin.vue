<template>
  <router-view/>
</template>

<script lang="ts">
import store from '@/utils/store'

export default defineComponent({
  name: 'Admin',
  mixins: [{
    beforeCreate(this: any) {
      if (!store.state.user && this.$route.name !== 'login') {
        useToast().add({
          type: 'danger',
          message: '您必须登录才能访问此页面',
          duration: 5000,
        })
        this.$router.push('/admin/login')
      }
    }
  }]
})
</script>