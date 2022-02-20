<template>
  <button class="m-1.5 select-none cursor-pointer relative inline-flex justify-center items-center text-white"
          :class="classAppend" :disabled="isDisabled">
    <slot name="icon"></slot>
    <slot></slot>
  </button>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Button',
})
</script>

<script lang="ts" setup>
const props = defineProps<{
  type?: 'primary' | 'secondary' | 'danger' | 'info' | 'warning' | 'success' | 'light',
  disabled?: boolean,
  size?: 'sm' | 'md' | 'lg' | 'xl',
  outline?: boolean,
  circle?: boolean,
}>()

const classAppend = computed(() => {
  return {
    // theme
    'bg-primary-600 active:bg-primary-700 to-primary-500': props.type === 'primary' || !props.type,
    'bg-secondary-500 active:bg-secondary-600 to-secondary-500': props.type === 'secondary',
    'bg-danger-600 active:bg-danger-700 to-danger-600': props.type === 'danger',
    'bg-info-500 active:bg-info-600 to-info-500': props.type === 'info',
    'bg-warning-500 active:bg-warning-600 text-gray-900 to-warning-500': props.type === 'warning',
    'bg-success-500 active:bg-success-600 to-success-500': props.type === 'success',
    'bg-gray-100 active:bg-gray-300 text-gray-900 to-gray-100': props.type === 'light',

    // size
    'px-2 py-1 text-sm': props.size === 'sm',
    'px-3.5 py-1.5 text-base': props.size === 'md' || !props.size,
    'px-5 py-2 text-lg': props.size === 'lg',
    'px-8 py-3 text-xl': props.size === 'xl',

    // radius
    'rounded-full after:rounded-full': props.circle,
    'rounded-lg after:rounded-[0.625rem]': !props.circle && (!props.size || props.size === 'md'),
    'rounded-xl after:rounded-[0.875rem]': !props.circle && !(!props.size || props.size === 'md'),
  }
})

const isDisabled = computed(() => {
  return props.disabled
})
</script>

<style scoped>
button {
  box-shadow: inset 2px 2px 3px 2px rgba(255, 255, 255, 0.06),
  inset -2px -2px 3px 2px rgba(0, 0, 0, 0.06);
}
button::after {
  content: '';
  height: calc(100% + 4px);
  width: calc(100% + 4px);
  @apply absolute -left-0.5 -top-0.5 transition-all duration-150;
}
button:hover::after,
button:focus::after {
  box-shadow: 0 0 0 2px var(--tw-gradient-to);
}

</style>