<script setup lang="ts">
const route = useRoute()

const { data: project } = await useAsyncData(route.path, () => queryCollection('projects').path(route.path).first())
if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
}

const { data: projectsPage } = await useAsyncData('projects-page', () => queryCollection('projectsPage').first())
const category = computed(() => projectsPage.value?.categories?.find(c => c.name === project.value?.category))

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
        <div class="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-bold">
          <NuxtLink
            to="/projects"
            class="text-leaf hover:underline underline-offset-4"
          >
            Projects
          </NuxtLink>
          <span
            v-if="project.category"
            class="text-ink-muted"
          >{{ project.category }}</span>
        </div>
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

        <aside
          v-if="category?.url"
          class="max-w-[40em] px-6 py-5 rounded-[2px] bg-surface-raised border border-hairline"
          :aria-label="`${category.name} について`"
        >
          <p class="leading-[1.9] text-ink">
            {{ project.title }} は {{ category.name }} の事業として進めています。
          </p>
          <CategoryLink
            :url="category.url"
            :label="category.linkLabel"
            class="mt-2"
          />
        </aside>

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
