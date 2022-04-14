<template>
  <div class="flex items-center gap-2 mb-2">
    <h2 class="text-xl">分类管理</h2>
    <Button size="sm" type="success" v-tooltip="'新增'" @click="isAdding = true">
      <template #icon>
        <IRegularPlus/>
      </template>
    </Button>
  </div>
  <table v-if="!parent" class="table-auto w-full">
    <thead>
    <tr>
      <th class="py-2 text-left">名称</th>
      <th class="py-2 text-left">子分类</th>
      <th class="py-2 text-left">操作</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="category in data" class="border-t border-secondary-300 dark:border-dark-600">
      <td v-if="category.cid !== editCid">{{ category.name }}</td>
      <td v-else>
        <Input v-model="editName" @keydown.enter="updateCategory" @keydown.esc="editCid = -1" focus/>
      </td>
      <td>
        <Button :type="store.state.isDarkMode ? 'info' : 'secondary'" v-tooltip="'查看'" @click="parent = category; isAdding = false">
          <template #icon>
            <IRegularEye class="w-4 h-4"/>
          </template>
        </Button>
      </td>
      <td>
        <Button :type="store.state.isDarkMode ? 'info' : 'secondary'"
                v-tooltip="'编辑'" @click="showEditInput(category.cid, category.name)">
          <template #icon>
            <IRegularPen class="w-4 h-4"/>
          </template>
        </Button>
        <Button type="danger" v-tooltip="'删除'" @click="openDeleteConfirmModal(category.cid, category.name)">
          <template #icon>
            <ISolidXmark class="w-4 h-4"/>
          </template>
        </Button>
      </td>
    </tr>
    <tr v-if="isAdding">
      <td>
        <Input v-model="newName" placeholder="分类名称" @keydown.enter="addCategory" @keydown.esc="isAdding = false" focus/>
      </td>
      <td></td>
      <td></td>
    </tr>
    </tbody>
  </table>
  <div v-else>
    <div class="flex items-center gap-2">
      <h3 class="mb-1">{{ parent.name }} 下的子分类</h3>
      <Button :type="store.state.isDarkMode ? 'info' : 'secondary'" v-tooltip="'返回'" @click="parent = undefined; isAdding = false">
        <template #icon>
          <IRegularRotateLeft class="w-4 h-4"/>
        </template>
      </Button>
    </div>
    <table class="table-auto w-full">
      <thead>
      <tr>
        <th class="py-2 text-left">名称</th>
        <th class="py-2 text-left">操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="category in parent.children" class="border-t border-secondary-300 dark:border-dark-600">
        <td v-if="category.cid !== editCid">{{ category.name }}</td>
        <td v-else>
          <Input v-model="editName" @keydown.enter="updateCategory" @keydown.esc="editCid = -1" focus/>
        </td>
        <td>
          <Button :type="store.state.isDarkMode ? 'info' : 'secondary'"
                  v-tooltip="'编辑'" @click="showEditInput(category.cid, category.name)">
            <template #icon>
              <IRegularPen class="w-4 h-4"/>
            </template>
          </Button>
          <Button type="danger" v-tooltip="'删除'" @click="openDeleteConfirmModal(category.cid, category.name)">
            <template #icon>
              <ISolidXmark class="w-4 h-4"/>
            </template>
          </Button>
        </td>
      </tr>
      <tr v-if="isAdding">
        <td>
          <Input v-model="newName" placeholder="分类名称" @keydown.enter="addCategory" @keydown.esc="isAdding = false" focus/>
        </td>
        <td></td>
      </tr>
      </tbody>
    </table>
  </div>
  <Modal ref="deleteModal" title="删除确认" :content="`确定删除 ${ deleteTitle }？`" @confirm="deleteCategory"/>
</template>

<script lang="ts">
export default defineComponent({
  name: 'AdminCategory',
})
</script>

<script lang="ts" setup>
import store from '@/utils/store'
import Button from '@/components/ui/button/Button.vue'
import Modal from '@/components/ui/modal/Modal.vue'
import Input from '@/components/ui/form/Input.vue'

const toast = useToast()

const data = ref<BhsCategory[]>([])

onMounted(loadCategories)

function loadCategories() {
  categoryApi.getList().then(res => {
    if (res.success) {
      data.value = res.data

      // 重新读取parent
      if (parent.value) {
        for (const item of res.data) {
          if (item.cid === parent.value.cid) {
            parent.value = item
            break
          }
        }
      }
    } else {
      toast.add({
        type: 'danger',
        message: res.msg,
        duration: 5000,
      })
    }
  })
}

// 删除分类
const deleteModal = ref()
const deleteCid = ref(-1)
const deleteTitle = ref('')

function openDeleteConfirmModal(cid: number, title: string) {
  deleteCid.value = cid
  deleteTitle.value = title
  deleteModal.value.show()
}

function deleteCategory() {
  categoryAdminApi.delete(deleteCid.value).then(res => {
    if (res.success) {
      toast.add({
        type: 'success',
        message: '删除成功',
        duration: 5000,
      })
      loadCategories()
    } else {
      toast.add({
        type: 'danger',
        message: res.msg,
        duration: 5000,
      })
    }
  })
}

// 编辑分类
const editCid = ref(-1)
const editName = ref('')

function showEditInput(cid: number, name: string) {
  editCid.value = cid
  editName.value = name
}

function updateCategory() {
  categoryAdminApi.update({
    cid: editCid.value,
    name: editName.value,
  }).then(res => {
    if (res.success) {
      toast.add({
        type: 'success',
        message: '更新成功',
        duration: 5000,
      })
      loadCategories()
    } else {
      toast.add({
        type: 'danger',
        message: res.msg,
        duration: 5000,
      })
    }
    editCid.value = -1
  })
}

// 添加分类
const isAdding = ref(false)
const newName = ref('')

function addCategory() {
  if (newName.value.trim().length === 0) {
    toast.add({
      type: 'danger',
      message: '请输入分类名称',
      duration: 5000,
    })
    return
  }
  categoryAdminApi.insert({
    name: newName.value.trim(),
    parent: parent.value?.cid,
  }).then(res => {
    if (res.success) {
      toast.add({
        type: 'success',
        message: '添加成功',
        duration: 5000,
      })
      loadCategories()
    } else {
      toast.add({
        type: 'danger',
        message: res.msg,
        duration: 5000,
      })
    }
    newName.value = ''
    isAdding.value = false
  })
}

// 子分类管理
const parent = ref<BhsCategory>()
</script>