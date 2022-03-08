<template>
  <div class="w-full p-1 relative">
    <textarea ref="el" class="p-2 rounded-md outline-0 bg-transparent border-2 block w-full resize-none
              border-light-300 dark:border-dark-600 focus:border-secondary-500 dark:focus:border-info-500 transition-bg outline-0"
              @input="onInput" :rows="props.minRows" :class="classAppend" :value="props.modelValue" :placeholder="props.placeholder" @resize="onInput"/>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Textarea',
})
</script>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  placeholder?: string,
  invalid?: boolean,
  minRows?: number,
  modelValue: string,
}>(), {
  placeholder: '',
  minRows: 3,
})

const emits = defineEmits<{
  (e: 'update:modelValue', event: string): void,
}>()

const classAppend = computed(() => ({
  'border-danger-300/60 focus:border-danger-500 dark:border-danger-500/40 dark:focus:border-danger-700': props.invalid,
  'placeholder:text-danger-300 dark:placeholder:text-danger-400': props.invalid,
}))

const el = ref()
const minHeight = ref(0)

const observer = new ResizeObserver(() => {
  onResize()
})
onMounted(() => {
  minHeight.value = el.value.offsetHeight
  observer.observe(el.value)
})
onUnmounted(() => {
  observer.disconnect()
})

function onInput(e: Event) {
  onResize()
  emits('update:modelValue', (e.target as HTMLInputElement).value)
}

function onResize() {
  el.value.style.height = 'auto'
  if (el.value.scrollHeight > minHeight.value) {
    el.value.style.height = `${el.value.scrollHeight + 4}px`
  }
}
</script>