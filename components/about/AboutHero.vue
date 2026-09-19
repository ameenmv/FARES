<template>
  <section class="container mx-auto px-6 lg:px-12 mb-24">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
      <!-- Left: Intro -->
      <div class="lg:col-span-7" ref="introRef" style="opacity: 0; transform: translateY(30px)">
        <div class="flex items-center gap-4 mb-8">
          <div ref="lineRef" class="h-[1px] w-12 bg-zinc-300" />
          <span class="text-xs font-medium uppercase tracking-[0.3em] text-zinc-400">About</span>
        </div>

        <h1
          ref="titleRef"
          class="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-zinc-900 leading-[1.1] mb-8"
        >
          I'm Fares Mohammed
        </h1>

        <p class="text-xl md:text-2xl text-zinc-500 leading-relaxed max-w-xl font-light">
          A visual storyteller and senior graphic designer with 6+ years of experience creating bold, eye-catching designs across Egypt and Saudi Arabia.
        </p>
      </div>

      <!-- Right: Photo -->
      <div class="lg:col-span-5" ref="photoRef" style="opacity: 0; transform: translateY(40px)">
        <div class="rounded-2xl overflow-hidden shadow-2xl shadow-zinc-900/10 transform rotate-[-1.5deg] hover:rotate-0 transition-transform duration-700 ease-out">
          <img
            src="/images/fares-photo.jpg"
            alt="Fares Mohammed"
            class="w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const { splitTextReveal, lineDraw } = useAnimations()

const introRef = ref<HTMLElement>()
const titleRef = ref<HTMLElement>()
const photoRef = ref<HTMLElement>()
const lineRef = ref<HTMLElement>()

onMounted(() => {
  nextTick(() => {
    if (introRef.value) {
      gsap.to(introRef.value, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
    }
    if (lineRef.value) {
      lineDraw(lineRef.value, { duration: 0.8 })
    }
    if (titleRef.value) {
      splitTextReveal(titleRef.value, { type: 'chars', duration: 0.5, stagger: 0.03, delay: 0.2 })
    }
    if (photoRef.value) {
      gsap.to(photoRef.value, { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' })
    }
  })
})
</script>
