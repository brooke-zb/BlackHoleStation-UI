<template>
  <div id="bhs-comment" ref="obs" class="mt-4 p-2 rounded-md bg-white/50 dark:bg-dark-700/50">
    <div class="flex justify-center text-xl text-secondary-600 dark:text-light-100">
      <Button v-if="!isLoad" @click="loadComments" :type="isCurrentDarkMode ? 'info' : 'secondary'">加载评论</Button>
      <template v-else-if="comments">
        {{ comments.list.length > 0 ? `${ comments.total }条评论` : '空空如也~' }}
      </template>
      <template v-else>
        加载中...
      </template>
    </div>
    <div>
      <!--TODO 评论框 with Teleport-->
    </div>
    <template v-if="comments?.list">
      <template v-for="(item, index) in comments.list">
        <div v-if="index !== 0" class="border-light-300 dark:border-light-600 border-t border-dashed"></div>
        <Comment :item="item"/>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'CommentContainer',
})
</script>

<script lang="ts" setup>
import Comment from '@/pages/article/Comment.vue'
import Button from '@/components/ui/button/Button.vue'
import comment from '@/api/comment'
import { isCurrentDarkMode } from '@/utils/global'

const props = defineProps<{
  aid: number
}>()
const toast = useToast()

const isLoad = ref(false)
const obs = ref()

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadComments()
    }
  })
})

const comments = ref<BhsPageInfo<BhsComment>>()

async function loadComments() {
  isLoad.value = true
  observer.disconnect()

  let result = await comment.getByAid(props.aid)
  if (result.success) {
    comments.value = result.data
  } else {
    toast.add({
      type: 'danger',
      message: result.msg,
      duration: 5000,
    })
  }
}

onMounted(() => {
  observer.observe(obs.value)
})

onUnmounted(() => {
  observer.disconnect()
})
</script>