<template>
  <div class="basis-full">233</div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'About',
})
</script>

<script lang="ts" setup>
import store from '@/utils/store'

onMounted(() => {
  store.state.isShowBgImage = false
})
onUnmounted(() => {
  store.state.isShowBgImage = true
})
</script>