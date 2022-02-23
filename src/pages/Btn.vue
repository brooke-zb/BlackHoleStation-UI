<template>
  <div class="flex flex-col items-center">
    <div>
      <Button size="sm">
        <template #icon>
          <ISolidAlien/>
        </template>
        Primary
      </Button>
      <Button size="sm" type="secondary">Secondary</Button>
      <Button size="sm" type="danger">Danger</Button>
      <Button size="sm" type="info">Info</Button>
      <Button size="sm" type="warning">Warning</Button>
      <Button size="sm" type="success">Success</Button>
      <Button size="sm" type="dark">Dark</Button>
      <Button size="sm" type="light">Light</Button>
    </div>
    <div>
      <Button>
        <template #icon>
          <ISolidAlien/>
        </template>
        Primary
      </Button>
      <Button type="secondary">Secondary</Button>
      <Button type="danger">Danger</Button>
      <Button type="info">Info</Button>
      <Button type="warning">Warning</Button>
      <Button type="success">Success</Button>
      <Button type="dark">Dark</Button>
      <Button type="light">Light</Button>
    </div>
    <div>
      <Button size="lg">
        <template #icon>
          <ISolidAlien/>
        </template>
        Primary
      </Button>
      <Button size="lg" type="secondary">Secondary</Button>
      <Button size="lg" type="danger">Danger</Button>
      <Button size="lg" type="info">Info</Button>
      <Button size="lg" type="warning">Warning</Button>
      <Button size="lg" type="success">Success</Button>
      <Button size="lg" type="dark">Dark</Button>
      <Button size="lg" type="light">Light</Button>
    </div>
    <div>
      <Button size="xl">
        <template #icon>
          <ISolidAlien/>
        </template>
        Primary
      </Button>
      <Button size="xl" type="secondary">Secondary</Button>
      <Button size="xl" type="danger">Danger</Button>
      <Button size="xl" type="info">Info</Button>
      <Button size="xl" type="warning">Warning</Button>
      <Button size="xl" type="success">Success</Button>
      <Button size="xl" type="dark">Dark</Button>
      <Button size="xl" type="light">Light</Button>
    </div>
    <div>
      <Button outline>
        <template #icon>
          <ISolidAlien/>
        </template>
        Primary
      </Button>
      <Button outline type="secondary">Secondary</Button>
      <Button outline type="danger">Danger</Button>
      <Button outline type="info">Info</Button>
      <Button outline type="warning">Warning</Button>
      <Button outline type="success">Success</Button>
      <Button outline type="dark">Dark</Button>
      <Button outline type="light">Light</Button>
    </div>
    <div>
      <Button circle size="sm">
        <template #icon>
          <IRegularPlus/>
        </template>
      </Button>
      <Button circle size="xl">
        <template #icon>
          <IRegularPlus/>
        </template>
      </Button>
      <Button type="dark" circle outline size="sm">
        <template #icon>
          <IRegularPlus/>
        </template>
      </Button>
      <Button type="dark" circle outline size="xl">
        <template #icon>
          <IRegularPlus/>
        </template>
      </Button>
      <Button type="light" circle outline size="sm">
        <template #icon>
          <IRegularBars/>
        </template>
      </Button>
      <Button type="light" circle outline size="xl">
        <template #icon>
          <IRegularBars/>
        </template>
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Btn',
})
</script>

<script lang="ts" setup>
import Button from '@/components/ui/button/Button.vue'
import { title } from '@/utils/global'

title.value = '按钮测试页面'
</script>