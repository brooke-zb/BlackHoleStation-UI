<template>
  <SideMenu/>
  <NavBar/>
  <div class="my-2 container overflow-visible">
    <router-view v-slot="{ Component }">
      <transition mode="out-in"
                  @before-enter="beforeEnter"
                  @enter="enter"
                  @leave="leave"
                  :css="false"
      >
        <component :key="$route.path" :is="Component"/>
      </transition>
    </router-view>
  </div>
  <Footer/>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Layout',
})
</script>

<script lang="ts" setup>
import gsap from 'gsap'
import NavBar from '@/components/page/NavBar.vue'
import Footer from '@/components/page/Footer.vue'
import SideMenu from '@/components/page/SideMenu.vue'

// 页面切换动画
function beforeEnter(el: Element) {
  gsap.set(el, {
    scaleX: 0.8,
    scaleY: 0.8,
    opacity: 0,
  })
}

function enter(el: Element, done: () => void) {
  gsap.to(el, {
    duration: 0.2,
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    onComplete: done,
  })
}

function leave(el: Element, done: () => void) {
  gsap.to(el, {
    duration: 0.2,
    scaleX: 0.8,
    scaleY: 0.8,
    opacity: 0,
    onComplete: done,
  })
}

</script>