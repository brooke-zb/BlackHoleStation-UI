<template>
  <div class="p-2">
    <div class="flex flex-col space-y-4 rounded-lg bg-neutral-50/80 dark:bg-dark-700/80 p-8 backdrop-blur">
      <h3 class="text-6xl font-bold text-danger-600 dark:text-danger-500">404</h3>
      <h4 class="text-4xl">页面丢失了</h4>
      <p>您要的页面已经消失在{{ isCurrentDarkMode ? '黑洞' : '星际' }}中了，可以尝试：</p>
      <div class="flex justify-end">
        <router-link to="/">
          <Button :type="isCurrentDarkMode ? 'info' : 'secondary'" outline>返回首页</Button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: '404',
})
</script>

<script lang="ts" setup>
import Button from '@/components/ui/button/Button.vue'
import { isCurrentDarkMode, title } from '@/utils/global'

title.value = '未找到页面'
</script>