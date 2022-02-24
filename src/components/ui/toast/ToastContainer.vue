<template>
  <Teleport to="body">
    <div ref="container"
         class="fixed z-50 top-0 left-0 right-0 mx-auto max-w-sm
         sm:left-auto sm:w-96 pointer-events-none
         flex flex-col gap-2 p-2">
      <transition-group @enter="onEnter" @leave="onLeave" :css="false">
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

const toastQueue = ref<ToastMessage[]>([])
let nextToastId = 0

function onEnter(el: HTMLElement, done: () => void) {
  gsap.set(el, {
    opacity: 0,
    translateY: '-100%',
    transformOrigin: 'top',
    onComplete: () => {
      gsap.to(el, {
        duration: 0.2,
        opacity: 1,
        translateY: 0,
        onComplete: done,
      })
    },
  })
}

function onLeave(el: HTMLElement, done: () => void) {
  gsap.to(el, {
    duration: 0.2,
    opacity: 0,
    translateY: '-100%',
    onComplete: done,
  })
}

// toast actions
function add(toast: ToastMessage) {
  toast.id = nextToastId++
  toastQueue.value.push(toast)
}

function remove(id: number) {
  for (let i = 0; i < toastQueue.value.length; i++) {
    if (toastQueue.value[i].id === id) {
      toastQueue.value.splice(i, 1)
      break
    }
  }
}

function clear() {
  console.log('clear')
  toastQueue.value = []
}

// TEST
onMounted(() => {
  add({
    id: 1,
    config: {
      type: 'success',
      message: '成功修改账户信息',
    },
  })
  add({
    id: 1,
    config: {
      type: 'info',
      message: '您有一条新消息',
    },
  })
  add({
    id: 1,
    config: {
      type: 'danger',
      message: '我将以高达形态出击',
    },
  })
  add({
    id: 1,
    config: {
      type: 'warning',
      message: '这是一段长文本，非常长长长长长长长长长长长长长长长',
    },
  })
})

</script>