<template>
  <section class="section" id="about-preview">
    <div class="container mx-auto px-6 lg:px-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
        <!-- Left: Bio Grid (2x2 like the PDF) -->
        <div ref="textRef">
          <!-- Bio points in 2x2 grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-14">
            <div
              v-for="(point, index) in bioPoints"
              :key="index"
              class="bio-point"
              style="opacity: 0; transform: translateY(25px)"
            >
              <span class="block text-sm font-medium text-zinc-400 mb-4">
                ({{ String(index + 1).padStart(2, '0') }})
              </span>
              <p class="text-zinc-800 text-base md:text-lg leading-relaxed">
                {{ point }}
              </p>
            </div>
          </div>

          <!-- CTA link -->
          <NuxtLink
            ref="linkRef"
            to="/about"
            class="magnetic-btn inline-flex items-center gap-2 mt-14 text-sm font-medium text-zinc-900 hover:text-zinc-500 transition-colors duration-300 group"
            id="about-learn-more"
            style="opacity: 0"
          >
            Learn More About Me
            <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
        </div>

        <!-- Right: Polaroid Photo -->
        <div ref="photoRef" class="flex items-center justify-center" style="opacity: 0; transform: translateY(40px)">
          <div class="relative">
            <!-- Photo with slight rotation like polaroid -->
            <div class="relative rounded-2xl overflow-hidden shadow-2xl shadow-zinc-900/10 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-700 ease-out">
              <img
                src="/images/fares-photo.jpg"
                alt="Fares Mohammed"
                class="w-full max-w-md h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { magneticElement } = useAnimations()

const bioPoints = [
  "I'm Fares Mohammed, a visual storyteller & senior graphic designer.",
  "I turn ideas into bold, eye-catching designs whether it's branding, packaging, or digital visuals.",
  "With over six years of experience, working between Egypt and Saudi Arabia.",
  "Outside of design, I'm inspired by music, fashion, and football.",
]

const textRef = ref<HTMLElement>()
const photoRef = ref<HTMLElement>()
const linkRef = ref<HTMLElement>()

const cleanups: (() => void)[] = []

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  nextTick(() => {
    // Bio points — stagger from individual triggers
    const bioItems = document.querySelectorAll('.bio-point')
    bioItems.forEach((item, i) => {
      gsap.to(item, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        delay: i * 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: textRef.value, start: 'top 80%', toggleActions: 'play none none none' },
      })
    })

    // Link
    if (linkRef.value) {
      const linkEl = linkRef.value?.$el ?? linkRef.value
      gsap.to(linkEl, {
        opacity: 1,
        duration: 0.6,
        scrollTrigger: { trigger: textRef.value, start: 'top 60%', toggleActions: 'play none none none' },
      })
      const cleanup = magneticElement(linkEl, 0.2)
      if (cleanup) cleanups.push(cleanup)
    }

    // Photo — float up + subtle parallax
    if (photoRef.value) {
      gsap.to(photoRef.value, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: photoRef.value, start: 'top 90%', toggleActions: 'play none none none' },
      })

      // Subtle float on scroll
      gsap.to(photoRef.value, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: { trigger: photoRef.value, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      })
    }
  })
})

onUnmounted(() => {
  cleanups.forEach((fn) => fn())
  ScrollTrigger.getAll().forEach((t) => t.kill())
})
</script>
