<template>
  <div class="paginator-group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'PaginatorButtonGroup',
})
</script>

<script lang="ts" setup>

</script>

<style>
.paginator-group > button {
  @apply rounded-none;
}

.paginator-group > button:first-child {
  @apply rounded-l-lg;
}

.paginator-group > button:last-child {
  @apply rounded-r-lg;
}
</style>