<template>
  <div>
    <div>
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
    <div>
      <router-link to="/articles/1">
        <Button type="secondary">click me to article</Button>
      </router-link>
    </div>
    <div v-if="data">
      <router-link v-for="item in data.list" :to="'/articles/' + item.aid"
                   class="flex justify-center items-center py-4 text-2xl text-secondary-600 dark:text-info-300">
        {{ item.title }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Index',
})
</script>

<script lang="ts" setup>
import Button from '@/components/ui/button/Button.vue'
import store from '@/utils/store'

store.state.title = '主页'
const toast = useToast()

let data = ref<Page<BhsArticle>>()

onMounted(async () => {
  let res = await articleApi.getList()
  if (res.success) {
    data.value = res.data
  } else {
    toast.add({
      type: 'danger',
      message: res.msg,
      duration: 5000,
    })
    store.state.title = '文章不存在'
  }
})
</script>