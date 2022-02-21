<template>
  <div>
    <div>
      <Button>Primary</Button>
      <Button type="secondary">Secondary</Button>
      <Button type="danger">Danger</Button>
      <Button type="info">Info</Button>
      <Button type="warning">Warning</Button>
      <Button type="success">Success</Button>
      <Button type="dark">Dark</Button>
      <Button type="light">Light</Button>
    </div>
    <div>
      <Button outline><template #icon><IRegularPlus/></template>Primary</Button>
      <Button outline type="secondary">Secondary</Button>
      <Button outline type="danger">Danger</Button>
      <Button outline type="info">Info</Button>
      <Button outline type="warning">Warning</Button>
      <Button outline type="success">Success</Button>
      <Button outline type="dark">Dark</Button>
      <Button outline type="light">Light</Button>
    </div>
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