// import renderer from "@/utils/renderer"
// marked.use({ renderer })

export const siteName = '灵感空间站'
const siteSuffix = ' - ' + siteName
export const beian = '粤ICP备19060438号-1'
export const owner = 'brooke_zb'
export const ownerInfo = '莫得感情的代码机器'

export const isLoading = ref(false)
export const isSideMenuOpen = ref(false)
export const title = ref('主页')
export const currentTheme = useStorage('bhs.theme', 'system')
export const isCurrentDarkMode = ref(false)

export const setTitle = (_title: string, onlyDocTitle: boolean = false) => {
    title.value = _title
    if (onlyDocTitle) {
        document.title = siteName
    } else {
        document.title = _title + siteSuffix
    }
}

export const getRunningTime = () => {
    return 233
}
