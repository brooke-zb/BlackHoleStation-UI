// import renderer from "@/utils/renderer"
// marked.use({ renderer })

const siteName = import.meta.env.BHS_SITE_NAME

export const isLoading = ref(false)
export const isSideMenuOpen = ref(false)
export const title = useTitle('主页', { titleTemplate: `%s - ${siteName}`})
export const currentTheme = useStorage('bhs.theme', 'system')
export const isCurrentDarkMode = ref(false)