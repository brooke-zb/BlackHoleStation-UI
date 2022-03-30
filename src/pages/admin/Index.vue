<template>
  <div>2333</div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Index',
})
</script>

<script lang="ts" setup>
import store from '@/utils/store'

store.state.title = '后台管理'
</script>