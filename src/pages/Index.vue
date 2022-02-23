<template>
  <div class="h-[1145px]">
    <router-link to="/btn">
      <Button>click me to jump</Button>
    </router-link>

    <router-link to="/articles/1">
      <Button type="secondary">click me to article</Button>
    </router-link>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Index',
})
</script>

<script lang="ts" setup>
import Button from '@/components/ui/button/Button.vue'
import { setTitle, currentTheme } from '@/utils/global'

setTitle('主页', true)
</script>