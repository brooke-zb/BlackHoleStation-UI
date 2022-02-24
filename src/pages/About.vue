<template>
  <div class="basis-full">233</div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'About',
})
</script>

<script lang="ts" setup>
import { isShowImage } from '@/utils/global'

onMounted(() => {
  isShowImage.value = false
})
onUnmounted(() => {
  isShowImage.value = true
})
</script>