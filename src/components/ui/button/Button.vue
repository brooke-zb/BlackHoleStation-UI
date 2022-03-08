<template>
  <button
      class="m-1.5 select-none cursor-pointer relative inline-flex justify-center items-center transition-bg align-bottom outline-0"
      :class="classAppend" :disabled="isDisabled">
    <div v-if="$slots.icon" class="w-5 h-5">
      <slot name="icon"></slot>
    </div>
    <div :class="{'ml-1': slots.icon && slots.default}">
      <slot></slot>
    </div>
  </button>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Button',
})
</script>

<script lang="ts" setup>

const props = withDefaults(defineProps<{
  type?: 'primary' | 'secondary' | 'danger' | 'info' | 'warning' | 'success' | 'dark' | 'light'
  disabled?: boolean,
  size?: 'sm' | 'md' | 'lg' | 'xl',
  outline?: boolean,
  circle?: boolean,
}>(), {
  type: 'primary',
  size: 'md',
})
const slots = useSlots()

const isDisabled = computed(() => {
  return props.disabled
})

const isDarker = computed(() =>
    props.type === 'primary' ||
    props.type === 'secondary' ||
    props.type === 'danger' ||
    props.type === 'info' ||
    props.type === 'success' ||
    props.type === 'dark',
)

const classAppend = computed(() => {
  let theme: Record<string, any>
  if (props.outline) {
    theme = {
      'btn-outline disabled:bg-transparent': true,
      'hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700 to-primary-500 disabled:to-primary-400/80': props.type === 'primary',
      'hover:bg-secondary-500 focus:bg-secondary-500 active:bg-secondary-600 to-secondary-400 disabled:to-secondary-300/80': props.type === 'secondary',
      'hover:bg-danger-600 focus:bg-danger-600 active:bg-danger-700 to-danger-500 disabled:to-danger-400/80': props.type === 'danger',
      'hover:bg-info-500 focus:bg-info-500 active:bg-info-600 to-info-400 disabled:to-info-300/80': props.type === 'info',
      'hover:bg-warning-500 focus:bg-warning-500 active:bg-warning-600 to-warning-400 disabled:to-warning-300/80': props.type === 'warning',
      'hover:bg-success-500 focus:bg-success-500 active:bg-success-600 to-success-400 disabled:to-success-300/80': props.type === 'success',
      'hover:bg-dark-700 focus:bg-dark-700 active:bg-dark-800 to-dark-600 disabled:to-dark-500/80': props.type === 'dark',
      'hover:bg-light-100 focus:bg-light-100 active:bg-light-200 to-light-50 disabled:to-light-100/80': props.type === 'light',

      'hover:text-white focus:text-white hover:fill-white focus:fill-white disabled:text-light-500 disabled:fill-light-500 dark:disabled:text-light-200 dark:disabled:fill-light-200': isDarker.value,
      'hover:text-light-900 focus:text-light-900 hover:fill-light-900 focus:fill-light-900 disabled:text-light-500 disabled:fill-light-500 dark:disabled:text-light-300 dark:disabled:fill-light-300': !isDarker.value,
    }
  } else {
    theme = {
      'disabled:bg-opacity-80': true,
      'bg-primary-600 active:bg-primary-700 to-primary-500 disabled:bg-primary-400': props.type === 'primary',
      'bg-secondary-500 active:bg-secondary-600 to-secondary-400 disabled:bg-secondary-300': props.type === 'secondary',
      'bg-danger-600 active:bg-danger-700 to-danger-500 disabled:bg-danger-400': props.type === 'danger',
      'bg-info-500 active:bg-info-600 to-info-400 disabled:bg-info-300': props.type === 'info',
      'bg-warning-500 active:bg-warning-600 to-warning-400 disabled:bg-warning-300': props.type === 'warning',
      'bg-success-600 active:bg-success-700 to-success-400 disabled:bg-success-300': props.type === 'success',
      'bg-dark-700 active:bg-dark-800 to-dark-600 disabled:bg-dark-500': props.type === 'dark',
      'bg-light-100 active:bg-light-300 to-light-50': props.type === 'light',

      'text-white fill-white disabled:text-light-100 disabled:fill-light-100': isDarker.value,
      'text-light-900 fill-light-900 disabled:text-light-500/80 disabled:fill-light-500/80': !isDarker.value,
    }
  }

  return Object.assign(theme, {
    // text size
    'text-sm': props.size === 'sm',
    'text-base': props.size === 'md',
    'text-lg': props.size === 'lg',
    'text-xl': props.size === 'xl',

    // padding
    'px-2 py-1': props.size === 'sm' && slots.default,
    'px-3.5 py-1.5': props.size === 'md' && slots.default,
    'px-4 py-2': props.size === 'lg' && slots.default,
    'px-5 py-3': props.size === 'xl' && slots.default,

    // only icon padding
    'p-2': slots.icon && !slots.default,

    // radius
    'rounded-full after:rounded-full': props.circle,
    'rounded-lg after:rounded-[0.625rem]': !props.circle && props.size === 'md',
    'rounded-xl after:rounded-[0.875rem]': !props.circle && props.size !== 'md',

    // disabled
    'cursor-not-allowed': isDisabled.value,
  } as Record<string, any>)
})
</script>

<style scoped>
/* relief shadow */
button:not(.btn-outline):not([disabled]),
button.btn-outline:not([disabled]):hover,
button.btn-outline:not([disabled]):focus {
  box-shadow: inset 2px 2px 3px 2px rgba(255, 255, 255, 0.08),
  inset -2px -2px 3px 2px rgba(0, 0, 0, 0.08);
}
button:not([disabled]):active,
button.btn-outline:not([disabled]):active {
  box-shadow: inset 2px 2px 3px 2px rgba(0, 0, 0, 0.08),
  inset -2px -2px 3px 2px rgba(255, 255, 255, 0.08);
}

button:not(.btn-outline) {
  @apply focus:after:opacity-50 hover:after:opacity-100 hover:focus:after:opacity-100;
}

button.btn-outline:not([disabled]) {
  @apply focus:bg-opacity-70 hover:bg-opacity-100 hover:focus:bg-opacity-100;
}

button::after {
  content: '';
  height: calc(100% + 4px);
  width: calc(100% + 4px);
  @apply absolute -left-0.5 -top-0.5 transition-all;
}

button:not([disabled]):hover::after,
button:not([disabled]):focus::after,
button.btn-outline::after {
  box-shadow: 0 0 0 2px var(--tw-gradient-to);
}

</style>