// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/image',
    '@nuxtjs/google-fonts',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
  ],

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Fares Mohammed — Senior Graphic Designer',
      meta: [
        { name: 'description', content: 'Visual Storyteller & Senior Graphic Designer with 6+ years of experience in branding, packaging, and campaign design across Egypt and Saudi Arabia.' },
        { name: 'author', content: 'Fares Mohammed' },
        { name: 'theme-color', content: '#ffffff' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Fares Mohammed — Senior Graphic Designer' },
        { property: 'og:description', content: 'Visual Storyteller & Senior Graphic Designer with 6+ years of experience in branding, packaging, and campaign design across Egypt and Saudi Arabia.' },
        { property: 'og:url', content: 'https://faresmohammed.vercel.app' },
        { property: 'og:site_name', content: 'Fares Mohammed' },
        { property: 'og:image', content: 'https://faresmohammed.vercel.app/og-image.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Fares Mohammed — Senior Graphic Designer' },
        { name: 'twitter:description', content: 'Visual Storyteller & Senior Graphic Designer — Branding, Packaging, and Campaign Design.' },
        { name: 'twitter:image', content: 'https://faresmohammed.vercel.app/og-image.jpg' },
      ],
      link: [
        { rel: 'canonical', href: 'https://faresmohammed.vercel.app' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
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
      'Sora': [700, 800],
    },
    display: 'swap',
    preload: true,
  },

  image: {
    quality: 80,
    format: ['webp', 'jpg'],
  },

  site: {
    url: 'https://faresmohammed.vercel.app',
    name: 'Fares Mohammed',
    description: 'Visual Storyteller & Senior Graphic Designer — Branding, Packaging, and Campaign Design',
    defaultLocale: 'en',
  },

  sitemap: {
    urls: [
      '/work/oku',
      '/work/garnish',
      '/work/palmo',
      '/work/vlt',
      '/work/qatfah-almadinah',
      '/work/wekad',
      '/work/after',
      '/work/irth-alnakheel',
      '/work/flp-burger',
      '/work/palm-rise',
      '/work/toucan',
      '/work/safeeha',
      '/work/yalla-khobar',
      '/work/eventi',
      '/work/durma',
      '/work/al-sharqiyah-race',
      '/work/race-of-emotions',
      '/work/loca-opinion',
      '/work/olabs-anniversary',
      '/work/befine-ramadan',
      '/work/opinion-eid',
    ],
  },

  robots: {
    groups: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_nuxt/'],
      },
    ],
    sitemap: 'https://faresmohammed.vercel.app/sitemap.xml',
  },
})
