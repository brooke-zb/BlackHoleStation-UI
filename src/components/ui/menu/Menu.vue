<template>
  <Teleport to="body">
    <transition @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave" :css="false">
      <ul ref="menu" v-if="isOpen" class="fixed z-50 bg-zinc-50 dark:bg-dark-700 py-1 rounded">
        <MenuItem v-for="item in props.items" :item="item" @click="toggle"/>
      </ul>
    </transition>
  </Teleport>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Menu',
})
</script>

<script lang="ts" setup>
import gsap from 'gsap'
import MenuItem from '@/components/ui/menu/MenuItem.vue'

const props = defineProps<{
  items: MenuItemProps[]
}>()

defineExpose({ toggle })

function pos() {
  let rect = target.value?.getBoundingClientRect()
  let rect_self = menu.value?.getBoundingClientRect()
  if (!rect || !rect_self) return {}

  let pos: Record<string, any> = {}
  if (rect.bottom + rect_self.height > document.documentElement.offsetHeight) {
    pos.top = rect.top - rect_self.height
    pos.transformOrigin = 'bottom'
  } else {
    pos.top = rect.bottom
    pos.transformOrigin = 'top'
  }
  let posX = rect.left + rect.width / 2 - rect_self.width / 2
  if (posX + rect_self.width > document.documentElement.offsetWidth) {
    pos.left = document.documentElement.offsetWidth - rect_self.width
  } else {
    pos.left = posX
  }
  return pos
}

function onBeforeEnter(el: HTMLElement) {
  gsap.set(el, {
    opacity: 0,
    scaleY: 0,
  })
}

function onEnter(el: HTMLElement, done: () => void) {
  gsap.set(el, pos())
  gsap.to(el, {
    duration: 0.15,
    opacity: 1,
    scaleY: 1,
    onComplete: done,
  })
  document.addEventListener('click', outsideClickListener)
  window.addEventListener('resize', resizeListener)
}

function onLeave(el: HTMLElement, done: () => void) {
  gsap.to(el, {
    duration: 0.15,
    opacity: 0,
    onComplete: done,
  })
  document.removeEventListener('click', outsideClickListener)
  window.removeEventListener('resize', resizeListener)
}

// toggle menu
const menu = ref()
const isOpen = ref(false)
const target = ref<HTMLElement | null>()

function toggle(event?: Event) {
  target.value = event?.target as HTMLElement
  isOpen.value = !isOpen.value
}

function outsideClickListener(event: MouseEvent) {
  if (menu.value && !menu.value.contains(event.target) && event.target !== target.value) {
    toggle(event)
  }
}

function resizeListener(event: UIEvent) {
  if (isOpen.value) {
    toggle(event)
  }
}

</script>