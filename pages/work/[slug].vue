<template>
  <div v-if="project" class="pt-20">
    <!-- Hero Image -->
    <section class="relative overflow-hidden" id="case-study-hero">
      <div class="container mx-auto px-6 lg:px-12 pt-12 pb-8">
        <!-- Back button -->
        <NuxtLink
          to="/work"
          class="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-zinc-900 transition-colors duration-300 mb-8 group"
          id="back-to-work"
        >
          <svg class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Back to Work
        </NuxtLink>
      </div>

      <!-- Hero Image -->
      <div class="container mx-auto px-6 lg:px-12">
        <div ref="heroImageRef" class="rounded-3xl overflow-hidden aspect-[16/9] bg-zinc-100">
          <img
            :src="heroImage"
            :alt="project.title"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>

    <!-- Project Info -->
    <section class="container mx-auto px-6 lg:px-12 py-16 md:py-24">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <!-- Metadata -->
        <div ref="metaRef" class="lg:col-span-4 space-y-8">
          <div>
            <h1 class="text-5xl md:text-6xl font-heading font-bold text-zinc-900 mb-4">
              {{ project.title }}
            </h1>
            <div class="flex items-center gap-3">
              <span class="text-xs uppercase tracking-widest text-zinc-400 px-3 py-1 rounded-full border border-zinc-200">
                {{ project.category }}
              </span>
              <span class="text-xs uppercase tracking-widest text-zinc-400">
                {{ project.industry }}
              </span>
            </div>
          </div>

          <div class="space-y-4 pt-4 border-t border-zinc-100">
            <div>
              <h4 class="text-xs uppercase tracking-widest text-zinc-400 mb-1">Industry</h4>
              <p class="text-sm font-medium text-zinc-700">{{ project.industry }}</p>
            </div>
            <div>
              <h4 class="text-xs uppercase tracking-widest text-zinc-400 mb-1">Services</h4>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="service in project.services"
                  :key="service"
                  class="text-sm text-zinc-600 bg-zinc-100 px-3 py-1 rounded-full"
                >
                  {{ service }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Description -->
        <div ref="descRef" class="lg:col-span-8">
          <div class="max-w-2xl">
            <h3 class="text-xs uppercase tracking-widest text-zinc-400 mb-4">Description</h3>
            <p class="text-xl md:text-2xl text-zinc-700 leading-relaxed font-light">
              {{ project.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Project Images Gallery -->
    <section class="container mx-auto px-6 lg:px-12 pb-16">
      <div class="space-y-6">
        <div
          v-for="(image, index) in detailImages"
          :key="index"
          class="gallery-item rounded-2xl overflow-hidden bg-zinc-100"
        >
          <img
            :src="image"
            :alt="`${project.title} - Detail ${index + 1}`"
            class="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>

    <!-- Project Navigation -->
    <section class="border-t border-zinc-100" id="project-nav">
      <div class="container mx-auto px-6 lg:px-12">
        <div class="grid grid-cols-2">
          <!-- Previous -->
          <NuxtLink
            :to="`/work/${previousProject.slug}`"
            class="group py-12 md:py-16 pr-8 border-r border-zinc-100 hover:bg-zinc-50 transition-colors duration-500"
            id="nav-previous"
          >
            <span class="text-xs uppercase tracking-widest text-zinc-400 mb-2 block">Previous</span>
            <h3 class="text-xl md:text-2xl font-heading font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors duration-300">
              {{ previousProject.title }}
            </h3>
          </NuxtLink>

          <!-- Next -->
          <NuxtLink
            :to="`/work/${nextProject.slug}`"
            class="group py-12 md:py-16 pl-8 text-right hover:bg-zinc-50 transition-colors duration-500"
            id="nav-next"
          >
            <span class="text-xs uppercase tracking-widest text-zinc-400 mb-2 block">Next</span>
            <h3 class="text-xl md:text-2xl font-heading font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors duration-300">
              {{ nextProject.title }}
            </h3>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>

  <!-- 404 -->
  <div v-else class="min-h-screen flex items-center justify-center pt-20">
    <div class="text-center">
      <h1 class="text-6xl font-heading font-bold text-zinc-900 mb-4">404</h1>
      <p class="text-zinc-500 mb-8">Project not found</p>
      <NuxtLink to="/work" class="text-sm font-medium text-zinc-900 border border-zinc-300 px-6 py-3 rounded-full hover:bg-zinc-900 hover:text-white transition-all duration-500">
        Back to Work
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { getProject, getNextProject, getPreviousProject } = useProjects()

const project = computed(() => getProject(slug.value))
const nextProject = computed(() => getNextProject(slug.value))
const previousProject = computed(() => getPreviousProject(slug.value))

const heroImageRef = ref<HTMLElement>()
const metaRef = ref<HTMLElement>()
const descRef = ref<HTMLElement>()

const heroImage = computed(() => {
  if (!project.value) return ''
  return `/projects/cropped/${project.value.slug}/01.jpg`
})

const detailImages = computed(() => {
  if (!project.value) return []
  const images: string[] = []
  for (let i = 2; i <= project.value.imageCount; i++) {
    const imgNum = String(i).padStart(2, '0')
    images.push(`/projects/cropped/${project.value.slug}/${imgNum}.jpg`)
  }
  return images
})

useHead({
  title: computed(() => project.value?.title || 'Project'),
})

function animateIn() {
  gsap.registerPlugin(ScrollTrigger)

  // Kill existing triggers
  ScrollTrigger.getAll().forEach(t => t.kill())

  nextTick(() => {
    if (heroImageRef.value) {
      gsap.fromTo(heroImageRef.value,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
    }

    if (metaRef.value) {
      gsap.fromTo(metaRef.value,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power3.out' }
      )
    }

    if (descRef.value) {
      gsap.fromTo(descRef.value,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: 'power3.out' }
      )
    }

    // Gallery items
    const galleryItems = document.querySelectorAll('.gallery-item')
    galleryItems.forEach((item) => {
      gsap.fromTo(item,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      )
    })
  })
}

onMounted(() => {
  animateIn()
})

// Re-animate on route change (slug change)
watch(slug, () => {
  window.scrollTo({ top: 0 })
  nextTick(() => {
    animateIn()
  })
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(t => t.kill())
})
</script>
