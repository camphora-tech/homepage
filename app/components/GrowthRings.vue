<script setup lang="ts">
/**
 * 大楠の年輪断面。Growth Ring の出来事 1 件につき年輪 1 本を、開業日を中心に経過日数で外側へ描く。
 * 出来事は細い `ring-strong`、最新の 1 本だけ `sprout`、年の境目は太い `ring`。
 * その間を埋める装飾の年輪（本数・間隔・太さ）と断面の形は、表示のたびにランダムに決める。
 * プリレンダリングでも毎回変わるよう、形はクライアントでのマウント後に生成する。
 */
interface RingEvent {
  date: string
  title: string
  path: string
}

interface Shape {
  harmonics: { k: number, amp: number, phase: number }[]
  squash: number
  tilt: number
  filler: { r: number, width: number, jitter: { k: number, amp: number, phase: number } }[]
  yearWidth: number
  barkWidth: number
}

const props = defineProps<{
  events: RingEvent[]
}>()

const C = 180
const R0 = 16
const R1 = 150
const DAY = 864e5
const rand = (min: number, max: number) => min + Math.random() * (max - min)

const sorted = computed(() => [...props.events].sort((a, b) => Date.parse(a.date) - Date.parse(b.date)))
const t0 = computed(() => Date.parse(sorted.value[0]?.date ?? '2024-01-01'))
const t1 = computed(() => Date.parse(sorted.value.at(-1)?.date ?? '2024-12-31') + 60 * DAY)
const radius = (t: number) => R0 + (R1 - R0) * (t - t0.value) / (t1.value - t0.value)

const shape = ref<Shape | null>(null)

function createShape(): Shape {
  // 断面の輪郭：2〜6 倍周期の揺らぎを 3〜4 個重ねる
  // 高い周期ほど振幅を小さくして、多角形ではなく木口らしい歪みにする
  const harmonics = Array.from({ length: Math.floor(rand(3, 5)) }, () => {
    const k = Math.floor(rand(2, 7))
    return { k, amp: rand(0.01, 0.045) * 2 / k, phase: rand(0, Math.PI * 2) }
  })
  // 装飾の年輪：本数はランダム、間隔は広い年・狭い年が混ざるように
  const count = Math.floor(rand(8, 26))
  const steps = Array.from({ length: count + 1 }, () => rand(0.3, 1.7) ** 2)
  const total = steps.reduce((a, b) => a + b, 0)
  let acc = 0
  const filler = steps.slice(0, -1).map((s) => {
    acc += s
    return {
      r: R0 + (R1 - R0) * acc / total,
      width: rand(0.35, 2.2),
      jitter: { k: Math.floor(rand(2, 5)), amp: rand(0, 0.008), phase: rand(0, Math.PI * 2) }
    }
  })
  return {
    harmonics,
    squash: rand(0.93, 1.07),
    tilt: rand(0, Math.PI),
    filler,
    yearWidth: rand(1.8, 3.2),
    barkWidth: rand(4, 8)
  }
}

onMounted(() => {
  shape.value = createShape()
})

const SEGMENTS = 96

// 輪郭は角度だけで決まるので、単位円の形を一度だけ計算して全年輪で使い回す
function unitOutline(s: Shape) {
  const cosT = Math.cos(s.tilt)
  const sinT = Math.sin(s.tilt)
  return Array.from({ length: SEGMENTS + 1 }, (_, i) => {
    const a = i / SEGMENTS * Math.PI * 2
    let w = 1
    for (const h of s.harmonics) w += h.amp * Math.sin(h.k * a + h.phase)
    const x = w * Math.cos(a) * s.squash
    const y = w * Math.sin(a) / s.squash
    return { a, x: x * cosT - y * sinT, y: x * sinT + y * cosT }
  })
}
type Outline = ReturnType<typeof unitOutline>

function ringPath(o: Outline, r: number, jitter?: Shape['filler'][number]['jitter']) {
  let d = ''
  for (let i = 0; i <= SEGMENTS; i++) {
    const p = o[i]!
    const k = jitter ? r * (1 + jitter.amp * Math.sin(jitter.k * p.a + jitter.phase)) : r
    d += `${i ? 'L' : 'M'}${(C + p.x * k).toFixed(1)} ${(C + p.y * k).toFixed(1)}`
  }
  return `${d}Z`
}
// 年内の日付の角度にある点（任意の角度なので輪郭表から補間せず直接計算）
function point(s: Shape, r: number, a: number) {
  let w = 1
  for (const h of s.harmonics) w += h.amp * Math.sin(h.k * a + h.phase)
  const x = r * w * Math.cos(a) * s.squash
  const y = r * w * Math.sin(a) / s.squash
  return {
    x: C + x * Math.cos(s.tilt) - y * Math.sin(s.tilt),
    y: C + x * Math.sin(s.tilt) + y * Math.cos(s.tilt)
  }
}
// 内側から外側へ順に描く（半径に比例した遅延）
const delay = (r: number) => `${Math.round(r / R1 * 280)}ms`

const drawing = computed(() => {
  const s = shape.value
  if (!s) return null
  const o = unitOutline(s)

  const filler = s.filler.map(f => ({ d: ringPath(o, f.r, f.jitter), width: f.width, delay: delay(f.r) }))

  const years: { year: number, d: string, delay: string }[] = []
  for (let y = new Date(t0.value).getFullYear() + 1; Date.parse(`${y}-01-01`) < t1.value; y++) {
    const r = radius(Date.parse(`${y}-01-01`))
    years.push({ year: y, d: ringPath(o, r), delay: delay(r) })
  }

  const rings = sorted.value.map((ev, i) => {
    const t = Date.parse(ev.date)
    const r = radius(t)
    const angle = (t - Date.parse(`${new Date(t).getFullYear()}-01-01`)) / DAY / 365 * Math.PI * 2 - Math.PI / 2
    return {
      ...ev,
      index: i,
      latest: i === sorted.value.length - 1,
      d: i === 0 ? null : ringPath(o, r),
      dot: point(s, r, angle),
      delay: delay(r)
    }
  })

  return {
    heart: ringPath(o, R0),
    bark: ringPath(o, R1 + 8),
    barkWidth: s.barkWidth,
    yearWidth: s.yearWidth,
    filler,
    years,
    rings
  }
})

const active = ref<number | null>(null)
const shown = computed(() => {
  const list = sorted.value
  const i = active.value ?? list.length - 1
  const ev = list[i]
  return ev ? { ...ev, latest: i === list.length - 1 } : null
})
</script>

<template>
  <figure class="growth-rings">
    <svg
      v-if="drawing"
      viewBox="0 0 360 360"
      class="block w-full h-auto"
      role="group"
      :aria-label="`CamphoraTech の年輪。${formatDate(sorted[0]?.date ?? '')} の開業から ${events.length} 件の出来事`"
    >
      <path
        :d="drawing.heart"
        class="fill-canopy"
      />
      <path
        v-for="(f, i) in drawing.filler"
        :key="`filler-${i}`"
        :d="f.d"
        pathLength="1"
        class="ring-line fill-none stroke-ring"
        :stroke-width="f.width"
        :style="{ animationDelay: f.delay }"
      />
      <path
        v-for="y in drawing.years"
        :key="y.year"
        :d="y.d"
        pathLength="1"
        class="ring-line fill-none stroke-ring"
        :stroke-width="drawing.yearWidth"
        :style="{ animationDelay: y.delay }"
      />
      <template
        v-for="ring in drawing.rings"
        :key="ring.path"
      >
        <path
          v-if="ring.d"
          :d="ring.d"
          pathLength="1"
          class="ring-line fill-none"
          :class="ring.latest ? 'stroke-sprout' : 'stroke-ring-strong'"
          :stroke-width="ring.latest ? 2 : 1"
          :style="{ animationDelay: ring.delay }"
        />
      </template>
      <path
        :d="drawing.bark"
        pathLength="1"
        class="ring-line fill-none stroke-leaf"
        :stroke-width="drawing.barkWidth"
        style="animation-delay: 300ms"
      />
      <NuxtLink
        v-for="ring in drawing.rings"
        :key="`dot-${ring.path}`"
        :to="ring.path"
        :aria-label="`${formatDate(ring.date)} ${ring.title}`"
        class="ring-dot"
        @mouseenter="active = ring.index"
        @mouseleave="active = null"
        @focus="active = ring.index"
        @blur="active = null"
      >
        <circle
          :cx="ring.dot.x"
          :cy="ring.dot.y"
          r="12"
          class="fill-transparent"
        />
        <circle
          :cx="ring.dot.x"
          :cy="ring.dot.y"
          :r="ring.latest ? 5 : 3.5"
          :class="ring.latest ? 'fill-sprout' : 'fill-ring-strong'"
          class="ring-dot-mark"
        />
      </NuxtLink>
    </svg>
    <!-- マウント前は同じ大きさの枠だけ確保してレイアウトのずれを防ぐ -->
    <div
      v-else
      class="w-full aspect-square"
      aria-hidden="true"
    />
    <figcaption
      v-if="shown"
      class="mt-4 text-sm text-ink-muted min-h-[3.6em]"
      aria-live="polite"
    >
      <time
        :datetime="shown.date"
        class="numeral text-base"
        :class="shown.latest ? 'text-sprout' : 'text-ring-strong'"
      >{{ formatDate(shown.date) }}</time>
      <span class="block font-display text-ink text-base">{{ shown.title }}</span>
    </figcaption>
  </figure>
</template>

<style scoped>
.ring-line {
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
  animation: ring-grow 0.45s cubic-bezier(.4, 0, .2, 1) both;
}

@keyframes ring-grow {
  from { stroke-dashoffset: 1; }
}

.ring-dot:hover .ring-dot-mark,
.ring-dot:focus-visible .ring-dot-mark {
  fill: var(--ct-leaf);
}

.ring-dot:focus-visible {
  outline: none;
}

.ring-dot:focus-visible .ring-dot-mark {
  stroke: var(--ct-leaf);
  stroke-width: 3;
}

@media (prefers-reduced-motion: reduce) {
  .ring-line {
    animation: none;
  }
}
</style>
