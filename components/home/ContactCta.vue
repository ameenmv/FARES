<template>
  <section class="py-32 bg-zinc-50" id="contact-cta">
    <div class="container mx-auto px-6 lg:px-12 text-center">
      <div ref="ctaRef" class="max-w-3xl mx-auto">
        <span class="text-xs font-medium uppercase tracking-[0.3em] text-zinc-400 mb-4 block">(03)</span>
        <h2 class="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-zinc-900 mb-6 leading-tight">
          Have a project
          <br />
          in mind?
        </h2>
        <p class="text-lg text-zinc-500 mb-10 max-w-xl mx-auto">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </p>
        <NuxtLink
          to="/contact"
          class="inline-flex items-center gap-3 bg-zinc-900 text-white px-10 py-5 rounded-full text-lg font-medium hover:bg-zinc-700 transition-all duration-500 group"
          id="cta-contact-link"
        >
          Let's Talk
          <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const ctaRef = ref<HTMLElement>()

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  nextTick(() => {
    if (ctaRef.value) {
      gsap.fromTo(ctaRef.value,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.value,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }
  })
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(t => t.kill())
})
</script>
