<template>
  <AdminNavbar/>
  <div class="my-2 w-full max-w-screen-xl mx-auto px-2">
    <router-view v-slot="{ Component }">
      <Component :key="$route.path" :is="Component"/>
    </router-view>
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