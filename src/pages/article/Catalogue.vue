<template>
  <Teleport to="body">
    <div class="fixed left-1 right-1 top-16 pointer-events-none">
      <Button :type="store.state.isDarkMode ? 'info' : 'secondary'"
              v-tooltip="'目录'" @click="toggleMenu"
              class="!absolute left-auto right-0 sm:left-0 sm:right-auto top-0 pointer-events-auto">
        <template #icon>
          <IRegularList/>
        </template>
      </Button>
      <transition @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave" :css="false">
        <ul ref="menu" v-if="isShow" @click.stop="" class="bg-light-50 dark:bg-dark-700 p-2 rounded-lg shadow-lg inline-block
            absolute left-auto right-0 sm:left-0 sm:right-auto top-0 pointer-events-auto origin-top-right sm:origin-top-left">
          <li class="block catalogue cursor-pointer px-1 py-0.5 hover:bg-secondary-100 dark:hover:bg-dark-800"
              :data-level="item.level" v-for="item in store.state.anchors" @click="toAnchor(item.id)">
            {{ item.title }}
          </li>
        </ul>
      </transition>
    </div>
  </Teleport>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Catalogue',
})
</script>

<script lang="ts" setup>
import gsap from 'gsap'
import store from '@/utils/store'
import Button from '@/components/ui/button/Button.vue'

let isShow = $ref(false)

function toggleMenu() {
  isShow = !isShow
}

function onBeforeEnter(el: Element) {
  gsap.set(el, {
    opacity: 0,
    scale: 0,
  })
}

function onEnter(el: Element, done: () => void) {
  gsap.to(el, {
    opacity: 1,
    scale: 1,
    duration: 0.2,
    onComplete: () => {
      document.addEventListener('click', outsideClickListener)
      done()
    },
  })
}

function onLeave(el: Element, done: () => void) {
  gsap.to(el, {
    opacity: 0,
    scale: 0,
    duration: 0.2,
    onComplete: done,
  })
  document.removeEventListener('click', outsideClickListener)
}

function outsideClickListener() {
  toggleMenu()
}

// 锚点跳转
function toAnchor(id: string) {
  let anchor = document.getElementById(id)
  if (anchor) {
    window.scrollTo({
      top: anchor.offsetTop,
      behavior: 'smooth',
    })
  }
}
</script>