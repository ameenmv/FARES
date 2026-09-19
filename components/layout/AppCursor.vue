<template>
  <div
    v-if="!isTouchDevice"
    ref="cursorRef"
    class="fixed top-0 left-0 pointer-events-none z-[9999]"
    :class="{ 'opacity-0': !visible }"
  >
    <!-- Outer circle — grows on hover -->
    <div
      ref="outerRef"
      class="absolute -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"
      :style="outerStyle"
    />

    <!-- Inner dot — always centered -->
    <div
      ref="innerRef"
      class="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-900 will-change-transform"
      :style="innerStyle"
    />

    <!-- Label text -->
    <Transition name="label">
      <span
        v-if="label"
        class="absolute -translate-x-1/2 -translate-y-1/2 text-[10px] font-semibold uppercase tracking-[0.2em] whitespace-nowrap"
        :class="labelDark ? 'text-zinc-900' : 'text-white'"
      >
        {{ label }}
      </span>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const cursorRef = ref<HTMLElement>()
const outerRef = ref<HTMLElement>()
const innerRef = ref<HTMLElement>()

const visible = ref(false)
const hovering = ref(false)
const label = ref('')
const labelDark = ref(false)
const isTouchDevice = ref(true)

// Sizes
const DOT_SIZE = 8
const RING_SIZE = 36
const HOVER_SIZE = 80
const CLICK_SCALE = 0.85

let mouseX = 0
let mouseY = 0

const outerStyle = computed(() => ({
  width: `${RING_SIZE}px`,
  height: `${RING_SIZE}px`,
  border: '1.5px solid rgba(24, 24, 27, 0.25)',
  backgroundColor: 'transparent',
}))

const innerStyle = computed(() => ({
  width: `${DOT_SIZE}px`,
  height: `${DOT_SIZE}px`,
}))

onMounted(() => {
  isTouchDevice.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  if (isTouchDevice.value) return

  // Event handlers
  const onMouseMove = (e: MouseEvent) => {
    mouseX = e.clientX
    mouseY = e.clientY
    if (!visible.value) visible.value = true
  }

  const onMouseDown = () => {
    if (outerRef.value) {
      gsap.to(outerRef.value, { scale: CLICK_SCALE, duration: 0.1, ease: 'power2.out' })
    }
    if (innerRef.value) {
      gsap.to(innerRef.value, { scale: 0.5, duration: 0.1, ease: 'power2.out' })
    }
  }

  const onMouseUp = () => {
    if (outerRef.value) {
      gsap.to(outerRef.value, {
        scale: hovering.value ? 1 : 1,
        duration: 0.4,
        ease: 'elastic.out(1, 0.4)',
      })
    }
    if (innerRef.value) {
      gsap.to(innerRef.value, {
        scale: hovering.value ? 0 : 1,
        duration: 0.3,
        ease: 'power3.out',
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

  // Hover detection
  const observer = new MutationObserver(() => setupHoverListeners())
  observer.observe(document.body, { childList: true, subtree: true })
  setupHoverListeners()

  // Smooth cursor follow with different speeds for inner/outer
  gsap.ticker.add(() => {
    if (!cursorRef.value) return

    // Outer ring — smooth, laggy follow
    if (outerRef.value) {
      gsap.to(outerRef.value, {
        x: mouseX,
        y: mouseY,
        duration: 0.6,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    // Inner dot — snappy follow
    if (innerRef.value) {
      gsap.to(innerRef.value, {
        x: mouseX,
        y: mouseY,
        duration: 0.15,
        ease: 'power2.out',
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
  const interactiveElements = document.querySelectorAll('a, button, [data-cursor], input, textarea')

  interactiveElements.forEach((el) => {
    if ((el as any).__cursorBound) return
    ;(el as any).__cursorBound = true

    el.addEventListener('mouseenter', () => {
      hovering.value = true
      const cursorLabel = (el as HTMLElement).dataset.cursor
      const isDark = (el as HTMLElement).dataset.cursorDark !== undefined

      if (cursorLabel) {
        label.value = cursorLabel
        labelDark.value = isDark
      }

      if (outerRef.value) {
        gsap.to(outerRef.value, {
          width: cursorLabel ? HOVER_SIZE : 50,
          height: cursorLabel ? HOVER_SIZE : 50,
          borderColor: cursorLabel ? 'rgba(24, 24, 27, 0.9)' : 'rgba(24, 24, 27, 0.15)',
          backgroundColor: cursorLabel ? 'rgba(24, 24, 27, 0.9)' : 'transparent',
          duration: 0.4,
          ease: 'power3.out',
        })
      }

      if (innerRef.value) {
        gsap.to(innerRef.value, {
          scale: cursorLabel ? 0 : 0,
          duration: 0.2,
          ease: 'power2.out',
        })
      }
    })

    el.addEventListener('mouseleave', () => {
      hovering.value = false
      label.value = ''

      if (outerRef.value) {
        gsap.to(outerRef.value, {
          width: RING_SIZE,
          height: RING_SIZE,
          borderColor: 'rgba(24, 24, 27, 0.25)',
          backgroundColor: 'transparent',
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        })
      }

      if (innerRef.value) {
        gsap.to(innerRef.value, {
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
.label-enter-active,
.label-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.label-enter-from,
.label-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.7);
}
</style>
