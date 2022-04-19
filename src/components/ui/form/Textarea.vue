<template>
  <textarea ref="el" class="p-2 rounded-md outline-0 bg-transparent border-2 block w-full resize-none
            border-light-300 dark:border-dark-600 focus:border-secondary-500 dark:focus:border-info-500 transition-bg outline-0"
            @input="onInput" :class="classAppend" :rows="props.minRows" :value="props.modelValue"
            :placeholder="props.placeholder"/>
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

const el = ref<HTMLTextAreaElement>()

const observer = new ResizeObserver(onResize)
onMounted(() => {
  onResize()
  observer.observe(el.value!)
})
onUnmounted(() => {
  observer.disconnect()
})

function onInput(e: Event) {
  onResize()
  emits('update:modelValue', (e.target as HTMLInputElement).value)
}

function onResize() {
  let currentScrollTop = window.scrollY
  let style =  window.getComputedStyle(el.value!)
  el.value!.style.height = 'auto'
  el.value!.style.height = `calc(${ el.value!.scrollHeight }px + ${ style.borderTopWidth } + ${ style.borderBottomWidth })`
  window.scrollTo(0, currentScrollTop)
}
</script>