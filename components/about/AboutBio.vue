<template>
  <section class="container mx-auto px-6 lg:px-12 py-24 border-t border-zinc-200">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
      <div class="lg:col-span-4">
        <h2 ref="labelRef" class="text-3xl md:text-4xl font-heading font-semibold text-zinc-900" style="opacity: 0; transform: translateY(20px)">
          What drives me
        </h2>
      </div>
      <div class="lg:col-span-8 space-y-0">
        <div
          v-for="(point, index) in bioPoints"
          :key="index"
          class="bio-item border-t border-zinc-200 py-8 flex items-start gap-6"
          style="opacity: 0; transform: translateY(15px)"
        >
          <span class="text-xs font-medium text-zinc-400 mt-1.5 flex-shrink-0 tabular-nums">
            {{ String(index + 1).padStart(2, '0') }}
          </span>
          <div>
            <h3 class="text-sm font-semibold uppercase tracking-wider text-zinc-900 mb-2">{{ point.title }}</h3>
            <p class="text-zinc-500 leading-relaxed">{{ point.description }}</p>
          </div>
        </div>
        <div class="border-t border-zinc-200" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const bioPoints = [
  {
    title: 'Visual Storyteller',
    description: 'I believe every brand has a story worth telling. Through strategic design and compelling visuals, I help brands communicate their unique narrative to the world.',
  },
  {
    title: 'Bold & Eye-Catching',
    description: 'My design philosophy centers around creating work that demands attention. Bold typography, vibrant colors, and confident compositions are at the heart of everything I create.',
  },
  {
    title: 'Cross-Cultural Experience',
    description: 'With 6+ years working between Egypt and Saudi Arabia, I bring a deep understanding of both markets, blending Arabic heritage with contemporary global design trends.',
  },
  {
    title: 'Music, Fashion & Football',
    description: 'My creative inspiration draws from the worlds of music, fashion, and football — bringing cultural relevance and youthful energy to every project I touch.',
  },
]

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

    const bioItems = document.querySelectorAll('.bio-item')
    bioItems.forEach((item) => {
      gsap.to(item, {
        y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 95%', toggleActions: 'play none none none' },
      })
    })
  })
})
</script>
