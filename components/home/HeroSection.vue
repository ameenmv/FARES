<template>
  <section
    ref="heroRef"
    class="relative min-h-screen flex flex-col justify-end overflow-hidden"
    id="hero"
  >
    <!-- Background subtle grid -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[length:24px_24px]" />

    <div ref="contentRef" class="relative container mx-auto px-6 lg:px-12 pb-12 md:pb-16">
      <!-- (Portfolio) label — top right aligned -->
      <div class="flex justify-end mb-4 md:mb-6 overflow-hidden">
        <p
          ref="labelRef"
          class="text-sm md:text-base font-medium text-zinc-900"
          style="transform: translateY(100%); opacity: 0"
        >
          (Portfolio)
        </p>
      </div>

      <!-- Main name — massive, edge-to-edge -->
      <div class="overflow-hidden">
        <h1
          ref="nameRef"
          class="text-zinc-900 leading-[0.85] tracking-[-0.04em] whitespace-nowrap"
          style="font-family: var(--font-display); font-weight: 800; font-size: clamp(2rem, 8.2vw, 11rem);"
        >
          Fares Mohammed
        </h1>
      </div>

      <!-- Thin divider line -->
      <div ref="lineRef" class="h-[1px] bg-zinc-900 mt-6 md:mt-8" />
    </div>

    <!-- Scroll indicator -->
    <div ref="scrollIndicatorRef" class="absolute bottom-8 right-6 lg:right-12 flex items-center gap-3" style="opacity: 0">
      <span class="text-[10px] uppercase tracking-widest text-zinc-400">Scroll</span>
      <div class="w-5 h-8 rounded-full border border-zinc-300 flex items-start justify-center p-1.5">
        <div ref="scrollDotRef" class="w-1 h-1 rounded-full bg-zinc-400" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { splitTextReveal, lineDraw, scrollFadeOut } = useAnimations()

const heroRef = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()
const labelRef = ref<HTMLElement>()
const nameRef = ref<HTMLElement>()
const lineRef = ref<HTMLElement>()
const scrollIndicatorRef = ref<HTMLElement>()
const scrollDotRef = ref<HTMLElement>()

const preloaderDone = inject<Ref<boolean>>('preloaderDone', ref(true))

function startAnimations() {
  gsap.registerPlugin(ScrollTrigger)

  const masterTl = gsap.timeline({
    defaults: { ease: 'power4.out' },
  })

  // 1. Name — character reveal
  if (nameRef.value) {
    splitTextReveal(nameRef.value, {
      type: 'chars',
      duration: 0.7,
      stagger: 0.03,
    })
  }

  // 2. (Portfolio) label slides up
  masterTl.to(labelRef.value, {
    y: 0,
    opacity: 1,
    duration: 0.6,
  }, '+=0.1')

  // 3. Line draw
  if (lineRef.value) {
    masterTl.add(() => {
      lineDraw(lineRef.value!, { duration: 1 })
    }, '-=0.3')
  }

  // 4. Scroll indicator
  masterTl.to(scrollIndicatorRef.value, {
    opacity: 1,
    duration: 0.6,
  }, '-=0.4')

  // Scroll dot bounce
  if (scrollDotRef.value) {
    gsap.to(scrollDotRef.value, {
      y: 8,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
    })
  }

  // Hero fades on scroll
  if (contentRef.value) {
    scrollFadeOut(contentRef.value, { end: '+=40%', scale: 0.98 })
  }
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  
  if (preloaderDone.value) {
    startAnimations()
  } else {
    watch(preloaderDone, (done) => {
      if (done) startAnimations()
    })
  }
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((t) => t.kill())
})
</script>
