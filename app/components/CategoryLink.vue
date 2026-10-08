<script setup lang="ts">
/** カテゴリ（別事業）の公式サイトへの外部リンク */
defineProps<{
  url: string
  label?: string
}>()
</script>

<template>
  <a
    :href="url"
    target="_blank"
    rel="noopener"
    class="inline-flex items-center gap-1.5 font-bold text-leaf hover:underline underline-offset-4"
  >
    {{ label || 'サイトで詳しく見る' }}
    <UIcon
      name="i-lucide-external-link"
      class="size-4 shrink-0"
      aria-hidden="true"
    />
    <span class="sr-only">（新しいタブで開きます）</span>
  </a>
</template>
