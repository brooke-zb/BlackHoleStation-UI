<template>
  <transition @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave" :css="false">
    <div v-show="store.state.isSideMenuOpen" @click="store.state.isSideMenuOpen = false"
         class="fixed top-0 left-0 w-full h-full bg-black z-[80] p-10 md:p-16 flex items-start justify-center overflow-y-auto">
      <div ref="menu" @click.stop="" class="w-full max-w-2xl rounded-lg
           bg-light-100 dark:bg-dark-800 border-2 border-light-200 dark:border-dark-700">
        <!--菜单栏-->
        <div class="flex justify-between bg-light-200 dark:bg-dark-700">
          <div class="px-1 py-1 fill-light-500 dark:fill-dark-300">
            <ISolidFolderBlank/>
          </div>
          <div class="px-2 py-1 text-sm select-none">{{ siteName }}</div>
          <div class="flex items-center px-3 cursor-pointer group" @click="store.toggleSideMenu">
            <ISolidXmark class="group-hover:scale-150 group-hover:fill-danger-600 transition-all"/>
          </div>
        </div>
        <!--文件栏-->
        <TabView :navs="tabItems" :active="activeIndex" @change="navigateTab">
          <div class="p-4 gap-8 flex flex-col items-center justify-around">
            <router-link class="link grow" to="/">
              <IRegularHouse class="inline"/>
              主页
            </router-link>
            <router-link class="link" to="/archives">
              <IRegularBoxArchive class="inline"/>
              归档
            </router-link>
            <router-link class="link" to="/categories">
              <IRegularFolders class="inline"/>
              分类
            </router-link>
            <router-link class="link" to="/tags">
              <IRegularTags class="inline"/>
              标签
            </router-link>
            <router-link class="link" to="/friends">
              <IRegularLink class="inline"/>
              友链
            </router-link>
          </div>
          <div class="p-4 gap-8 flex flex-col sm:flex-row items-center sm:items-start">
            <div>
              <img :src="avatar" width="128" height="128" alt=""
                   class="rounded-xl ring ring-light-400 dark:ring-dark-400 w-24 h-24 sm:w-36 sm:h-36"/>
            </div>
            <div>
              <h2 class="text-xl text-secondary-500 dark:text-info-400 font-bold tracking-wide mb-1">关于本站</h2>
              <p class="mb-1">一个分享技术日常的博客，偶尔记录生活。</p>
              <p class="mb-4">博客系统和主题是自己编写的，自用为主。</p>
              <h2 class="text-xl text-secondary-500 dark:text-info-400 font-bold tracking-wide mb-1">关于博主</h2>
              <p class="mb-1">24岁，是学生。</p>
              <p class="mb-1">码农，半桶水美工。</p>
              <p class="mb-4 italic">尽力做自己感兴趣之事。</p>
              <div class="flex items-center text-xl gap-4">
                <a href="https://github.com/brooke-zb" target="_blank">
                  <IBrandsGithub class="fill-light-600 dark:fill-light-100 w-5"/>
                </a>
                <a href="https://space.bilibili.com/14910487" target="_blank">
                  <IBrandsBilibili class="fill-sky-400 w-5"/>
                </a>
                <a href="mailto:me@brookezb.com">
                  <IRegularEnvelope class="fill-primary-400 w-5"/>
                </a>
                <a href="https://steamcommunity.com/id/brooke-zb" target="_blank">
                  <IBrandsSteam class="fill-blue-900 dark:fill-light-100 w-5"/>
                </a>
              </div>
            </div>
          </div>
        </TabView>
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
import TabView from '@/components/ui/tabview/TabView.vue'
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
    '--tw-bg-opacity': 0.6,
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