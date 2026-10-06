<script setup lang="ts">
defineProps<{
  date: string
  title: string
  description?: string
  to: string
  latest?: boolean
}>()
</script>

<template>
  <NuxtLink
    :to="to"
    class="group grid grid-cols-[7.5em_minmax(0,1fr)] gap-x-6 py-5 border-t border-hairline max-sm:grid-cols-1 max-sm:gap-y-1"
  >
    <time
      :datetime="date"
      class="numeral text-lg leading-[1.6]"
      :class="latest ? 'text-sprout' : 'text-ring-strong'"
    >
      {{ formatDate(date) }}
    </time>
    <div class="min-w-0">
      <h3 class="font-display font-semibold text-lg leading-[1.6] text-ink group-hover:text-leaf transition-colors">
        {{ title }}
      </h3>
      <p
        v-if="description"
        class="mt-1 max-w-[40em] text-sm leading-[1.8] text-ink-muted line-clamp-2"
      >
        {{ description }}
      </p>
    </div>
  </NuxtLink>
</template>
