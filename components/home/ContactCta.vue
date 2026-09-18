<template>
  <section class="py-32 bg-zinc-50 overflow-hidden" id="contact-cta">
    <div class="container mx-auto px-6 lg:px-12 text-center">
      <div ref="ctaRef" class="max-w-3xl mx-auto">
        <span ref="numRef" class="text-xs font-medium uppercase tracking-[0.3em] text-zinc-400 mb-4 block" style="opacity: 0">(03)</span>
        <h2
          ref="headingRef"
          class="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-zinc-900 mb-6 leading-tight"
          style="opacity: 0; transform: scale(0.85)"
        >
          Have a project
          <br />
          in mind?
        </h2>
        <p ref="descRef" class="text-lg text-zinc-500 mb-10 max-w-xl mx-auto" style="opacity: 0">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </p>
        <NuxtLink
          ref="btnRef"
          to="/contact"
          class="magnetic-btn inline-flex items-center gap-3 bg-zinc-900 text-white px-10 py-5 rounded-full text-lg font-medium hover:bg-zinc-700 transition-colors duration-500 group"
          id="cta-contact-link"
          style="opacity: 0; transform: translateY(20px)"
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

const { magneticElement } = useAnimations()

const ctaRef = ref<HTMLElement>()
const numRef = ref<HTMLElement>()
const headingRef = ref<HTMLElement>()
const descRef = ref<HTMLElement>()
const btnRef = ref<HTMLElement>()

const cleanups: (() => void)[] = []

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  nextTick(() => {
    // Number
    if (numRef.value) {
      gsap.to(numRef.value, {
        opacity: 1,
        duration: 0.6,
        scrollTrigger: { trigger: ctaRef.value, start: 'top 80%', toggleActions: 'play none none none' },
      })
    }

    // Heading — scale-in on scroll (scrub-linked)
    if (headingRef.value) {
      gsap.to(headingRef.value, {
        opacity: 1,
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: headingRef.value,
          start: 'top 85%',
          end: 'top 40%',
          scrub: 0.8,
        },
      })
    }

    // Description
    if (descRef.value) {
      gsap.to(descRef.value, {
        opacity: 1,
        duration: 0.8,
        scrollTrigger: { trigger: descRef.value, start: 'top 85%', toggleActions: 'play none none none' },
      })
    }

    // Button
    if (btnRef.value) {
      const btnEl = btnRef.value?.$el ?? btnRef.value
      gsap.to(btnEl, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: { trigger: btnEl, start: 'top 90%', toggleActions: 'play none none none' },
      })

      const cleanup = magneticElement(btnEl, 0.3)
      if (cleanup) cleanups.push(cleanup)
    }
  })
})

onUnmounted(() => {
  cleanups.forEach((fn) => fn())
  ScrollTrigger.getAll().forEach((t) => t.kill())
})
</script>
