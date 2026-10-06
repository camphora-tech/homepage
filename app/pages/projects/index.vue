<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('projects-page', () => queryCollection('projectsPage').first())
const { data: projects } = await useAsyncData(route.path, () => queryCollection('projects').all())

const title = page.value?.title || 'Projects'
const description = page.value?.description || ''

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

    <div class="grid gap-16 py-16 lg:gap-24 lg:py-24">
      <ProjectEntry
        v-for="project in projects"
        :key="project.path"
        :to="project.path"
        :title="project.title"
        :description="project.description"
        :image="project.image"
        :tags="project.tags"
      />
    </div>
  </UContainer>
</template>
