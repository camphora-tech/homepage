<script setup lang="ts">
  const route = useRoute()

  const items = computed(() => [{
    label: 'Projects',
    to: '/projects'
  }, {
    label: 'Blog',
    to: '/blog'
  }, {
    label: 'Growth Ring',
    to: '/growth-ring'
  }])
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/">
        <UColorModeImage light="/logo_land_light.svg" dark="/logo_land_dark.svg" class="w-auto h-8 shrink-0" />
      </NuxtLink>
    </template>

    <UNavigationMenu :items="items" variant="link" />

    <template #right>
      <UColorModeButton />
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>
