<template>
  <section class="section" id="about-preview">
    <div class="container mx-auto px-6 lg:px-12">
      <!-- Section label -->
      <div class="flex items-center gap-4 mb-16">
        <div ref="lineTopRef" class="h-[1px] w-12 bg-zinc-300" />
        <span ref="labelRef" class="text-xs font-medium uppercase tracking-[0.3em] text-zinc-400" style="opacity: 0">About</span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
        <!-- Left: Bold statement + details -->
        <div ref="leftRef" class="lg:col-span-7">
          <!-- Big statement -->
          <h2
            ref="statementRef"
            class="text-3xl md:text-4xl lg:text-[2.75rem] font-heading font-semibold text-zinc-900 leading-[1.25] mb-16"
            style="opacity: 0; transform: translateY(30px)"
          >
            I'm a visual storyteller who turns ideas into bold, eye-catching designs — whether it's branding, packaging, or digital visuals.
          </h2>

          <!-- Details in a refined list -->
          <div class="space-y-0">
            <div
              v-for="(detail, index) in details"
              :key="index"
              class="detail-item border-t border-zinc-200 py-6 flex items-start gap-6"
              style="opacity: 0; transform: translateY(15px)"
            >
              <span class="text-xs font-medium text-zinc-300 mt-1.5 flex-shrink-0 tabular-nums">
                {{ String(index + 1).padStart(2, '0') }}
              </span>
              <div>
                <h4 class="text-sm font-semibold uppercase tracking-wider text-zinc-900 mb-1">{{ detail.title }}</h4>
                <p class="text-zinc-500 text-sm leading-relaxed">{{ detail.text }}</p>
              </div>
            </div>
            <!-- Bottom border -->
            <div class="border-t border-zinc-200" />
          </div>

          <!-- CTA -->
          <NuxtLink
            ref="linkRef"
            to="/about"
            class="magnetic-btn inline-flex items-center gap-2 mt-10 text-sm font-medium text-zinc-900 hover:text-zinc-500 transition-colors duration-300 group"
            id="about-learn-more"
            style="opacity: 0"
          >
            More About Me
            <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
        </div>

        <!-- Right: Polaroid Photo -->
        <div ref="photoRef" class="lg:col-span-5 flex items-start justify-center lg:sticky lg:top-32" style="opacity: 0; transform: translateY(40px)">
          <div class="relative w-full max-w-md">
            <div class="rounded-2xl overflow-hidden shadow-2xl shadow-zinc-900/10 transform rotate-[-1.5deg] hover:rotate-0 transition-transform duration-700 ease-out">
              <img
                src="/images/fares-photo.jpg"
                alt="Fares Mohammed"
                class="w-full h-auto object-cover"
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

const { lineDraw, magneticElement } = useAnimations()

const details = [
  {
    title: 'Experience',
    text: '6+ years working between Egypt and Saudi Arabia across food, hospitality, sports, and entertainment.',
  },
  {
    title: 'Craft',
    text: 'Branding, packaging design, and campaign visuals that make brands stand out and connect with people.',
  },
  {
    title: 'Inspiration',
    text: 'Driven by music, fashion, and football — bringing cultural depth and youthful energy to every project.',
  },
]

const leftRef = ref<HTMLElement>()
const labelRef = ref<HTMLElement>()
const lineTopRef = ref<HTMLElement>()
const statementRef = ref<HTMLElement>()
const photoRef = ref<HTMLElement>()
const linkRef = ref<HTMLElement>()

const cleanups: (() => void)[] = []

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  nextTick(() => {
    const sectionEl = document.getElementById('about-preview')

    // Label + line
    if (lineTopRef.value) {
      lineDraw(lineTopRef.value, {
        duration: 0.8,
        scrollTrigger: { trigger: sectionEl, start: 'top 85%', toggleActions: 'play none none none' },
      })
    }
    if (labelRef.value) {
      gsap.to(labelRef.value, {
        opacity: 1,
        duration: 0.6,
        delay: 0.3,
        scrollTrigger: { trigger: sectionEl, start: 'top 85%', toggleActions: 'play none none none' },
      })
    }

    // Statement
    if (statementRef.value) {
      gsap.to(statementRef.value, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: statementRef.value, start: 'top 90%', toggleActions: 'play none none none' },
      })
    }

    // Detail items — staggered
    const detailItems = document.querySelectorAll('.detail-item')
    detailItems.forEach((item, i) => {
      gsap.to(item, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
      })
    })

    // Link
    if (linkRef.value) {
      const linkEl = linkRef.value?.$el ?? linkRef.value
      gsap.to(linkEl, {
        opacity: 1,
        duration: 0.6,
        scrollTrigger: { trigger: linkEl, start: 'top 95%', toggleActions: 'play none none none' },
      })
      const cleanup = magneticElement(linkEl, 0.2)
      if (cleanup) cleanups.push(cleanup)
    }

    // Photo
    if (photoRef.value) {
      gsap.to(photoRef.value, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: photoRef.value, start: 'top 95%', toggleActions: 'play none none none' },
      })
    }
  })
})

onUnmounted(() => {
  cleanups.forEach((fn) => fn())
  ScrollTrigger.getAll().forEach((t) => t.kill())
})
</script>
