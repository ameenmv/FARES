<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" id="hero">
    <!-- Background subtle pattern -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[length:24px_24px]" />

    <div class="relative container mx-auto px-6 lg:px-12 text-center">
      <!-- Top label -->
      <div class="mb-8 overflow-hidden">
        <p ref="labelRef" class="text-sm md:text-base font-medium uppercase tracking-[0.3em] text-zinc-400 opacity-0">
          Visual Storyteller & Senior Graphic Designer
        </p>
      </div>

      <!-- Main name -->
      <div class="overflow-hidden mb-6">
        <h1
          ref="nameRef"
          class="font-heading font-black text-zinc-900 leading-[0.9] tracking-tighter opacity-0"
          style="font-size: clamp(3.5rem, 12vw, 10rem);"
        >
          Fares
          <br />
          Mohammed
        </h1>
      </div>

      <!-- Tagline -->
      <div class="overflow-hidden mb-12">
        <p ref="taglineRef" class="text-lg md:text-xl text-zinc-500 max-w-lg mx-auto leading-relaxed opacity-0">
          Turning ideas into bold, eye-catching designs for brands across Egypt & Saudi Arabia.
        </p>
      </div>

      <!-- CTA Buttons -->
      <div ref="ctaRef" class="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0">
        <NuxtLink
          to="/work"
          class="group inline-flex items-center gap-3 bg-zinc-900 text-white px-8 py-4 rounded-full font-medium hover:bg-zinc-700 transition-all duration-500"
          id="hero-cta-work"
        >
          View Work
          <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </NuxtLink>
        <NuxtLink
          to="/contact"
          class="inline-flex items-center gap-3 border border-zinc-300 text-zinc-700 px-8 py-4 rounded-full font-medium hover:border-zinc-900 hover:text-zinc-900 transition-all duration-500"
          id="hero-cta-contact"
        >
          Get in Touch
        </NuxtLink>
      </div>

      <!-- Stats -->
      <div ref="statsRef" class="mt-20 flex items-center justify-center gap-12 md:gap-20 opacity-0">
        <div class="text-center">
          <span class="block text-3xl md:text-4xl font-heading font-bold text-zinc-900">6+</span>
          <span class="text-xs uppercase tracking-widest text-zinc-400 mt-1">Years Exp.</span>
        </div>
        <div class="w-px h-12 bg-zinc-200" />
        <div class="text-center">
          <span class="block text-3xl md:text-4xl font-heading font-bold text-zinc-900">21</span>
          <span class="text-xs uppercase tracking-widest text-zinc-400 mt-1">Projects</span>
        </div>
        <div class="w-px h-12 bg-zinc-200" />
        <div class="text-center">
          <span class="block text-3xl md:text-4xl font-heading font-bold text-zinc-900">2</span>
          <span class="text-xs uppercase tracking-widest text-zinc-400 mt-1">Countries</span>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
      <span class="text-[10px] uppercase tracking-widest text-zinc-400">Scroll</span>
      <svg class="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7" />
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const nameRef = ref<HTMLElement>()
const labelRef = ref<HTMLElement>()
const taglineRef = ref<HTMLElement>()
const ctaRef = ref<HTMLElement>()
const statsRef = ref<HTMLElement>()

onMounted(() => {
  // Small delay to ensure fonts are loaded
  setTimeout(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.to(labelRef.value, {
      opacity: 1,
      y: 0,
      duration: 0.8,
    })
    .to(nameRef.value, {
      opacity: 1,
      y: 0,
      duration: 1.2,
    }, '-=0.5')
    .to(taglineRef.value, {
      opacity: 1,
      y: 0,
      duration: 0.8,
    }, '-=0.7')
    .to(ctaRef.value, {
      opacity: 1,
      y: 0,
      duration: 0.6,
    }, '-=0.5')
    .to(statsRef.value, {
      opacity: 1,
      y: 0,
      duration: 0.6,
    }, '-=0.3')
  }, 100)
})
</script>
