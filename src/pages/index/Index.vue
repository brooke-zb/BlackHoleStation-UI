<template>
  <div class="h-[1145px]">
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
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Index',
})
</script>

<script lang="ts" setup>
import Button from '@/components/ui/button/Button.vue'
import state from '@/utils/store'

state.title = '主页'
</script>