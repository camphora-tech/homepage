<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()

const slots = useSlots()
</script>

<template>
  <header
    class="pt-16 pb-12 lg:pt-24 lg:pb-16 border-b border-hairline"
    :class="slots.aside && 'grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-16'"
  >
    <div class="min-w-0">
      <slot name="above" />
      <h1 class="font-display font-semibold text-[2rem] leading-[1.35] lg:text-[2.75rem] tracking-[0.02em] text-ink">
        {{ title }}
      </h1>
      <p
        v-if="description"
        class="mt-4 max-w-[40em] text-lg leading-[1.9] text-ink-muted"
      >
        {{ description }}
      </p>
      <slot />
    </div>
    <slot name="aside" />
  </header>
</template>
