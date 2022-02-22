<template>
  <button
      class="m-1.5 select-none cursor-pointer relative inline-flex justify-center items-center transition-bg align-bottom"
      :class="classAppend">
    <slot name="icon" class="w-5 h-5"></slot>
    <div :class="{'ml-1': slots.icon && slots.default}">
      <slot></slot>
    </div>
  </button>
</template>

<script lang="ts">
export default defineComponent({
  name: 'MenuButton',
})
</script>

<script lang="ts" setup>
import Button from '@/components/ui/button/Button.vue'

const props = withDefaults(defineProps<{
  type?: 'primary' | 'secondary' | 'danger' | 'info' | 'warning' | 'success' | 'dark' | 'light'
  highlight?: boolean
}>(), {
  type: 'primary',
})
const slots = useSlots()

const isDarker = computed(() =>
    props.type === 'primary' ||
    props.type === 'secondary' ||
    props.type === 'danger' ||
    props.type === 'info' ||
    props.type === 'success' ||
    props.type === 'dark',
)

const classAppend = computed(() => {
  return {
    'btn-outline rounded-full': true,
    'hover:bg-primary-600 active:bg-primary-700': props.type === 'primary',
    'hover:bg-secondary-500 active:bg-secondary-600': props.type === 'secondary',
    'hover:bg-danger-600 active:bg-danger-700': props.type === 'danger',
    'hover:bg-info-500 active:bg-info-600': props.type === 'info',
    'hover:bg-warning-500 active:bg-warning-600': props.type === 'warning',
    'hover:bg-success-500 active:bg-success-600': props.type === 'success',
    'hover:bg-dark-700 active:bg-dark-800': props.type === 'dark',
    'hover:bg-gray-100 active:bg-gray-300': props.type === 'light',

    'hover:text-white hover:fill-white': isDarker.value && !props.highlight,
    'hover:text-gray-900 hover:fill-gray-900': !isDarker.value && !props.highlight,
    'text-secondary-400 fill-secondary-400': props.highlight,

    // only icon padding
    'p-3': slots.icon && !slots.default,
  }
})
</script>

<style scoped>

</style>