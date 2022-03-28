<template>
  <div v-if="props.type === 'article'"
       class="relative flex flex-col gap-4 items-center fill-light-500/50 dark:fill-light-200/50">
    <div class="skeleton p-5 w-2/3 sm:w-1/2 md:w-1/3 mb-1"></div>
    <div class="skeleton p-2 w-1/2 sm:w-1/3 md:w-1/4"></div>
    <div class="skeleton p-2 w-1/3 sm:w-1/4 md:w-1/5"></div>
    <div class="skeleton p-2 w-1/2 sm:w-1/3 md:w-1/4 mb-2"></div>
    <div class="w-full flex flex-col gap-4">
      <div class="skeleton p-3 w-2/3 sm:w-1/2"></div>
      <div class="skeleton p-3 w-full"></div>
      <div class="skeleton p-3 w-full"></div>
      <div class="skeleton p-3 w-3/4"></div>
    </div>
    <div class="skeleton p-4 w-80 md:w-96 h-64 flex justify-center items-center">
      <IRegularImage class="h-10 w-10"/>
    </div>
    <div class="w-full flex flex-col gap-4">
      <div class="skeleton p-3 w-full"></div>
      <div class="skeleton p-3 w-full"></div>
      <div class="skeleton p-3 w-3/4"></div>
    </div>
  </div>
  <div v-else-if="props.type === 'timeline'" class="px-4 mx-auto max-w-xl flex gap-3">
    <div class="w-2 skeleton"></div>
    <div class="relative flex flex-col gap-4 fill-light-500/50 dark:fill-light-200/50 grow">
      <div class="skeleton p-4 w-1/4 my-2"></div>
      <div class="skeleton p-3 w-1/2"></div>
      <div class="skeleton p-3 w-2/3"></div>
      <div class="skeleton p-3 w-1/2"></div>
      <div class="skeleton p-3 w-2/3"></div>
      <div class="skeleton p-3 w-1/2"></div>
      <div class="skeleton p-4 w-1/4 my-2"></div>
      <div class="skeleton p-3 w-3/4"></div>
      <div class="skeleton p-3 w-1/2"></div>
      <div class="skeleton p-3 w-2/3"></div>
      <div class="skeleton p-3 w-2/3"></div>
      <div class="skeleton p-3 w-2/3"></div>
    </div>
  </div>
  <div v-else-if="props.type === 'list'" class="px-2 mx-auto max-w-xl flex flex-col items-center gap-4">
    <div class="skeleton p-10 w-full max-w-sm"></div>
    <div class="skeleton p-10 w-full max-w-sm"></div>
    <div class="skeleton p-10 w-full max-w-sm"></div>
    <div class="skeleton p-10 w-full max-w-sm"></div>
  </div>
  <div v-else-if="props.type === 'category'" class="flex flex-col gap-4">
    <div class="skeleton p-3 w-full w-24"></div>
    <div class="skeleton p-3 w-full w-24 ml-6"></div>
    <div class="skeleton p-3 w-full w-24 ml-6"></div>
    <div class="skeleton p-3 w-full w-24"></div>
    <div class="skeleton p-3 w-full w-24 ml-6"></div>
    <div class="skeleton p-3 w-full w-24"></div>
  </div>
  <div v-else-if="props.type === 'tag'" class="gap-4 flex flex-wrap gap-4">
    <div class="inline-block skeleton p-3.5 w-full w-16"></div>
    <div class="inline-block skeleton p-3.5 w-full w-24"></div>
    <div class="inline-block skeleton p-3.5 w-full w-16"></div>
    <div class="inline-block skeleton p-3.5 w-full w-16"></div>
    <div class="inline-block skeleton p-3.5 w-full w-24"></div>
    <div class="inline-block skeleton p-3.5 w-full w-12"></div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Skeleton',
})
</script>

<script lang="ts" setup>
const props = defineProps<{
  type: 'article' | 'timeline' | 'list' | 'category' | 'tag'
}>()
</script>

<style scoped>
.skeleton {
  @apply bg-light-400/50 rounded-lg animate-pulse;
}
</style>