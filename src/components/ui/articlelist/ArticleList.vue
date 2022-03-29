<template>
  <!--文章列表-->
  <div v-if="data.size > 0" class="flex flex-col gap-2">
    <router-link v-for="item in data.list" :to="'/articles/' + item.aid"
                 class="justify-center items-center p-4 text-secondary-700 dark:text-info-300 fill-secondary-700 dark:fill-info-300 relative
                     before:w-12 before:h-12 before:absolute before:bottom-0 before:right-0 before:border-r-2 before:border-b-2
                     before:border-secondary-500 dark:before:border-info-300 before:scale-0 hover:before:scale-100 after:transition-transform after:origin-right
                     after:w-12 after:h-12 after:absolute after:top-0 after:left-0 after:border-l-2 after:border-t-2
                     after:border-secondary-500 dark:after:border-info-300 after:scale-0 hover:after:scale-100 before:transition-transform before:origin-left">
      <div class="text-xl">{{ item.title }}</div>
      <div class="text-secondary-500 dark:text-info-500">
        {{ item.created.split(' ')[0] }} · {{ item.category.name }}
      </div>
    </router-link>
  </div>
  <!--空状态-->
  <div v-else>
    <div>¯\_(ツ)_/¯</div>
    <div>空空如也~</div>
  </div>
  <!--分页-->
  <div v-if="data.pages > 1" class="flex justify-center pt-4">
    <Paginator :current-page="data.pageNum" :total-pages="data.pages" @change="change"/>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'ArticleList',
})
</script>

<script lang="ts" setup>
import Paginator from '@/components/ui/paginator/Paginator.vue'

const props = defineProps<{
  data: Page<BhsArticle>
}>()

const emits = defineEmits<{
  (e: 'change', event: number): void
}>()

function change(page: number) {
  emits('change', page)
}
</script>