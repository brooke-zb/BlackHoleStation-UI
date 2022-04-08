<template>
  <div class="mx-auto max-w-2xl">
    <h2 class="text-center text-2xl mb-4">所有分类</h2>
    <Content>
      <div v-if="data" class="flex flex-col gap-2 px-2">
        <div v-for="parent in data" class="flex flex-col items-start gap-2">
          <router-link :to="'/categories/' + parent.cid" class="link">
            <ISolidFolder class="w-4 h-4 inline mr-2"/>
            {{ parent.name }}
          </router-link>
          <router-link v-for="child in parent.children" :to="'/categories/' + child.cid" class="link ml-8">
            <ISolidFolder class="w-4 h-4 inline mr-2"/>
            {{ child.name }}
          </router-link>
        </div>
        <Empty v-if="data.length === 0"/>
      </div>
      <Skeleton v-else type="category"/>
    </Content>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Categories',
})
</script>

<script lang="ts" setup>
import store from '@/utils/store'
import Skeleton from '@/components/ui/skeleton/Skeleton.vue'
import Content from '@/components/ui/skeleton/Content.vue'
import Empty from '@/components/ui/empty/Empty.vue'

const toast = useToast()
store.state.title = '分类'

const data = ref<BhsCategory[]>()

onMounted(loadCategory)

function loadCategory() {
  categoryApi.getList().then(res => {
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