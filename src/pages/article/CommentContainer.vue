<template>
  <div id="bhs-comment" ref="obs" class="my-4 p-2 rounded-md bg-white/50 dark:bg-dark-700/50 shadow-lg">
    <div class="flex justify-center text-xl text-secondary-600 dark:text-light-100">
      <Button v-if="!isLoad" @click="loadComments" :type="store.state.isDarkMode ? 'info' : 'secondary'">加载评论</Button>
      <template v-else-if="comments">
        {{ comments.total > 0 ? `${ comments.total }条评论` : '空空如也~' }}
      </template>
      <template v-else>
        加载中...
      </template>
    </div>
    <div id="bhs-comment-sender"></div>
    <template v-if="comments?.list" v-for="(item, index) in comments.list">
      <div v-if="index !== 0" class="border-light-300 dark:border-light-600 border-t border-dashed"></div>
      <Comment :item="item" :article-uid="props.articleUid"/>
    </template>
    <div v-if="comments && comments.pages > 1" class="flex justify-center">
      <Paginator :current-page="comments.pageNum" :total-pages="comments.pages" @change="getComments"/>
    </div>
  </div>
  <CommentSender :aid="props.aid" :coid="coid" @refresh="loadComments" @cancel="coid = undefined"/>
</template>

<script lang="ts">
export default defineComponent({
  name: 'CommentContainer',
})
</script>

<script lang="ts" setup>
import Comment from '@/pages/article/Comment.vue'
import CommentSender from '@/pages/article/CommentSender.vue'
import Button from '@/components/ui/button/Button.vue'
import Paginator from '@/components/ui/paginator/Paginator.vue'
import store from '@/utils/store'

// 更改回复框位置
const coid = ref<number>()
provide('changeReplyComment', (id?: number) => {
  coid.value = id
})

const props = defineProps<{
  aid: number,
  articleUid: number,
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

const comments = ref<Page<BhsComment>>()

const lastLoadPage = 1
function loadComments() {
  isLoad.value = true
  observer.disconnect()

  getComments(lastLoadPage)
}

async function getComments(page: number) {
  let result = await commentApi.getByAid(props.aid, page)
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