<template>
  <button class="" :class="classAppend" :disabled="isDisabled">
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
  let type = ''
  switch (props.type) {
    case 'secondary':
      type = 'btn-secondary'
      break
  }

  return {
    [type]: true
  }
})

const isDisabled = computed(() => {
  return props.disabled
})
</script>