<template>
  <AdminNavbar/>
  <router-view/>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Index',
})
</script>

<script lang="ts" setup>
import store from '@/utils/store'
import AdminNavbar from '@/components/page/admin/AdminNavbar.vue'

store.state.title = '后台管理'
</script>