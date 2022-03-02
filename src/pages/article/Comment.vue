<template>
  <div :id="props.item.coid" class="my-4">
    <div class="flex items-start" :class="{ 'gap-2': props.sub, 'gap-4': !props.sub }">
      <img :alt="props.item.nickname" class="rounded-full"
           :src="`${baseAvatarUrl}${props.item.avatar}%3Fs%3D48`"
           :height="props.sub ? 24 : 48" :width="props.sub ? 24 : 48"/>
      <div>
        <div class="text-light-500 dark:text-light-400">{{ props.item.nickname }}</div>
        <div>{{ props.item.content }}</div>
        <!--TODO 限制评论显示数-->
        <Comment v-for="item in props.item.children" :item="item" sub/>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Comment',
})
</script>

<script lang="ts" setup>
const baseAvatarUrl = import.meta.env.BHS_AVATAR_URL

const props = defineProps<{
  item: BhsComment,
  sub?: boolean,
}>()
</script>