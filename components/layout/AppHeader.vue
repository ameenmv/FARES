<template>
  <header
    ref="headerRef"
    class="fixed top-0 left-0 right-0 z-100 transition-all duration-500"
    :class="[
      scrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm border-b border-zinc-100' : 'bg-transparent',
      hidden ? '-translate-y-full' : 'translate-y-0'
    ]"
  >
    <div class="container mx-auto flex items-center justify-between h-20 px-6 lg:px-12">
      <!-- Logo / Name -->
      <NuxtLink to="/" class="group flex items-center gap-3" id="header-logo">
        <span class="text-lg font-heading font-bold tracking-tight text-zinc-900 group-hover:text-zinc-600 transition-colors duration-300">
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
        class="md:hidden flex flex-col gap-1.5 p-2 group"
        @click="mobileOpen = !mobileOpen"
        id="mobile-menu-toggle"
        :aria-label="mobileOpen ? 'Close menu' : 'Open menu'"
      >
        <span
          class="block w-6 h-[2px] bg-zinc-900 transition-all duration-300 origin-center"
          :class="mobileOpen ? 'rotate-45 translate-y-[4px]' : ''"
        />
        <span
          class="block w-6 h-[2px] bg-zinc-900 transition-all duration-300"
          :class="mobileOpen ? 'opacity-0 scale-x-0' : ''"
        />
        <span
          class="block w-6 h-[2px] bg-zinc-900 transition-all duration-300 origin-center"
          :class="mobileOpen ? '-rotate-45 -translate-y-[4px]' : ''"
        />
      </button>
    </div>

    <!-- Mobile Menu -->
    <Transition name="mobile-menu">
      <div
        v-if="mobileOpen"
        class="md:hidden fixed inset-0 top-20 bg-white/95 backdrop-blur-2xl z-50"
        id="mobile-menu"
      >
        <nav class="flex flex-col items-center justify-center h-full gap-10">
          <NuxtLink
            v-for="(link, index) in navLinks"
            :key="link.path"
            :to="link.path"
            class="text-4xl font-heading font-bold text-zinc-900 hover:text-zinc-500 transition-colors duration-300"
            :style="{ transitionDelay: `${index * 50}ms` }"
            @click="mobileOpen = false"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
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

let lastScrollY = 0

const isActive = (path: string) => {
  if (path === '/work') {
    return route.path === '/work' || route.path.startsWith('/work/')
  }
  return route.path === path
}

// Close mobile menu on route change
watch(() => route.path, () => {
  mobileOpen.value = false
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
  })
})
</script>

<style scoped>
.nav-link:hover span {
  width: 100% !important;
}

/* Mobile menu transition */
.mobile-menu-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.mobile-menu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
