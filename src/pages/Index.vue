<template>
  <div class="h-[1145px]">
    <router-link to="/btn">
      <Button>click me to btn</Button>
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
import { title } from '@/utils/global'

title.value = '主页'
</script>