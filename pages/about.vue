<template>
  <div class="pt-28">
    <!-- Header -->
    <section class="container mx-auto px-6 lg:px-12 mb-20">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        <div ref="introRef" style="opacity: 0; transform: translateY(30px)">
          <span class="text-xs font-medium uppercase tracking-[0.3em] text-zinc-400 mb-3 block">About</span>
          <h1 ref="aboutTitleRef" class="text-5xl md:text-7xl font-heading font-bold text-zinc-900 leading-tight mb-8">
            I'm Fares
            <br />
            Mohammed
          </h1>
          <p ref="aboutDescRef" class="text-xl text-zinc-500 leading-relaxed max-w-lg" style="opacity: 0">
            A visual storyteller and senior graphic designer with 6+ years of experience creating bold, eye-catching designs across Egypt and Saudi Arabia.
          </p>
        </div>

        <!-- Photo/Visual -->
        <div ref="photoRef" style="opacity: 0; transform: translateY(50px) scale(0.96)">
          <div class="rounded-3xl overflow-hidden bg-zinc-100 aspect-[4/5] relative">
            <div class="absolute inset-0 bg-gradient-to-br from-zinc-100 via-zinc-50 to-zinc-200 flex items-center justify-center">
              <div class="text-center">
                <div class="w-32 h-32 mx-auto mb-6 rounded-full bg-zinc-900 flex items-center justify-center">
                  <span class="text-white text-5xl font-heading font-bold">FM</span>
                </div>
                <p class="text-zinc-600 font-heading font-semibold text-lg">Fares Mohammed</p>
                <p class="text-zinc-400 text-sm mt-1">Senior Graphic Designer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Bio Points -->
    <section class="bg-white py-24">
      <div class="container mx-auto px-6 lg:px-12">
        <div ref="bioRef" class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          <div
            v-for="(point, index) in bioPoints"
            :key="index"
            class="bio-item"
            style="opacity: 0; transform: translateY(30px)"
          >
            <div class="flex items-start gap-5">
              <span class="flex-shrink-0 text-5xl font-heading font-bold text-zinc-100">
                {{ String(index + 1).padStart(2, '0') }}
              </span>
              <div>
                <h3 class="text-xl font-heading font-semibold text-zinc-900 mb-3">
                  {{ point.title }}
                </h3>
                <p class="text-zinc-500 leading-relaxed">
                  {{ point.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section class="py-24">
      <div class="container mx-auto px-6 lg:px-12">
        <div ref="servicesHeaderRef" class="mb-16">
          <span class="text-xs font-medium uppercase tracking-[0.3em] text-zinc-400 mb-3 block">What I Do</span>
          <h2 ref="servicesTitleRef" class="text-4xl md:text-5xl font-heading font-bold text-zinc-900">
            Services
          </h2>
        </div>

        <div ref="servicesGridRef" class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(service, index) in services"
            :key="index"
            class="service-card p-8 rounded-2xl bg-white border border-zinc-100 hover:border-zinc-200 hover:shadow-lg transition-all duration-500 group"
            style="opacity: 0; transform: translateY(30px)"
          >
            <div class="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <span class="text-white text-lg">{{ service.icon }}</span>
            </div>
            <h3 class="text-xl font-heading font-semibold text-zinc-900 mb-3">
              {{ service.title }}
            </h3>
            <p class="text-zinc-500 text-sm leading-relaxed">
              {{ service.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Stats -->
    <section class="bg-zinc-900 py-24 overflow-hidden">
      <div class="container mx-auto px-6 lg:px-12">
        <div ref="statsRef" class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div
            v-for="(stat, index) in stats"
            :key="stat.label"
            class="stat-item text-center"
            style="opacity: 0; transform: translateY(20px)"
          >
            <span
              :ref="(el) => { if (el) statRefs[index] = el as HTMLElement }"
              class="block text-5xl md:text-6xl font-heading font-bold text-white mb-2"
            >
              0
            </span>
            <span class="text-xs uppercase tracking-widest text-zinc-500">
              {{ stat.label }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Industries -->
    <section class="py-24">
      <div class="container mx-auto px-6 lg:px-12">
        <div ref="industriesRef" class="mb-16">
          <span class="text-xs font-medium uppercase tracking-[0.3em] text-zinc-400 mb-3 block">Experience</span>
          <h2 class="text-4xl md:text-5xl font-heading font-bold text-zinc-900">
            Industries
          </h2>
        </div>

        <div class="flex flex-wrap gap-3">
          <span
            v-for="industry in industries"
            :key="industry"
            class="industry-tag px-6 py-3 rounded-full border border-zinc-200 text-sm font-medium text-zinc-600 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all duration-300 cursor-default"
            style="opacity: 0; transform: translateY(15px)"
          >
            {{ industry }}
          </span>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <HomeContactCta />
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { splitTextReveal, counterAnimation, staggerReveal } = useAnimations()

useHead({
  title: 'About',
})

const bioPoints = [
  {
    title: 'Visual Storyteller',
    description: 'I believe every brand has a story worth telling. Through strategic design and compelling visuals, I help brands communicate their unique narrative to the world.',
  },
  {
    title: 'Bold & Eye-Catching',
    description: 'My design philosophy centers around creating work that demands attention. Bold typography, vibrant colors, and confident compositions are at the heart of everything I create.',
  },
  {
    title: 'Cross-Cultural Experience',
    description: 'With 6+ years working between Egypt and Saudi Arabia, I bring a deep understanding of both markets, blending Arabic heritage with contemporary global design trends.',
  },
  {
    title: 'Music, Fashion & Football',
    description: 'My creative inspiration draws from the worlds of music, fashion, and football — bringing cultural relevance and youthful energy to every project I touch.',
  },
]

const services = [
  {
    icon: '◆',
    title: 'Brand Identity',
    description: 'Complete visual identity systems including logos, typography, color palettes, and brand guidelines that define how your brand looks and feels.',
  },
  {
    icon: '▣',
    title: 'Packaging Design',
    description: 'Eye-catching packaging solutions that stand out on shelves and create memorable unboxing experiences for your customers.',
  },
  {
    icon: '◎',
    title: 'Campaign Design',
    description: 'Visual campaigns for social media, print, and digital platforms that engage audiences and drive meaningful brand connections.',
  },
]

const stats = [
  { value: 6, label: 'Years Experience', suffix: '+' },
  { value: 21, label: 'Projects', suffix: '+' },
  { value: 2, label: 'Countries', suffix: '' },
  { value: 5, label: 'Industries', suffix: '+' },
]

const industries = [
  'Food & Beverage',
  'Hospitality',
  'Entertainment',
  'Sports',
  'Tech',
  'Lifestyle',
  'Retail',
  'Cultural Events',
]

const introRef = ref<HTMLElement>()
const aboutTitleRef = ref<HTMLElement>()
const aboutDescRef = ref<HTMLElement>()
const photoRef = ref<HTMLElement>()
const bioRef = ref<HTMLElement>()
const servicesHeaderRef = ref<HTMLElement>()
const servicesTitleRef = ref<HTMLElement>()
const servicesGridRef = ref<HTMLElement>()
const statsRef = ref<HTMLElement>()
const industriesRef = ref<HTMLElement>()

const statRefs = ref<HTMLElement[]>([])

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  nextTick(() => {
    // Intro
    if (introRef.value) {
      gsap.to(introRef.value, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
    }

    // Title split
    if (aboutTitleRef.value) {
      splitTextReveal(aboutTitleRef.value, {
        type: 'chars',
        duration: 0.5,
        stagger: 0.03,
        delay: 0.2,
      })
    }

    // Description
    if (aboutDescRef.value) {
      gsap.to(aboutDescRef.value, { opacity: 1, duration: 0.8, delay: 0.5, ease: 'power3.out' })
    }

    // Photo
    if (photoRef.value) {
      gsap.to(photoRef.value, { opacity: 1, y: 0, scale: 1, duration: 1.2, delay: 0.3, ease: 'power3.out' })
    }

    // Bio items
    const bioItems = document.querySelectorAll('.bio-item')
    if (bioItems.length) {
      gsap.to(bioItems, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: bioRef.value, start: 'top 80%', toggleActions: 'play none none none' },
      })
    }

    // Services title
    if (servicesTitleRef.value) {
      splitTextReveal(servicesTitleRef.value, {
        type: 'chars',
        duration: 0.5,
        stagger: 0.03,
        scrollTrigger: { trigger: servicesHeaderRef.value, start: 'top 85%', toggleActions: 'play none none none' },
      })
    }

    // Service cards
    const serviceCards = document.querySelectorAll('.service-card')
    if (serviceCards.length) {
      gsap.to(serviceCards, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: servicesGridRef.value, start: 'top 85%', toggleActions: 'play none none none' },
      })
    }

    // Stats — counter animation
    const statItems = document.querySelectorAll('.stat-item')
    if (statItems.length) {
      gsap.to(statItems, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: statsRef.value,
          start: 'top 85%',
          toggleActions: 'play none none none',
          onEnter: () => {
            stats.forEach((stat, i) => {
              if (statRefs.value[i]) {
                counterAnimation(statRefs.value[i], stat.value, {
                  duration: 2,
                  suffix: stat.suffix,
                })
              }
            })
          },
        },
      })
    }

    // Industries — elastic stagger
    const industryTags = document.querySelectorAll('.industry-tag')
    if (industryTags.length) {
      gsap.to(industryTags, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: 'back.out(1.7)',
        scrollTrigger: { trigger: industriesRef.value, start: 'top 85%', toggleActions: 'play none none none' },
      })
    }
  })
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((t) => t.kill())
})
</script>
