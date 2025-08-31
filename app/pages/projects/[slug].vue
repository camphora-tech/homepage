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

if (project.value.image?.src) {
  defineOgImage({
    url: project.value.image.src
  })
} else {
  defineOgImageComponent('Saas', {
    headline: 'Project'
  })
}
</script>

<template>
  <UContainer v-if="project">
    <UPageHeader
      :title="project.title"
      :description="project.description"
    >
      <div class="flex flex-wrap items-center gap-3 mt-4">
        <UBadge v-for="tag in project.tags" :key="tag" :label="tag" variant="soft" />
      </div>
    </UPageHeader>

    <UPage>
      <UPageBody>
        <ContentRenderer
          v-if="project"
          :value="project"
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
