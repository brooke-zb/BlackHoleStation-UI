<template>
  <div class="flex p-1 relative w-full">
    <div v-if="$slots.left" class="absolute w-5 h-5 left-3 top-0 bottom-0 m-auto" :class="slotClassAppend">
      <slot name="left"></slot>
    </div>
    <input class="rounded-md outline-0 bg-transparent px-2 py-1.5 w-full border-2 placeholder:text-sm
           border-light-300 dark:border-dark-600 focus:border-secondary-500 dark:focus:border-info-500"
           :class="classAppend" :type="props.type" :placeholder="props.placeholder" v-model="content" @input="onInput"/>
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
  type?: 'text' | 'password' | 'number',
  placeholder?: string,
  invalid?: boolean,
}>(), {
  type: 'text',
  placeholder: '',
})

const emits = defineEmits<{
  (e: 'update:modelValue', event: string): void,
}>()

const slots = useSlots()
const content = ref('')

const classAppend = computed(() => ({
  'pl-8': slots.left,
  'pr-8': slots.right,
  'border-danger-300 focus:border-danger-500 dark:border-danger-800 dark:focus:border-danger-500': props.invalid,
  'placeholder:text-danger-300': props.invalid,
}))
const slotClassAppend = computed(() => ({
  'fill-light-400 dark:fill-dark-500': !props.invalid,
  'fill-danger-300 dark:fill-danger-500': props.invalid
}))

function onInput() {
  emits('update:modelValue', content.value)
}
</script>