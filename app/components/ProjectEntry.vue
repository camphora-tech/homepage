<script setup lang="ts">
/**
 * プロジェクトの一覧行。画像があれば「画像｜本文」、なければ「名前｜説明」の2列にする。
 * 仮の灰色画像は置かない（未完成に見えるため）。
 */
const props = defineProps<{
  title: string
  description: string
  to: string
  category?: string
  image?: { src: string, alt?: string }
  tags?: string[]
}>()

const hasImage = computed(() => !!props.image?.src && !props.image.src.endsWith('placeholder.svg'))
</script>

<template>
  <NuxtLink
    :to="to"
    class="group grid gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10 items-start"
    :class="!hasImage && 'pt-6 border-t border-hairline'"
  >
    <div
      v-if="hasImage"
      class="aspect-[4/3] max-w-full overflow-hidden rounded-[2px] bg-surface-sunken"
    >
      <NuxtImg
        :src="image!.src"
        :alt="image!.alt || ''"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- 画像がないときは名前を左列に置く -->
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
      <template v-if="hasImage">
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
      </template>
    </div>

    <div
      v-if="!hasImage"
      class="min-w-0"
    >
      <p class="max-w-[40em] leading-[1.9] text-ink-muted">
        {{ description }}
      </p>
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
      <span class="inline-block mt-4 text-sm font-bold text-leaf group-hover:underline underline-offset-4">
        詳しく見る
      </span>
    </div>
  </NuxtLink>
</template>
