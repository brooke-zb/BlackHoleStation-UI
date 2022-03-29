<template>
  <div>
    <Content>
      <div v-if="data" class="flex flex-col items-center">
        <ArticleList :data="data" @change="getArticleList"/>
      </div>
      <Skeleton v-else type="list"/>
    </Content>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'CategoryList',
})
</script>

<script lang="ts" setup>
import store from '@/utils/store'
import ArticleList from '@/components/ui/articlelist/ArticleList.vue'
import Skeleton from '@/components/ui/skeleton/Skeleton.vue'
import Content from '@/components/ui/skeleton/Content.vue'

const props = defineProps<{
  cid: number
}>()
const data = ref<Page<BhsArticle>>()

const toast = useToast()
store.state.title = '分类下的文章'

onMounted(() => {
  categoryApi.getByCid(props.cid).then(res => {
    if (res.success) {
      store.state.title = `分类 ${ res.data.name } 下的文章`
    } else {
      toast.add({
        type: 'danger',
        message: res.msg,
        duration: 5000,
      })
    }
  })
  getArticleList()
})

function getArticleList(page?: number) {
  articleApi.getListByCategoryId(props.cid, page).then(res => {
    if (res.success) {
      data.value = res.data
    } else {
      toast.add({
        type: 'danger',
        message: res.msg,
        duration: 5000,
      })
    }
  })
}
</script>