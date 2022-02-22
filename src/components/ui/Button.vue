<template>
  <button
      class="m-1.5 select-none cursor-pointer relative inline-flex justify-center items-center transition-bg align-bottom"
      :class="classAppend" :disabled="isDisabled">
    <slot name="icon" class="w-5 h-5"></slot>
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
      'btn-outline': true,
      'hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700 to-primary-500': props.type === 'primary',
      'hover:bg-secondary-500 focus:bg-secondary-500 active:bg-secondary-600 to-secondary-400': props.type === 'secondary',
      'hover:bg-danger-600 focus:bg-danger-600 active:bg-danger-700 to-danger-500': props.type === 'danger',
      'hover:bg-info-500 focus:bg-info-500 active:bg-info-600 to-info-400': props.type === 'info',
      'hover:bg-warning-500 focus:bg-warning-500 active:bg-warning-600 to-warning-400': props.type === 'warning',
      'hover:bg-success-500 focus:bg-success-500 active:bg-success-600 to-success-400': props.type === 'success',
      'hover:bg-dark-700 focus:bg-dark-700 active:bg-dark-800 to-dark-600': props.type === 'dark',
      'hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-300 to-gray-50': props.type === 'light',

      'hover:text-white focus:text-white hover:fill-white focus:fill-white': isDarker.value,
      'hover:text-gray-900 focus:text-gray-900 hover:fill-gray-900 focus:fill-gray-900': !isDarker.value,
    }
  } else {
    theme = {
      'bg-primary-600 active:bg-primary-700 to-primary-500': props.type === 'primary',
      'bg-secondary-500 active:bg-secondary-600 to-secondary-400': props.type === 'secondary',
      'bg-danger-600 active:bg-danger-700 to-danger-500': props.type === 'danger',
      'bg-info-500 active:bg-info-600 to-info-400': props.type === 'info',
      'bg-warning-500 active:bg-warning-600 to-warning-400': props.type === 'warning',
      'bg-success-500 active:bg-success-600 to-success-400': props.type === 'success',
      'bg-dark-700 active:bg-dark-800 to-dark-600': props.type === 'dark',
      'bg-gray-100 active:bg-gray-300 to-gray-50': props.type === 'light',

      'text-white fill-white': isDarker.value,
      'text-gray-900 fill-gray-900': !isDarker.value,
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
    'px-5 py-2': props.size === 'lg' && slots.default,
    'px-8 py-3': props.size === 'xl' && slots.default,

    // only icon padding
    'p-2': slots.icon && !slots.default,

    // radius
    'rounded-full after:rounded-full': props.circle,
    'rounded-lg after:rounded-[0.625rem]': !props.circle && props.size === 'md',
    'rounded-xl after:rounded-[0.875rem]': !props.circle && props.size !== 'md',
  } as Record<string, any>)
})
</script>

<style scoped>
button {
  box-shadow: inset 2px 2px 3px 2px rgba(255, 255, 255, 0.08),
  inset -2px -2px 3px 2px rgba(0, 0, 0, 0.08);
}

button:active {
  box-shadow: inset 2px 2px 3px 2px rgba(0, 0, 0, 0.08),
  inset -2px -2px 3px 2px rgba(255, 255, 255, 0.08);
}

button:not(.btn-outline) {
  @apply focus:after:opacity-50 hover:after:opacity-100 hover:focus:after:opacity-100;
}

button.btn-outline {
  @apply focus:bg-opacity-70 hover:bg-opacity-100 hover:focus:bg-opacity-100;
}

button::after {
  content: '';
  height: calc(100% + 4px);
  width: calc(100% + 4px);
  @apply absolute -left-0.5 -top-0.5 transition-all duration-150;
}

button:hover::after,
button:focus::after,
button.btn-outline::after {
  box-shadow: 0 0 0 2px var(--tw-gradient-to);
}

</style>