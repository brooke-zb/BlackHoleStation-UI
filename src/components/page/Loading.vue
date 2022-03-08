<template>
  <transition
      @before-enter="beforeLoading"
      @enter="enterLoading"
      @leave="leaveLoading"
      :css="false"
  >
    <div v-show="store.state.isPageLoading"
         class="fixed w-full h-full top-0 left-0 bg-black/80 flex justify-center items-center z-[60]">
      <div class="bg-light-50 dark:bg-dark-700 p-3 rounded-sm text-black dark:text-white shadow-xl">
        <div class="pb-2 text-center">{{ text }}</div>
        <div class="relative w-64 h-1
      bg-light-200 dark:bg-dark-600
      before:absolute before:h-1 before:bg-secondary-500 dark:before:bg-dark-400 progress-bar"
        ></div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Loading',
})
</script>

<script lang="ts" setup>
import gsap from 'gsap'
import store from '@/utils/store'

// const texts = ['少女祈祷中...', '少女折寿中...', '马上就好了哦~']
let text = '咕咕咕...'

// 加载动画
function beforeLoading(el: Element) {
  gsap.set(el, {
    opacity: 0,
  })
}

function enterLoading(el: Element, done: () => void) {
  gsap.to(el, {
    duration: 0.4,
    opacity: 1,
    onComplete: done,
  })
}

function leaveLoading(el: Element, done: () => void) {
  gsap.to(el, {
    duration: 0.4,
    opacity: 0,
    onComplete: done,
  })
}

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