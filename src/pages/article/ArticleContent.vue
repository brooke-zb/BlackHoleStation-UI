<template>
  <div>
    <div class="text-xl sm:text-2xl text-center font-bold mb-2">{{ props.data.title }}</div>
    <div
        class="flex justify-center gap-2 mb-2 text-light-500 fill-light-500 dark:text-light-400 dark:fill-light-400">
      <div v-tooltip="'发布时间'">
        <IRegularCalendarLines class="inline align-text-top"/>
        {{ props.data.created.substring(0, props.data.created.length - 3) }}
      </div>
      <div v-if="data.modified" v-tooltip="'上次更新'">
        -
        <IRegularCalendarLinesPen class="inline align-text-top"/>
        {{ props.data.modified.substring(0, props.data.modified.length - 3) }}
      </div>
    </div>
    <div
        class="flex justify-center items-center gap-1.5 mb-2 text-light-500 fill-light-500 dark:text-light-400 dark:fill-light-400">
      <IRegularEye/>
      {{ props.data.views }}
      -
      <router-link class="link flex justify-center items-center gap-1.5" :to="'/categories/' + props.data.category.cid">
        <IRegularFolder/>
        {{ props.data.category.name }}
      </router-link>
    </div>
    <div
        class="flex justify-center items-end gap-2 mb-2 text-light-500 fill-light-500 dark:text-light-400 dark:fill-light-400">
      <router-link v-for="tag in props.data.tags"
                   class="link flex justify-center items-center gap-0.5"
                   :to="'/tags/' + tag.name">
        <IRegularTag/>
        {{ tag.name }}
      </router-link>
    </div>
    <div class="bhs-content" v-html="data.content"></div>
    <GalleryContainer ref="gallery"/>
    <Catalogue v-if="props.data && store.state.anchors.length > 0"/>
  </div>
</template>

<script lang="ts">export default defineComponent({
  name: 'ArticleContent',
})
</script>

<script lang="ts" setup>
import store from '@/utils/store'
import GalleryContainer from '@/components/ui/gallery/GalleryContainer.vue'
import Catalogue from '@/pages/article/Catalogue.vue'

// code highlight
import Prism from 'prismjs'
import 'prismjs/components/prism-json.min.js'
import 'prismjs/components/prism-c.min.js'
import 'prismjs/components/prism-java.min.js'
import 'prismjs/components/prism-sql.min.js'
import 'prismjs/components/prism-typescript.min.js'
import 'prismjs/components/prism-python.min.js'
import 'prismjs/components/prism-glsl.min.js'
import 'prismjs/plugins/line-numbers/prism-line-numbers.min.js'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

const gallery = ref()
const props = defineProps<{
  data: BhsArticle
}>()

onMounted(() => {
  store.state.title = props.data.title

  // 关闭背景图片以避免影响文字显示
  store.state.isShowBgImage = false

  // 加载代码高亮、图片灯箱
  Prism.highlightAll()
  gallery.value.init('[data-gallery]')
})

onUnmounted(() => {
  store.state.isShowBgImage = true
  store.clearAnchors()
})
</script>