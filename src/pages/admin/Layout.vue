<template>
  <AdminNavbar/>
  <div class="my-2 container">
    <router-view/>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Index',
})
</script>

<script lang="ts" setup>
import AdminNavbar from '@/components/page/admin/AdminNavbar.vue'
</script>