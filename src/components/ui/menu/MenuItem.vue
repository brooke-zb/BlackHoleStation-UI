<template>
  <li class="hover:bg-neutral-200 dark:hover:bg-dark-800 text-sm font-bold">
    <a :href="props.to" @click.prevent="onClick" :class="classAppend">
      <div class="w-5 h-5">
        <component v-if="props.icon" :is="props.icon"/>
      </div>
      {{ props.text }}
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

const { item: props } = defineProps<{
  item: MenuItemProps
}>()

const emits = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const classAppend = computed(() => {
  return {
    'flex items-center gap-2 px-4 py-2 cursor-pointer select-none fill-neutral-400': true,
    'text-secondary-400 !fill-secondary-400': props.highlight?.value,
  }
})

function onClick(e: MouseEvent) {
  emits('click', e)
  if (props.type === 'link' && props.to) {
    router.push(props.to)
  } else if (props.type === 'action' && props.onClick) {
    props.onClick()
  }
}

</script>