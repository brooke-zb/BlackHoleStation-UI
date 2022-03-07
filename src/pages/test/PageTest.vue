<template>
  <Paginator :current-page="info.currentPage"
             :page-size="info.size"
             :total-pages="info.totalPages"
             @current-change="page"/>
</template>

<script lang="ts">
export default defineComponent({
  name: 'PageTest',
})
</script>

<script lang="ts" setup>
import Paginator from '@/components/ui/paginator/Paginator.vue'
import state from '@/utils/store'

state.title = '分页测试页面'

const info = reactive({
  currentPage: 3,
  size: 20,
  totalPages: 10,
})

function page(currentPage: number) {
  info.currentPage = currentPage
}
</script>