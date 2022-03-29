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
            <ISolidXmark class="group-hover:scale-125 group-hover:fill-danger-600 transition-all"/>
          </div>
        </div>
        <!--文件栏-->
        <TabView :navs="tabItems" :active="activeIndex" @change="navigateTab">
          <TabPanel>
            <div class="p-4 flex flex-col font-bold text-secondary-600 dark:text-info-400 select-none">
              <div class="pt-10 pb-1 flex justify-center items-center grow text-4xl">
                {{ currentTime }}
              </div>
              <div class="pt-1 pb-10 flex justify-center items-center grow text-lg">
                {{ currentYear }}
              </div>
              <div class="flex flex-col items-center gap-4">
                <router-link v-for="item in navItems" :to="item.to"
                             class="text-center w-1/2 transition-colors px-8 py-1 hover:bg-secondary-500 dark:hover:bg-info-500
                             hover:text-light-50 dark:hover:text-light-50 hover:fill-light-50 dark:hover:fill-light-50"
                             :class="{'text-secondary-500 dark:text-info-300 fill-secondary-500 dark:fill-info-300': item.names.includes($route.name || ''),
                             'text-light-900 dark:text-light-50 fill-light-900 dark:fill-light-50': !item.names.includes($route.name || '')}">
                  <component :is="item.icon" class="inline align-text-bottom"/>
                  {{ item.label }}
                </router-link>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
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
                    <IRegularEnvelope class="fill-success-500 w-5"/>
                  </a>
                </div>
              </div>
            </div>
          </TabPanel>
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
import TabPanel from '@/components/ui/tabview/TabPanel.vue'
import IRegularCompass from '~icons/regular/compass'
import IRegularUser from '~icons/regular/user'
import IRegularHouse from '~icons/regular/house'
import IRegularBoxArchive from '~icons/regular/box-archive'
import IRegularFolders from '~icons/regular/folders'
import IRegularTags from '~icons/regular/tags'
import IRegularLink from '~icons/regular/link'

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

// 菜单项
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

// 导航项
const now = useNow()
const currentTime = useDateFormat(now, 'HH:mm:ss')
const currentYear = useDateFormat(now, 'YYYY-MM-DD')

const navItems: NavItem[] = [
  {
    label: '首页',
    icon: IRegularHouse,
    to: '/',
    names: ['index'],
  },
  {
    label: '归档',
    icon: IRegularBoxArchive,
    to: '/archive',
    names: ['archive'],
  },
  {
    label: '分类',
    icon: IRegularFolders,
    to: '/categories',
    names: ['categories', 'category_list'],
  },
  {
    label: '标签',
    icon: IRegularTags,
    to: '/tags',
    names: ['tags', 'tag_list'],
  },
  {
    label: '友链',
    icon: IRegularLink,
    to: '/friends',
    names: ['friends'],
  },
]
</script>