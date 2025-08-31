<script setup lang="ts">
  const route = useRoute()

  const {data: projects} = await useAsyncData(route.path, () => queryCollection('projects').all())

  const title = 'Projects'
  const description = 'これまで携わらせていただいたプロジェクトの一部をご紹介します。'

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
    <UPageHeader title="Projects" description="これまで携わらせていただいたプロジェクトの一部をご紹介します。" class="py-[50px]" />

    <UPageBody>
      <div class="space-y-8 py-8">
        <UPageCard v-for="(project, index) in projects" :key="index" :to="project.path" :ui="{ body: { padding: '' } }"
          class="overflow-hidden">
          <div class="flex flex-col md:flex-row">
            <div class="w-full md:w-1/2 aspect-[4/3]">
              <UColorModeImage :src="project.image.src" :alt="project.title" class="w-full h-full object-cover" />
            </div>
            <div class="mt-4 md:mt-0 md:px-6 md:w-1/2 flex flex-col">
              <h2 class="text-xl font-bold">{{ project.title }}</h2>
              <div class="flex flex-wrap gap-2 pt-2">
                <UBadge v-for="(tag, tagIndex) in project.tags" :key="tagIndex" :label="tag" variant="soft" />
              </div>
              <p class="mt-2 text-neutral-500 dark:text-neutral-400">{{ project.description }}</p>
            </div>
          </div>
        </UPageCard>
      </div>
    </UPageBody>
  </UContainer>
</template>
