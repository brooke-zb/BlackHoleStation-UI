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
  name: 'TagList',
})
</script>

<script lang="ts" setup>
import store from '@/utils/store'
import ArticleList from '@/components/ui/articlelist/ArticleList.vue'
import Skeleton from '@/components/ui/skeleton/Skeleton.vue'
import Content from '@/components/ui/skeleton/Content.vue'

const props = defineProps<{
  name: string
}>()
const data = ref<Page<BhsArticle>>()

const toast = useToast()
store.state.title = `标签${ props.name }下的文章`

onMounted(getArticleList)

function getArticleList(page?: number) {
  articleApi.getListByTag(props.name, page).then(res => {
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