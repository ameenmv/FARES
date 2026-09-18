// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/image',
    '@nuxtjs/google-fonts',
  ],

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  },

  googleFonts: {
    families: {
      'Outfit': [300, 400, 500, 600, 700, 800, 900],
      'Inter': [300, 400, 500, 600, 700],
    },
    display: 'swap',
    preload: true,
  },

  image: {
    quality: 80,
    format: ['webp', 'jpg'],
  },

  site: {
    url: 'https://faresmohammed.com',
    name: 'Fares Mohammed',
    description: 'Visual Storyteller & Senior Graphic Designer — Branding, Packaging, and Campaign Design',
    defaultLocale: 'en',
  },
})
