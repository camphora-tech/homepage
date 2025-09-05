<script setup lang="ts">
  const route = useRoute()

  const {data: post} = await useAsyncData(route.path, () => queryCollection('versions').path(route.path).first())
  if (!post.value) {
    throw createError({statusCode: 404, statusMessage: 'Post not found', fatal: true})
  }

  const {data: surround} = await useAsyncData(`${route.path}-surround`, () => {
    return queryCollectionItemSurroundings('versions', route.path, {
      fields: ['description']
    })
  })

  const title = post.value.seo?.title || post.value.title
  const description = post.value.seo?.description || post.value.description

  useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description
  })

  if (post.value.image?.src) {
    defineOgImage({
      url: post.value.image.src
    })
  } else {
    defineOgImageComponent('Saas', {
      headline: 'Growth Ring'
    })
  }
</script>

<template>
  <UContainer v-if="post">
    <UPageHeader :title="post.title" :description="post.description">
      <template #headline>
        <UBadge v-bind="post.badge" variant="subtle" />
        <span class="text-muted">&middot;</span>
        <time class="text-muted">{{ new Date(post.date).toLocaleDateString('en', { year: 'numeric', month: 'short', day:
          'numeric' }) }}</time>
      </template>

      <NuxtImg v-if="post?.image" :src="post.image.src" :alt="post.alt || post.title"
        class="block mx-auto w-full sm:w-3/4 md:w-1/2 rounded-lg mt-8" />
    </UPageHeader>

    <UPage>
      <UPageBody>
        <ContentRenderer v-if="post" :value="post" />

        <USeparator v-if="surround?.length" />

        <UContentSurround :surround="surround" />
      </UPageBody>

      <template v-if="post?.body?.toc?.links?.length" #right>
        <UContentToc :links="post.body.toc.links" />
      </template>
    </UPage>
  </UContainer>
</template>
