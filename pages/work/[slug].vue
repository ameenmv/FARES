<template>
  <div v-if="project" class="pt-20">
    <!-- Scroll Progress Bar -->
    <div class="fixed top-0 left-0 right-0 h-[2px] bg-transparent z-[200]">
      <div ref="progressBarRef" class="h-full bg-zinc-900 origin-left" style="transform: scaleX(0)" />
    </div>

    <!-- Hero Image -->
    <section class="relative overflow-hidden" id="case-study-hero">
      <div class="container mx-auto px-6 lg:px-12 pt-12 pb-8">
        <!-- Back button -->
        <NuxtLink
          ref="backBtnRef"
          to="/work"
          class="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-zinc-900 transition-colors duration-300 mb-8 group"
          id="back-to-work"
          style="opacity: 0"
        >
          <svg class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Back to Work
        </NuxtLink>
      </div>

      <!-- Hero Image with clip-path reveal + parallax -->
      <div class="container mx-auto px-6 lg:px-12">
        <div
          ref="heroImageRef"
          class="rounded-3xl overflow-hidden aspect-[16/9] bg-zinc-100 cursor-pointer"
          style="clip-path: inset(50% 50% 50% 50%)"
          @click="openLightbox(0)"
          data-cursor="View"
        >
          <div class="relative w-full h-full overflow-hidden">
            <img
              ref="heroImgEl"
              :src="heroImage"
              :alt="project.title"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Project Info -->
    <section class="container mx-auto px-6 lg:px-12 py-20 md:py-32">
      <!-- Title row -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 md:mb-24">
        <div class="lg:col-span-8" ref="metaRef" style="opacity: 0; transform: translateY(30px)">
          <h1
            ref="projectTitleRef"
            class="text-6xl md:text-8xl lg:text-9xl font-heading font-bold text-zinc-900 leading-[0.85] tracking-[-0.04em]"
            style="visibility: hidden"
          >
            {{ project.title }}
          </h1>
        </div>
        <div class="lg:col-span-4 flex items-end justify-start lg:justify-end">
          <span
            ref="indexNumRef"
            class="text-8xl md:text-9xl font-heading font-bold text-zinc-100 leading-none"
            style="opacity: 0"
          >
            {{ String(projectIndex + 1).padStart(2, '0') }}
          </span>
        </div>
      </div>

      <!-- Description + metadata -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <!-- Description — takes most of the width -->
        <div ref="descRef" class="lg:col-span-7" style="opacity: 0; transform: translateY(25px)">
          <p class="text-2xl md:text-3xl text-zinc-500 leading-[1.5] font-light">
            {{ project.description }}
          </p>
        </div>

        <!-- Metadata — right column, bordered list -->
        <div ref="metaStripRef" class="lg:col-span-5" style="opacity: 0; transform: translateY(20px)">
          <div class="space-y-0">
            <div class="border-t border-zinc-200 py-5 flex items-start gap-8">
              <span class="text-xs font-medium uppercase tracking-widest text-zinc-400 mt-0.5 w-20 flex-shrink-0">Category</span>
              <p class="text-sm font-medium text-zinc-900">{{ project.category }}</p>
            </div>
            <div class="border-t border-zinc-200 py-5 flex items-start gap-8">
              <span class="text-xs font-medium uppercase tracking-widest text-zinc-400 mt-0.5 w-20 flex-shrink-0">Industry</span>
              <p class="text-sm font-medium text-zinc-900">{{ project.industry }}</p>
            </div>
            <div class="border-t border-zinc-200 py-5 flex items-start gap-8">
              <span class="text-xs font-medium uppercase tracking-widest text-zinc-400 mt-0.5 w-20 flex-shrink-0">Services</span>
              <div class="flex flex-wrap gap-x-3 gap-y-1">
                <span
                  v-for="(service, i) in project.services"
                  :key="service"
                  class="text-sm font-medium text-zinc-900"
                >
                  {{ service }}<span v-if="i < project.services.length - 1" class="text-zinc-300 ml-1">,</span>
                </span>
              </div>
            </div>
            <div class="border-t border-zinc-200" />
          </div>
        </div>
      </div>
    </section>

    <!-- Project Images Gallery -->
    <section class="container mx-auto px-6 lg:px-12 pb-16">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div
          v-for="(image, index) in detailImages"
          :key="index"
          class="gallery-item rounded-2xl overflow-hidden bg-zinc-100 cursor-pointer"
          :style="{ clipPath: 'inset(8% 8% 8% 8%)', opacity: 0 }"
          @click="openLightbox(index + 1)"
          data-cursor="View"
        >
          <img
            :src="image"
            :alt="`${project.title} - Detail ${index + 1}`"
            class="gallery-img w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>

    <!-- Image Lightbox -->
    <SharedImageLightbox
      v-model="lightboxOpen"
      :images="allImages"
      :start-index="lightboxStartIndex"
    />

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

const { splitTextReveal, parallaxImage, clipReveal, lineDraw } = useAnimations()

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { getProject, getNextProject, getPreviousProject, projects } = useProjects()

const project = computed(() => getProject(slug.value))
const nextProject = computed(() => getNextProject(slug.value))
const previousProject = computed(() => getPreviousProject(slug.value))
const projectIndex = computed(() => {
  if (!project.value) return 0
  return projects.value.findIndex((p) => p.slug === project.value!.slug)
})

const heroImageRef = ref<HTMLElement>()
const heroImgEl = ref<HTMLElement>()
const metaRef = ref<HTMLElement>()
const metaStripRef = ref<HTMLElement>()
const descRef = ref<HTMLElement>()
const projectTitleRef = ref<HTMLElement>()
const indexNumRef = ref<HTMLElement>()
const backBtnRef = ref<HTMLElement>()
const progressBarRef = ref<HTMLElement>()

// Lightbox state
const lightboxOpen = ref(false)
const lightboxStartIndex = ref(0)

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

// All images combined (hero + detail) for the lightbox
const allImages = computed(() => {
  if (!heroImage.value) return detailImages.value
  return [heroImage.value, ...detailImages.value]
})

function openLightbox(index: number) {
  lightboxStartIndex.value = index
  lightboxOpen.value = true
}

useHead({
  title: computed(() => project.value?.title || 'Project'),
})

function animateIn() {
  gsap.registerPlugin(ScrollTrigger)

  // Kill existing triggers
  ScrollTrigger.getAll().forEach((t) => t.kill())

  nextTick(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

    // Scroll progress bar
    if (progressBarRef.value) {
      gsap.to(progressBarRef.value, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      })
    }

    // Back button
    if (backBtnRef.value) {
      tl.to(backBtnRef.value, { opacity: 1, duration: 0.5 })
    }

    // Hero image — clip-path reveal from center
    if (heroImageRef.value) {
      tl.to(heroImageRef.value, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.4,
        ease: 'power4.inOut',
      }, '-=0.2')
    }

    // Hero image parallax
    if (heroImgEl.value) {
      parallaxImage(heroImgEl.value, {
        speed: 0.2,
        trigger: heroImageRef.value as HTMLElement,
      })
    }

    // Meta section
    if (metaRef.value) {
      tl.to(metaRef.value, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, '-=0.6')
    }

    // Project title split
    if (projectTitleRef.value) {
      tl.add(() => {
        splitTextReveal(projectTitleRef.value!, {
          type: 'chars',
          duration: 0.5,
          stagger: 0.02,
        })
      }, '<')
    }

    // Metadata strip
    if (metaStripRef.value) {
      tl.to(metaStripRef.value, {
        opacity: 1,
        y: 0,
        duration: 0.6,
      }, '-=0.3')
    }

    // Index number
    if (indexNumRef.value) {
      tl.to(indexNumRef.value, {
        opacity: 1,
        duration: 1,
      }, '-=0.5')
    }

    // Description
    if (descRef.value) {
      tl.to(descRef.value, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, '-=0.4')
    }

    // Gallery items — alternating reveal directions
    const galleryItems = document.querySelectorAll('.gallery-item')
    galleryItems.forEach((item, i) => {
      const fromLeft = i % 2 === 0

      gsap.to(item, {
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      })

      // Subtle parallax on gallery images
      const galleryImg = item.querySelector('.gallery-img')
      if (galleryImg) {
        gsap.fromTo(
          galleryImg,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        )
      }
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
  ScrollTrigger.getAll().forEach((t) => t.kill())
})
</script>
