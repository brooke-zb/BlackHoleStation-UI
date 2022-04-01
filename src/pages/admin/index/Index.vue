<template>
  <div>欢迎来到后台管理页面</div>
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