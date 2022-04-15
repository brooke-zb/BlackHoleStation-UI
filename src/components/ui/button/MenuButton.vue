<template>
  <button
      class="m-1.5 select-none cursor-pointer relative inline-flex justify-center items-center transition-bg align-bottom"
      :class="classAppend">
    <div class="w-5 h-5 pointer-events-none">
      <slot name="icon"></slot>
    </div>
    <div class="pointer-events-none" :class="{'ml-1': slots.icon && slots.default}">
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
const props = withDefaults(defineProps<{
  type?: 'primary' | 'secondary' | 'danger' | 'info' | 'warning' | 'success' | 'dark' | 'light',
  size?: 'xs' | 'sm' | 'md',
  highlight?: boolean
}>(), {
  type: 'primary',
  size: 'md',
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

const classAppend = computed(() => ({
  'btn-outline rounded-full': true,
  'hover:bg-primary-600 active:bg-primary-700': props.type === 'primary',
  'hover:bg-secondary-500 active:bg-secondary-600': props.type === 'secondary',
  'hover:bg-danger-600 active:bg-danger-700': props.type === 'danger',
  'hover:bg-info-500 active:bg-info-600': props.type === 'info',
  'hover:bg-warning-500 active:bg-warning-600': props.type === 'warning',
  'hover:bg-success-500 active:bg-success-600': props.type === 'success',
  'hover:bg-dark-700 active:bg-dark-800': props.type === 'dark',
  'hover:bg-light-100 active:bg-light-300': props.type === 'light',

  'text-secondary-400 fill-secondary-400': props.highlight,
  'hover:text-white hover:fill-white': isDarker.value,
  'hover:text-light-900 hover:fill-light-900': !isDarker.value,

  // only icon padding
  'p-3': slots.icon && !slots.default && props.size === 'md',
  'p-2': slots.icon && !slots.default && props.size === 'sm',
  'p-1': slots.icon && !slots.default && props.size === 'xs',
}))
</script>