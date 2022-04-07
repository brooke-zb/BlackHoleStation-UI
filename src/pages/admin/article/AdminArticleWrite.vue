<template>
  <div>{{ props.aid }}</div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'AdminArticleWrite',
})
</script>

<script lang="ts" setup>
const props = defineProps<{
  aid?: number
}>()
</script>