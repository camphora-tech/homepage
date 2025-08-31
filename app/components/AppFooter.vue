<script setup lang="ts">
  const columns = [{
    label: 'Services',
    children: [{
      label: 'サービス一覧',
      to: '#'
    }, {
      label: 'Projects',
      to: '/projects'
    }]
  }, {
    label: 'CamphoraTech',
    children: [{
      label: 'About',
      to: '#'
    }, {
      label: 'Tech Blog',
      to: '/blog'
    }]
  }, {
    label: 'Support',
    children: [{
      label: 'Q & A',
      to: '#'
    }, {
      label: 'お問い合わせ',
      to: '#'
    }]
  }]
</script>

<template>
  <USeparator />

  <UFooter :ui="{ top: 'border-b border-default' }">
    <template #top>
      <UContainer>
        <UFooterColumns :columns="columns" />
      </UContainer>
    </template>

    <template #left>
      <p class="text-muted text-sm">
        Copyright © {{ new Date().getFullYear() }}. All rights reserved.
      </p>
    </template>
  </UFooter>
</template>
