<template>
  <div class="pt-28 pb-32">
    <div class="container mx-auto px-6 lg:px-12">
      <!-- Label -->
      <div ref="headerRef" class="mb-6" style="opacity: 0">
        <div class="flex items-center gap-4">
          <div ref="lineRef" class="h-[1px] w-12 bg-zinc-300" />
          <span class="text-xs font-medium uppercase tracking-[0.3em] text-zinc-400">Contact</span>
        </div>
      </div>

      <!-- Massive statement -->
      <div class="mb-20">
        <h1
          ref="titleRef"
          class="font-heading font-bold text-zinc-900 leading-[0.9] tracking-[-0.03em] mb-8"
          style="font-size: clamp(2.5rem, 5.5vw, 6rem); visibility: hidden; white-space: nowrap"
        >
          Let's start a project together
        </h1>
      </div>

      <!-- Two column layout -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-20">
        <!-- Left: Form -->
        <div class="lg:col-span-7 order-2 lg:order-1">
          <div ref="formRef" style="opacity: 0; transform: translateY(30px)">
            <form @submit.prevent id="contact-form">
              <!-- Number labels for each field -->
              <div class="space-y-0">
                <div class="form-field border-t border-zinc-200 py-8">
                  <div class="flex items-start gap-6">
                    <span class="text-xs font-medium text-zinc-500 mt-3 tabular-nums flex-shrink-0">01</span>
                    <div class="flex-1">
                      <label for="name" class="block text-sm font-medium text-zinc-900 mb-4">What's your name?</label>
                      <input
                        id="name"
                        type="text"
                        placeholder="John Doe *"
                        class="w-full bg-transparent text-zinc-600 placeholder-zinc-400 focus:outline-none text-lg"
                      />
                    </div>
                  </div>
                </div>

                <div class="form-field border-t border-zinc-200 py-8">
                  <div class="flex items-start gap-6">
                    <span class="text-xs font-medium text-zinc-500 mt-3 tabular-nums flex-shrink-0">02</span>
                    <div class="flex-1">
                      <label for="email" class="block text-sm font-medium text-zinc-900 mb-4">What's your email?</label>
                      <input
                        id="email"
                        type="email"
                        placeholder="john@doe.com *"
                        class="w-full bg-transparent text-zinc-600 placeholder-zinc-400 focus:outline-none text-lg"
                      />
                    </div>
                  </div>
                </div>

                <div class="form-field border-t border-zinc-200 py-8">
                  <div class="flex items-start gap-6">
                    <span class="text-xs font-medium text-zinc-500 mt-3 tabular-nums flex-shrink-0">03</span>
                    <div class="flex-1">
                      <label for="service" class="block text-sm font-medium text-zinc-900 mb-4">What services are you looking for?</label>
                      <input
                        id="service"
                        type="text"
                        placeholder="Branding, Packaging, Campaign Design..."
                        class="w-full bg-transparent text-zinc-600 placeholder-zinc-400 focus:outline-none text-lg"
                      />
                    </div>
                  </div>
                </div>

                <div class="form-field border-t border-zinc-200 py-8">
                  <div class="flex items-start gap-6">
                    <span class="text-xs font-medium text-zinc-500 mt-3 tabular-nums flex-shrink-0">04</span>
                    <div class="flex-1">
                      <label for="message" class="block text-sm font-medium text-zinc-900 mb-4">Your message</label>
                      <textarea
                        id="message"
                        rows="3"
                        placeholder="Hello Fares, I'd like to discuss a project..."
                        class="w-full bg-transparent text-zinc-600 placeholder-zinc-400 focus:outline-none text-lg resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div class="border-t border-zinc-200 pt-10">
                  <button
                    ref="submitBtnRef"
                    type="submit"
                    class="magnetic-btn group inline-flex items-center gap-4"
                    id="contact-submit"
                  >
                    <span class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-zinc-900 group-hover:scale-110 transition-transform duration-500">
                      <svg class="w-6 h-6 text-white transform group-hover:rotate-45 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </span>
                    <span class="text-lg font-medium text-zinc-900">Send it</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- Right: Contact details -->
        <div class="lg:col-span-5 order-1 lg:order-2">
          <div ref="detailsRef" class="lg:sticky lg:top-32 space-y-12" style="opacity: 0; transform: translateY(20px)">
            <!-- Email highlight -->
            <div>
              <h4 class="text-xs font-medium uppercase tracking-widest text-zinc-400 mb-4">Contact Details</h4>
              <a
                href="mailto:faresmohammed@email.com"
                class="text-xl md:text-2xl font-heading font-semibold text-zinc-900 hover:text-zinc-500 transition-colors duration-300 block mb-2"
              >
                faresmohammed@email.com
              </a>
              <a
                href="tel:+201016072716"
                class="text-xl md:text-2xl font-heading font-semibold text-zinc-900 hover:text-zinc-500 transition-colors duration-300 block"
              >
                +20 1016072716
              </a>
            </div>

            <!-- Socials -->
            <div>
              <h4 class="text-xs font-medium uppercase tracking-widest text-zinc-400 mb-4">Socials</h4>
              <div class="space-y-2">
                <a
                  href="https://instagram.com/faresmohammedd"
                  target="_blank"
                  rel="noopener"
                  class="text-zinc-600 hover:text-zinc-900 transition-colors duration-300 block text-sm font-medium"
                >
                  Instagram ↗
                </a>
                <a
                  href="https://behance.net/faresmohammed"
                  target="_blank"
                  rel="noopener"
                  class="text-zinc-600 hover:text-zinc-900 transition-colors duration-300 block text-sm font-medium"
                >
                  Behance ↗
                </a>
              </div>
            </div>

            <!-- Location -->
            <div>
              <h4 class="text-xs font-medium uppercase tracking-widest text-zinc-400 mb-4">Location</h4>
              <p class="text-sm font-medium text-zinc-900">Egypt & Saudi Arabia</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const { splitTextReveal, magneticElement, lineDraw } = useAnimations()

useHead({
  title: 'Contact',
})

const headerRef = ref<HTMLElement>()
const lineRef = ref<HTMLElement>()
const titleRef = ref<HTMLElement>()
const formRef = ref<HTMLElement>()
const detailsRef = ref<HTMLElement>()
const submitBtnRef = ref<HTMLElement>()

const cleanups: (() => void)[] = []

onMounted(() => {
  nextTick(() => {
    // Header
    if (headerRef.value) {
      gsap.to(headerRef.value, { opacity: 1, duration: 0.6, ease: 'power3.out' })
    }

    // Line
    if (lineRef.value) {
      lineDraw(lineRef.value, { duration: 0.8 })
    }

    // Title
    if (titleRef.value) {
      splitTextReveal(titleRef.value, {
        type: 'words',
        duration: 0.7,
        stagger: 0.06,
        delay: 0.2,
      })
    }

    // Form
    if (formRef.value) {
      gsap.to(formRef.value, { y: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: 'power3.out' })
    }

    // Form fields stagger
    const formFields = document.querySelectorAll('.form-field')
    if (formFields.length) {
      gsap.fromTo(
        formFields,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.6, ease: 'power3.out' }
      )
    }

    // Details
    if (detailsRef.value) {
      gsap.to(detailsRef.value, { y: 0, opacity: 1, duration: 0.8, delay: 0.4, ease: 'power3.out' })
    }

    // Submit button magnetic
    if (submitBtnRef.value) {
      const cleanup = magneticElement(submitBtnRef.value, 0.2)
      if (cleanup) cleanups.push(cleanup)
    }
  })
})

onUnmounted(() => {
  cleanups.forEach((fn) => fn())
})
</script>
