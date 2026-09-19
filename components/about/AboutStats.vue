<template>
  <section class="py-20 border-t border-zinc-200">
    <div class="container mx-auto px-6 lg:px-12">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
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
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { counterAnimation } = useAnimations()

const stats = [
  { value: 6, label: 'Years Experience', suffix: '+' },
  { value: 21, label: 'Projects', suffix: '+' },
  { value: 2, label: 'Countries', suffix: '' },
  { value: 5, label: 'Industries', suffix: '+' },
]

const statRefs = ref<HTMLElement[]>([])

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  nextTick(() => {
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
  })
})
</script>
