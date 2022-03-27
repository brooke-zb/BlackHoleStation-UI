<template>
  <div>
    <h2 class="text-center text-2xl mb-4">友情链接</h2>
    <div>空空如也~</div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Friends',
})
</script>

<script lang="ts" setup>
import store from '@/utils/store'

store.state.title = '友情链接'
</script>