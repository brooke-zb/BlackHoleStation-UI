const state = reactive({
  isPageLoading: false,
  isSideMenuOpen: false,
  title: '',
  theme: useStorage('bhs.theme', 'system'),
  isDarkMode: false,
  isShowBgImage: true,

  user: undefined
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
  }
}

export default {
  state,
  ...methods
}