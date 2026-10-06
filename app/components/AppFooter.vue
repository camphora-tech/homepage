<script setup lang="ts">
const links = [{
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
  <footer class="bg-surface-sunken border-t border-hairline">
    <UContainer class="py-14 grid gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
      <div>
        <UColorModeImage
          light="/logo_land_light.svg"
          dark="/logo_land_dark.svg"
          alt="CamphoraTech"
          class="w-auto h-7"
        />
        <p class="mt-4 max-w-[28em] text-sm leading-[1.8] text-ink-muted">
          データベースとAI技術で、事業固有の課題解決に取り組んでいます。
        </p>
        <p class="mt-2 text-sm">
          <a
            href="mailto:contact@camphora.tech"
            class="text-leaf font-bold hover:underline underline-offset-4"
          >contact@camphora.tech</a>
        </p>
      </div>
      <nav aria-label="フッター">
        <ul class="flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold">
          <li
            v-for="link in links"
            :key="link.to"
          >
            <NuxtLink
              :to="link.to"
              class="text-ink hover:text-leaf"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </UContainer>
    <UContainer class="py-5 border-t border-hairline">
      <p class="text-xs text-ink-muted">
        © {{ new Date().getFullYear() }} CamphoraTech
      </p>
    </UContainer>
  </footer>
</template>
