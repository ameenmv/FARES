<template>
  <section class="py-32 md:py-40 overflow-hidden" id="contact-cta">
    <div class="container mx-auto px-6 lg:px-12">
      <!-- Top divider -->
      <div ref="dividerRef" class="h-[1px] bg-zinc-200 mb-20" />

      <!-- Large text CTA -->
      <div ref="ctaRef">
        <!-- Massive heading that fills the width -->
        <NuxtLink
          ref="linkRef"
          to="/contact"
          class="group block"
          id="cta-contact-link"
        >
          <h2
            ref="headingRef"
            class="font-heading font-bold text-zinc-900 leading-[0.9] tracking-[-0.03em] group-hover:text-zinc-400 transition-colors duration-700"
            style="font-size: clamp(3rem, 8vw, 9rem); opacity: 0; transform: translateY(40px)"
          >
            Let's work
            <br />
            <span class="inline-flex items-center gap-4 md:gap-8">
              together
              <!-- Arrow circle -->
              <span
                class="inline-flex items-center justify-center w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-zinc-900 group-hover:bg-zinc-900 group-hover:border-zinc-900 transition-all duration-500 flex-shrink-0 transform group-hover:rotate-45"
              >
                <svg class="w-6 h-6 md:w-8 md:h-8 text-zinc-900 group-hover:text-white transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </span>
            </span>
          </h2>
        </NuxtLink>
      </div>

      <!-- Bottom row: email + location -->
      <div ref="bottomRef" class="flex flex-col md:flex-row justify-between items-start md:items-center mt-16 pt-8 border-t border-zinc-200 gap-6" style="opacity: 0">
        <a
          href="mailto:faresmohammed@email.com"
          class="text-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-300"
        >
          faresmohammed@email.com
        </a>
        <span class="text-sm text-zinc-400">
          Egypt & Saudi Arabia
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { lineDraw, magneticElement } = useAnimations()

const ctaRef = ref<HTMLElement>()
const headingRef = ref<HTMLElement>()
const dividerRef = ref<HTMLElement>()
const bottomRef = ref<HTMLElement>()
const linkRef = ref<HTMLElement>()

const cleanups: (() => void)[] = []

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  nextTick(() => {
    const sectionEl = document.getElementById('contact-cta')

    // Divider line
    if (dividerRef.value) {
      lineDraw(dividerRef.value, {
        duration: 1,
        scrollTrigger: { trigger: sectionEl, start: 'top 90%', toggleActions: 'play none none none' },
      })
    }

    // Heading — slides up
    if (headingRef.value) {
      gsap.to(headingRef.value, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionEl, start: 'top 85%', toggleActions: 'play none none none' },
      })
    }

    // Bottom row
    if (bottomRef.value) {
      gsap.to(bottomRef.value, {
        opacity: 1,
        duration: 0.8,
        delay: 0.3,
        scrollTrigger: { trigger: sectionEl, start: 'top 85%', toggleActions: 'play none none none' },
      })
    }

    // Magnetic on the link
    if (linkRef.value) {
      const linkEl = linkRef.value?.$el ?? linkRef.value
      const cleanup = magneticElement(linkEl, 0.1)
      if (cleanup) cleanups.push(cleanup)
    }

    // Fallback
    setTimeout(() => {
      if (headingRef.value && getComputedStyle(headingRef.value).opacity === '0') {
        gsap.to(headingRef.value, { opacity: 1, y: 0, duration: 0.5 })
      }
      if (bottomRef.value && getComputedStyle(bottomRef.value).opacity === '0') {
        gsap.to(bottomRef.value, { opacity: 1, duration: 0.5 })
      }
    }, 3000)
  })
})

onUnmounted(() => {
  cleanups.forEach((fn) => fn())
  ScrollTrigger.getAll().forEach((t) => t.kill())
})
</script>
