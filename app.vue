<template>
  <div id="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} — Fares Mohammed` : 'Fares Mohammed — Visual Storyteller & Senior Graphic Designer'
  },
  htmlAttrs: {
    lang: 'en',
  },
  meta: [
    { name: 'description', content: 'Fares Mohammed — Visual Storyteller & Senior Graphic Designer with 6+ years of experience in branding, packaging, and campaign design across Egypt and Saudi Arabia.' },
    { property: 'og:title', content: 'Fares Mohammed — Visual Storyteller & Senior Graphic Designer' },
    { property: 'og:description', content: 'Explore the portfolio of Fares Mohammed — branding, packaging, and campaign design across Egypt and Saudi Arabia.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
})
</script>
