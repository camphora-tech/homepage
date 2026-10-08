<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('projects-page', () => queryCollection('projectsPage').first())
const { data: projects } = await useAsyncData(route.path, () => queryCollection('projects').all())

const title = page.value?.title || 'Projects'
const description = page.value?.description || ''

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

defineOgImageComponent('CamphoraTech')

// カテゴリごとにまとめる。並び順は 1.projects.yml の categories、未分類は最後
const groups = computed(() => {
  const defined = page.value?.categories ?? []
  const list = projects.value ?? []
  const result = defined.map(c => ({
    name: c.name,
    description: c.description,
    url: c.url,
    linkLabel: c.linkLabel,
    projects: list.filter(p => p.category === c.name)
  }))
  const known = new Set(defined.map(c => c.name))
  const others = new Map<string, typeof list>()
  for (const p of list) {
    if (p.category && known.has(p.category)) continue
    const key = p.category || 'その他'
    others.set(key, [...(others.get(key) ?? []), p])
  }
  for (const [name, items] of others) result.push({ name, description: undefined, url: undefined, linkLabel: undefined, projects: items })
  return result.filter(g => g.projects.length)
})
</script>

<template>
  <UContainer>
    <PageHeading
      :title="title"
      :description="description"
    />

    <div class="grid gap-20 py-16 lg:gap-28 lg:py-24">
      <section
        v-for="group in groups"
        :key="group.name"
        :aria-labelledby="`category-${group.name}`"
      >
        <header>
          <h2
            :id="`category-${group.name}`"
            class="font-display font-semibold text-[1.875rem] leading-[1.45] tracking-[0.02em] text-ink"
          >
            {{ group.name }}
          </h2>
          <p
            v-if="group.description"
            class="mt-2 max-w-[40em] leading-[1.9] text-ink-muted"
          >
            {{ group.description }}
          </p>
          <CategoryLink
            v-if="group.url"
            :url="group.url"
            :label="group.linkLabel"
            class="mt-3"
          />
        </header>
        <div class="mt-8 grid gap-10">
          <ProjectEntry
            v-for="project in group.projects"
            :key="project.path"
            :to="project.path"
            :category="project.category"
            :title="project.title"
            :description="project.description"
            :image="project.image"
            :tags="project.tags"
          />
        </div>
      </section>
    </div>
  </UContainer>
</template>
