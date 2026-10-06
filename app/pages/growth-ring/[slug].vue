<script setup lang="ts">
const route = useRoute()

const { data: post } = await useAsyncData(route.path, () => queryCollection('versions').path(route.path).first())
if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
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
  defineOgImageComponent('CamphoraTech', {
    headline: 'Growth Ring'
  })
}

const badge = badgeLabel(post.value.badge)
</script>

<template>
  <UContainer v-if="post">
    <PageHeading
      :title="post.title"
      :description="post.description"
    >
      <template #above>
        <div class="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
          <NuxtLink
            to="/growth-ring"
            class="text-sm font-bold text-leaf hover:underline underline-offset-4"
          >
            Growth Ring
          </NuxtLink>
          <time
            :datetime="String(post.date)"
            class="numeral text-lg text-ring-strong"
          >{{ formatDate(post.date) }}</time>
          <span
            v-if="badge"
            class="px-2 py-0.5 rounded-[4px] bg-canopy text-leaf text-[13px] font-bold tracking-[0.04em] leading-[1.6]"
          >{{ badge }}</span>
        </div>
      </template>
    </PageHeading>

    <UPage>
      <UPageBody>
        <NuxtImg
          v-if="post.image?.src"
          :src="post.image.src"
          :alt="post.title"
          class="block w-full max-w-xl rounded-[2px] bg-surface-sunken"
        />

        <ContentRenderer
          :value="post"
          class="max-w-[40em]"
        />

        <USeparator v-if="surround?.length" />

        <UContentSurround :surround="surround" />
      </UPageBody>

      <template
        v-if="post?.body?.toc?.links?.length"
        #right
      >
        <UContentToc :links="post.body.toc.links" />
      </template>
    </UPage>
  </UContainer>
</template>
