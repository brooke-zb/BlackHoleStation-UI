<template>
  <div :id="props.item.coid" class="my-4 bg-secondary-300 dark:bg-info-300 bg-opacity-0 dark:bg-opacity-0">
    <div class="flex items-start" :class="{ 'gap-2': props.sub, 'gap-4': !props.sub }">
      <img :alt="props.item.nickname" class="rounded-full"
           :src="`${baseAvatarUrl}${props.item.avatar}%3Fs%3D48`"
           :height="props.sub ? 24 : 48" :width="props.sub ? 24 : 48"/>
      <div class="grow">
        <div class="text-light-500 dark:text-light-400 flex items-baseline gap-1">
          <a v-if="props.item.site" :href="cleanURL(props.item.site)" class="link">
            {{ props.item.nickname }}
          </a>
          <template v-else>
            {{ props.item.nickname }}
          </template>
          <IRegularShieldCheck v-if="props.item.uid" class="fill-success-600 dark:fill-success-500 text-xs"/>
          <span v-if="props.item.uid === props.articleUid"
                class="text-xs bg-secondary-500 dark:bg-info-600 text-light-50 rounded px-1 py-0.5">博主</span>
          <span class="text-xs text-light-400 dark:text-light-500">{{
              props.item.created.substring(0, props.item.created.lastIndexOf(' '))
            }}</span>
        </div>
        <div class="mt-0.5">
          <span v-if="props.item.reply">
            <a class="link" @click.prevent="toAnchor(props.item.reply)"
               :href="'#' + props.item.reply">回复{{ props.item.replyname }}</a>:
          </span>
          {{ props.item.content }}
        </div>
        <!--子评论-->
        <Comment v-for="item in subComment.items" :key="item.coid" :item="item" :article-uid="props.articleUid" sub/>
        <Button :type="isCurrentDarkMode ? 'info' : 'secondary'" size="sm"
                v-if="subComment.canShowMore" @click="showAllSubComment">
          显示所有{{ props.item.children.length }}条回复
        </Button>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Comment',
})
</script>

<script lang="ts" setup>
import Button from '@/components/ui/button/Button.vue'
import { isCurrentDarkMode } from '@/utils/global'
import gsap from 'gsap'

const baseAvatarUrl = import.meta.env.BHS_AVATAR_URL

const props = defineProps<{
  item: BhsComment,
  articleUid: number,
  sub?: boolean,
}>()

const isShowAll = ref(false)
const subComment = computed(() => {
  let items = props.item.children
  let canShowMore = items?.length || false
  if (!isShowAll.value && items) {
    items = items.slice(0, 2)
  }
  return {
    items,
    canShowMore,
  }
})

function showAllSubComment() {
  isShowAll.value = true
  subComment.value.canShowMore = false
}

function toAnchor(id: number | string) {
  const anchor = document.getElementById(id.toString())
  if (anchor) {
    window.scrollTo({
      top: anchor.offsetTop,
      behavior: 'smooth',
    })
    gsap.fromTo(anchor, {
      '--tw-bg-opacity': 0,
    }, {
      '--tw-bg-opacity': 0.5,
      duration: 0.5,
      onComplete: () => {
        gsap.to(anchor, {
          '--tw-bg-opacity': 0,
          duration: 0.5,
        })
      },
    })
  }
}

function cleanURL(url: string) {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return 'https://' + url
}
</script>