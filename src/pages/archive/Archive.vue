<template>
  <div>
    <div v-if="data">
      <div v-if="timeline" class="px-4 mx-auto max-w-xl">
        <div v-for="year in timeline" class="border-l-2 border-secondary-500 dark:border-light-200 pl-4 relative">
          <div class="py-4 text-2xl text-secondary-600 dark:text-info-300 before:absolute before:-left-[0.5625rem] before:translate-y-2
             before:w-4 before:h-4 before:rounded-full before:border-2
             before:bg-secondary-200 dark:before:bg-info-200 before:border-secondary-500 dark:before:border-light-200">{{ year[0] }}</div>
          <div v-for="item in year[1]" class="flex py-2 before:absolute before:-left-[0.4375rem] before:translate-y-1.5
             before:w-3 before:h-3 before:rounded-full before:border-2
             before:bg-light-50 dark:before:bg-info-600 before:border-secondary-500 dark:before:border-light-200">
            <div class="mr-2 text-light-400 dark:text-light-500">{{ item.date }}</div>
            <router-link :to="'/articles/' + item.aid" class="link">{{ item.title }}</router-link>
          </div>
        </div>
      </div>
      <div v-if="data.pages > 1" class="flex justify-center pt-4">
        <Paginator :total-pages="data.pages" :current-page="data.pageNum" @change="loadTimeline"/>
      </div>
    </div>
    <Skeleton v-else type="timeline"/>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Archive',
})
</script>

<script lang="ts" setup>
import Paginator from '@/components/ui/paginator/Paginator.vue'
import store from '@/utils/store'
import Skeleton from '@/components/ui/skeleton/Skeleton.vue'

const toast = useToast()
store.state.title = '归档'

const data = ref<Page<BhsTimeline>>()
const timeline = ref<Map<number, BhsTimeline[]>>(new Map())

onMounted(() => {
  loadTimeline()
})

function loadTimeline(page?: number) {
  articleApi.getTimeline(page).then(res => {
    if (res.success) {
      data.value = res.data
      parseTimeline()
    } else {
      toast.add({
        type: 'danger',
        message: res.msg,
        duration: 5000,
      })
    }
  })
}

function parseTimeline() {
  timeline.value = new Map()
  if (data.value) {
    data.value.list.forEach(item => {
      if (!timeline.value.has(item.year)) {
        timeline.value.set(item.year, [])
      }
      timeline.value.get(item.year)?.push(item)
    })
  }
}
</script>