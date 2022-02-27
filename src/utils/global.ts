import renderer from '@/utils/renderer'
marked.use({ renderer })

const siteName = import.meta.env.BHS_SITE_NAME

export const isLoading = ref(false)
export const isSideMenuOpen = ref(false)
export const title = ref('')
useTitle(computed(() => title.value ? `${ title.value } - ${ siteName }` : siteName))
export const currentTheme = useStorage('bhs.theme', 'system')
export const isCurrentDarkMode = ref(false)
export const isShowImage = ref(true)