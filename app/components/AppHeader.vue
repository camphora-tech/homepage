<script setup lang="ts">
const items = [{
  label: 'Projects',
  to: '/projects'
}, {
  label: 'Blog',
  to: '/blog'
}, {
  label: 'Growth Ring',
  to: '/growth-ring'
}]
</script>

<template>
  <UHeader :ui="{ root: 'bg-surface/90 border-hairline' }">
    <template #left>
      <NuxtLink
        to="/"
        aria-label="CamphoraTech トップへ"
      >
        <UColorModeImage
          light="/logo_land_light.svg"
          dark="/logo_land_dark.svg"
          alt="CamphoraTech"
          class="w-auto h-8 shrink-0"
        />
      </NuxtLink>
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
      :ui="{ link: 'text-[15px] font-bold' }"
    />

    <template #right>
      <UButton
        to="/#contact"
        label="お問い合わせ"
        color="neutral"
        variant="ghost"
        class="hidden sm:inline-flex font-bold"
      />
      <UColorModeButton />
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />
    </template>
  </UHeader>
</template>
