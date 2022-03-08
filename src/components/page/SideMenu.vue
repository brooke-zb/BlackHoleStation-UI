<template>
  <transition @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave" :css="false">
    <div v-show="store.state.isSideMenuOpen" @click="store.state.isSideMenuOpen = false"
         class="fixed top-0 left-0 w-full h-full bg-black z-[80] p-8 md:p-16 flex items-center">
      <div ref="menu" @click.stop="" class="w-full h-full rounded-lg overflow-hidden
           bg-light-100 dark:bg-dark-800 border-2 border-dark-700">
        <!--菜单栏-->
        <div class="flex justify-between bg-light-200 dark:bg-dark-700">
          <div class="px-1 py-1 fill-light-500 dark:fill-dark-300">
            <ISolidFolderBlank/>
          </div>
          <div class="px-2 py-1 text-sm select-none">{{ siteName }}</div>
          <div class="flex items-center px-1">
            <ISolidCircleSmall class="fill-success-500"/>
            <ISolidCircleSmall class="fill-warning-500"/>
            <ISolidCircleSmall class="fill-danger-500 cursor-pointer" @click="store.toggleSideMenu"/>
          </div>
        </div>
        <!--文件栏-->
        <TabNav :items="tabItems" :active="activeIndex" @change="navigateTab">
          <div class="p-8 gap-8 flex flex-col sm:flex-row items-center sm:items-start">
            <div>
              <img :src="avatar" width="128" height="128" alt=""
                   class="rounded-xl ring ring-light-400 dark:ring-dark-400"/>
            </div>
            <div>
              <div class="text-xl font-bold tracking-wide">{{ siteName }}</div>
            </div>
          </div>
          <div class="p-8 gap-8 flex flex-col sm:flex-row items-center sm:items-start">
            <div>
              <img :src="avatar" width="128" height="128" alt=""
                   class="rounded-xl ring ring-light-400 dark:ring-dark-400"/>
            </div>
            <div>
              <div class="text-xl font-bold tracking-wide">{{ siteName.split('').reverse().join('') }}</div>
            </div>
          </div>
        </TabNav>
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
import avatar from '@/assets/img/avatar.png?url'
import TabNav from '@/components/ui/tabview/TabView.vue'
import IRegularCompass from '~icons/regular/compass'
import IRegularUser from '~icons/regular/user'

const siteName = import.meta.env.BHS_SITE_NAME
const menu = ref()

function onBeforeEnter(el: Element) {
  gsap.set(el, {
    '--tw-bg-opacity': 0,
  })
  gsap.set(menu.value, {
    translateY: '-200%',
    opacity: 0.2,
  })
}

function onEnter(el: Element, done: () => void) {
  gsap.to(el, {
    '--tw-bg-opacity': 0.7,
    duration: 0.25,
  })
  gsap.to(menu.value, {
    translateY: '0',
    opacity: 1,
    duration: 0.5,
    ease: 'elastic.out(0.4, 0.3)',
    onComplete: done,
  })
}

function onLeave(el: Element, done: () => void) {
  gsap.to(el, {
    '--tw-bg-opacity': 0,
    duration: 0.25,
  })
  gsap.to(menu.value, {
    translateY: '-200%',
    opacity: 0.25,
    duration: 0.25,
    onComplete: done,
  })
}

const activeIndex = ref(0)
const tabItems = [
  {
    label: '导航',
    icon: IRegularCompass,
  },
  {
    label: '关于',
    icon: IRegularUser,
  },
]

function navigateTab(index: number) {
  activeIndex.value = index
}
</script>