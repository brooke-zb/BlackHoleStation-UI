<template>
  <div class="max-w-4xl mx-auto">
    <h2 class="text-center text-2xl mb-4">标签</h2>
    <template v-if="tags">
      <router-link v-for="tag in tags" :to="'/tags/' + tag.name" class="m-2" :class="[tag.color, tag.size]">
        {{ tag.name }}
      </router-link>
      <div v-if="tags.length === 0" class="text-center">
        <div>¯\_(ツ)_/¯</div>
        <div>空空如也~</div>
      </div>
    </template>
    <Skeleton v-else type="tag"/>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Tags',
})
</script>

<script lang="ts" setup>
import store from '@/utils/store'
import Skeleton from '@/components/ui/skeleton/Skeleton.vue'

store.state.title = '标签'
const toast = useToast()
const data = ref<BhsTag[]>()
const tags = ref<BhsTagWithHeat[]>()

onMounted(loadTags)

function loadTags() {
  tagApi.getList().then(res => {
    if (res.success) {
      data.value = res.data
      parseTags()
    } else {
      toast.add({
        type: 'danger',
        message: res.msg,
        duration: 5000,
      })
    }
  })
}

function parseTags() {
  let maxHeat = -1
  if (data.value) {
    // 计算最大和最小热度
    data.value.forEach(tag => {
      if (tag.heat! > maxHeat) {
        maxHeat = tag.heat!
      }
    })
    if (maxHeat < 5) {
      maxHeat = 5
    }

    // 计算样式
    tags.value = data.value.map(tag => {
      let heat = tag.heat! / maxHeat
      return {
        tid: tag.tid,
        name: tag.name,
        color: heat > 0.66 ? 'text-secondary-700 dark:text-info-200' : heat > 0.33 ? 'text-secondary-600 dark:text-info-300' : 'text-secondary-500 dark:text-info-400',
        size: heat > 0.66 ? 'text-4xl' : heat > 0.33 ? 'text-2xl' : 'text-base',
      }
    })
  }
}
</script>