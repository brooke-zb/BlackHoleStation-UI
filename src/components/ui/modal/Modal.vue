<template>
  <Teleport to="body">
    <transition @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave">
      <div v-show="isOpen" @click="onCancel" class="fixed top-0 left-0 w-full h-full
           flex justify-center items-end sm:items-center z-50 overflow-hidden bg-black">
        <div @click.stop="" ref="modal" class="m-2 p-4 bg-light-100 dark:bg-dark-600 rounded-lg w-full max-w-sm">
          <div class="mb-2 text-lg">{{ props.title }}</div>
          <div class="text-light-600 dark:text-light-300">{{ props.content }}</div>
          <div class="flex justify-end gap-2">
            <Button :type="store.state.isDarkMode ? 'light' : 'dark'" @click="onCancel">取 消</Button>
            <Button :type="confirmType" @click="onConfirm">确 定</Button>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Modal',
})
</script>

<script lang="ts" setup>
import gsap from 'gsap'
import store from '@/utils/store'
import Button from '@/components/ui/button/Button.vue'

const props = withDefaults(defineProps<{
  title: string,
  content: string,
  type?: 'normal' | 'danger'
}>(), {
  type: 'normal',
})

const emits = defineEmits<{
  (e: 'cancel'): void,
  (e: 'confirm'): void,
}>()

// modal transition
const isOpen = ref(false)
const modal = ref()

function onBeforeEnter(el: Element) {
  gsap.set(el, {
    '--tw-bg-opacity': 0,
  })
  gsap.set(modal.value, {
    opacity: 0,
    scale: 0.8,
  })
}

function onEnter(el: Element, done: () => void) {
  gsap.to(el, {
    '--tw-bg-opacity': 0.6,
    duration: 0.25,
  })
  gsap.to(modal.value, {
    opacity: 1,
    scale: 1,
    duration: 0.25,
    onComplete: done,
  })
}

function onLeave(el: Element, done: () => void) {
  gsap.to(el, {
    '--tw-bg-opacity': 0,
    duration: 0.25,
  })
  gsap.to(modal.value, {
    opacity: 0,
    scale: 0.8,
    duration: 0.25,
    onComplete: done,
  })
}

const confirmType = computed(() => props.type === 'danger' ? 'danger' : store.state.isDarkMode ? 'info' : 'secondary')

function onCancel() {
  isOpen.value = false
  emits('cancel')
}

function onConfirm() {
  isOpen.value = false
  emits('confirm')
}

function show() {
  isOpen.value = true
}

defineExpose({
  show,
})
</script>