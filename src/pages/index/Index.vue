<template>
  <div>
    <div class="hidden">
      <router-link to="/test/btn">
        <Button>click me to btn</Button>
      </router-link>

      <router-link to="/test/toast">
        <Button type="info">click me to toast</Button>
      </router-link>

      <router-link to="/test/page">
        <Button type="warning">click me to page</Button>
      </router-link>
    </div>
    <div class="hidden">
      <router-link to="/articles/1">
        <Button type="secondary">click me to article</Button>
      </router-link>
    </div>
    <div v-if="data" class="flex flex-col items-center">
      <div class="flex flex-col gap-2">
        <router-link v-for="item in data.list" :to="'/articles/' + item.aid"
                     class="justify-center items-center p-4 text-secondary-700 dark:text-info-300 fill-secondary-700 dark:fill-info-300 relative
                     before:w-12 before:h-12 before:absolute before:bottom-0 before:right-0 before:border-r-2 before:border-b-2
                     before:border-secondary-500 dark:before:border-info-300 before:scale-0 hover:before:scale-100 after:transition-transform after:origin-right
                     after:w-12 after:h-12 after:absolute after:top-0 after:left-0 after:border-l-2 after:border-t-2
                     after:border-secondary-500 dark:after:border-info-300 after:scale-0 hover:after:scale-100 before:transition-transform before:origin-left">
          <div class="text-xl">{{ item.title }}</div>
          <div class="text-secondary-500 dark:text-info-400">
            {{ item.created.split(' ')[0] }} · {{ item.category.name }}
          </div>
        </router-link>
      </div>
      <div v-if="data.pages > 1" class="flex justify-center pt-4">
        <Paginator :current-page="data.pageNum" :total-pages="data.pages" @current-change="getArticleList"/>
      </div>
    </div>
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
import Paginator from '@/components/ui/paginator/Paginator.vue'

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