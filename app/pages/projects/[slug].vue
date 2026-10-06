<script setup lang="ts">
const route = useRoute()

const { data: project } = await useAsyncData(route.path, () => queryCollection('projects').path(route.path).first())
if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('projects', route.path, {
    fields: ['description']
  })
})

const title = project.value.seo?.title || project.value.title
const description = project.value.seo?.description || project.value.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

if (project.value.image?.src && !project.value.image.src.endsWith('placeholder.svg')) {
  defineOgImage({
    url: project.value.image.src
  })
} else {
  defineOgImageComponent('CamphoraTech', {
    headline: 'Project'
  })
}
</script>

<template>
  <UContainer v-if="project">
    <PageHeading
      :title="project.title"
      :description="project.description"
    >
      <template #above>
        <NuxtLink
          to="/projects"
          class="inline-block mb-6 text-sm font-bold text-leaf hover:underline underline-offset-4"
        >
          Projects に戻る
        </NuxtLink>
      </template>
      <ul
        v-if="project.tags?.length"
        class="mt-6 flex flex-wrap gap-2"
        aria-label="技術領域"
      >
        <li
          v-for="tag in project.tags"
          :key="tag"
          class="px-2 py-0.5 rounded-[4px] bg-canopy text-leaf text-[13px] font-bold tracking-[0.04em] leading-[1.6]"
        >
          {{ tag }}
        </li>
      </ul>
    </PageHeading>

    <UPage>
      <UPageBody>
        <ContentRenderer
          :value="project"
          class="max-w-[40em]"
        />

        <USeparator v-if="surround?.length" />

        <UContentSurround :surround="surround" />
      </UPageBody>

      <template
        v-if="project?.body?.toc?.links?.length"
        #right
      >
        <UContentToc :links="project.body.toc.links" />
      </template>
    </UPage>
  </UContainer>
</template>
