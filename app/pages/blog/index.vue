<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('blog', () => queryCollection('blog').first())
const { data: posts } = await useAsyncData(route.path, () => queryCollection('posts').all())

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

defineOgImageComponent('Saas')
</script>

<template>
  <UContainer>
    <UPageHeader
      v-bind="page"
      class="py-[50px]"
    />

    <UPageBody>
      <template v-if="posts && posts.length">
        <UBlogPosts>
          <UBlogPost
            v-for="(post, index) in posts"
            :key="index"
            :to="post.path"
            :title="post.title"
            :description="post.description"
            :image="post.image"
            :date="new Date(post.date).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' })"
            :badge="post.badge"
            :orientation="index === 0 ? 'horizontal' : 'vertical'"
            :class="[index === 0 && 'col-span-full']"
            variant="naked"
            :ui="{
              description: 'line-clamp-2'
            }"
          />
        </UBlogPosts>
      </template>
      <template v-else>
        <div class="flex flex-col items-center justify-center py-12">
          <UCard variant="ghost" class="w-full max-w-sm">
            <div class="text-center">
              <NuxtImg
                src="/unsplash/photo-1488190211105-8b0e65b80b4e?q=80&w=1000&auto=format&fit=crop"
                alt="準備中"
                class="mx-auto mb-4 rounded-md w-full h-48 object-cover"
              />
              <p class="text-xl font-bold text-gray-900 dark:text-white">
                準備中です
              </p>
              <p class="text-gray-500 dark:text-gray-400 mt-1">
                新しい記事を準備しています。お楽しみに！
              </p>
            </div>
          </UCard>
        </div>
      </template>
    </UPageBody>
  </UContainer>
</template>
