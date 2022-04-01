<template>
  <nav class="sticky w-full h-14 top-0 z-40 flex justify-between items-center
       shadow-sm dark:shadow-light-300/20 bg-light-100/70 dark:bg-dark-800/70">
    <div>
      <router-link to="/admin">
        <MenuButton v-tooltip="'概要'" :type="store.state.isDarkMode ? 'info' : 'secondary'">
          <template #icon>
            <IRegularHouse/>
          </template>
        </MenuButton>
      </router-link>
      <MenuButton v-tooltip="'撰写文章'" :type="store.state.isDarkMode ? 'info' : 'secondary'">
        <template #icon>
          <IRegularPen/>
        </template>
      </MenuButton>
      <MenuButton v-tooltip="'管理'" @click="toggleNavMenu"
                  :type="store.state.isDarkMode ? 'info' : 'secondary'">
        <template #icon>
          <IRegularWrench/>
        </template>
      </MenuButton>
      <Menu ref="navMenu" :items="navMenuItem"/>
    </div>
    <div>
      <MenuButton v-tooltip="'主题'" ref="themeBtn" @click="toggleThemeMenu"
                  :type="store.state.isDarkMode ? 'info' : 'secondary'" :highlight="store.state.theme !== 'system'">
        <template #icon>
          <IRegularMoonStars v-if="store.state.theme === 'dark' || (store.state.theme === 'system' && store.state.isDarkMode)"/>
          <IRegularSunBright v-if="store.state.theme === 'light' || (store.state.theme === 'system' && !store.state.isDarkMode)"/>
        </template>
      </MenuButton>
      <Menu ref="themeMenu" :items="themeMenuItem"/>
      <MenuButton v-tooltip="'退出登录'" type="danger" @click="logout">
        <template #icon>
          <IRegularRightFromBracket/>
        </template>
      </MenuButton>
    </div>
  </nav>
</template>

<script lang="ts">
export default defineComponent({
  name: 'AdminNavbar',
})
</script>

<script lang="ts" setup>
import store from '@/utils/store'
import MenuButton from '@/components/ui/button/MenuButton.vue'
import Menu from '@/components/ui/menu/Menu.vue'

import IRegularSunBright from '~icons/regular/sun-bright'
import IRegularMoonStars from '~icons/regular/moon-stars'
import IRegularDisplay from '~icons/regular/display'
import IRegularFolders from '~icons/regular/folders'
import IRegularTags from '~icons/regular/tags'
import IRegularUserGear from '~icons/regular/user-gear'
import IRegularUserShield from '~icons/regular/user-shield'
import IRegularCommentDots from '~icons/regular/comment-dots'
import IRegularFileLines from '~icons/regular/file-lines'

const toast = useToast()
const router = useRouter()

// 切换主题
const themeMenuItem: MenuItemProps[] = [
  {
    type: 'action',
    onClick: () => applyTheme('light'),
    icon: IRegularSunBright,
    text: '亮色',
    highlight: computed(() => store.state.theme === 'light'),
  },
  {
    type: 'action',
    onClick: () => applyTheme('dark'),
    icon: IRegularMoonStars,
    text: '暗色',
    highlight: computed(() => store.state.theme === 'dark'),
  },
  {
    type: 'action',
    onClick: () => applyTheme('system'),
    icon: IRegularDisplay,
    text: '跟随系统',
    highlight: computed(() => store.state.theme === 'system'),
  },
]

const applyTheme = inject('applyTheme', Function, true)
const themeBtn = ref()
const themeMenu = ref()

const toggleThemeMenu = (event: Event) => {
  themeMenu.value.toggle(event)
}

// 导航菜单
const navMenuItem: MenuItemProps[] = [
  {
    type: 'link',
    to: '/admin/articles',
    icon: IRegularFileLines,
    text: '文章管理',
  },
  {
    type: 'link',
    to: '/admin/comments',
    icon: IRegularCommentDots,
    text: '评论管理',
  },
  {
    type: 'link',
    to: '/admin/categories',
    icon: IRegularFolders,
    text: '分类管理',
  },
  {
    type: 'link',
    to: '/admin/tags',
    icon: IRegularTags,
    text: '标签管理',
  },
  {
    type: 'link',
    to: '/admin/users',
    icon: IRegularUserGear,
    text: '用户管理',
  },
  {
    type: 'link',
    to: '/admin/roles',
    icon: IRegularUserShield,
    text: '角色管理',
  },
]

const navMenu = ref()

function toggleNavMenu(event: Event) {
  navMenu.value.toggle(event)
}

// 退出登录
function logout() {
  accountApi.logout().then(res => {
    if (res.success) {
      toast.add({
        type: 'success',
        message: '退出登录成功',
        duration: 3000,
      })
      store.getLoginUser().then(() => {
        router.push('/admin/login')
      })
    } else {
      toast.add({
        type: 'danger',
        message: res.msg,
        duration: 3000,
      })
    }
  })
}
</script>