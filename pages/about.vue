<template>
  <div class="pt-28">
    <!-- Hero -->
    <section class="container mx-auto px-6 lg:px-12 mb-24">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
        <!-- Left: Intro -->
        <div class="lg:col-span-7" ref="introRef" style="opacity: 0; transform: translateY(30px)">
          <div class="flex items-center gap-4 mb-8">
            <div ref="lineRef" class="h-[1px] w-12 bg-zinc-300" />
            <span class="text-xs font-medium uppercase tracking-[0.3em] text-zinc-400">About</span>
          </div>

          <h1
            ref="titleRef"
            class="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-zinc-900 leading-[1.1] mb-8"
          >
            I'm Fares Mohammed
          </h1>

          <p class="text-xl md:text-2xl text-zinc-500 leading-relaxed max-w-xl font-light">
            A visual storyteller and senior graphic designer with 6+ years of experience creating bold, eye-catching designs across Egypt and Saudi Arabia.
          </p>
        </div>

        <!-- Right: Photo -->
        <div class="lg:col-span-5" ref="photoRef" style="opacity: 0; transform: translateY(40px)">
          <div class="rounded-2xl overflow-hidden shadow-2xl shadow-zinc-900/10 transform rotate-[-1.5deg] hover:rotate-0 transition-transform duration-700 ease-out">
            <img
              src="/images/fares-photo.jpg"
              alt="Fares Mohammed"
              class="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Bio Points — editorial list -->
    <section class="container mx-auto px-6 lg:px-12 py-24 border-t border-zinc-200">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <div class="lg:col-span-4">
          <h2 ref="bioLabelRef" class="text-3xl md:text-4xl font-heading font-semibold text-zinc-900" style="opacity: 0; transform: translateY(20px)">
            What drives me
          </h2>
        </div>
        <div class="lg:col-span-8 space-y-0">
          <div
            v-for="(point, index) in bioPoints"
            :key="index"
            class="bio-item border-t border-zinc-200 py-8 flex items-start gap-6"
            style="opacity: 0; transform: translateY(15px)"
          >
            <span class="text-xs font-medium text-zinc-400 mt-1.5 flex-shrink-0 tabular-nums">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            <div>
              <h3 class="text-sm font-semibold uppercase tracking-wider text-zinc-900 mb-2">{{ point.title }}</h3>
              <p class="text-zinc-500 leading-relaxed">{{ point.description }}</p>
            </div>
          </div>
          <div class="border-t border-zinc-200" />
        </div>
      </div>
    </section>

    <!-- Services — 3-column cards -->
    <section class="container mx-auto px-6 lg:px-12 py-24 border-t border-zinc-200">
      <div class="mb-14">
        <h2 ref="servicesLabelRef" class="text-3xl md:text-4xl font-heading font-semibold text-zinc-900" style="opacity: 0; transform: translateY(20px)">
          What I do
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="service-item group p-8 md:p-10 rounded-2xl border border-zinc-100 hover:bg-zinc-900 transition-all duration-500 cursor-default"
          style="opacity: 0; transform: translateY(20px)"
        >
          <span class="block text-5xl font-heading font-bold text-zinc-100 group-hover:text-zinc-700 transition-colors duration-500 mb-8">
            {{ String(index + 1).padStart(2, '0') }}
          </span>
          <h3 class="text-xl font-heading font-semibold text-zinc-900 group-hover:text-white transition-colors duration-500 mb-3">
            {{ service.title }}
          </h3>
          <p class="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-400 transition-colors duration-500">
            {{ service.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- Stats — minimal horizontal strip -->
    <section class="py-20 border-t border-zinc-200">
      <div class="container mx-auto px-6 lg:px-12">
        <div ref="statsRef" class="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
          <div
            v-for="(stat, index) in stats"
            :key="stat.label"
            class="stat-item"
            style="opacity: 0; transform: translateY(15px)"
          >
            <span
              :ref="(el) => { if (el) statRefs[index] = el as HTMLElement }"
              class="block text-4xl md:text-5xl font-heading font-bold text-zinc-900 mb-2"
            >
              0
            </span>
            <span class="text-xs uppercase tracking-widest text-zinc-400">
              {{ stat.label }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Industries — pill tags -->
    <section class="container mx-auto px-6 lg:px-12 py-24 border-t border-zinc-200">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <div class="lg:col-span-4">
          <h2 ref="industriesLabelRef" class="text-3xl md:text-4xl font-heading font-semibold text-zinc-900" style="opacity: 0; transform: translateY(20px)">
            Industries
          </h2>
        </div>
        <div class="lg:col-span-8">
          <div class="flex flex-wrap gap-3">
            <span
              v-for="industry in industries"
              :key="industry"
              class="industry-tag px-5 py-2.5 rounded-full border border-zinc-200 text-sm font-medium text-zinc-600 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all duration-300 cursor-default"
              style="opacity: 0; transform: translateY(10px)"
            >
              {{ industry }}
            </span>
          </div>
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

const { splitTextReveal, counterAnimation, lineDraw } = useAnimations()

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
    title: 'Brand Identity',
    description: 'Complete visual identity systems including logos, typography, color palettes, and brand guidelines that define how your brand looks and feels.',
  },
  {
    title: 'Packaging Design',
    description: 'Eye-catching packaging solutions that stand out on shelves and create memorable unboxing experiences for your customers.',
  },
  {
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
const titleRef = ref<HTMLElement>()
const photoRef = ref<HTMLElement>()
const lineRef = ref<HTMLElement>()
const bioLabelRef = ref<HTMLElement>()
const servicesLabelRef = ref<HTMLElement>()
const industriesLabelRef = ref<HTMLElement>()
const statsRef = ref<HTMLElement>()

const statRefs = ref<HTMLElement[]>([])

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  nextTick(() => {
    // Hero intro
    if (introRef.value) {
      gsap.to(introRef.value, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
    }
    if (lineRef.value) {
      lineDraw(lineRef.value, { duration: 0.8 })
    }
    if (titleRef.value) {
      splitTextReveal(titleRef.value, { type: 'chars', duration: 0.5, stagger: 0.03, delay: 0.2 })
    }

    // Photo
    if (photoRef.value) {
      gsap.to(photoRef.value, { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' })
    }

    // Section labels
    ;[bioLabelRef, servicesLabelRef, industriesLabelRef].forEach((ref) => {
      if (ref.value) {
        gsap.to(ref.value, {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: ref.value, start: 'top 90%', toggleActions: 'play none none none' },
        })
      }
    })

    // Bio items
    const bioItems = document.querySelectorAll('.bio-item')
    bioItems.forEach((item) => {
      gsap.to(item, {
        y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 95%', toggleActions: 'play none none none' },
      })
    })

    // Service items
    const serviceItems = document.querySelectorAll('.service-item')
    serviceItems.forEach((item) => {
      gsap.to(item, {
        y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 95%', toggleActions: 'play none none none' },
      })
    })

    // Stats
    const statItems = document.querySelectorAll('.stat-item')
    statItems.forEach((item, i) => {
      gsap.to(item, {
        y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 95%',
          toggleActions: 'play none none none',
          onEnter: () => {
            if (statRefs.value[i]) {
              counterAnimation(statRefs.value[i], stats[i].value, {
                duration: 2,
                suffix: stats[i].suffix,
              })
            }
          },
        },
      })
    })

    // Industries
    const industryTags = document.querySelectorAll('.industry-tag')
    industryTags.forEach((tag) => {
      gsap.to(tag, {
        y: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: tag, start: 'top 95%', toggleActions: 'play none none none' },
      })
    })
  })
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((t) => t.kill())
})
</script>
