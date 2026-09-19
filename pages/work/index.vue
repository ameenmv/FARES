<template>
  <div class="pt-28">
    <!-- Page Header -->
    <section class="container mx-auto px-6 lg:px-12 mb-16">
      <div class="flex items-center gap-4 mb-8">
        <div ref="lineRef" class="h-[1px] w-12 bg-zinc-300" />
        <span ref="labelRef" class="text-xs font-medium uppercase tracking-[0.3em] text-zinc-400" style="opacity: 0">Portfolio</span>
      </div>

      <h1
        ref="titleRef"
        class="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-zinc-900 leading-[0.9] tracking-[-0.03em] mb-6"
        style="visibility: hidden"
      >
        Work
      </h1>

      <p ref="subtitleRef" class="text-lg text-zinc-500 max-w-xl" style="opacity: 0; transform: translateY(15px)">
        A selection of branding, packaging, and campaign projects crafted over 6+ years.
      </p>

      <!-- Category Filter -->
      <div ref="filterRef" class="flex items-center gap-3 mt-12 border-t border-zinc-200 pt-8" id="category-filter" style="opacity: 0">
        <button
          v-for="filter in filters"
          :key="filter.value"
          @click="activeFilter = filter.value"
          class="relative text-sm font-medium transition-all duration-300"
          :class="[
            activeFilter === filter.value
              ? 'text-zinc-900'
              : 'text-zinc-400 hover:text-zinc-600'
          ]"
          :id="`filter-${filter.value}`"
        >
          {{ filter.label }}
          <span class="ml-1 text-xs opacity-50">{{ filter.count }}</span>
          <!-- Active indicator -->
          <div
            v-if="activeFilter === filter.value"
            class="absolute -bottom-2 left-0 right-0 h-[1px] bg-zinc-900"
          />
        </button>
      </div>
    </section>

    <!-- Projects Grid -->
    <section class="container mx-auto px-6 lg:px-12 pb-32">
      <div ref="gridRef" class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8" id="projects-grid">
        <NuxtLink
          v-for="(project, index) in filteredProjects"
          :key="project.slug"
          :to="`/work/${project.slug}`"
          class="project-item group relative overflow-hidden rounded-2xl bg-zinc-100"
          :class="[
            (index % 5 === 0) ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/3]',
          ]"
          :data-cursor="'View'"
          :id="`work-project-${project.slug}`"
          style="clip-path: inset(6% 6% 6% 6%); opacity: 0"
        >
          <!-- Image -->
          <div class="absolute inset-0 overflow-hidden">
            <img
              :src="getProjectImage(project)"
              :alt="project.title"
              class="project-img w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
          </div>

          <!-- Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <!-- Info -->
          <div class="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div class="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <span class="text-[10px] uppercase tracking-widest text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 block mb-2">
                {{ project.category }}
              </span>
              <h3 class="text-2xl md:text-3xl font-heading font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                {{ project.title }}
              </h3>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { splitTextReveal, lineDraw } = useAnimations()

useSeoMeta({
  title: 'Work — Fares Mohammed',
  ogTitle: 'Work — Fares Mohammed',
  description: 'Explore the portfolio of Fares Mohammed — branding, packaging, campaign design, and visual identity projects for leading brands.',
  ogDescription: 'Branding, packaging, and campaign design portfolio.',
  ogImage: 'https://faresmohammed.com/og-image.jpg',
  twitterCard: 'summary_large_image',
})

const { allProjects, brandingProjects, campaignProjects } = useProjects()

const activeFilter = ref('all')
const lineRef = ref<HTMLElement>()
const labelRef = ref<HTMLElement>()
const titleRef = ref<HTMLElement>()
const subtitleRef = ref<HTMLElement>()
const filterRef = ref<HTMLElement>()
const gridRef = ref<HTMLElement>()

const filters = computed(() => [
  { label: 'All', value: 'all', count: allProjects.value.length },
  { label: 'Branding', value: 'branding', count: brandingProjects.value.length },
  { label: 'Campaigns', value: 'campaigns', count: campaignProjects.value.length },
])

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return allProjects.value
  return allProjects.value.filter((p) => p.category === activeFilter.value)
})

function getProjectImage(project: any) {
  return `/projects/cropped/${project.slug}/01.jpg`
}

// Animate on filter change
watch(activeFilter, () => {
  nextTick(() => {
    const items = document.querySelectorAll('.project-item')
    gsap.fromTo(
      items,
      { clipPath: 'inset(6% 6% 6% 6%)', opacity: 0, y: 30 },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
      }
    )
  })
})

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  nextTick(() => {
    // Line draw
    if (lineRef.value) {
      lineDraw(lineRef.value, { duration: 0.8 })
    }

    // Label
    if (labelRef.value) {
      gsap.to(labelRef.value, { opacity: 1, duration: 0.6, ease: 'power3.out' })
    }

    // Title text split
    if (titleRef.value) {
      splitTextReveal(titleRef.value, {
        type: 'chars',
        duration: 0.6,
        stagger: 0.04,
      })
    }

    // Subtitle
    if (subtitleRef.value) {
      gsap.to(subtitleRef.value, { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power3.out' })
    }

    // Filter
    if (filterRef.value) {
      gsap.to(filterRef.value, { opacity: 1, duration: 0.6, delay: 0.5, ease: 'power3.out' })
    }

    // Grid items — stagger initial visible ones, ScrollTrigger the rest
    const items = document.querySelectorAll('.project-item')
    const viewportH = window.innerHeight

    items.forEach((item, i) => {
      const rect = item.getBoundingClientRect()
      
      if (rect.top < viewportH) {
        // Already in viewport — animate immediately with stagger
        gsap.to(item, {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 1,
          delay: 0.6 + i * 0.12,
          ease: 'power4.out',
        })
      } else {
        // Below fold — use ScrollTrigger
        gsap.to(item, {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        })
      }
    })
  })
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((t) => t.kill())
})
</script>
