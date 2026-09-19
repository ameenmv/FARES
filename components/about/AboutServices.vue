<template>
  <section class="container mx-auto px-6 lg:px-12 py-24 border-t border-zinc-200">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-16">
      <div class="lg:col-span-4">
        <h2 ref="labelRef" class="text-3xl md:text-4xl font-heading font-semibold text-zinc-900" style="opacity: 0; transform: translateY(20px)">
          What I do
        </h2>
      </div>
      <div class="lg:col-span-8">
        <p ref="descRef" class="text-lg text-zinc-500 leading-relaxed" style="opacity: 0">
          Specialized in three core disciplines that help brands stand out and connect with their audiences.
        </p>
      </div>
    </div>

    <div class="space-y-0">
      <div
        v-for="(service, index) in services"
        :key="index"
        class="service-row border-t border-zinc-200 group cursor-pointer"
        style="opacity: 0; transform: translateY(15px)"
        @click="toggleService(index)"
        @mouseenter="hoverService = index"
        @mouseleave="hoverService = null"
      >
        <!-- Main row -->
        <div class="py-8 md:py-10 flex items-center gap-6 md:gap-10">
          <!-- Number -->
          <span
            class="text-sm font-medium tabular-nums transition-colors duration-500 flex-shrink-0"
            :class="activeService === index ? 'text-zinc-900' : 'text-zinc-300'"
          >
            {{ String(index + 1).padStart(2, '0') }}
          </span>

          <!-- Title -->
          <h3
            class="text-2xl md:text-4xl lg:text-5xl font-heading font-bold tracking-[-0.02em] transition-all duration-500 flex-1"
            :class="[
              activeService === index ? 'text-zinc-900' : 'text-zinc-400',
              hoverService === index && activeService !== index ? 'text-zinc-600' : ''
            ]"
          >
            {{ service.title }}
          </h3>

          <!-- Toggle icon -->
          <div
            class="w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-500"
            :class="activeService === index ? 'border-zinc-900 bg-zinc-900' : 'border-zinc-200 group-hover:border-zinc-400'"
          >
            <svg
              class="w-4 h-4 md:w-5 md:h-5 transition-all duration-500"
              :class="activeService === index ? 'text-white rotate-45' : 'text-zinc-400'"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
        </div>

        <!-- Expandable content -->
        <div
          :ref="(el) => { if (el) contentRefs[index] = el as HTMLElement }"
          class="overflow-hidden"
          style="height: 0px"
        >
          <div class="pb-10 md:pb-14 pl-10 md:pl-20 pr-16 md:pr-24">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div class="md:col-span-7">
                <p class="text-lg md:text-xl text-zinc-500 leading-relaxed font-light">
                  {{ service.description }}
                </p>
              </div>
              <div class="md:col-span-5">
                <h4 class="text-xs uppercase tracking-widest text-zinc-400 mb-4">Includes</h4>
                <ul class="space-y-2">
                  <li
                    v-for="item in service.includes"
                    :key="item"
                    class="text-sm text-zinc-600 flex items-center gap-3"
                  >
                    <span class="w-1 h-1 rounded-full bg-zinc-400 flex-shrink-0" />
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="border-t border-zinc-200" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const services = [
  {
    title: 'Brand Identity',
    description: 'Complete visual identity systems that define how your brand looks, feels, and communicates. From concept to final guidelines, every element is crafted to tell your story.',
    includes: ['Logo Design', 'Typography Systems', 'Color Palettes', 'Brand Guidelines', 'Visual Language', 'Stationery Design'],
  },
  {
    title: 'Packaging Design',
    description: 'Eye-catching packaging solutions that stand out on shelves and create memorable unboxing experiences. Design that transforms products into brand experiences.',
    includes: ['Product Packaging', 'Label Design', 'Box & Bag Design', 'Mockup Presentations', 'Print-Ready Files', 'Material Consultation'],
  },
  {
    title: 'Campaign Design',
    description: 'Visual campaigns for social media, print, and digital platforms that engage audiences and drive meaningful brand connections across all touchpoints.',
    includes: ['Social Media Assets', 'Print Campaigns', 'Digital Advertising', 'Event Collateral', 'Motion Graphics', 'Content Strategy'],
  },
]

const activeService = ref(0)
const hoverService = ref<number | null>(null)
const contentRefs = ref<HTMLElement[]>([])
const labelRef = ref<HTMLElement>()
const descRef = ref<HTMLElement>()

function toggleService(index: number) {
  const prev = activeService.value
  const next = activeService.value === index ? -1 : index

  // Close previous
  if (prev >= 0 && contentRefs.value[prev]) {
    gsap.to(contentRefs.value[prev], {
      height: 0,
      duration: 0.5,
      ease: 'power3.inOut',
    })
  }

  // Open next
  if (next >= 0 && contentRefs.value[next]) {
    // First set to auto to measure
    gsap.set(contentRefs.value[next], { height: 'auto' })
    const targetHeight = contentRefs.value[next].offsetHeight
    gsap.set(contentRefs.value[next], { height: 0 })

    gsap.to(contentRefs.value[next], {
      height: targetHeight,
      duration: 0.6,
      ease: 'power3.inOut',
    })
  }

  activeService.value = next
}

// Open the first one on mount with animation
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  nextTick(() => {
    if (labelRef.value) {
      gsap.to(labelRef.value, {
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: labelRef.value, start: 'top 90%', toggleActions: 'play none none none' },
      })
    }

    if (descRef.value) {
      gsap.to(descRef.value, {
        opacity: 1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: descRef.value, start: 'top 90%', toggleActions: 'play none none none' },
      })
    }

    const serviceRows = document.querySelectorAll('.service-row')
    serviceRows.forEach((item, i) => {
      gsap.to(item, {
        y: 0, opacity: 1, duration: 0.6, delay: i * 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 95%', toggleActions: 'play none none none' },
      })
    })

    // Open first service smoothly after rows animate in
    setTimeout(() => {
      if (contentRefs.value[0]) {
        gsap.set(contentRefs.value[0], { height: 'auto' })
        const h = contentRefs.value[0].offsetHeight
        gsap.set(contentRefs.value[0], { height: 0 })
        gsap.to(contentRefs.value[0], { height: h, duration: 0.6, ease: 'power3.out' })
      }
    }, 800)
  })
})
</script>
