<template>
  <section class="section" id="about-preview">
    <div class="container mx-auto px-6 lg:px-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <!-- Left: Text -->
        <div ref="textRef">
          <span class="text-xs font-medium uppercase tracking-[0.3em] text-zinc-400 mb-3 block">(02)</span>
          <h2 class="text-4xl md:text-5xl font-heading font-bold text-zinc-900 mb-8">
            About Me
          </h2>

          <div class="space-y-6">
            <div
              v-for="(point, index) in bioPoints"
              :key="index"
              class="bio-point flex items-start gap-4"
            >
              <span class="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-xs font-bold text-zinc-500 mt-0.5">
                {{ String(index + 1).padStart(2, '0') }}
              </span>
              <p class="text-zinc-600 text-lg leading-relaxed">
                {{ point }}
              </p>
            </div>
          </div>

          <NuxtLink
            to="/about"
            class="inline-flex items-center gap-2 mt-10 text-sm font-medium text-zinc-900 hover:text-zinc-500 transition-colors duration-300 group"
            id="about-learn-more"
          >
            Learn More About Me
            <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
        </div>

        <!-- Right: Visual -->
        <div ref="visualRef">
          <div class="relative rounded-3xl overflow-hidden bg-zinc-100 aspect-[4/5]">
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="relative w-full h-full bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-200 flex items-center justify-center">
                <div class="text-center p-12">
                  <div class="w-24 h-24 mx-auto mb-8 rounded-full bg-zinc-900 flex items-center justify-center">
                    <span class="text-white text-3xl font-heading font-bold">FM</span>
                  </div>
                  <p class="text-zinc-500 text-sm uppercase tracking-widest">Fares Mohammed</p>
                  <p class="text-zinc-400 text-xs mt-2">Egypt & Saudi Arabia</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Decorative floating elements -->
          <div class="absolute -top-4 -right-4 w-20 h-20 bg-zinc-900 rounded-2xl -z-10 opacity-10" />
          <div class="absolute -bottom-4 -left-4 w-16 h-16 border-2 border-zinc-200 rounded-2xl -z-10" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const bioPoints = [
  'Visual storyteller & senior graphic designer specializing in brands that stand out.',
  'Creating bold, eye-catching designs for branding, packaging, and digital campaigns.',
  '6+ years of experience working between Egypt and Saudi Arabia.',
  'Inspired by music, fashion, and football — bringing cultural depth to every project.',
]

const textRef = ref<HTMLElement>()
const visualRef = ref<HTMLElement>()

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  nextTick(() => {
    if (textRef.value) {
      gsap.fromTo(textRef.value,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.value,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    const bioItems = document.querySelectorAll('.bio-point')
    if (bioItems.length) {
      gsap.fromTo(bioItems,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.value,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )
    }

    if (visualRef.value) {
      gsap.fromTo(visualRef.value,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: visualRef.value,
            start: 'top 85%',
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
