<template>
  <div class="px-1.5">
    <Content>
      <Skeleton v-if="loading" type="article"/>
      <ArticleContent v-else-if="data" :data="data"/>
      <NotFound v-else code="404" title="文章不存在" message="该文章也许被博主吃掉了，可以尝试："/>
    </Content>
    <CommentContainer v-if="data && isShowComment" :aid="props.aid" :article-uid="data.user.uid"/>
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
import CommentContainer from '@/pages/article/CommentContainer.vue'
import NotFound from '@/pages/error/Error.vue'
import Content from '@/components/ui/skeleton/Content.vue'
import ArticleContent from '@/pages/article/ArticleContent.vue'

const props = defineProps<{
  aid: number,
}>()
const toast = useToast()

const isShowComment = ref(false)

const loading = ref(true)
const data = ref<BhsArticle>()

store.state.title = '文章'
onMounted(async () => {
  // 获取文章内容
  let res = await articleApi.getByAid(props.aid)
  if (res.success) {
    data.value = res.data
    data.value.content = marked(data.value.content)
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
})
</script>