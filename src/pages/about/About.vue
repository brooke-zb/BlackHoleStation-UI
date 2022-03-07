<template>
  <div class="basis-full">233</div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'About',
})
</script>

<script lang="ts" setup>
import state from '@/utils/store'

onMounted(() => {
  state.isShowBgImage = false
})
onUnmounted(() => {
  state.isShowBgImage = true
})
</script>