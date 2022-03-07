<template>
  <Teleport to="body">
    <transition-group @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave" :css="false">
      <Tooltip v-for="tooltip in tooltipQueue" :key="tooltip.id" :el="tooltip.el" :content="tooltip.content"/>
    </transition-group>
  </Teleport>
</template>

<script lang="ts">
export default defineComponent({
  name: 'TooltipContainer',
})
</script>

<script lang="ts" setup>
import { _tooltipImpl } from '@/utils/tooltip'
import gsap from 'gsap'
import Tooltip from '@/components/ui/tooltip/Tooltip.vue'

_tooltipImpl.add = add
_tooltipImpl.remove = remove

// tooltip actions
const tooltipQueue = ref<TooltipProps[]>([])

function add(tooltip: TooltipProps) {
  tooltipQueue.value.push(tooltip)
}

function remove(id: number) {
  for (let i = 0; i < tooltipQueue.value.length; i++) {
    if (tooltipQueue.value[i].id === id) {
      tooltipQueue.value.splice(i, 1)
      break
    }
  }
}

// tooltip transition
function onBeforeEnter(el: Element) {
  gsap.set(el, {
    scale: 0,
    opacity: 0,
  })
}

function onEnter(el: Element, done: () => void) {
  gsap.to(el, {
    scale: 1,
    opacity: 1,
    duration: 0.15,
    onComplete: done,
  })
}

function onLeave(el: Element, done: () => void) {
  gsap.to(el, {
    scale: 0,
    opacity: 0,
    duration: 0.15,
    onComplete: done,
  })
}
</script>