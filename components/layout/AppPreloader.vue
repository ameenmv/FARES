<template>
  <Transition name="preloader">
    <div
      v-if="loading"
      ref="preloaderRef"
      class="fixed inset-0 z-[9999] bg-white overflow-hidden"
      id="preloader"
    >
      <!-- Content wrapper -->
      <div class="relative w-full h-full flex flex-col justify-between px-6 lg:px-12 py-8">
        <!-- Top row -->
        <div class="flex items-center justify-between">
          <span
            ref="topLabelRef"
            class="text-xs font-medium uppercase tracking-[0.3em] text-zinc-400"
            style="opacity: 0"
          >
            Portfolio
          </span>
          <span
            ref="yearRef"
            class="text-xs font-mono text-zinc-400 tabular-nums"
            style="opacity: 0"
          >
            2024
          </span>
        </div>

        <!-- Center: Name reveal -->
        <div class="flex-1 flex items-center justify-center">
          <div class="text-center overflow-hidden">
            <h1
              ref="nameRef"
              class="text-zinc-900 leading-[0.85] tracking-[-0.04em]"
              style="font-family: var(--font-display); font-weight: 800; font-size: clamp(2.5rem, 8vw, 10rem); transform: translateY(100%)"
            >
              Fares Mohammed
            </h1>
          </div>
        </div>

        <!-- Bottom: Progress bar + counter -->
        <div class="flex items-end justify-between gap-6">
          <span
            ref="roleRef"
            class="text-xs font-medium uppercase tracking-[0.3em] text-zinc-400"
            style="opacity: 0"
          >
            Senior Graphic Designer
          </span>

          <div class="flex items-center gap-4">
            <!-- Counter -->
            <span
              ref="counterRef"
              class="text-xs font-mono text-zinc-400 tabular-nums"
              style="opacity: 0"
            >
              0
            </span>

            <!-- Progress line -->
            <div class="w-32 md:w-48 h-[1px] bg-zinc-200 overflow-hidden">
              <div
                ref="progressRef"
                class="h-full bg-zinc-900 origin-left"
                style="transform: scaleX(0)"
              />
            </div>
          </div>
        </div>
    </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const loading = ref(true)
const preloaderRef = ref<HTMLElement>()
const nameRef = ref<HTMLElement>()
const topLabelRef = ref<HTMLElement>()
const yearRef = ref<HTMLElement>()
const roleRef = ref<HTMLElement>()
const counterRef = ref<HTMLElement>()
const progressRef = ref<HTMLElement>()

const emit = defineEmits<{
  complete: []
}>()

onMounted(() => {
  // Skip preloader if already visited this session
  // TODO: Uncomment after testing
  // if (sessionStorage.getItem('preloader-shown')) {
  //   loading.value = false
  //   nextTick(() => emit('complete'))
  //   return
  // }

  sessionStorage.setItem('preloader-shown', 'true')

  const tl = gsap.timeline({
    onComplete: () => {
      loading.value = false
      emit('complete')
    },
  })

  // Phase 1: Name slides up from below
  tl.to(nameRef.value, {
    y: 0,
    duration: 0.8,
    ease: 'power4.out',
    delay: 0.3,
  })

  // Phase 2: Labels fade in simultaneously
  tl.to(
    [topLabelRef.value, yearRef.value, roleRef.value, counterRef.value],
    { opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' },
    '-=0.3'
  )

  // Phase 3: Progress bar fills + counter counts
  const counter = { val: 0 }
  tl.to(
    counter,
    {
      val: 100,
      duration: 1.4,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counterRef.value) {
          counterRef.value.textContent = String(Math.floor(counter.val))
        }
      },
    },
    '-=0.1'
  )
  tl.to(
    progressRef.value,
    { scaleX: 1, duration: 1.4, ease: 'power2.inOut' },
    '<'
  )

  // Phase 4: Fade out all content
  tl.to(
    [nameRef.value, topLabelRef.value, yearRef.value, roleRef.value, counterRef.value, progressRef.value?.parentElement],
    { opacity: 0, duration: 0.3, ease: 'power2.in' },
  )

  // Phase 5: Whole preloader slides up cleanly
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
