<template>
  <section class="section bg-white" id="selected-works">
    <div class="container mx-auto px-6 lg:px-12">
      <!-- Section header -->
      <div class="flex items-end justify-between mb-16">
        <div>
          <span ref="sectionNumRef" class="text-xs font-medium uppercase tracking-[0.3em] text-zinc-400 mb-3 block" style="opacity: 0">(01)</span>
          <h2 ref="sectionTitleRef" class="text-4xl md:text-5xl font-heading font-bold text-zinc-900">
            Selected Work
          </h2>
        </div>
        <NuxtLink
          ref="viewAllRef"
          to="/work"
          class="magnetic-btn hidden md:inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors duration-300 group"
          id="view-all-work"
          style="opacity: 0"
        >
          View All Projects
          <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </NuxtLink>
      </div>

      <!-- Divider line draw -->
      <div ref="dividerRef" class="h-[1px] bg-zinc-200 mb-16" />

      <!-- Projects Grid -->
      <div ref="gridRef" class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <NuxtLink
          v-for="(project, index) in featured"
          :key="project.slug"
          :to="`/work/${project.slug}`"
          class="project-card group relative overflow-hidden rounded-2xl bg-zinc-100"
          :class="[
            index === 0 || index === 3 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/3]',
          ]"
          :data-cursor="'View'"
          :id="`project-${project.slug}`"
          style="clip-path: inset(8% 8% 8% 8%); opacity: 0"
        >
          <!-- Project Image with parallax -->
          <div class="absolute inset-[-15%] overflow-hidden">
            <img
              :src="getProjectImage(project)"
              :alt="project.title"
              class="project-img w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
          </div>

          <!-- Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <!-- Project Info -->
          <div class="absolute bottom-0 left-0 right-0 p-6 md:p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <div class="flex items-end justify-between">
              <div>
                <span class="inline-block text-[10px] uppercase tracking-widest text-white/70 mb-2 px-3 py-1 rounded-full border border-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {{ project.industry }}
                </span>
                <h3 class="text-2xl md:text-3xl font-heading font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                  {{ project.title }}
                </h3>
              </div>
              <div class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Mobile "View All" -->
      <div class="mt-10 text-center md:hidden">
        <NuxtLink
          to="/work"
          class="inline-flex items-center gap-2 text-sm font-medium text-zinc-900 border border-zinc-300 px-6 py-3 rounded-full hover:bg-zinc-900 hover:text-white transition-all duration-500"
        >
          View All Projects
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { splitTextReveal, parallaxImage, lineDraw, magneticElement } = useAnimations()

const { featuredProjects } = useProjects()
const featured = computed(() => featuredProjects.value)
const gridRef = ref<HTMLElement>()
const sectionNumRef = ref<HTMLElement>()
const sectionTitleRef = ref<HTMLElement>()
const viewAllRef = ref<HTMLElement>()
const dividerRef = ref<HTMLElement>()

const cleanups: (() => void)[] = []

function getProjectImage(project: any) {
  return `/projects/cropped/${project.slug}/01.jpg`
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  nextTick(() => {
    // Section number fade in
    if (sectionNumRef.value) {
      gsap.to(sectionNumRef.value, {
        opacity: 1,
        duration: 0.6,
        scrollTrigger: {
          trigger: sectionNumRef.value,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })
    }

    // Section title text reveal
    if (sectionTitleRef.value) {
      splitTextReveal(sectionTitleRef.value, {
        type: 'chars',
        duration: 0.6,
        stagger: 0.02,
        scrollTrigger: {
          trigger: sectionTitleRef.value,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })
    }

    // Divider line draw
    if (dividerRef.value) {
      lineDraw(dividerRef.value, {
        duration: 1.2,
        scrollTrigger: {
          trigger: dividerRef.value,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })
    }

    // View all link
    if (viewAllRef.value) {
      const viewAllEl = viewAllRef.value?.$el ?? viewAllRef.value
      gsap.to(viewAllEl, {
        opacity: 1,
        duration: 0.6,
        delay: 0.4,
        scrollTrigger: {
          trigger: sectionTitleRef.value,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })

      const cleanup = magneticElement(viewAllEl, 0.2)
      if (cleanup) cleanups.push(cleanup)
    }

    // Project cards — each card triggers individually
    const cards = document.querySelectorAll('.project-card')
    cards.forEach((card, i) => {
      gsap.to(card, {
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity: 1,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
      })
    })

    // Parallax on project images
    const projectImgs = document.querySelectorAll('.project-img')
    projectImgs.forEach((img) => {
      parallaxImage(img as HTMLElement, {
        speed: 0.15,
        trigger: img.closest('.project-card') as HTMLElement,
      })
    })
  })
})

onUnmounted(() => {
  cleanups.forEach((fn) => fn())
  ScrollTrigger.getAll().forEach((t) => t.kill())
})
</script>
