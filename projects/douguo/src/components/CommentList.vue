<script setup lang="ts">
import { ref } from 'vue'
import type { CommentViewModel } from '../types/content'

defineProps<{ comments: CommentViewModel[] }>()

const emit = defineEmits<{
  openUser: [id: string]
}>()

const failedImages = ref(new Set<string>())
const markFailed = (key: string) => {
  failedImages.value = new Set(failedImages.value).add(key)
}
</script>

<template>
  <section class="comment-list" aria-label="菜谱评论">
    <article v-for="comment in comments" :key="comment.key" class="comment-card">
      <button
        type="button"
        class="comment-avatar"
        :disabled="!comment.authorId"
        :aria-label="comment.authorId ? `查看 ${comment.authorName} 的主页` : comment.authorName"
        @click="comment.authorId && emit('openUser', comment.authorId)"
      >
        <img
          v-if="comment.avatarUrl && !failedImages.has(comment.key)"
          :src="comment.avatarUrl"
          alt=""
          @error="markFailed(comment.key)"
        />
        <van-icon v-else name="contact" />
      </button>
      <div class="comment-body">
        <div class="comment-meta">
          <strong>{{ comment.authorName }}</strong>
          <span v-if="comment.likeText"><van-icon name="like-o" /> {{ comment.likeText }}</span>
        </div>
        <p>{{ comment.content }}</p>
        <small v-if="comment.time || comment.location">{{ [comment.time, comment.location].filter(Boolean).join(' · ') }}</small>
        <div v-if="comment.replies.length" class="comment-replies">
          <p v-for="reply in comment.replies" :key="reply.key">
            <strong>{{ reply.authorName }}：</strong>{{ reply.content }}
          </p>
        </div>
      </div>
    </article>
  </section>
</template>

<style scoped>
.comment-list { display: flex; flex-direction: column; }
.comment-card { padding: 18px 0; display: grid; grid-template-columns: 42px 1fr; gap: 11px; border-bottom: 1px solid #f2f2f2; }
.comment-avatar { width: 42px; height: 42px; border: 0; border-radius: 50%; padding: 0; overflow: hidden; color: #999; background: #f1f1f1; font-size: 22px; }
.comment-avatar img { width: 100%; height: 100%; display: block; object-fit: cover; }
.comment-body { min-width: 0; }
.comment-meta { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.comment-meta strong { font-size: 14px; }
.comment-meta span { color: #999; font-size: 12px; }
.comment-body > p { margin: 8px 0 6px; color: #333; font-size: 15px; line-height: 1.65; white-space: pre-wrap; }
.comment-body small { color: #aaa; }
.comment-replies { margin-top: 12px; border-radius: 9px; padding: 9px 11px; background: #f7f7f7; }
.comment-replies p { margin: 0; color: #666; font-size: 13px; line-height: 1.6; }
.comment-replies p + p { margin-top: 6px; }
</style>
