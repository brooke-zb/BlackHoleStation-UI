<template>
  <div>
    <Button>Primary</Button>
    <Button type="secondary">Secondary</Button>
    <Button type="danger">Danger</Button>
    <Button type="info">Info</Button>
    <Button type="warning">Warning</Button>
    <Button type="success">Success</Button>
    <Button type="light">Light</Button>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Btn',
})
</script>

<script lang="ts" setup>
import Button from '@/components/ui/Button.vue'

</script>