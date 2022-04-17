import { parseRouter } from '@/utils/router'
import { unescape } from 'lodash-es'

const state = reactive({
  isPageLoading: false,
  isSideMenuOpen: false,
  title: '',
  theme: useStorage('bhs.theme', 'system'),
  isDarkMode: false,
  isShowBgImage: true,

  user: undefined,
  isUserLoaded: false,

  anchors: [],
  anchorIndex: 0,
}) as {
  isPageLoading: boolean,
  isSideMenuOpen: boolean,
  title: string,
  theme: string,
  isDarkMode: boolean,
  isShowBgImage: boolean,

  user?: BhsUser,
  isUserLoaded: boolean,

  anchors: Anchor[],
  anchorIndex: number,
}

const methods = {
  async getLoginUser() {
    state.isUserLoaded = false
    let res = await accountApi.getInfo()
    if (res.success) {
      state.user = res.data
    } else {
      state.user = undefined
    }
    parseRouter(res.data?.role.permissions || []) // 更新路由
    state.isUserLoaded = true
  },
  toggleSideMenu() {
    state.isSideMenuOpen = !state.isSideMenuOpen
  },
  addAnchor(title: string, level: 1 | 2 | 3 | 4 | 5 | 6) {
    let id = `ac${ state.anchorIndex++ }-${ title.replaceAll(' ', '-').replaceAll(/[^\da-zA-Z-\u4e00-\u9fa5]/g, '') }`
    state.anchors.push({
      id,
      title: unescape(title),
      level,
    })
    return id
  },
  clearAnchors() {
    state.anchors = []
    state.anchorIndex = 0
  },
}

export default {
  state,
  ...methods,
}