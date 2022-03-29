<template>
  <div>
    <!--    <div>-->
    <!--      <router-link to="/test/btn">-->
    <!--        <Button>click me to btn</Button>-->
    <!--      </router-link>-->

    <!--      <router-link to="/test/toast">-->
    <!--        <Button type="info">click me to toast</Button>-->
    <!--      </router-link>-->

    <!--      <router-link to="/test/page">-->
    <!--        <Button type="warning">click me to page</Button>-->
    <!--      </router-link>-->
    <!--    </div>-->
    <!--    <div>-->
    <!--      <router-link to="/articles/1">-->
    <!--        <Button type="secondary">click me to article</Button>-->
    <!--      </router-link>-->
    <!--    </div>-->
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
  name: 'Index',
})
</script>

<script lang="ts" setup>
import store from '@/utils/store'
import Button from '@/components/ui/button/Button.vue'
import ArticleList from '@/components/ui/articlelist/ArticleList.vue'
import Skeleton from '@/components/ui/skeleton/Skeleton.vue'
import Content from '@/components/ui/skeleton/Content.vue'

store.state.title = '主页'
const toast = useToast()

const data = ref<Page<BhsArticle>>()

onMounted(async () => {
  getArticleList(1)
})

function getArticleList(page: number) {
  articleApi.getList(page).then(res => {
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