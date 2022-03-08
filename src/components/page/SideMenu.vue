<template>
  <transition @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave" :css="false">
    <div v-show="store.state.isSideMenuOpen" @click="store.state.isSideMenuOpen = false"
         class="fixed top-0 left-0 w-full h-full bg-black z-[80] p-8 md:p-16 shadow-lg
                flex items-center">
      <div ref="menu" @click.stop="" class="w-full md:w-1/2 lg:w-1/3 h-full bg-light-100 dark:bg-light-700 rounded overflow-hidden">
        <div class="flex justify-between bg-light-300 dark:bg-light-800">
          <div class="px-2 py-1">
            <IRegularCircleInfo/>
          </div>
          <div class="px-2 py-1 text-sm select-none">关于本站</div>
          <div class="px-3 py-1 hover:bg-danger-600 hover:fill-light-50" @click="store.state.isSideMenuOpen = false">
            <IRegularXMark/>
          </div>
        </div>
        <div class="p-2">2333</div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
export default defineComponent({
  name: 'SideMenu',
})
</script>

<script lang="ts" setup>
import store from '@/utils/store'
import gsap from 'gsap'
import MenuButton from '@/components/ui/button/MenuButton.vue'

const menu = ref()

function onBeforeEnter(el: Element) {
  gsap.set(el, {
    '--tw-bg-opacity': 0,
  })
  gsap.set(menu.value, {
    translateX: '-200%',
    opacity: 0.2,
  })
}

function onEnter(el: Element, done: () => void) {
  gsap.to(el, {
    '--tw-bg-opacity': 0.5,
    duration: 0.25,
  })
  gsap.to(menu.value, {
    translateX: '0',
    opacity: 1,
    duration: 0.5,
    ease: 'elastic.out(0.6, 0.4)',
    onComplete: done,
  })
}

function onLeave(el: Element, done: () => void) {
  gsap.to(el, {
    '--tw-bg-opacity': 0,
    duration: 0.25,
  })
  gsap.to(menu.value, {
    translateX: '-200%',
    opacity: 0.2,
    duration: 0.25,
    onComplete: done,
  })
}
</script>