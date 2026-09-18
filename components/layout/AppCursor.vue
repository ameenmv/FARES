<template>
  <div
    v-if="!isTouchDevice"
    ref="cursorRef"
    class="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
    :class="{ 'opacity-0': !visible }"
  >
    <!-- Outer ring -->
    <div
      ref="cursorOuterRef"
      class="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 w-8 h-8 opacity-60"
    />
    <!-- Inner dot -->
    <div
      ref="cursorInnerRef"
      class="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white w-1.5 h-1.5"
    />
    <!-- Label -->
    <Transition name="cursor-label">
      <span
        v-if="label"
        class="absolute -translate-x-1/2 -translate-y-1/2 text-white text-[10px] font-medium uppercase tracking-widest whitespace-nowrap"
      >
        {{ label }}
      </span>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const cursorRef = ref<HTMLElement>()
const cursorOuterRef = ref<HTMLElement>()
const cursorInnerRef = ref<HTMLElement>()

const visible = ref(false)
const hovering = ref(false)
const clicking = ref(false)
const label = ref('')
const isTouchDevice = ref(true)

let mouseX = 0
let mouseY = 0

onMounted(() => {
  isTouchDevice.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0

  if (isTouchDevice.value) return

  const onMouseMove = (e: MouseEvent) => {
    mouseX = e.clientX
    mouseY = e.clientY
    visible.value = true
  }

  const onMouseDown = () => {
    clicking.value = true
    if (cursorOuterRef.value) {
      gsap.to(cursorOuterRef.value, {
        scale: 0.75,
        duration: 0.15,
        ease: 'power2.out',
      })
    }
  }

  const onMouseUp = () => {
    clicking.value = false
    if (cursorOuterRef.value) {
      gsap.to(cursorOuterRef.value, {
        scale: hovering.value ? 2 : 1,
        duration: 0.4,
        ease: 'elastic.out(1, 0.5)',
      })
    }
  }

  const onMouseEnter = () => { visible.value = true }
  const onMouseLeave = () => { visible.value = false }

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mousedown', onMouseDown)
  document.addEventListener('mouseup', onMouseUp)
  document.addEventListener('mouseenter', onMouseEnter)
  document.addEventListener('mouseleave', onMouseLeave)

  // Detect interactive elements
  const observer = new MutationObserver(() => {
    setupHoverListeners()
  })

  observer.observe(document.body, { childList: true, subtree: true })
  setupHoverListeners()

  // GSAP-powered lerp for cursor (smoother than manual RAF)
  gsap.ticker.add(() => {
    if (cursorRef.value) {
      gsap.to(cursorRef.value, {
        x: mouseX,
        y: mouseY,
        duration: 0.5,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }
  })

  onUnmounted(() => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mousedown', onMouseDown)
    document.removeEventListener('mouseup', onMouseUp)
    document.removeEventListener('mouseenter', onMouseEnter)
    document.removeEventListener('mouseleave', onMouseLeave)
    observer.disconnect()
  })
})

function setupHoverListeners() {
  const interactiveElements = document.querySelectorAll('a, button, [data-cursor]')

  interactiveElements.forEach((el) => {
    // Skip if already has listeners
    if ((el as any).__cursorListenersSet) return
    ;(el as any).__cursorListenersSet = true

    el.addEventListener('mouseenter', () => {
      hovering.value = true
      const cursorLabel = (el as HTMLElement).dataset.cursor
      if (cursorLabel) label.value = cursorLabel

      // Elastic scale up
      if (cursorOuterRef.value) {
        gsap.to(cursorOuterRef.value, {
          scale: 2,
          opacity: 1,
          duration: 0.4,
          ease: 'elastic.out(1, 0.5)',
        })
      }
      if (cursorInnerRef.value) {
        gsap.to(cursorInnerRef.value, {
          scale: 1.3,
          duration: 0.3,
          ease: 'power3.out',
        })
      }
    })

    el.addEventListener('mouseleave', () => {
      hovering.value = false
      label.value = ''

      if (cursorOuterRef.value) {
        gsap.to(cursorOuterRef.value, {
          scale: 1,
          opacity: 0.6,
          duration: 0.5,
          ease: 'elastic.out(1, 0.4)',
        })
      }
      if (cursorInnerRef.value) {
        gsap.to(cursorInnerRef.value, {
          scale: 1,
          duration: 0.3,
          ease: 'power3.out',
        })
      }
    })
  })
}
</script>

<style scoped>
.cursor-label-enter-active,
.cursor-label-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.cursor-label-enter-from,
.cursor-label-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.8);
}
</style>
