<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="isOpen"
        ref="overlayRef"
        class="fixed inset-0 z-[10000] flex items-center justify-center"
        @click.self="close"
        @keydown.esc="close"
        @keydown.left="prev"
        @keydown.right="next"
        tabindex="0"
      >
        <!-- Backdrop -->
        <div ref="backdropRef" class="absolute inset-0 bg-zinc-950/95 backdrop-blur-xl" />

        <!-- Header -->
        <div ref="headerRef" class="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-5" style="opacity: 0">
          <!-- Counter -->
          <span class="text-sm font-mono text-zinc-400 tabular-nums">
            {{ String(currentIndex + 1).padStart(2, '0') }}
            <span class="text-zinc-600 mx-1">/</span>
            {{ String(images.length).padStart(2, '0') }}
          </span>

          <!-- Close button -->
          <button
            @click="close"
            class="group w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-500 transition-all duration-300"
            aria-label="Close preview"
            id="lightbox-close"
          >
            <svg class="w-5 h-5 transform group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Navigation arrows -->
        <button
          v-if="images.length > 1"
          @click.stop="prev"
          ref="prevBtnRef"
          class="absolute left-4 md:left-8 z-10 group w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-500 transition-all duration-300"
          aria-label="Previous image"
          id="lightbox-prev"
          style="opacity: 0"
        >
          <svg class="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          v-if="images.length > 1"
          @click.stop="next"
          ref="nextBtnRef"
          class="absolute right-4 md:right-8 z-10 group w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-500 transition-all duration-300"
          aria-label="Next image"
          id="lightbox-next"
          style="opacity: 0"
        >
          <svg class="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Image Container -->
        <div
          ref="imageContainerRef"
          class="relative w-full h-full flex items-center justify-center px-16 md:px-24 py-20"
          @touchstart="onTouchStart"
          @touchend="onTouchEnd"
        >
          <div
            ref="imageWrapperRef"
            class="relative max-w-[90vw] max-h-[85vh] overflow-hidden rounded-xl"
            style="clip-path: inset(50% 50% 50% 50%)"
          >
            <img
              ref="currentImgRef"
              :src="images[currentIndex]"
              :alt="`Image ${currentIndex + 1}`"
              class="max-w-full max-h-[85vh] w-auto h-auto object-contain select-none"
              draggable="false"
            />
          </div>
        </div>

        <!-- Thumbnail strip -->
        <div
          v-if="images.length > 1"
          ref="thumbStripRef"
          class="absolute bottom-0 left-0 right-0 z-10 px-6 pb-5"
          style="opacity: 0"
        >
          <div class="flex items-center justify-center gap-2 overflow-x-auto py-2 scrollbar-hide">
            <button
              v-for="(img, i) in images"
              :key="i"
              @click.stop="goTo(i)"
              class="flex-shrink-0 rounded-lg overflow-hidden transition-all duration-300 border-2"
              :class="[
                i === currentIndex
                  ? 'border-white opacity-100 scale-100'
                  : 'border-transparent opacity-40 scale-90 hover:opacity-70 hover:scale-95'
              ]"
              :aria-label="`View image ${i + 1}`"
            >
              <img
                :src="img"
                :alt="`Thumbnail ${i + 1}`"
                class="w-12 h-12 md:w-14 md:h-14 object-cover"
                loading="lazy"
              />
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const props = defineProps<{
  images: string[]
  modelValue: boolean
  startIndex?: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const currentIndex = ref(props.startIndex || 0)

const overlayRef = ref<HTMLElement>()
const backdropRef = ref<HTMLElement>()
const headerRef = ref<HTMLElement>()
const prevBtnRef = ref<HTMLElement>()
const nextBtnRef = ref<HTMLElement>()
const imageWrapperRef = ref<HTMLElement>()
const currentImgRef = ref<HTMLElement>()
const thumbStripRef = ref<HTMLElement>()
const imageContainerRef = ref<HTMLElement>()

let touchStartX = 0

function onTouchStart(e: TouchEvent) {
  touchStartX = e.changedTouches[0].clientX
}

function onTouchEnd(e: TouchEvent) {
  const diff = e.changedTouches[0].clientX - touchStartX
  if (Math.abs(diff) > 60) {
    if (diff > 0) prev()
    else next()
  }
}

function next() {
  if (props.images.length <= 1) return
  const nextIdx = (currentIndex.value + 1) % props.images.length
  transitionTo(nextIdx, 'next')
}

function prev() {
  if (props.images.length <= 1) return
  const prevIdx = (currentIndex.value - 1 + props.images.length) % props.images.length
  transitionTo(prevIdx, 'prev')
}

function goTo(index: number) {
  if (index === currentIndex.value) return
  transitionTo(index, index > currentIndex.value ? 'next' : 'prev')
}

function transitionTo(index: number, direction: 'next' | 'prev') {
  const tl = gsap.timeline()

  // Slide current image out
  tl.to(imageWrapperRef.value, {
    clipPath: direction === 'next'
      ? 'inset(0% 100% 0% 0%)'
      : 'inset(0% 0% 0% 100%)',
    duration: 0.3,
    ease: 'power3.in',
    onComplete: () => {
      currentIndex.value = index
    },
  })

  // Slide new image in
  tl.fromTo(
    imageWrapperRef.value,
    {
      clipPath: direction === 'next'
        ? 'inset(0% 0% 0% 100%)'
        : 'inset(0% 100% 0% 0%)',
    },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 0.4,
      ease: 'power3.out',
    }
  )
}

function close() {
  const tl = gsap.timeline({
    onComplete: () => {
      isOpen.value = false
    },
  })

  tl.to([headerRef.value, prevBtnRef.value, nextBtnRef.value, thumbStripRef.value], {
    opacity: 0,
    duration: 0.2,
    ease: 'power2.in',
  })

  tl.to(imageWrapperRef.value, {
    clipPath: 'inset(50% 50% 50% 50%)',
    scale: 0.9,
    duration: 0.4,
    ease: 'power3.in',
  }, '-=0.1')

  tl.to(backdropRef.value, {
    opacity: 0,
    duration: 0.3,
    ease: 'power2.in',
  }, '-=0.2')
}

// Open animation
watch(isOpen, (val) => {
  if (val) {
    currentIndex.value = props.startIndex || 0

    nextTick(() => {
      // Focus for keyboard events
      overlayRef.value?.focus()

      // Lock body scroll
      document.body.style.overflow = 'hidden'

      const tl = gsap.timeline()

      // Backdrop fade in
      gsap.fromTo(backdropRef.value, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' })

      // Image reveal from center
      tl.fromTo(
        imageWrapperRef.value,
        { clipPath: 'inset(50% 50% 50% 50%)', scale: 0.9 },
        { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 0.6, ease: 'power4.out', delay: 0.15 }
      )

      // Header, nav, thumbs
      tl.to(
        [headerRef.value, prevBtnRef.value, nextBtnRef.value, thumbStripRef.value],
        { opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power3.out' },
        '-=0.2'
      )
    })
  } else {
    // Restore body scroll
    document.body.style.overflow = ''
  }
})

// Cleanup on unmount
onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
.lightbox-enter-active,
.lightbox-leave-active {
  transition: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
