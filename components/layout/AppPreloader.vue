<template>
  <Transition name="preloader">
    <div
      v-if="loading"
      ref="preloaderRef"
      class="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-950"
      id="preloader"
    >
      <!-- Background grain texture -->
      <div class="absolute inset-0 opacity-[0.03]" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')" />

      <div class="relative text-center">
        <!-- Monogram -->
        <div ref="monogramRef" class="mb-8">
          <span class="text-6xl md:text-7xl font-heading font-black text-white tracking-tighter">
            FM
          </span>
        </div>

        <!-- Counter -->
        <div ref="counterRef" class="overflow-hidden">
          <span
            ref="counterNumberRef"
            class="block text-sm font-mono text-zinc-500 tracking-widest tabular-nums"
          >
            0%
          </span>
        </div>

        <!-- Progress bar -->
        <div class="mt-6 w-48 h-[1px] bg-zinc-800 mx-auto overflow-hidden">
          <div
            ref="progressRef"
            class="h-full bg-white origin-left"
            style="transform: scaleX(0)"
          />
        </div>
      </div>

      <!-- Curtain overlay -->
      <div
        ref="curtainRef"
        class="absolute inset-0 bg-zinc-950 origin-bottom"
        style="transform: scaleY(0)"
      />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const loading = ref(true)
const preloaderRef = ref<HTMLElement>()
const monogramRef = ref<HTMLElement>()
const counterRef = ref<HTMLElement>()
const counterNumberRef = ref<HTMLElement>()
const progressRef = ref<HTMLElement>()
const curtainRef = ref<HTMLElement>()

const emit = defineEmits<{
  complete: []
}>()

onMounted(() => {
  // Skip preloader if already visited this session
  if (sessionStorage.getItem('preloader-shown')) {
    loading.value = false
    nextTick(() => emit('complete'))
    return
  }

  sessionStorage.setItem('preloader-shown', 'true')

  const tl = gsap.timeline({
    onComplete: () => {
      loading.value = false
      emit('complete')
    },
  })

  // Phase 1: Monogram fades in
  tl.fromTo(
    monogramRef.value,
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }
  )

  // Phase 2: Counter counts up + progress bar fills
  const counter = { val: 0 }
  tl.to(
    counter,
    {
      val: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counterNumberRef.value) {
          counterNumberRef.value.textContent = `${Math.floor(counter.val)}%`
        }
      },
    },
    '-=0.3'
  )
  tl.to(
    progressRef.value,
    {
      scaleX: 1,
      duration: 1.8,
      ease: 'power2.inOut',
    },
    '<'
  )

  // Phase 3: Curtain reveal — slide up
  tl.to(preloaderRef.value, {
    yPercent: -100,
    duration: 0.8,
    ease: 'power4.inOut',
  })
})
</script>

<style scoped>
.preloader-leave-active {
  transition: opacity 0s;
}
.preloader-leave-to {
  opacity: 0;
}
</style>
