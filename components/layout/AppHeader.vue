<template>
  <header
    ref="headerRef"
    class="fixed top-0 left-0 right-0 z-100 transition-all duration-500 border-b"
    :class="[
      scrolled && !mobileOpen ? 'bg-white/80 backdrop-blur-xl shadow-sm border-zinc-100' : !mobileOpen ? 'bg-transparent border-transparent' : 'border-transparent',
      hidden && !mobileOpen ? '-translate-y-full' : 'translate-y-0'
    ]"
  >
    <div class="container mx-auto flex items-center justify-between h-20 px-6 lg:px-12 relative z-[60]">
      <!-- Logo / Name -->
      <NuxtLink
        to="/"
        class="group flex items-center gap-3"
        id="header-logo"
        @click="closeMobileMenu"
      >
        <span
          class="text-lg font-heading font-bold tracking-tight transition-colors duration-300"
          :class="mobileOpen ? 'text-white' : 'text-zinc-900 group-hover:text-zinc-600'"
        >
          Fares Mohammed
        </span>
      </NuxtLink>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center gap-10" id="header-nav">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="nav-link relative text-sm font-medium tracking-wide uppercase text-zinc-500 hover:text-zinc-900 transition-colors duration-300"
          :class="{ 'text-zinc-900': isActive(link.path) }"
          :id="`nav-${link.label.toLowerCase()}`"
        >
          {{ link.label }}
          <span
            class="absolute -bottom-1 left-0 h-[2px] bg-zinc-900 transition-all duration-500 ease-out"
            :class="isActive(link.path) ? 'w-full' : 'w-0'"
          />
        </NuxtLink>
      </nav>

      <!-- Mobile Menu Button -->
      <button
        class="md:hidden flex flex-col gap-1.5 p-2 group relative z-[60]"
        @click="toggleMobile"
        id="mobile-menu-toggle"
        :aria-label="mobileOpen ? 'Close menu' : 'Open menu'"
      >
        <span
          class="block w-6 h-[2px] transition-all duration-300 origin-center"
          :class="[
            mobileOpen ? 'rotate-45 translate-y-[4px] bg-white' : 'bg-zinc-900'
          ]"
        />
        <span
          class="block w-6 h-[2px] transition-all duration-300"
          :class="[
            mobileOpen ? 'opacity-0 scale-x-0 bg-white' : 'bg-zinc-900'
          ]"
        />
        <span
          class="block w-6 h-[2px] transition-all duration-300 origin-center"
          :class="[
            mobileOpen ? '-rotate-45 -translate-y-[4px] bg-white' : 'bg-zinc-900'
          ]"
        />
      </button>
    </div>

    <!-- Mobile Menu — Full Screen Takeover -->
    <Teleport to="body">
      <div
        v-show="mobileOpen"
        ref="mobileMenuRef"
        class="fixed inset-0 z-[55]"
      >
        <!-- Dark overlay -->
        <div
          ref="overlayRef"
          class="absolute inset-0 bg-zinc-950"
          style="opacity: 0"
        />

        <!-- Menu content -->
        <div class="relative h-full flex flex-col justify-between px-6 pt-28 pb-10">
          <!-- Nav links -->
          <nav class="flex flex-col gap-2">
            <div
              v-for="(link, index) in navLinks"
              :key="link.path"
              class="mobile-nav-item overflow-hidden"
              style="opacity: 0; transform: translateY(40px)"
            >
              <NuxtLink
                :to="link.path"
                class="flex items-center justify-between py-4 border-b border-zinc-800 group"
                @click="closeMobileMenu"
              >
                <div class="flex items-center gap-6">
                  <span class="text-xs font-medium text-zinc-600 tabular-nums">0{{ index + 1 }}</span>
                  <span class="text-4xl md:text-5xl font-heading font-bold text-white group-hover:text-zinc-400 transition-colors duration-300">
                    {{ link.label }}
                  </span>
                </div>
                <svg class="w-5 h-5 text-zinc-600 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </NuxtLink>
            </div>
          </nav>

          <!-- Bottom info -->
          <div
            ref="bottomInfoRef"
            class="space-y-6"
            style="opacity: 0; transform: translateY(20px)"
          >
            <div class="flex items-center gap-6">
              <a
                href="https://instagram.com/faresmohammedd"
                target="_blank"
                rel="noopener"
                class="text-sm text-zinc-500 hover:text-white transition-colors duration-300"
              >
                Instagram
              </a>
              <a
                href="https://behance.net/faresmohammed"
                target="_blank"
                rel="noopener"
                class="text-sm text-zinc-500 hover:text-white transition-colors duration-300"
              >
                Behance
              </a>
            </div>
            <p class="text-xs text-zinc-700">
              &copy; {{ new Date().getFullYear() }} Fares Mohammed
            </p>
          </div>
        </div>
      </div>
    </Teleport>
  </header>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const route = useRoute()

const navLinks = [
  { label: 'Work', path: '/work' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

const mobileOpen = ref(false)
const scrolled = ref(false)
const hidden = ref(false)
const headerRef = ref<HTMLElement>()
const mobileMenuRef = ref<HTMLElement>()
const overlayRef = ref<HTMLElement>()
const bottomInfoRef = ref<HTMLElement>()

let lastScrollY = 0

const isActive = (path: string) => {
  if (path === '/work') {
    return route.path === '/work' || route.path.startsWith('/work/')
  }
  return route.path === path
}

function toggleMobile() {
  if (mobileOpen.value) {
    closeMobileMenu()
  } else {
    openMobileMenu()
  }
}

function openMobileMenu() {
  mobileOpen.value = true
  document.body.style.overflow = 'hidden'

  nextTick(() => {
    const tl = gsap.timeline()

    // Overlay fade in
    tl.to(overlayRef.value, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
    })

    // Nav items stagger in
    const items = mobileMenuRef.value?.querySelectorAll('.mobile-nav-item')
    if (items?.length) {
      tl.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
      }, '-=0.2')
    }

    // Bottom info
    if (bottomInfoRef.value) {
      tl.to(bottomInfoRef.value, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power3.out',
      }, '-=0.3')
    }
  })
}

function closeMobileMenu() {
  const tl = gsap.timeline({
    onComplete: () => {
      mobileOpen.value = false
      document.body.style.overflow = ''

      // Reset positions for next open
      nextTick(() => {
        if (overlayRef.value) overlayRef.value.style.opacity = '0'
        const items = mobileMenuRef.value?.querySelectorAll('.mobile-nav-item')
        items?.forEach((item) => {
          ;(item as HTMLElement).style.opacity = '0'
          ;(item as HTMLElement).style.transform = 'translateY(40px)'
        })
        if (bottomInfoRef.value) {
          bottomInfoRef.value.style.opacity = '0'
          bottomInfoRef.value.style.transform = 'translateY(20px)'
        }
      })
    },
  })

  // Fade all out
  const items = mobileMenuRef.value?.querySelectorAll('.mobile-nav-item')
  if (items?.length) {
    tl.to(items, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      stagger: 0.04,
      ease: 'power2.in',
    })
  }

  if (bottomInfoRef.value) {
    tl.to(bottomInfoRef.value, { opacity: 0, duration: 0.2 }, '<')
  }

  tl.to(overlayRef.value, {
    opacity: 0,
    duration: 0.3,
    ease: 'power2.in',
  }, '-=0.1')
}

// Close mobile menu on route change
watch(() => route.path, () => {
  if (mobileOpen.value) closeMobileMenu()
})

onMounted(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY

    scrolled.value = currentScrollY > 50
    hidden.value = currentScrollY > 200 && currentScrollY > lastScrollY
    lastScrollY = currentScrollY
  }

  window.addEventListener('scroll', handleScroll, { passive: true })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    document.body.style.overflow = ''
  })
})
</script>

<style scoped>
.nav-link:hover span {
  width: 100% !important;
}
</style>
