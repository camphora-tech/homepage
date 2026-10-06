<script setup lang="ts">
const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#0F1913' : '#F3F6F2')

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'ja'
  }
})

useSeoMeta({
  titleTemplate: '%s - CamphoraTech',
  ogImage: '/camphoratech-ogimage.svg',
  twitterImage: '/camphoratech-ogimage.svg',
  twitterCard: 'summary_large_image'
})

const { data: files } = useLazyAsyncData('search', () => Promise.all([
  queryCollectionSearchSections('projects'),
  queryCollectionSearchSections('versions'),
  queryCollectionSearchSections('posts')
]).then(sections => sections.flat()), {
  server: false
})

const links = [{
  label: 'Projects',
  icon: 'i-lucide-folder-git-2',
  to: '/projects'
}, {
  label: 'Blog',
  icon: 'i-lucide-newspaper',
  to: '/blog'
}, {
  label: 'Growth Ring',
  icon: 'i-lucide-rocket',
  to: '/growth-ring'
}]
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        shortcut="meta_k"
        :links="links"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
  </UApp>
</template>
