<template>
  <div>article manage page</div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'AdminArticle',
})
</script>

<script lang="ts" setup>
import store from '@/utils/store'

store.state.title = '文章管理'
</script>