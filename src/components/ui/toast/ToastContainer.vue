<template>
  <Teleport to="body">
    <div ref="container"
         class="fixed z-50 top-0 left-0 right-0 mx-auto max-w-sm
         sm:left-auto sm:w-96 pointer-events-none
         flex flex-col p-2">
      <transition-group @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave" :css="false">
        <Toast v-for="toast in toastQueue" :key="toast.id" :config="toast.config" @close="remove(toast.id)"/>
      </transition-group>
    </div>
  </Teleport>
</template>

<script lang="ts">
export default defineComponent({
  name: 'ToastContainer',
})
</script>

<script lang="ts" setup>
import Toast from '@/components/ui/toast/Toast.vue'
import gsap from 'gsap'
import { _toastImpl } from '@/utils/toast'

_toastImpl.add = add
_toastImpl.remove = remove
_toastImpl.clear = clear

// toast actions
const toastQueue = ref<ToastMessage[]>([])
let nextToastId = 0

function add(toast: ToastProps) {
  toastQueue.value.push({
    id: nextToastId++,
    config: toast,
  })
}

function remove(id?: number) {
  for (let i = 0; i < toastQueue.value.length; i++) {
    if (toastQueue.value[i].id === id) {
      toastQueue.value.splice(i, 1)
      break
    }
  }
}

function clear() {
  toastQueue.value = []
}

function onBeforeEnter(el: Element) {
  gsap.set(el, {
    opacity: 0,
    translateY: -50,
    transformOrigin: 'top',
  })
}

function onEnter(el: Element, done: () => void) {
  gsap.to(el, {
    duration: 0.3,
    opacity: 1,
    translateY: 0,
    onComplete: done,
  })
}

function onLeave(el: Element, done: () => void) {
  gsap.fromTo(el, {
    height: el.clientHeight,
    zIndex: -1,
  }, {
    duration: 0.3,
    opacity: 0,
    height: 0,
    marginBottom: 0,
    translateY: -50,
    onComplete: done,
  })
}

</script>

<style scoped>
.test-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}

.test-enter-active,
.test-leave-active {
  transition: all 0.3s;
}

.test-leave-from {
  max-height: 200px;
}
.test-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-100%);
}
</style>