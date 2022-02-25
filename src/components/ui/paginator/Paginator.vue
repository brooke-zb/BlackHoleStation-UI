<template>
  <div class="flex p-1.5 gap-2">
    <PaginatorButton @click="previousPage" :disabled="!pageInfo.hasPrevious">
      <IRegularChevronLeft/>
    </PaginatorButton>

    <PaginatorButton @click="previousPageMore" :disabled="!pageInfo.hasPrevious">
      <IRegularChevronsLeft/>
    </PaginatorButton>

    <PaginatorButtonGroup>
      <PaginatorButton v-for="num in pageInfo.pages" :is-current-page="pageInfo.currentPage === num" v-text="num"/>
    </PaginatorButtonGroup>

    <PaginatorButton @click="nextPageMore" :disabled="!pageInfo.hasNext">
      <IRegularChevronsRight/>
    </PaginatorButton>

    <PaginatorButton @click="nextPage" :disabled="!pageInfo.hasNext">
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
import PaginatorButton from '@/components/ui/paginator/PaginatorButton.vue'

const pageInfo = reactive<PageInfo>({
  pages: [],
  currentPage: 0,
  hasPrevious: true,
  hasNext: true,
  displaySize: 0,
})

const props = withDefaults(defineProps<{
  currentPage: number,
  pageSize: number,
  totalPages: number,
  displaySize?: number,
}>(), {
  displaySize: 5,
})

const emits = defineEmits<{
  (e: 'currentChange', event: number): void,
}>()

watch(() => props.currentPage, () => {
  pageInfo.currentPage = props.currentPage
  pageInfo.displaySize = props.displaySize
  pageInfo.hasPrevious = props.currentPage > 1
  pageInfo.hasNext = props.currentPage < props.totalPages
  getPages(props.currentPage, props.totalPages, props.displaySize)
}, {
  immediate: true,
})

// 获取页码数组
function getPages(currentPage: number, totalPages: number, displaySize: number) {
  pageInfo.pages = []
  let start = Math.max(1, currentPage - Math.floor(displaySize / 2))
  let end = Math.min(totalPages, start + displaySize - 1)
  if (end - start < displaySize) {
    start = Math.max(1, end - displaySize + 1)
  }
  for (let i = start; i <= end; i++) {
    pageInfo.pages.push(i)
  }
  return pageInfo.pages
}

function previousPage() {
  offsetPage(-1)
}
function nextPage() {
  offsetPage(1)
}
function previousPageMore() {
  offsetPage(-pageInfo.displaySize)
}
function nextPageMore() {
  offsetPage(pageInfo.displaySize)
}

function offsetPage(offset: number) {
  let newPage = pageInfo.currentPage + offset
  if (newPage < 1) {
    newPage = 1
  } else if (newPage > props.totalPages) {
    newPage = props.totalPages
  }
  emits('currentChange', newPage)
}
</script>