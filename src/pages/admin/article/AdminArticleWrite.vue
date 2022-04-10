<template>
  <div class="text-lg mb-2">{{ props.aid ? (title ? `编辑 ${ title }` : '加载中...') : '撰写新文章' }}</div>
  <div class="flex flex-col md:flex-row gap-2">
    <div class="md:grow">
      <Input v-model="data.title" placeholder="标题"/>
      <div class="flex justify-end">
        <Button size="sm" :type="store.state.isDarkMode ? 'info' : 'secondary'">预览</Button>
      </div>
      <Textarea v-model="data.content" placeholder="内容"/>
      <div class="flex justify-end">
        <Button :type="store.state.isDarkMode ? 'info' : 'secondary'">发布文章</Button>
      </div>
    </div>
    <div class="md:w-60">
      <h3 class="mb-2">发布时间</h3>
      <input class="mb-2 appearance-none bg-secondary-50 dark:bg-dark-700 p-0.5
             rounded border border-secondary-400 dark:border-info-600 outline-0"
             type="datetime-local" v-model="data.created"/>
      <h3 class="mb-2">分类</h3>
      <select class="mb-2" v-model="data.category.cid">
        <option :value="null" selected>所有分类</option>
        <template v-for="category in categories">
          <option :value="category.cid">{{ category.name }}</option>
          <option v-for="child in category.children" :value="child.cid">&nbsp;&nbsp;{{ child.name }}</option>
        </template>
      </select>
      <h3 class="mb-2">标签</h3>
      <Chips class="mb-2" v-model="tags" type="text" placeholder="空格隔开"/>
      <h3 class="mb-2">公开度</h3>
      <select class="mb-2" v-model="data.status">
        <option value="PUBLISHED">公开</option>
        <option value="DRAFT">草稿</option>
        <option value="INVISIBLE">隐藏</option>
      </select>
      <h3 class="mb-2">其他选项</h3>
      <div>
        <div>
          <input type="checkbox" v-model="data.commentabled"/>
          允许评论
        </div>
        <div>
          <input type="checkbox" v-model="data.appreciatabled"/>
          显示打赏
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'AdminArticleWrite',
})
</script>

<script lang="ts" setup>
import store from '@/utils/store'
import Input from '@/components/ui/form/Input.vue'
import Textarea from '@/components/ui/form/Textarea.vue'
import Button from '@/components/ui/button/Button.vue'
import Chips from '@/components/ui/form/Chips.vue'

store.state.title = '撰写新文章'
const props = defineProps<{
  aid?: number
}>()

const toast = useToast()

onMounted(() => {
  loadCategories()
  if (props.aid) {
    articleAdminApi.getByAid(props.aid).then(res => {
      if (res.success) {
        title.value = res.data.title
        store.state.title = `编辑${ res.data.title }`
        data.value = res.data
      } else {
        toast.add({
          type: 'danger',
          message: res.msg,
          duration: 5000,
        })
      }
    })
  }
})

const title = ref<string>()
const tags = ref<string[]>([])
const data = ref<BhsArticle | any>({
  category: {
    cid: null,
  },
  tags: [],
  title: '',
  content: '',
  commentabled: true,
  appreciatabled: true,
  status: 'PUBLISHED',
})

const categories = ref<BhsCategory[]>([])

function loadCategories() {
  categoryApi.getList().then(res => {
    if (res.success) {
      categories.value = res.data
    } else {
      toast.add({
        type: 'danger',
        message: res.msg,
        duration: 5000,
      })
    }
  })
}
</script>