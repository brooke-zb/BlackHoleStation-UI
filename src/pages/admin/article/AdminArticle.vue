<template>
  <div class="flex items-center gap-2">
    <h2 class="text-xl">文章管理</h2>
    <router-link to="/admin/articles/write" class="link">新增</router-link>
  </div>
  <template v-if="data">
    <template v-if="data.list.length > 0">
      <table class="table-auto w-full mt-4">
        <thead>
        <tr>
          <th class="py-2 text-left">标题</th>
          <th class="py-2 hidden lg:table-cell text-left">作者</th>
          <th class="py-2 hidden sm:table-cell text-left">分类</th>
          <th class="py-2 hidden md:table-cell text-left">发布时间</th>
          <th class="py-2 text-left">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="article in data.list" class="border-t border-secondary-300 dark:border-dark-600">
          <td>
            <a :href="'/articles/' + article.aid" target="_blank" class="link">{{ article.title }}</a>
          </td>
          <td class="hidden lg:table-cell">{{ article.user.name }}</td>
          <td class="hidden sm:table-cell">
            <router-link to="/" class="link">{{ article.category.name }}</router-link>
          </td>
          <td class="hidden md:table-cell">{{ article.created.split(' ')[0] }}</td>
          <td>
            <router-link :to="{ name: 'admin_article_write', query: { aid: article.aid } }">
              <Button :type="store.state.isDarkMode ? 'info' : 'secondary'" v-tooltip="'编辑'">
                <template #icon>
                  <IRegularPen class="w-4 h-4"/>
                </template>
              </Button>
            </router-link>
            <Button type="danger" v-tooltip="'删除'" @click="openDeleteConfirmModal(article.aid, article.title)">
              <template #icon>
                <ISolidXmark class="w-4 h-4"/>
              </template>
            </Button>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="flex justify-center">
        <Paginator :total-pages="data.pages"
                   :current-page="data.pageNum"
                   :page-size="data.pageSize"
                   @change="loadArticles"/>
      </div>
    </template>
    <div v-else class="flex flex-col items-center">
      <div>¯\_(ツ)_/¯</div>
      <div>空空如也~</div>
    </div>
  </template>
  <Modal ref="deleteModal" title="删除确认" :content="`确定删除 ${ deleteTitle }？`" @confirm="deleteArticle"/>
</template>

<script lang="ts">
export default defineComponent({
  name: 'AdminArticle',
})
</script>

<script lang="ts" setup>
import store from '@/utils/store'
import Button from '@/components/ui/button/Button.vue'
import Paginator from '@/components/ui/paginator/Paginator.vue'
import Modal from '@/components/ui/modal/Modal.vue'

store.state.title = '文章管理'
const toast = useToast()

const data = ref<Page<BhsArticle>>()

onMounted(loadArticles)

function loadArticles(page?: number) {
  articleAdminApi.getList(page).then(res => {
    if (res.success) {
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

const deleteModal = ref()
const deleteAid = ref(-1)
const deleteTitle = ref('')

function openDeleteConfirmModal(aid: number, title: string) {
  deleteAid.value = aid
  deleteTitle.value = title
  deleteModal.value.show()
}

function deleteArticle() {
  articleAdminApi.delete(deleteAid.value).then(res => {
    if (res.success) {
      toast.add({
        type: 'success',
        message: '删除成功',
        duration: 5000,
      })
      loadArticles()
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