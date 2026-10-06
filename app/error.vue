<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const notFound = computed(() => props.error.statusCode === 404)

useSeoMeta({
  title: notFound.value ? 'ページが見つかりません' : 'エラーが発生しました',
  description: 'お探しのページは見つかりませんでした。'
})
</script>

<template>
  <div>
    <AppHeader />

    <UMain>
      <UContainer class="py-24 lg:py-32 text-center">
        <p class="numeral text-[4rem] leading-none text-ring-strong">
          {{ error.statusCode }}
        </p>
        <h1 class="mt-6 font-display font-semibold text-[2rem] leading-[1.35] text-ink">
          {{ notFound ? 'ページが見つかりません' : 'エラーが発生しました' }}
        </h1>
        <p class="mt-4 mx-auto max-w-[32em] leading-[1.9] text-ink-muted">
          {{ notFound ? 'URL が変わったか、ページが削除された可能性があります。トップページから目的のページをお探しください。' : '時間をおいて再度お試しください。解決しない場合は contact@camphora.tech までご連絡ください。' }}
        </p>
        <UButton
          to="/"
          label="トップページへ戻る"
          size="lg"
          class="mt-10"
        />
      </UContainer>
    </UMain>

    <AppFooter />
  </div>
</template>
