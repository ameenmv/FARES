<template>
  <section class="pt-28 border-t border-zinc-200 overflow-hidden">
    <!-- Header -->
    <div class="container mx-auto px-6 lg:px-12 mb-20">
      <h2 ref="labelRef" class="text-3xl md:text-4xl font-heading font-semibold text-zinc-900" style="opacity: 0; transform: translateY(20px)">
        Industries I've worked in
      </h2>
    </div>

    <!-- Giant text rows -->
    <div class="space-y-0">
      <div
        v-for="(industry, index) in industries"
        :key="industry.name"
        class="industry-row group border-t border-zinc-100 relative overflow-hidden cursor-default"
        style="opacity: 0; transform: translateY(20px)"
        @mouseenter="activeIndex = index"
        @mouseleave="activeIndex = null"
      >
        <!-- Hover background fill -->
        <div
          class="absolute inset-0 bg-zinc-900 transform origin-left transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
          :class="activeIndex === index ? 'scale-x-100' : 'scale-x-0'"
        />

        <!-- Content -->
        <div class="container mx-auto px-6 lg:px-12 relative z-10">
          <div class="flex items-center justify-between py-6 md:py-8">
            <!-- Number -->
            <span
              class="text-sm font-medium tabular-nums mr-6 md:mr-10 transition-colors duration-500 flex-shrink-0"
              :class="activeIndex === index ? 'text-zinc-400' : 'text-zinc-500'"
            >
              ({{ String(index + 1).padStart(2, '0') }})
            </span>

            <!-- Industry name — massive text -->
            <h3
              class="flex-1 font-heading font-bold tracking-[-0.03em] leading-none transition-all duration-500"
              :class="activeIndex === index ? 'text-white' : 'text-zinc-900'"
              :style="{ fontSize: 'clamp(1.5rem, 3.5vw, 3rem)' }"
            >
              <span class="inline-block transition-transform duration-500" :class="activeIndex === index ? 'translate-x-4' : 'translate-x-0'">
                {{ industry.name }}
              </span>
            </h3>

            <!-- Subtle tag -->
            <span
              class="hidden md:inline-block text-xs font-medium uppercase tracking-widest transition-all duration-500 flex-shrink-0"
              :class="activeIndex === index ? 'text-zinc-400 opacity-100 translate-x-0' : 'text-zinc-300 opacity-0 translate-x-4'"
            >
              {{ industry.count }}+ projects
            </span>

            <!-- Arrow -->
            <div
              class="ml-6 w-8 h-8 flex items-center justify-center transition-all duration-500"
              :class="activeIndex === index ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'"
            >
              <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <!-- Final border -->
      <div class="border-t border-zinc-100" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const industries = [
  { name: 'Food & Beverage', count: 6 },
  { name: 'Hospitality', count: 3 },
  { name: 'Entertainment', count: 4 },
  { name: 'Sports', count: 3 },
  { name: 'Tech', count: 2 },
  { name: 'Lifestyle', count: 2 },
  { name: 'Retail', count: 3 },
  { name: 'Cultural Events', count: 2 },
]

const activeIndex = ref<number | null>(null)
const labelRef = ref<HTMLElement>()

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  nextTick(() => {
    if (labelRef.value) {
      gsap.to(labelRef.value, {
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: labelRef.value, start: 'top 90%', toggleActions: 'play none none none' },
      })
    }

    const rows = document.querySelectorAll('.industry-row')
    rows.forEach((row, i) => {
      gsap.to(row, {
        y: 0, opacity: 1, duration: 0.5, delay: i * 0.06, ease: 'power3.out',
        scrollTrigger: { trigger: row, start: 'top 95%', toggleActions: 'play none none none' },
      })
    })
  })
})
</script>

<style scoped>
.industry-row:last-of-type {
  border-bottom: none;
}
</style>
