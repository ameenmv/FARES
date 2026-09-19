<template>
  <footer class="relative bg-zinc-950 text-white overflow-hidden" id="footer">
    <!-- Decorative gradient -->
    <div class="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 opacity-50" />

    <div class="relative container mx-auto px-6 lg:px-12">
      <!-- CTA Section -->
      <div class="pt-32 pb-20 border-b border-zinc-800">
        <div>
          <p ref="subtitleRef" class="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-6" style="opacity: 0">
            Have a project in mind?
          </p>
          <h2 ref="headingRef" class="text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-none tracking-tight mb-10">
            Let's Work
            <br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-600 animate-gradient">Together</span>
          </h2>
          <NuxtLink
            ref="ctaBtnRef"
            to="/contact"
            class="magnetic-btn inline-flex items-center gap-3 text-lg font-medium text-white border border-zinc-700 rounded-full px-8 py-4 hover:bg-white hover:text-zinc-900 transition-all duration-500 group"
            id="footer-cta"
            style="opacity: 0; transform: translateY(15px)"
          >
            Get in Touch
            <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
        </div>
      </div>

      <!-- Footer Info -->
      <div ref="footerInfoRef" class="py-12 grid grid-cols-1 md:grid-cols-3 gap-10" style="opacity: 0">
        <!-- Contact -->
        <div>
          <h4 class="text-sm font-medium uppercase tracking-widest text-zinc-500 mb-4">Contact</h4>
          <div class="space-y-2">
            <a href="https://instagram.com/faresmohammedd" target="_blank" rel="noopener" class="block text-zinc-300 hover:text-white transition-colors duration-300 link-underline">
              @faresmohammedd
            </a>
            <a href="tel:+201016072716" class="block text-zinc-300 hover:text-white transition-colors duration-300 link-underline">
              +20 1016072716
            </a>
          </div>
        </div>

        <!-- Navigation -->
        <div>
          <h4 class="text-sm font-medium uppercase tracking-widest text-zinc-500 mb-4">Navigation</h4>
          <div class="space-y-2">
            <NuxtLink v-for="link in footerLinks" :key="link.path" :to="link.path" class="block text-zinc-300 hover:text-white transition-colors duration-300 link-underline">
              {{ link.label }}
            </NuxtLink>
          </div>
        </div>

        <!-- Info -->
        <div>
          <h4 class="text-sm font-medium uppercase tracking-widest text-zinc-500 mb-4">Info</h4>
          <p class="text-zinc-400 text-sm leading-relaxed">
            Visual Storyteller &amp; Senior Graphic Designer with 6+ years of experience in branding, packaging, and campaign design across Egypt and Saudi Arabia.
          </p>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="py-6 border-t border-zinc-800 flex items-center justify-center">
        <p class="text-zinc-600 text-sm text-center">
          &copy; {{ new Date().getFullYear() }} Fares Mohammed. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { splitTextReveal, magneticElement } = useAnimations()

const footerLinks = [
  { label: 'Work', path: '/work' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

const subtitleRef = ref<HTMLElement>()
const headingRef = ref<HTMLElement>()
const ctaBtnRef = ref<HTMLElement>()
const footerInfoRef = ref<HTMLElement>()

const cleanups: (() => void)[] = []
let footerTriggers: ScrollTrigger[] = []

function resetFooter() {
  // Kill old triggers
  footerTriggers.forEach((t) => t.kill())
  footerTriggers = []

  // Reset all element states
  const resetEl = (el: HTMLElement | undefined, transform = false) => {
    if (!el) return
    const target = (el as any)?.$el ?? el
    target.style.opacity = '0'
    if (transform) target.style.transform = 'translateY(15px)'
  }
  resetEl(subtitleRef.value)
  resetEl(footerInfoRef.value)
  if (ctaBtnRef.value) {
    const btn = (ctaBtnRef.value as any)?.$el ?? ctaBtnRef.value
    if (btn) {
      btn.style.opacity = '0'
      btn.style.transform = 'translateY(15px)'
    }
  }

  // Reset heading innerHTML (splitTextReveal modifies it)
  if (headingRef.value) {
    headingRef.value.innerHTML = `Let's Work<br /><span class="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-600 animate-gradient">Together</span>`
  }
}

function initFooterAnimations() {
  nextTick(() => {
    // Subtitle
    if (subtitleRef.value) {
      const st = ScrollTrigger.create({
        trigger: subtitleRef.value,
        start: 'top 98%',
        onEnter: () => gsap.to(subtitleRef.value!, { opacity: 1, duration: 0.6 }),
      })
      footerTriggers.push(st)
    }

    // Heading text reveal
    if (headingRef.value) {
      const st = ScrollTrigger.create({
        trigger: headingRef.value,
        start: 'top 98%',
        onEnter: () => {
          splitTextReveal(headingRef.value!, {
            type: 'words',
            duration: 0.8,
            stagger: 0.05,
            from: { y: '100%', opacity: 0 },
            to: { y: '0%', opacity: 1 },
          })
        },
      })
      footerTriggers.push(st)
    }

    // CTA button
    if (ctaBtnRef.value) {
      const ctaBtnEl = (ctaBtnRef.value as any)?.$el ?? ctaBtnRef.value
      const st = ScrollTrigger.create({
        trigger: ctaBtnEl,
        start: 'top 98%',
        onEnter: () => gsap.to(ctaBtnEl, { opacity: 1, y: 0, duration: 0.8 }),
      })
      footerTriggers.push(st)
    }

    // Footer info
    if (footerInfoRef.value) {
      const st = ScrollTrigger.create({
        trigger: footerInfoRef.value,
        start: 'top 98%',
        onEnter: () => gsap.to(footerInfoRef.value!, { opacity: 1, duration: 0.8 }),
      })
      footerTriggers.push(st)
    }

    // Fallback — 2s
    setTimeout(() => {
      const forceVisible = (el: HTMLElement | undefined) => {
        if (!el) return
        const target = (el as any)?.$el ?? el
        if (parseFloat(getComputedStyle(target).opacity) < 0.1) {
          target.style.opacity = '1'
          target.style.transform = 'none'
          target.style.transition = 'opacity 0.5s ease'
        }
      }
      forceVisible(subtitleRef.value)
      forceVisible(headingRef.value)
      forceVisible(footerInfoRef.value)
      if (ctaBtnRef.value) forceVisible((ctaBtnRef.value as any)?.$el ?? ctaBtnRef.value)
    }, 2000)
  })
}

const route = useRoute()

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  initFooterAnimations()

  // Magnetic button
  if (ctaBtnRef.value) {
    const ctaBtnEl = (ctaBtnRef.value as any)?.$el ?? ctaBtnRef.value
    const cleanup = magneticElement(ctaBtnEl, 0.3)
    if (cleanup) cleanups.push(cleanup)
  }
})

// Re-init on every route change
watch(() => route.fullPath, () => {
  resetFooter()
  // Wait for page transition to finish
  setTimeout(() => {
    ScrollTrigger.refresh()
    initFooterAnimations()
  }, 800)
})

onUnmounted(() => {
  cleanups.forEach((fn) => fn())
  footerTriggers.forEach((t) => t.kill())
})
</script>

<style scoped>
@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.animate-gradient {
  background-size: 200% auto;
  animation: gradientShift 4s ease infinite;
}
</style>
