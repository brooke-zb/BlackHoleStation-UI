const state = reactive({
  isPageLoading: false,
  isSideMenuOpen: false,
  title: '',
  theme: useStorage('bhs.theme', 'system'),
  isDarkMode: false,
  isShowBgImage: true,

  user: undefined,
  anchors: [],
}) as State

const methods = {
  getLoginUser() {
    accountApi.getInfo().then(res => {
      if (res.success) {
        state.user = res.data
      } else {
        state.user = undefined
      }
    })
  },
  toggleSideMenu() {
    state.isSideMenuOpen = !state.isSideMenuOpen
  },
  addAnchor(title: string, level: 1 | 2 | 3 | 4 | 5 | 6) {
    let id = `ac-${ title.replaceAll(' ', '-').replaceAll(/[^0-9a-zA-Z-]/g, '') }-${ level }`
    state.anchors.push({
      id,
      title,
      level,
    })
    return id
  },
  clearAnchors() {
    state.anchors = []
  },
}

export default {
  state,
  ...methods,
}