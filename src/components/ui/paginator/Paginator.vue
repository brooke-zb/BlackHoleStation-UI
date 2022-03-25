<template>
  <div class="flex p-1.5 gap-1.5">
    <!--前一页-->
    <PaginatorButton @click="offsetPage(-1)" :disabled="!pageInfo.hasPrevious">
      <IRegularChevronLeft/>
    </PaginatorButton>

    <!--头页-->
    <PaginatorButton v-if="props.totalPages > displaySize" class="group" @click="toPage(1)" :disabled="!pageInfo.hasPreviousMore">
      <IRegularChevronsLeft class="hidden group-disabled:inline"/>
      <div class="inline group-disabled:hidden" v-text="'1..'"/>
    </PaginatorButton>

    <!--展示页-->
    <PaginatorButtonGroup>
      <PaginatorButton v-for="num in pageInfo.pages" @click="toPage(num)"
                       :is-current-page="pageInfo.currentPage === num" v-text="num"/>
    </PaginatorButtonGroup>

    <!--尾页-->
    <PaginatorButton v-if="props.totalPages > displaySize" class="group" @click="toPage(props.totalPages)" :disabled="!pageInfo.hasNextMore">
      <IRegularChevronsRight class="hidden group-disabled:inline"/>
      <div class="inline group-disabled:hidden" v-text="'..' + props.totalPages"/>
    </PaginatorButton>

    <!--后一页-->
    <PaginatorButton @click="offsetPage(1)" :disabled="!pageInfo.hasNext">
      <IRegularChevronRight/>
    </PaginatorButton>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Paginator',
})
</script>

<script lang="ts" setup>
import PaginatorButtonGroup from '@/components/ui/paginator/PaginatorButtonGroup.vue'
import PaginatorButton from '@/components/ui/paginator/PaginatorButton.vue'

const displaySize = 5

const pageInfo = reactive<PageInfo>({
  pages: [],
  currentPage: 0,
  hasPrevious: true,
  hasNext: true,
  hasPreviousMore: true,
  hasNextMore: true,
})

const props = defineProps<{
  currentPage: number,
  totalPages: number,
}>()

const emits = defineEmits<{
  (e: 'currentChange', event: number): void,
}>()

watch(() => props.currentPage, () => {
  pageInfo.currentPage = props.currentPage
  getPages(props.currentPage)
}, {
  immediate: true,
})

// 获取页码数组
function getPages(currentPage: number) {
  pageInfo.hasPrevious = currentPage > 1
  pageInfo.hasNext = currentPage < props.totalPages

  pageInfo.pages = []

  let start = Math.max(1, currentPage - Math.floor(displaySize / 2))
  let end = Math.min(props.totalPages, start + displaySize - 1)
  if (end - start < displaySize - 1) {
    start = Math.max(1, end - displaySize + 1)
  }

  pageInfo.hasPreviousMore = start > 1
  pageInfo.hasNextMore = end < props.totalPages

  for (let i = start; i <= end; i++) {
    pageInfo.pages.push(i)
  }
  return pageInfo.pages
}

function toPage(page: number) {
  if (page < 1) {
    page = 1
  } else if (page > props.totalPages) {
    page = props.totalPages
  }
  if (page === props.currentPage) {
    return
  }
  pageInfo.currentPage = page
  getPages(page)
  emits('currentChange', page)
}

function offsetPage(offset: number) {
  toPage(pageInfo.currentPage + offset)
}
</script>