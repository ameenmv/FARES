<template>
  <section class="container mx-auto px-6 lg:px-12 py-24 border-t border-zinc-200">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
      <div class="lg:col-span-4">
        <h2 ref="labelRef" class="text-3xl md:text-4xl font-heading font-semibold text-zinc-900" style="opacity: 0; transform: translateY(20px)">
          Industries
        </h2>
      </div>
      <div class="lg:col-span-8">
        <!-- Physics container -->
        <div
          ref="containerRef"
          class="relative w-full overflow-hidden rounded-2xl bg-zinc-50 border border-zinc-100"
          style="height: 320px"
        >
          <!-- Pill tags — positioned by Matter.js -->
          <div
            v-for="(industry, index) in industries"
            :key="industry"
            :ref="(el) => { if (el) pillRefs[index] = el as HTMLElement }"
            class="industry-pill absolute px-5 py-2.5 rounded-full border-2 border-zinc-900 text-sm font-semibold text-zinc-900 cursor-grab active:cursor-grabbing select-none whitespace-nowrap"
            style="opacity: 0; top: -60px; left: 0"
          >
            {{ industry }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Matter from 'matter-js'

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

const labelRef = ref<HTMLElement>()
const containerRef = ref<HTMLElement>()
const pillRefs = ref<HTMLElement[]>([])

let engine: Matter.Engine
let render: { runner: Matter.Runner } | null = null
let runner: Matter.Runner
let pillBodies: Matter.Body[] = []
let mouseConstraint: Matter.MouseConstraint | null = null
let animFrameId: number

function initPhysics() {
  if (!containerRef.value) return

  const container = containerRef.value
  const width = container.offsetWidth
  const height = container.offsetHeight

  // Create engine
  engine = Matter.Engine.create({
    gravity: { x: 0, y: 1.5, scale: 0.001 },
  })

  // Create walls (invisible)
  const wallThickness = 50
  const walls = [
    // Bottom
    Matter.Bodies.rectangle(width / 2, height + wallThickness / 2, width + 100, wallThickness, { isStatic: true }),
    // Left
    Matter.Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, { isStatic: true }),
    // Right
    Matter.Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, { isStatic: true }),
  ]
  Matter.Composite.add(engine.world, walls)

  // Create pill bodies — one per tag
  pillBodies = pillRefs.value.map((el, i) => {
    const pillWidth = el.offsetWidth
    const pillHeight = el.offsetHeight
    const radius = pillHeight / 2

    // Staggered horizontal positions for a natural look
    const x = 60 + (i * (width - 120)) / (industries.length - 1) + (Math.random() * 30 - 15)
    const y = -40 - i * 60 // drop from above, staggered

    const body = Matter.Bodies.rectangle(x, y, pillWidth, pillHeight, {
      chamfer: { radius },
      restitution: 0.3,
      friction: 0.5,
      frictionAir: 0.02,
      density: 0.002,
    })

    return body
  })

  Matter.Composite.add(engine.world, pillBodies)

  // Mouse interaction — drag to toss pills
  const mouse = Matter.Mouse.create(container)
  mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse,
    constraint: {
      stiffness: 0.6,
      damping: 0.1,
      render: { visible: false },
    },
  })
  Matter.Composite.add(engine.world, mouseConstraint)

  // Fix scroll on touch devices
  mouse.element.removeEventListener('mousewheel', (mouse as any).mousewheel)
  mouse.element.removeEventListener('DOMMouseScroll', (mouse as any).mousewheel)

  // Runner
  runner = Matter.Runner.create()
  Matter.Runner.run(runner, engine)

  // Sync DOM to physics
  function syncDOM() {
    pillBodies.forEach((body, i) => {
      const el = pillRefs.value[i]
      if (!el) return

      const x = body.position.x - el.offsetWidth / 2
      const y = body.position.y - el.offsetHeight / 2
      const angle = body.angle

      el.style.transform = `translate(${x}px, ${y}px) rotate(${angle}rad)`
      el.style.opacity = '1'
    })
    animFrameId = requestAnimationFrame(syncDOM)
  }
  syncDOM()
}

function destroyPhysics() {
  if (runner) Matter.Runner.stop(runner)
  if (engine) Matter.Engine.clear(engine)
  if (animFrameId) cancelAnimationFrame(animFrameId)
}

let triggered = false

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  nextTick(() => {
    if (labelRef.value) {
      gsap.to(labelRef.value, {
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: labelRef.value, start: 'top 90%', toggleActions: 'play none none none' },
      })
    }

    // Trigger physics when container enters viewport
    if (containerRef.value) {
      ScrollTrigger.create({
        trigger: containerRef.value,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          if (!triggered) {
            triggered = true
            initPhysics()
          }
        },
      })
    }
  })
})

onUnmounted(() => {
  destroyPhysics()
})

// Handle resize
if (import.meta.client) {
  let resizeTimeout: ReturnType<typeof setTimeout>
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
      destroyPhysics()
      triggered = false
      pillRefs.value.forEach((el) => {
        if (el) {
          el.style.opacity = '0'
          el.style.transform = ''
          el.style.top = '-60px'
        }
      })
      nextTick(() => {
        triggered = true
        initPhysics()
      })
    }, 300)
  })
}
</script>
