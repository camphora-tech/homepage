<script setup lang="ts">
  const route = useRoute()

  const {data: page} = await useAsyncData('changelog', () => queryCollection('changelog').first())
  const {data: versions} = await useAsyncData(route.path, () => queryCollection('versions').order('date', 'DESC').all())

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
    <UPageHeader v-bind="page" class="py-[50px]" />

    <UPageBody>
      <UChangelogVersions>
        <UChangelogVersion v-for="version in versions" :key="version.id" v-bind="version" :to="version.path" :ui="{
            strategy: 'overwrite',
            image: 'object-contain object-center w-full h-full bg-black'
          }" />
      </UChangelogVersions>
    </UPageBody>
  </UContainer>
</template>
