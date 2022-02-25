<template>
  <button class="relative select-none p-2 bg-white/30 w-10 h-10 rounded-lg" :disabled="props.disabled" :class="classAppend">
    <slot></slot>
  </button>
</template>

<script lang="ts">
export default defineComponent({
  name: 'PaginatorButton',
})
</script>

<script lang="ts" setup>
const props = defineProps<{
  isCurrentPage?: boolean,
  disabled?: boolean
}>()

const classAppend = computed(() => {
  return {
    'bg-blue-500': props.isCurrentPage,
    'fill-light-400 cursor-not-allowed': props.disabled,
  }
})
</script>

<style scoped>
button::after {
  content: '';
  height: calc(100% + 4px);
  width: calc(100% + 4px);
  @apply absolute -left-0.5 -top-0.5 transition-all duration-150;
}

button:not([disabled]):focus::after,
button.btn-outline::after {
  box-shadow: 0 0 0 2px var(--tw-gradient-to);
}
</style>