<template>
  <div class="px-1.5">
    <Content>
      <Skeleton v-if="loading" type="article"/>
      <div v-else-if="data">
        <div class="text-xl sm:text-2xl text-center font-bold mb-2">{{ data.title }}</div>
        <div
            class="flex justify-center gap-2 mb-2 text-light-500 fill-light-500 dark:text-light-400 dark:fill-light-400">
          <div v-tooltip="'发布时间'">
            <IRegularCalendarLines class="inline align-text-top"/>
            {{ data.created }}
          </div>
          <div v-if="data.modified" v-tooltip="'上次更新'">
            -
            <IRegularCalendarLinesPen class="inline align-text-top"/>
            {{ data.modified }}
          </div>
        </div>
        <div
            class="flex justify-center items-center gap-1.5 mb-2 text-light-500 fill-light-500 dark:text-light-400 dark:fill-light-400">
          <IRegularEye/>
          {{ data.views }}
          -
          <router-link class="link flex justify-center items-center gap-1.5" :to="'/categories/' + data.category.cid">
            <IRegularFolder/>
            {{ data.category.name }}
          </router-link>
        </div>
        <div
            class="flex justify-center items-end gap-2 mb-2 text-light-500 fill-light-500 dark:text-light-400 dark:fill-light-400">
          <router-link v-for="tag in data.tags"
                       class="link flex justify-center items-center gap-0.5"
                       :to="'/tags/' + tag.name">
            <IRegularTag/>
            {{ tag.name }}
          </router-link>
        </div>
        <div class="bhs-content" v-html="data.content"></div>
      </div>
      <NotFound v-else code="404" title="文章不存在" message="该文章也许被博主吃掉了，可以尝试："/>
    </Content>
    <CommentContainer v-if="data && isShowComment" :aid="props.aid" :article-uid="data.user.uid"/>
    <GalleryContainer ref="gallery"/>
    <Catalogue v-if="data && store.state.anchors.length > 0"/>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Article',
})
</script>

<script lang="ts" setup>
import store from '@/utils/store'
import Skeleton from '@/components/ui/skeleton/Skeleton.vue'
import GalleryContainer from '@/components/ui/gallery/GalleryContainer.vue'
import CommentContainer from '@/pages/article/CommentContainer.vue'
import Catalogue from '@/pages/article/Catalogue.vue'
import NotFound from '@/pages/error/Error.vue'
import Content from '@/components/ui/skeleton/Content.vue'

// code highlight
import Prism from 'prismjs'
import 'prismjs/components/prism-json.min.js'
import 'prismjs/components/prism-c.min.js'
import 'prismjs/components/prism-java.min.js'
import 'prismjs/components/prism-sql.min.js'
import 'prismjs/components/prism-typescript.min.js'
import 'prismjs/components/prism-python.min.js'
import 'prismjs/plugins/line-numbers/prism-line-numbers.min.js'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

const props = defineProps<{
  aid: number,
}>()
const toast = useToast()

const isShowComment = ref(false)

const loading = ref(true)
const data = ref<BhsArticle>()
const gallery = ref()

store.state.title = '文章'
onMounted(async () => {
  // 关闭背景图片以避免影响文字显示
  store.state.isShowBgImage = false

  // 获取文章内容
  let res = await articleApi.getByAid(props.aid)
  if (res.success) {
    store.clearAnchors()
    data.value = res.data
    data.value.content = marked(data.value.content)
    store.state.title = data.value.title
    isShowComment.value = true
  } else {
    toast.add({
      type: 'danger',
      message: res.msg,
      duration: 5000,
    })
    store.state.title = '文章不存在'
  }
  loading.value = false

  // 设置代码高亮
  nextTick(() => {
    Prism.highlightAll()
    gallery.value.init('[data-gallery]')
  })
})

onUnmounted(() => {
  store.state.isShowBgImage = true
  store.clearAnchors()
})

// 锚点
function toAnchor(id: string) {
  let anchor = document.getElementById(id)
  if (anchor) {
    window.scrollTo({
      top: anchor.offsetTop,
      behavior: 'smooth',
    })
  }
}
</script>