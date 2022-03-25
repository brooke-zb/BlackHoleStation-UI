<template>
  <div class="box-center p-2 flex justify-center">
    <div class="flex flex-col gap-y-4 rounded-lg bg-light-50/80 dark:bg-dark-700/90 p-8 backdrop-blur">
      <h3 class="text-6xl font-bold text-danger-600 dark:text-danger-500">{{ props.code }}</h3>
      <h4 class="text-4xl">{{ props.title }}</h4>
      <p>{{ props.message || `您要找的内容已经消失在${store.state.isDarkMode ? '黑洞' : '星际'}中了，可以尝试：` }}</p>
      <div class="flex justify-end">
        <router-link to="/">
          <Button :type="store.state.isDarkMode ? 'info' : 'secondary'" outline>返回首页</Button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Error',
})
</script>

<script lang="ts" setup>
import Button from '@/components/ui/button/Button.vue'
import store from '@/utils/store'

store.state.title = '未找到页面'

const props = defineProps<{
  code: string,
  title: string,
  message?: string,
}>()
</script>