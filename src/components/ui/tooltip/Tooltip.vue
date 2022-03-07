<template>
  <div ref="tooltip" class="fixed z-50 px-1.5 py-0.5 rounded text-sm
       bg-light-900 text-white dark:bg-light-50 dark:text-light-900">
    {{ props.content }}
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Tooltip',
})
</script>

<script lang="ts" setup>
import gsap from 'gsap'

const props = defineProps<{
  el: Element
  content: string,
}>()

const tooltip = ref()

function updatePos() {
  let rect = props.el.getBoundingClientRect()

  if (!rect || !tooltip.value) return
  let pos: Record<string, any> = {}

  // y
  if (rect.bottom + tooltip.value.clientHeight + 5 < document.documentElement.offsetHeight) {
    pos.top = rect.bottom + 5
  } else {
    pos.top = rect.top - tooltip.value.clientHeight - 5
  }

  // x
  let posX = rect.left + rect.width / 2 - tooltip.value.clientWidth / 2
  if (posX + tooltip.value.clientWidth > document.documentElement.offsetWidth) {
    pos.left = document.documentElement.clientWidth - tooltip.value.clientWidth
  } else if (posX < 0) {
    pos.left = 0
  } else {
    pos.left = posX
  }

  gsap.set(tooltip.value, pos)
}

onMounted(() => {
  updatePos()
})
</script>