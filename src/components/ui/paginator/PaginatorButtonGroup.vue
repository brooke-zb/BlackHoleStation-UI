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
  @apply rounded-none border-0 after:rounded-none;
}

.paginator-group > button:not(:last-child) {
  @apply border-l border-y after:rounded-none;
}

.paginator-group > button:first-child {
  @apply rounded-l-lg after:rounded-l-[0.625rem];
}

.paginator-group > button:last-child {
  @apply rounded-r-lg border after:rounded-none after:rounded-r-[0.625rem];
}

.paginator-group > button:first-child:last-child {
  @apply after:rounded-[0.625rem];
}
</style>