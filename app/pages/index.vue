<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => queryCollection('index').first())
const { data: events } = await useAsyncData('index-growth-ring', () => queryCollection('versions').order('date', 'DESC').all())
const { data: projects } = await useAsyncData('index-projects', () => queryCollection('projects').all())

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  titleTemplate: '',
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

const recent = computed(() => (events.value ?? []).slice(0, 3))

const contact = computed(() => page.value?.cta.links.find(l => l.to.startsWith('mailto:')))
const contactAddress = computed(() => contact.value?.to.replace('mailto:', ''))
</script>

<template>
  <div v-if="page">
    <!-- Hero -->
    <UContainer>
      <section class="pt-14 pb-20 lg:pt-28 lg:pb-36">
        <div class="min-w-0 max-w-[52rem]">
          <h1 class="font-display font-semibold text-ink text-[2.25rem] leading-[1.4] sm:text-5xl sm:leading-[1.35] lg:text-[4rem] lg:leading-[1.3] tracking-[0.02em]">
            {{ page.title }}
          </h1>
          <p class="mt-6 max-w-[30em] text-lg leading-[1.9] text-ink-muted">
            {{ page.description }}
          </p>
          <div
            v-if="page.hero.links.length"
            class="mt-10 flex flex-wrap gap-3"
          >
            <UButton
              v-for="link in page.hero.links"
              :key="link.label"
              v-bind="link"
              size="lg"
            />
          </div>
        </div>
      </section>
    </UContainer>

    <!-- できること -->
    <section class="bg-surface-raised border-y border-hairline section-gap">
      <UContainer>
        <div class="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <div>
            <h2 class="font-display font-semibold text-[1.875rem] leading-[1.45] tracking-[0.02em] text-ink">
              {{ page.features.title }}
            </h2>
            <p class="mt-4 max-w-[24em] leading-[1.9] text-ink-muted">
              {{ page.features.description }}
            </p>
          </div>
          <dl class="min-w-0">
            <div
              v-for="item in page.features.items"
              :key="item.title"
              class="grid gap-x-8 gap-y-2 py-6 border-t border-hairline first:border-t-0 first:pt-0 sm:grid-cols-[minmax(0,15em)_minmax(0,1fr)]"
            >
              <dt class="flex items-start gap-3 font-display font-semibold text-[1.3125rem] leading-[1.6] text-ink">
                <UIcon
                  :name="item.icon"
                  class="size-5 mt-1.5 shrink-0 text-leaf"
                  aria-hidden="true"
                />
                {{ item.title }}
              </dt>
              <dd class="max-w-[40em] leading-[1.9] text-ink-muted">
                {{ item.description }}
              </dd>
            </div>
          </dl>
        </div>
      </UContainer>
    </section>

    <!-- Projects -->
    <section
      v-if="projects?.length"
      class="section-gap"
    >
      <UContainer>
        <div class="flex flex-wrap items-baseline justify-between gap-4">
          <h2 class="font-display font-semibold text-[1.875rem] leading-[1.45] tracking-[0.02em] text-ink">
            Projects
          </h2>
          <ULink
            to="/projects"
            class="text-leaf font-bold hover:underline underline-offset-4"
          >
            プロジェクトをすべて見る
          </ULink>
        </div>
        <div class="mt-12 grid gap-16">
          <ProjectEntry
            v-for="project in projects"
            :key="project.path"
            :to="project.path"
            :title="project.title"
            :description="project.description"
            :image="project.image"
            :tags="project.tags"
          />
        </div>
      </UContainer>
    </section>

    <!-- 最近の年輪 -->
    <section
      v-if="recent.length"
      class="pb-20 lg:pb-32"
    >
      <UContainer>
        <div class="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <div>
            <h2 class="font-display font-semibold text-[1.875rem] leading-[1.45] tracking-[0.02em] text-ink">
              最近の年輪
            </h2>
            <p class="mt-4 max-w-[24em] leading-[1.9] text-ink-muted">
              採択や登壇など、CamphoraTech の歩みを記録しています。
            </p>
            <ULink
              to="/growth-ring"
              class="inline-block mt-6 text-leaf font-bold hover:underline underline-offset-4"
            >
              Growth Ring をすべて読む
            </ULink>
          </div>
          <div class="min-w-0">
            <TimelineEntry
              v-for="(entry, i) in recent"
              :key="entry.path"
              :to="entry.path"
              :date="String(entry.date)"
              :title="entry.title"
              :description="entry.description"
              :latest="i === 0"
            />
          </div>
        </div>
      </UContainer>
    </section>

    <!-- お問い合わせ -->
    <section
      id="contact"
      class="bg-leaf text-on-leaf section-gap"
    >
      <UContainer>
        <h2 class="font-display font-semibold text-[1.875rem] leading-[1.45] tracking-[0.02em]">
          {{ page.cta.title }}
        </h2>
        <p class="mt-4 max-w-[36em] leading-[1.9] opacity-90">
          {{ page.cta.description }}
        </p>
        <a
          v-if="contact"
          :href="contact.to"
          class="mt-10 inline-block font-display font-semibold text-[1.75rem] sm:text-4xl lg:text-5xl leading-[1.3] break-all underline decoration-1 underline-offset-[0.2em] hover:decoration-2 focus-visible:outline-on-leaf"
        >
          {{ contactAddress }}
        </a>
      </UContainer>
    </section>
  </div>
</template>
