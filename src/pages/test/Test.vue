<template>
  <div class="flex flex-col">
    <div class="p-2 bg-white dark:bg-dark-900 text-center">
      This is a test page.
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Test',
})
</script>

<script lang="ts" setup>

</script>