<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('changelog', () => queryCollection('changelog').first())
const { data: versions } = await useAsyncData(route.path, () => queryCollection('versions').order('date', 'DESC').all())

const title = page.value?.seo?.title || page.value?.title || 'Growth Ring'
const description = page.value?.seo?.description || page.value?.description || 'CamphoraTech の歩みを、年輪のように一つずつ記録しています。'

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

defineOgImageComponent('CamphoraTech')

// 年ごとにまとめる（新しい年が上）
const byYear = computed(() => {
  const groups = new Map<number, NonNullable<typeof versions.value>>()
  for (const v of versions.value ?? []) {
    const y = new Date(v.date).getFullYear()
    groups.set(y, [...(groups.get(y) ?? []), v])
  }
  return [...groups.entries()]
})
const latestPath = computed(() => versions.value?.[0]?.path)
const ringEvents = computed(() => (versions.value ?? []).map(v => ({ date: String(v.date), title: v.title, path: v.path })))
</script>

<template>
  <UContainer>
    <PageHeading
      :title="title"
      :description="description"
    >
      <template #aside>
        <GrowthRings
          v-if="ringEvents.length"
          :events="ringEvents"
          class="w-full max-w-[22rem] mx-auto lg:max-w-[26rem] lg:mr-0"
        />
      </template>
    </PageHeading>

    <div class="py-16 lg:py-24 grid gap-16">
      <section
        v-for="[year, entries] in byYear"
        :key="year"
        class="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:gap-16"
        :aria-labelledby="`year-${year}`"
      >
        <h2
          :id="`year-${year}`"
          class="numeral text-[2.75rem] leading-none text-ring-strong lg:sticky lg:top-[calc(var(--ui-header-height)+2rem)] lg:self-start"
        >
          {{ year }}
        </h2>
        <div class="min-w-0">
          <TimelineEntry
            v-for="entry in entries"
            :key="entry.path"
            :to="entry.path"
            :date="String(entry.date)"
            :title="entry.title"
            :description="entry.description"
            :latest="entry.path === latestPath"
          />
        </div>
      </section>
    </div>
  </UContainer>
</template>
