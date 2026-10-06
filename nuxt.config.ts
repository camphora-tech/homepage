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
    domains: [
      'images.unsplash.com',
      'tsucrea.com'
    ],
    alias: {
      unsplash: 'https://images.unsplash.com'
    }
  }
})
