<template>
  <div
      class="fixed w-full h-full top-0 left-0 bg-black/80 flex justify-center items-center z-[60]"
  >
    <div class="bg-gray-50 dark:bg-dark-700 p-3 rounded-sm text-black dark:text-white shadow-xl">
      <div class="pb-2 text-center">{{ text }}</div>
      <div
          class="relative w-64 h-1 bg-gray-200 dark:bg-dark-600 before:absolute before:h-1 before:bg-primary-500 dark:before:bg-dark-400 progress-bar"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Loading',
})
</script>

<script lang="ts" setup>

// const texts = ['少女祈祷中...', '少女折寿中...', '马上就好了哦~']

let text = '咕咕咕...'

</script>

<style>
.progress-bar::before {
  animation: progress-bar 1.5s linear infinite;
}

@keyframes progress-bar {
  0% {
    left: 0;
    width: 0;
  }
  50% {
    left: 64px;
    width: 128px;
  }
  100% {
    left: 256px;
    width: 0;
  }
}
</style>