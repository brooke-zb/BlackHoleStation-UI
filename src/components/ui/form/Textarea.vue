<template>
  <div class="w-full p-1 relative">
    <textarea ref="el" class="p-2 rounded-md outline-0 bg-transparent border-2 block w-full
              border-light-300 dark:border-dark-600 focus:border-secondary-500 dark:focus:border-info-500 resize-none"
              @input="onChange" :rows="rows" :class="classAppend" v-model="content"/>
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
}>(), {
  placeholder: '',
  minRows: 3,
})

const classAppend = computed(() => ({
  'border-danger-300 focus:border-danger-500 dark:border-danger-800 dark:focus:border-danger-500': props.invalid,
  'placeholder:text-danger-300': props.invalid,
}))

const el = ref()
const content = ref('')
const minHeight = ref(0)

onMounted(() => {
  minHeight.value = el.value.offsetHeight
})

const rows = computed(() => {
  let rows = content.value.split('\n').length
  return rows > props.minRows ? rows : props.minRows
})

function onChange() {
  el.value.style.height = 'auto'
  if (el.value.scrollHeight > minHeight.value) {
    el.value.style.height = `${el.value.scrollHeight + 4}px`
  }
}
</script>