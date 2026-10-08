// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  // og:image などを絶対 URL にするためのサイト URL。プレビュー用ビルドでは NUXT_SITE_URL で上書きする
  site: {
    url: process.env.NUXT_SITE_URL || 'https://www.camphora.tech',
    name: 'CamphoraTech'
  },

  content: {
    preview: {
      api: 'https://api.nuxt.studio'
    }
  },

  compatibilityDate: '2024-07-11',

  nitro: {
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  fonts: {
    families: [
      { name: 'Shippori Mincho B1', provider: 'google', weights: [500, 600, 700] },
      { name: 'BIZ UDPGothic', provider: 'google', weights: [400, 700] }
    ]
  },
  image: {
    // sharp を使わない（CI でビルドされず、Cloudflare 上でも動かない）。画像は元の URL をそのまま配信する
    provider: 'none',
    domains: [
      'images.unsplash.com',
      'tsucrea.com'
    ],
    alias: {
      unsplash: 'https://images.unsplash.com'
    }
  },

  // OG画像（satori）用の日本語フォント。ビルド時に Google Fonts から取得して PNG に描く
  ogImage: {
    fonts: ['Shippori+Mincho+B1:600', 'BIZ+UDPGothic:400']
  }
})
