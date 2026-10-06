<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('blog', () => queryCollection('blog').first())
const { data: posts } = await useAsyncData(route.path, () => queryCollection('posts').order('date', 'DESC').all())

const title = page.value?.seo?.title || page.value?.title || 'Tech Blog'
const description = page.value?.seo?.description || page.value?.description || ''

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

defineOgImageComponent('CamphoraTech')
</script>

<template>
  <UContainer>
    <PageHeading
      :title="title"
      :description="description"
    />

    <div class="py-16 lg:py-24">
      <div
        v-if="posts?.length"
        class="max-w-4xl"
      >
        <TimelineEntry
          v-for="post in posts"
          :key="post.path"
          :to="post.path"
          :date="String(post.date)"
          :title="post.title"
          :description="post.description"
        />
      </div>
      <div
        v-else
        class="max-w-[36em]"
      >
        <h2 class="font-display font-semibold text-[1.3125rem] leading-[1.6] text-ink">
          まだ記事はありません
        </h2>
        <p class="mt-3 leading-[1.9] text-ink-muted">
          最初の技術記事を準備しています。それまでは、Growth Ring で CamphoraTech の最近の活動をご覧ください。
        </p>
        <UButton
          to="/growth-ring"
          label="Growth Ring を読む"
          variant="outline"
          size="lg"
          class="mt-8"
        />
      </div>
    </div>
  </UContainer>
</template>
