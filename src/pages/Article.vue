<template>
  <div class="px-1.5">
    <template v-if="loading">
      <Skeleton type="article"/>
    </template>
    <template v-else>
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
          class="flex justify-center items-center gap-2 mb-2 text-light-500 fill-light-500 dark:text-light-400 dark:fill-light-400">
        <IRegularEye/>
        {{ data.views }}
        -
        <router-link class="link flex justify-center items-center gap-2" :to="'/category/' + data.category.cid">
          <IRegularFolder/>
          {{ data.category.name }}
        </router-link>
      </div>
      <div
          class="flex justify-center items-end gap-2 mb-2 text-light-500 fill-light-500 dark:text-light-400 dark:fill-light-400">
        <router-link v-for="tag in data.tags"
                     class="link flex justify-center items-center gap-0.5"
                     :to="'/tag/' + tag.name">
          <IRegularTag/>
          {{ tag.name }}
        </router-link>
      </div>
      <div class="bhs-content" v-html="data.content"></div>
    </template>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Article',
})
</script>

<script lang="ts" setup>
import { isShowImage } from '@/utils/global'
import gallerybox from '@/utils/gallerybox'
import Button from '@/components/ui/button/Button.vue'

// code highlight
import Prism from 'prismjs'
import 'prismjs/components/prism-json.min.js'
import 'prismjs/components/prism-c.min.js'
import 'prismjs/components/prism-java.min.js'
import 'prismjs/components/prism-sql.min.js'
import 'prismjs/components/prism-python.min.js'
import 'prismjs/plugins/line-numbers/prism-line-numbers.min.js'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import Skeleton from '@/components/ui/skeleton/Skeleton.vue'

const loading = ref(true)

const props = defineProps<{
  aid: number,
}>()

const data = ref<BhsArticle>()

const toast = useToast()

onMounted(async () => {
  // 关闭背景图片以避免影响文字显示
  isShowImage.value = false

  // 获取文章内容
  let res = await article.getByAid(props.aid)
  if (res.success) {
    data.value = res.data
    data.value.content = marked(data.value.content)
  } else {
    toast.add({
      type: 'danger',
      message: res.msg,
      duration: 5000,
    })
  }
  loading.value = false

  // 设置代码高亮
  nextTick(() => {
    Prism.highlightAll()
    gallerybox.init('.bhs-gallery')
  })
})
onUnmounted(() => {
  isShowImage.value = true
})
</script>