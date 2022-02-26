<template>
  <button class="relative select-none inline-flex justify-center items-center text-sm w-9 h-9 sm:text-base sm:w-10 sm:h-10 rounded-lg align-text-bottom border border-secondary-200 dark:border-info-900 shadow dark:shadow-light-100/10 to-secondary-400 dark:to-info-400 hover:z-10" :disabled="props.disabled" :class="classAppend">
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
    'bg-secondary-500 text-white dark:bg-info-500': props.isCurrentPage,
    'bg-light-100 dark:bg-dark-800': !props.isCurrentPage,
    'text-light-300 fill-light-300 dark:text-light-500 dark:fill-light-500 cursor-not-allowed': props.disabled,
  }
})
</script>

<style scoped>
button::after {
  content: '';
  height: calc(100% + 4px);
  width: calc(100% + 4px);
  @apply absolute -left-0.5 -top-0.5 transition-bg transition-shadow duration-150 rounded-[0.625rem];
}

button:not([disabled]):hover::after {
  box-shadow: 0 0 0 2px var(--tw-gradient-to);
}

</style>