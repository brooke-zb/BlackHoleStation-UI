<template>
  <div class="rounded-md outline-0 bg-transparent px-2 py-1.5 w-full border-2 placeholder:text-sm
       transition-bg outline-0 flex flex-col gap-1" :class="classAppend">
    <div v-for="(item, index) in data" class="flex rounded justify-between flex-wrap bg-secondary-200 dark:bg-info-600 px-1">
      <div>{{ item }}</div>
      <button @click="removeTag(index)"><IRegularXmark/></button>
    </div>
    <input type="text" class="outline-0 bg-transparent" v-model="tag" @keydown.enter="onCommit"
           @focusin="onFocus = true" @focusout="onFocus = false" placeholder="标签"/>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Chips',
})
</script>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: string[]
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', event: string[]): void,
}>()

const onFocus = ref(false)
const tag = ref('')
const data = ref<string[]>([])

const classAppend = computed(() => ({
  'border-secondary-500 dark:border-info-500': onFocus.value,
  'border-light-300 dark:border-dark-600': !onFocus.value,
}))

function onCommit() {
  if (tag.value.length > 0) {
    data.value.push(tag.value)
    tag.value = ''
    emits('update:modelValue', data.value)
  }
}

function removeTag(index: number) {
  data.value.splice(index, 1)
  emits('update:modelValue', data.value)
}
</script>