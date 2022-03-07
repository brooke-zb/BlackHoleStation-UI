const state = reactive({
  isPageLoading: false,
  isSideMenuOpen: false,
  title: '',
  theme: useStorage('bhs.theme', 'system'),
  isDarkMode: false,
  isShowBgImage: true,

  user: undefined
}) as State

export default state