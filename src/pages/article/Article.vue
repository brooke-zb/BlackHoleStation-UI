<template>
  <div class="px-1.5">
    <template v-if="loading">
      <Skeleton type="article"/>
    </template>
    <template v-else-if="data">
      <div class="text-xl sm:text-2xl text-center font-bold mb-2">{{ data.title }}</div>
      <div
          class="flex justify-center items-center gap-2 mb-2 text-light-500 fill-light-500 dark:text-light-400 dark:fill-light-400">
        <IRegularCalendarLines/>
        {{ data.created }}
        <template v-if="data.modified">
          -
          <IRegularCalendarLinesPen/>
          {{ data.modified }}
        </template>
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
      <CommentContainer v-if="isShowComment" :aid="props.aid" :article-uid="data.user.uid"/>
    </template>
    <GalleryContainer ref="gallery"/>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Article',
})
</script>

<script lang="ts" setup>
import { isShowImage, title } from '@/utils/global'
import Skeleton from '@/components/ui/skeleton/Skeleton.vue'
import GalleryContainer from '@/components/ui/gallery/GalleryContainer.vue'
import CommentContainer from '@/pages/article/CommentContainer.vue'

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

title.value = '文章'
onMounted(async () => {
  // 关闭背景图片以避免影响文字显示
  isShowImage.value = false

  // 获取文章内容
  let res = await article.getByAid(props.aid)
  if (res.success) {
    data.value = res.data
    data.value.content = marked(data.value.content)
    title.value = data.value.title
    isShowComment.value = true
  } else {
    toast.add({
      type: 'danger',
      message: res.msg,
      duration: 5000,
    })
    title.value = '文章不存在'
  }
  loading.value = false

  // 设置代码高亮
  nextTick(() => {
    Prism.highlightAll()
    gallery.value.init('[data-gallery]')
    // gallerybox.init('.bhs-gallery')
  })
})

onUnmounted(() => {
  isShowImage.value = true
})
</script>