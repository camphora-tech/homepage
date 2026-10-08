<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})

withDefaults(defineProps<{
  title?: string
  description?: string
  headline?: string
}>(), {
  title: 'CamphoraTech',
  description: '',
  headline: 'CamphoraTech'
})
</script>

<template>
  <div
    class="w-full h-full flex flex-row"
    style="background-color: #F3F6F2;"
  >
    <div
      class="flex flex-col justify-between"
      style="width: 860px; padding: 72px 64px;"
    >
      <p style="font-family: 'BIZ UDPGothic'; font-size: 30px; color: #7A5C3A; margin: 0;">
        {{ headline }}
      </p>
      <div class="flex flex-col">
        <h1 style="font-family: 'Shippori Mincho B1'; font-weight: 600; font-size: 60px; line-height: 1.35; color: #18211B; margin: 0;">
          {{ title }}
        </h1>
        <p
          v-if="description"
          style="font-family: 'BIZ UDPGothic'; font-size: 28px; line-height: 1.6; color: #4F5C53; margin: 24px 0 0;"
        >
          {{ description.length > 60 ? `${description.slice(0, 60)}…` : description }}
        </p>
      </div>
    </div>
    <div
      class="flex"
      style="width: 340px; background-color: #24432F; position: relative;"
    >
      <div style="position: absolute; left: -120px; bottom: -120px; width: 240px; height: 240px; border-radius: 9999px; border: 3px solid #F3F6F2;" />
      <div style="position: absolute; left: -200px; bottom: -200px; width: 400px; height: 400px; border-radius: 9999px; border: 3px solid #F3F6F2;" />
      <div style="position: absolute; left: -280px; bottom: -280px; width: 560px; height: 560px; border-radius: 9999px; border: 3px solid #F3F6F2;" />
      <div style="position: absolute; left: -360px; bottom: -360px; width: 720px; height: 720px; border-radius: 9999px; border: 3px solid #F3F6F2;" />
      <div style="position: absolute; right: 0; top: 0; width: 64px; height: 64px; background-color: #B8324F;" />
    </div>
  </div>
</template>
