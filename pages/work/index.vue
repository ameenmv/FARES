<template>
  <div class="pt-28">
    <!-- Page Header -->
    <section class="container mx-auto px-6 lg:px-12 mb-16">
      <div ref="headerRef">
        <span ref="labelRef" class="text-xs font-medium uppercase tracking-[0.3em] text-zinc-400 mb-3 block" style="opacity: 0">Portfolio</span>
        <h1 ref="titleRef" class="text-5xl md:text-7xl font-heading font-bold text-zinc-900 mb-4">
          Work
        </h1>
        <p ref="subtitleRef" class="text-lg text-zinc-500 max-w-xl" style="opacity: 0; transform: translateY(15px)">
          A selection of branding, packaging, and campaign projects crafted over 6+ years.
        </p>
      </div>

      <!-- Category Filter -->
      <div ref="filterRef" class="flex items-center gap-2 mt-10" id="category-filter" style="opacity: 0">
        <button
          v-for="filter in filters"
          :key="filter.value"
          @click="activeFilter = filter.value"
          class="relative px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300"
          :class="[
            activeFilter === filter.value
              ? 'bg-zinc-900 text-white'
              : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-700'
          ]"
          :id="`filter-${filter.value}`"
        >
          {{ filter.label }}
          <span class="ml-1.5 text-xs opacity-60">{{ filter.count }}</span>
        </button>
      </div>
    </section>

    <!-- Divider -->
    <div class="container mx-auto px-6 lg:px-12">
      <div ref="dividerRef" class="h-[1px] bg-zinc-200 mb-12" />
    </div>

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
          <!-- Image with parallax -->
          <div class="absolute inset-[-12%] overflow-hidden">
            <img
              :src="getProjectImage(project)"
              :alt="project.title"
              class="project-img w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
          </div>

          <!-- Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <!-- Info -->
          <div class="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div class="flex items-end justify-between translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <div>
                <div class="flex items-center gap-3 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span class="text-[10px] uppercase tracking-widest text-white/70 px-3 py-1 rounded-full border border-white/20 backdrop-blur-sm">
                    {{ project.category }}
                  </span>
                  <span class="text-[10px] uppercase tracking-widest text-white/60">
                    {{ project.industry }}
                  </span>
                </div>
                <h3 class="text-2xl md:text-3xl font-heading font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                  {{ project.title }}
                </h3>
              </div>
              <div class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 flex-shrink-0">
                <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
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

const { splitTextReveal, parallaxImage, lineDraw } = useAnimations()

useHead({
  title: 'Work',
})

const { allProjects, brandingProjects, campaignProjects } = useProjects()

const activeFilter = ref('all')
const headerRef = ref<HTMLElement>()
const labelRef = ref<HTMLElement>()
const titleRef = ref<HTMLElement>()
const subtitleRef = ref<HTMLElement>()
const filterRef = ref<HTMLElement>()
const dividerRef = ref<HTMLElement>()
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

    // Divider
    if (dividerRef.value) {
      lineDraw(dividerRef.value, { duration: 1 })
    }

    // Grid items — staggered clip reveal
    const items = document.querySelectorAll('.project-item')
    if (items.length) {
      gsap.to(items, {
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: gridRef.value,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })
    }

    // Parallax images
    const projectImgs = document.querySelectorAll('.project-img')
    projectImgs.forEach((img) => {
      parallaxImage(img as HTMLElement, {
        speed: 0.12,
        trigger: img.closest('.project-item') as HTMLElement,
      })
    })
  })
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((t) => t.kill())
})
</script>
