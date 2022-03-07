<template>
  <div :id="'co' + props.item.coid" class="my-4 bg-secondary-300 dark:bg-dark-400 bg-opacity-0 dark:bg-opacity-0">
    <div class="flex items-start" :class="{ 'gap-2': props.sub, 'gap-4': !props.sub }">
      <img :alt="props.item.nickname" class="rounded-full cursor-pointer hover:opacity-70"
           :src="avatar" title="点击回复"
           @click="changeReplyComment(props.item.coid)"
           :height="props.sub ? 36 : 48" :width="props.sub ? 36 : 48"/>
      <div class="grow">
        <div class="text-light-500 dark:text-light-400 flex items-baseline gap-1">
          <a v-if="props.item.site" :href="cleanURL(props.item.site)" class="link font-bold" rel="noopener noreferrer">
            {{ props.item.nickname }}
          </a>
          <span v-else class="font-bold">
            {{ props.item.nickname }}
          </span>
          <IRegularCircleCheck v-if="props.item.uid" class="fill-success-600 dark:fill-success-500 text-xs"/>
          <span v-if="props.item.uid === props.articleUid"
                class="text-xs bg-secondary-500 dark:bg-info-600 text-light-50 rounded px-1 py-0.5">博主</span>
          <span class="text-xs text-light-400 dark:text-light-500" :title="props.item.created">
            {{ props.item.created.substring(0, props.item.created.lastIndexOf(' ')) }}
          </span>
        </div>
        <div class="mt-0.5">
          <span v-if="props.item.reply">
            <a class="link" @click.prevent="toAnchor(props.item.reply)"
               :href="'#co' + props.item.reply">@{{ props.item.replyname }}</a>
          </span>
          {{ props.item.content }}
        </div>
        <!--评论框tp位置-->
        <div class="comment-sender"></div>
        <!--子评论-->
        <Comment v-for="item in subComment.items" :key="item.coid" :item="item" :article-uid="props.articleUid" sub/>
        <Button :type="state.isDarkMode ? 'info' : 'secondary'" size="sm"
                v-if="subComment.canShowMore" @click="showAllSubComment">
          显示剩余{{ props.item.children.length - 2 }}条回复
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
import state from '@/utils/store'
import gsap from 'gsap'

const baseAvatarUrl = import.meta.env.BHS_AVATAR_URL

const props = defineProps<{
  item: BhsComment,
  articleUid: number,
  sub?: boolean,
}>()

const avatar = computed(() => {
  if (props.item.avatar) {
    return `${baseAvatarUrl}${props.item.avatar}?s=48`
  } else {
    return `${baseAvatarUrl}?s=48`
  }
})

// 更改评论框位置
const changeReplyComment = inject('changeReplyComment', Function, true)

const isShowAll = ref(false)
const subComment = computed(() => {
  let items = props.item.children
  let canShowMore = items?.length > 2 || false
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

function toAnchor(id: number | string | null) {
  if (!id) {
    return
  }
  const anchor = document.getElementById('co' + id)
  if (anchor) {
    window.scrollTo({
      top: anchor.offsetTop,
      behavior: 'smooth',
    })
    gsap.fromTo(anchor, {
      '--tw-bg-opacity': 0,
    }, {
      '--tw-bg-opacity': 0.4,
      duration: 0.2,
      onComplete: () => {
        gsap.to(anchor, {
          '--tw-bg-opacity': 0,
          delay: 1.5,
          duration: 0.2,
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