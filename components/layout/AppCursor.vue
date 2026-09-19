<template>
  <div v-if="!isTouchDevice">
    <!-- Single cursor element — rendered via canvas-like approach -->
    <div
      ref="cursorEl"
      class="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform"
      :class="{ 'opacity-0': !visible }"
      :style="cursorStyle"
    >
      <!-- Label -->
      <Transition name="fade">
        <span
          v-if="cursorLabel"
          class="absolute inset-0 flex items-center justify-center text-white text-[9px] font-bold uppercase tracking-[0.25em]"
        >
          {{ cursorLabel }}
        </span>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const cursorEl = ref<HTMLElement>()
const visible = ref(false)
const cursorLabel = ref('')
const isTouchDevice = ref(true)

// Current state
let mouseX = 0
let mouseY = 0
let curX = 0
let curY = 0
let velX = 0
let velY = 0

// Size states
const size = ref(10)
const bgColor = ref('rgba(24, 24, 27, 1)')
const isHovering = ref(false)

const cursorStyle = computed(() => ({
  width: `${size.value}px`,
  height: `${size.value}px`,
  backgroundColor: bgColor.value,
  borderRadius: '50%',
  transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease',
}))

onMounted(() => {
  isTouchDevice.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  if (isTouchDevice.value) return

  // Mouse tracking
  document.addEventListener('mousemove', (e: MouseEvent) => {
    mouseX = e.clientX
    mouseY = e.clientY
    if (!visible.value) visible.value = true
  })

  document.addEventListener('mouseenter', () => { visible.value = true })
  document.addEventListener('mouseleave', () => { visible.value = false })

  // Click
  document.addEventListener('mousedown', () => {
    gsap.to(cursorEl.value, { scale: 0.8, duration: 0.1, ease: 'power2.out' })
  })
  document.addEventListener('mouseup', () => {
    gsap.to(cursorEl.value, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
  })

  // Hover detection
  const observer = new MutationObserver(() => bindHovers())
  observer.observe(document.body, { childList: true, subtree: true })
  bindHovers()

  // Animation loop — smooth follow + velocity-based stretch
  gsap.ticker.add(() => {
    if (!cursorEl.value) return

    // Lerp position
    const ease = 0.15
    const prevX = curX
    const prevY = curY
    curX += (mouseX - curX) * ease
    curY += (mouseY - curY) * ease

    // Velocity
    velX = curX - prevX
    velY = curY - prevY
    const speed = Math.sqrt(velX * velX + velY * velY)

    // Apply position
    cursorEl.value.style.left = `${curX}px`
    cursorEl.value.style.top = `${curY}px`

    // Velocity-based stretch (only when not hovering on interactive)
    if (!isHovering.value) {
      const angle = Math.atan2(velY, velX) * (180 / Math.PI)
      const stretch = Math.min(speed * 0.15, 0.6) // max stretch
      const scaleX = 1 + stretch
      const scaleY = 1 - stretch * 0.3

      cursorEl.value.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scale(${scaleX}, ${scaleY})`
    } else {
      // Reset stretch when hovering
      cursorEl.value.style.transform = `translate(-50%, -50%) scale(1)`
    }
  })

  onUnmounted(() => {
    observer.disconnect()
  })
})

function bindHovers() {
  const elements = document.querySelectorAll('a, button, [data-cursor], input, textarea')

  elements.forEach((el) => {
    if ((el as any).__cursorBound) return
    ;(el as any).__cursorBound = true

    el.addEventListener('mouseenter', () => {
      isHovering.value = true
      const label = (el as HTMLElement).dataset.cursor

      if (label) {
        // Labeled state — big dark circle with text
        cursorLabel.value = label
        size.value = 80
        bgColor.value = 'rgba(24, 24, 27, 0.9)'
      } else {
        // Link/button state — slightly bigger, hollow
        size.value = 40
        bgColor.value = 'rgba(24, 24, 27, 0.08)'
      }
    })

    el.addEventListener('mouseleave', () => {
      isHovering.value = false
      cursorLabel.value = ''
      size.value = 10
      bgColor.value = 'rgba(24, 24, 27, 1)'
    })
  })
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
