<template>
  <div>
    <h2 class="text-center text-2xl mb-4">友情链接</h2>
    <div v-if="data?.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      <a v-for="item in data" target="_blank" :href="item.link" rel="noopener noreferrer"
         class="p-3 bg-secondary-200/60 dark:bg-dark-700/70 flex items-center rounded-lg">
        <img :src="item.avatar" class="h-12 w-12 rounded-lg">
        <div class="ml-3">
          <div class="text-lg mb-1">{{ item.name }}</div>
          <div class="text-sm text-light-500 dark:text-light-300">{{ item.description }}</div>
        </div>
      </a>
    </div>
    <div v-else class="text-center">空空如也~</div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Friends',
})
</script>

<script lang="ts" setup>
import store from '@/utils/store'

const toast = useToast()
store.state.title = '友情链接'

const data = ref<BhsFriend[]>()

onMounted(loadFriends)

function loadFriends() {
  friendApi.getList().then(res => {
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