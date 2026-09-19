<template>
  <section class="container mx-auto px-6 lg:px-12 py-24 border-t border-zinc-200">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
      <div class="lg:col-span-4">
        <h2 ref="labelRef" class="text-3xl md:text-4xl font-heading font-semibold text-zinc-900" style="opacity: 0; transform: translateY(20px)">
          Industries
        </h2>
      </div>
      <div class="lg:col-span-8">
        <div class="flex flex-wrap gap-3">
          <span
            v-for="industry in industries"
            :key="industry"
            class="industry-tag px-5 py-2.5 rounded-full border border-zinc-200 text-sm font-medium text-zinc-600 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all duration-300 cursor-default"
            style="opacity: 0; transform: translateY(10px)"
          >
            {{ industry }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const industries = [
  'Food & Beverage',
  'Hospitality',
  'Entertainment',
  'Sports',
  'Tech',
  'Lifestyle',
  'Retail',
  'Cultural Events',
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

    const industryTags = document.querySelectorAll('.industry-tag')
    industryTags.forEach((tag) => {
      gsap.to(tag, {
        y: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: tag, start: 'top 95%', toggleActions: 'play none none none' },
      })
    })
  })
})
</script>
