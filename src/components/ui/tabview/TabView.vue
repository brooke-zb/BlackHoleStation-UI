<template>
  <ul class="flex">
    <li v-for="(item, index) in props.navs" class="flex items-center gap-1 px-4 py-1.5 transition-bg
        border-t-2 border-light-200 dark:border-dark-700 cursor-pointer select-none" @click="emits('change', index)"
        :class="{ 'bg-light-200 dark:bg-dark-700': index !== props.active,
        '!border-secondary-400 dark:!border-info-500': index === props.active }">
      <template v-if="item.icon">
        <component :is="item.icon" class="w-4 h-4"/>
      </template>
      {{ item.label }}
    </li>
    <li class="grow border-b-2 border-light-200 dark:border-dark-700 bg-light-200 dark:bg-dark-700"></li>
  </ul>
  <template v-for="(item, index) in tabs">
    <component :is="item" :props="item.props" v-show="index === props.active"/>
  </template>
</template>

<script lang="ts">
export default defineComponent({
  name: 'TabView',
})
</script>

<script lang="ts" setup>
import { VNode } from 'vue'

const props = defineProps<{
  navs: {
    label: string,
    icon?: any,
  }[],
  active: number,
}>()

const emits = defineEmits<{
  (e: 'change', event: number): void
}>()

const slots = useSlots()
const tabs = ref<VNode[]>([])
tabs.value = slots.default!()
</script>