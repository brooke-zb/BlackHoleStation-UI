<template>
  <li class="hover:bg-secondary-100 dark:hover:bg-dark-800 text-sm font-bold">
    <a :href="props.item.to" @click.prevent="onClick" :class="classAppend">
      <div v-if="props.item.icon" class="w-5 h-5">
        <component v-if="props.item.icon" :is="props.item.icon"/>
      </div>
      {{ props.item.text }}
    </a>
  </li>
</template>

<script lang="ts">
export default defineComponent({
  name: 'MenuItem',
})
</script>

<script lang="ts" setup>
const router = useRouter()

const props = defineProps<{
  item: MenuItemProps
}>()

const emits = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const classAppend = computed(() => ({
  'flex items-center gap-2 px-4 py-2 cursor-pointer select-none fill-light-400': true,
  'text-secondary-400 !fill-secondary-400': props.item.highlight?.value,
}))

function onClick(e: MouseEvent) {
  emits('click', e)
  if (props.item.type === 'link' && props.item.to) {
    router.push(props.item.to)
  } else if (props.item.type === 'action' && props.item.onClick) {
    props.item.onClick()
  }
}

</script>