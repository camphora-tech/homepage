<script setup lang="ts">
defineProps<{
  title: string
  description: string
  to: string
  category?: string
  image?: { src: string, alt?: string }
  tags?: string[]
}>()
</script>

<template>
  <NuxtLink
    :to="to"
    class="group grid gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10 items-start"
  >
    <div class="aspect-[4/3] max-w-full overflow-hidden rounded-[2px] bg-surface-sunken">
      <NuxtImg
        v-if="image?.src"
        :src="image.src"
        :alt="image.alt || ''"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="min-w-0">
      <p
        v-if="category"
        class="text-sm font-bold leading-[1.6] tracking-[0.04em] text-leaf"
      >
        {{ category }}
      </p>
      <h3
        class="font-display font-semibold text-2xl leading-[1.5] text-ink group-hover:text-leaf transition-colors"
        :class="category && 'mt-1'"
      >
        {{ title }}
      </h3>
      <ul
        v-if="tags?.length"
        class="mt-3 flex flex-wrap gap-2"
        aria-label="技術領域"
      >
        <li
          v-for="tag in tags"
          :key="tag"
          class="px-2 py-0.5 rounded-[4px] bg-canopy text-leaf text-[13px] font-bold tracking-[0.04em] leading-[1.6]"
        >
          {{ tag }}
        </li>
      </ul>
      <p class="mt-4 max-w-[40em] leading-[1.9] text-ink-muted">
        {{ description }}
      </p>
    </div>
  </NuxtLink>
</template>
