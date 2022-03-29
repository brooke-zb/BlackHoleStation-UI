<template>
  <transition mode="out-in"
              @before-enter="beforeEnter"
              @enter="enter"
              @leave="leave"
              :css="false">
    <slot></slot>
  </transition>
</template>

<script lang="ts">
/**
 * 优化骨架屏切换后，渲染内容突然出现的视觉落差
 */
export default defineComponent({
  name: 'Content',
})
</script>

<script lang="ts" setup>
import gsap from 'gsap'

// 切换动画
function beforeEnter(el: Element) {
  gsap.set(el, {
    opacity: 0,
  })
}

function enter(el: Element, done: () => void) {
  gsap.to(el, {
    opacity: 1,
    duration: 0.2,
    onComplete: done,
  })
}

function leave(el: Element, done: () => void) {
  gsap.to(el, {
    opacity: 0,
    duration: 0.2,
    onComplete: done,
  })
}
</script>