<template>
  <div class="rounded-md cursor-pointer select-none pointer-events-auto p-4 border-l-4 shadow-md flex items-start gap-2"
       :class="classAppend"
       @click="emits('close')">
    <div class="flex items-center text-xl">
      <Component :is="icons[props.config.type]"/>
    </div>
    <div>{{ props.config.message }}</div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Toast',
})
</script>

<script lang="ts" setup>
import InfoIcon from '~icons/regular/circle-info.vue'
import DangerIcon from '~icons/regular/triangle-exclamation.vue'
import SuccessIcon from '~icons/regular/circle-check.vue'
import WarningIcon from '~icons/regular/circle-exclamation.vue'

const icons = {
  info: InfoIcon,
  danger: DangerIcon,
  success: SuccessIcon,
  warning: WarningIcon,
}

const props = defineProps<{
  config: ToastProps,
}>()

const emits = defineEmits<{
  (e: 'close'): void
}>()

const classAppend = computed(() => {
  return {
    'border-info-600 bg-info-100 text-info-900 fill-info-700': props.config.type === 'info',
    'border-danger-600 bg-danger-100 text-danger-900 fill-danger-700': props.config.type === 'danger',
    'border-success-600 bg-success-100 text-success-900 fill-success-700': props.config.type === 'success',
    'border-warning-600 bg-warning-100 text-warning-900 fill-warning-700': props.config.type === 'warning',
  }
})

onMounted(() => {
  if (props.config.duration) {
    setTimeout(() => {
      emits('close')
    }, props.config.duration)
  }
})
</script>