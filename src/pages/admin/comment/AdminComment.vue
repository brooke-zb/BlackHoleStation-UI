<template>
  <h2 class="text-xl">评论管理</h2>
  <div class="flex gap-2 mt-2">
    <select v-model="status" @change="loadComments()">
      <option value="PUBLISHED">已通过</option>
      <option value="PENDING">待审核</option>
      <option value="INVISIBLE">隐藏</option>
    </select>
  </div>
  <template v-if="data">
    <table class="table-auto w-full">
      <thead>
      <tr>
        <th class="py-2 text-left">作者</th>
        <th class="py-2 text-left">内容</th>
        <th class="py-2 text-left">操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="comment in data.list" class="border-t border-secondary-300 dark:border-dark-600">
        <td>
          <a target="_blank" rel="noopener noreferrer" v-if="comment.site"
             class="link text-sm font-bold" :href="comment.site">{{ comment.nickname }}</a>
          <a v-else class="text-sm font-bold">{{ comment.nickname }}</a>
          <br/>
          <a v-if="comment.email" class="text-sm link" :href="'mailto:' + comment.email">{{ comment.email }}</a>
          <div class="text-sm text-light-500 dark:text-light-400">{{ comment.ip }}</div>
        </td>
        <td class="block">
          <div class="text-sm text-light-500 dark:text-light-400">
            {{ comment.created.split(' ')[0] }}
            <a target="_blank" :href="`/articles/${ comment.aid }`">
              <ISolidShareFromSquare class="inline h-4 w-4 fill-secondary-600 dark:fill-info-400"/>
            </a>
          </div>
          <div v-if="comment.coid !== editCoid">{{ comment.content }}</div>
          <Input v-else v-model="editContent" @keydown.enter="updateComment" @keydown.esc="editCoid = -1" focus/>
        </td>
        <td>
          <Button v-if="status !== 'PUBLISHED'" type="success" v-tooltip="'通过'"
                  @click="updateStatus(comment.coid, 'PUBLISHED')">
            <template #icon>
              <ISolidCheck class="w-4 h-4"/>
            </template>
          </Button>
          <Button v-if="status !== 'PENDING'" type="warning" v-tooltip="'待审核'"
                  @click="updateStatus(comment.coid, 'PENDING')">
            <template #icon>
              <ISolidPause class="w-4 h-4"/>
            </template>
          </Button>
          <Button v-if="status !== 'INVISIBLE'" :type="store.state.isDarkMode ? 'light' : 'dark'"
                  v-tooltip="'隐藏'" @click="updateStatus(comment.coid, 'INVISIBLE')">
            <template #icon>
              <ISolidEyeSlash class="w-4 h-4"/>
            </template>
          </Button>
          <Button :type="store.state.isDarkMode ? 'info' : 'secondary'" v-tooltip="'编辑'"
                  @click="editCoid = comment.coid; editContent = comment.content">
            <template #icon>
              <IRegularPen class="w-4 h-4"/>
            </template>
          </Button>
          <Button type="danger" v-tooltip="'删除'" @click="openDeleteConfirmModal(comment.coid, comment.content)">
            <template #icon>
              <ISolidXmark class="w-4 h-4"/>
            </template>
          </Button>
        </td>
      </tr>
      </tbody>
    </table>
    <div v-if="data.list.length > 0" class="flex justify-center">
      <Paginator :total-pages="data.pages"
                 :current-page="data.pageNum"
                 @change="loadComments"/>
    </div>
  </template>
  <Modal ref="deleteModal" title="删除确认" :content="`确定删除 ${ deleteTitle }？`" @confirm="deleteComment"/>
</template>

<script lang="ts">
export default defineComponent({
  name: 'AdminComment',
})
</script>

<script lang="ts" setup>
import store from '@/utils/store'
import Paginator from '@/components/ui/paginator/Paginator.vue'
import Button from '@/components/ui/button/Button.vue'
import Modal from '@/components/ui/modal/Modal.vue'
import Input from '@/components/ui/form/Input.vue'

const toast = useToast()

const data = ref<Page<BhsComment>>()
const status = ref<BhsCommentStatus>('PUBLISHED')

function loadComments(page?: number) {
  commentAdminApi.getList(page, status.value).then(res => {
    if (res.success) {
      data.value = res.data
    } else {
      toast.add({
        type: 'danger',
        message: res.msg,
        duration: 5000,
      })
    }
    editCoid.value = -1
  })
}

onMounted(loadComments)

// 编辑评论
const editCoid = ref(-1)
const editContent = ref('')

function updateComment() {
  commentAdminApi.update({
    coid: editCoid.value,
    content: editContent.value,
  }).then(res => {
    if (res.success) {
      toast.add({
        type: 'success',
        message: '更新成功',
        duration: 5000,
      })
      loadComments()
    } else {
      toast.add({
        type: 'danger',
        message: res.msg,
        duration: 5000,
      })
    }
  })
}

function updateStatus(coid: number, status: BhsCommentStatus) {
  commentAdminApi.updateStatus(coid, status).then(res => {
    if (res.success) {
      toast.add({
        type: 'success',
        message: '更新成功',
        duration: 5000,
      })
      loadComments()
    } else {
      toast.add({
        type: 'danger',
        message: res.msg,
        duration: 5000,
      })
    }
  })
}

// 删除评论
const deleteModal = ref()
const deleteAid = ref(-1)
const deleteTitle = ref('')

function openDeleteConfirmModal(coid: number, title: string) {
  deleteAid.value = coid
  deleteTitle.value = title
  deleteModal.value.show()
}

function deleteComment() {
  commentAdminApi.delete(deleteAid.value).then(res => {
    if (res.success) {
      toast.add({
        type: 'success',
        message: '删除成功',
        duration: 5000,
      })
      loadComments()
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