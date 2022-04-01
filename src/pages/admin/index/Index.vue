<template>
  <div>
    欢迎来到后台管理页面，您可以
    <router-link to="/" class="link">回到网站</router-link>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Index',
})
</script>

<script lang="ts" setup>
import store from '@/utils/store'

store.state.title = '概要'
</script>