<template>
  <div class="flex relative w-full">
    <div v-if="$slots.left" class="absolute w-5 h-5 left-3 top-0 bottom-0 m-auto" :class="slotClassAppend">
      <slot name="left"></slot>
    </div>
    <input class="rounded-md outline-0 bg-transparent px-2 py-1.5 w-full border-2 placeholder:text-sm
           border-light-300 dark:border-dark-600 focus:border-secondary-500 dark:focus:border-info-500 transition-bg outline-0"
           :class="classAppend" :type="props.type" :placeholder="props.placeholder" :value="props.modelValue" @input="onInput" ref="input"/>
    <div v-if="$slots.right" class="absolute w-5 h-5 right-3 top-0 bottom-0 m-auto
    fill-light-400 dark:fill-dark-500" :class="slotClassAppend">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Input',
})
</script>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
  type?: 'text' | 'password',
  placeholder?: string,
  invalid?: boolean,
  modelValue: string,
  focus?: boolean,
}>(), {
  type: 'text',
  placeholder: '',
})

const emits = defineEmits<{
  (e: 'update:modelValue', event: string): void,
}>()

const slots = useSlots()

const classAppend = computed(() => ({
  'pl-8': slots.left,
  'pr-8': slots.right,
  'border-danger-300/60 focus:border-danger-500 dark:border-danger-500/40 dark:focus:border-danger-700': props.invalid,
  'placeholder:text-danger-300 dark:placeholder:text-danger-400': props.invalid,
}))
const slotClassAppend = computed(() => ({
  'fill-light-400 dark:fill-dark-500': !props.invalid,
  'fill-danger-300 dark:fill-danger-500/70': props.invalid,
}))

function onInput(e: Event) {
  emits('update:modelValue', (e.target as HTMLInputElement).value)
}

const input = ref()

onMounted(() => {
  if (props.focus) {
    input.value.focus()
  }
})
</script>