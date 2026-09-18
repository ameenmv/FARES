<template>
  <div class="pt-28 pb-32">
    <div class="container mx-auto px-6 lg:px-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        <!-- Left: Info -->
        <div ref="infoRef">
          <div>
            <span class="text-xs font-medium uppercase tracking-[0.3em] text-zinc-400 mb-3 block">Contact</span>
            <h1 class="text-5xl md:text-7xl font-heading font-bold text-zinc-900 leading-tight mb-8">
              Let's create
              <br />
              something
              <br />
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-zinc-600 to-zinc-400">amazing.</span>
            </h1>
            <p class="text-lg text-zinc-500 max-w-md leading-relaxed">
              Have a project in mind? I'd love to hear about it. Let's discuss how we can work together to bring your ideas to life.
            </p>
          </div>

          <!-- Contact Info -->
          <div class="mt-16 space-y-8">
            <div>
              <h4 class="text-xs uppercase tracking-widest text-zinc-400 mb-3">Social</h4>
              <a
                href="https://instagram.com/faresmohammedd"
                target="_blank"
                rel="noopener"
                class="text-xl font-medium text-zinc-900 hover:text-zinc-500 transition-colors duration-300 link-underline"
              >
                @faresmohammedd
              </a>
            </div>

            <div>
              <h4 class="text-xs uppercase tracking-widest text-zinc-400 mb-3">Phone</h4>
              <a
                href="tel:+201016072716"
                class="text-xl font-medium text-zinc-900 hover:text-zinc-500 transition-colors duration-300 link-underline"
              >
                +20 1016072716
              </a>
            </div>

            <div>
              <h4 class="text-xs uppercase tracking-widest text-zinc-400 mb-3">Location</h4>
              <p class="text-xl font-medium text-zinc-900">
                Egypt & Saudi Arabia
              </p>
            </div>
          </div>
        </div>

        <!-- Right: Contact Form (Design Only) -->
        <div ref="formRef">
          <div class="bg-white rounded-3xl border border-zinc-100 p-8 md:p-12 shadow-sm">
            <h3 class="text-2xl font-heading font-semibold text-zinc-900 mb-8">
              Send a message
            </h3>

            <form @submit.prevent class="space-y-6" id="contact-form">
              <div>
                <label for="name" class="block text-xs uppercase tracking-widest text-zinc-400 mb-2">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  class="w-full px-0 py-3 bg-transparent border-0 border-b border-zinc-200 text-zinc-900 placeholder-zinc-300 focus:outline-none focus:border-zinc-900 transition-colors duration-300 text-lg"
                />
              </div>

              <div>
                <label for="email" class="block text-xs uppercase tracking-widest text-zinc-400 mb-2">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  class="w-full px-0 py-3 bg-transparent border-0 border-b border-zinc-200 text-zinc-900 placeholder-zinc-300 focus:outline-none focus:border-zinc-900 transition-colors duration-300 text-lg"
                />
              </div>

              <div>
                <label for="subject" class="block text-xs uppercase tracking-widest text-zinc-400 mb-2">Subject</label>
                <input
                  id="subject"
                  type="text"
                  placeholder="Project inquiry"
                  class="w-full px-0 py-3 bg-transparent border-0 border-b border-zinc-200 text-zinc-900 placeholder-zinc-300 focus:outline-none focus:border-zinc-900 transition-colors duration-300 text-lg"
                />
              </div>

              <div>
                <label for="message" class="block text-xs uppercase tracking-widest text-zinc-400 mb-2">Message</label>
                <textarea
                  id="message"
                  rows="4"
                  placeholder="Tell me about your project..."
                  class="w-full px-0 py-3 bg-transparent border-0 border-b border-zinc-200 text-zinc-900 placeholder-zinc-300 focus:outline-none focus:border-zinc-900 transition-colors duration-300 text-lg resize-none"
                />
              </div>

              <button
                type="submit"
                class="w-full bg-zinc-900 text-white py-4 rounded-full font-medium text-lg hover:bg-zinc-700 transition-all duration-500 mt-4 group flex items-center justify-center gap-3"
                id="contact-submit"
              >
                Send Message
                <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

useHead({
  title: 'Contact',
})

const infoRef = ref<HTMLElement>()
const formRef = ref<HTMLElement>()

onMounted(() => {
  nextTick(() => {
    if (infoRef.value) {
      gsap.fromTo(infoRef.value, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
    }
    if (formRef.value) {
      gsap.fromTo(formRef.value, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power3.out' })
    }
  })
})
</script>
