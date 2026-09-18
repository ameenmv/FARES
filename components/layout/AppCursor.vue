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
      class="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 transition-all duration-300"
      :class="[
        hovering ? 'w-16 h-16 opacity-100' : 'w-8 h-8 opacity-60',
        clicking ? 'scale-75' : 'scale-100'
      ]"
    />
    <!-- Inner dot -->
    <div
      ref="cursorInnerRef"
      class="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-all duration-200"
      :class="[
        hovering ? 'w-2 h-2' : 'w-1.5 h-1.5'
      ]"
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
let currentX = 0
let currentY = 0

onMounted(() => {
  isTouchDevice.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0

  if (isTouchDevice.value) return

  const onMouseMove = (e: MouseEvent) => {
    mouseX = e.clientX
    mouseY = e.clientY
    visible.value = true
  }

  const onMouseDown = () => { clicking.value = true }
  const onMouseUp = () => { clicking.value = false }

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

  // Animation loop with lerp
  const animate = () => {
    const ease = 0.15
    currentX += (mouseX - currentX) * ease
    currentY += (mouseY - currentY) * ease

    if (cursorRef.value) {
      cursorRef.value.style.transform = `translate(${currentX}px, ${currentY}px)`
    }

    requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)

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
    el.addEventListener('mouseenter', () => {
      hovering.value = true
      const cursorLabel = (el as HTMLElement).dataset.cursor
      if (cursorLabel) label.value = cursorLabel
    })
    el.addEventListener('mouseleave', () => {
      hovering.value = false
      label.value = ''
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
