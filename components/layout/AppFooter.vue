<template>
  <footer class="relative bg-zinc-950 text-white overflow-hidden" id="footer">
    <!-- Decorative gradient -->
    <div class="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 opacity-50" />

    <div class="relative container mx-auto px-6 lg:px-12">
      <!-- CTA Section -->
      <div class="pt-32 pb-20 border-b border-zinc-800">
        <div>
          <p class="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-6">
            Have a project in mind?
          </p>
          <h2 class="text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-none tracking-tight mb-10">
            Let's Work
            <br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-600">Together</span>
          </h2>
          <NuxtLink
            to="/contact"
            class="inline-flex items-center gap-3 text-lg font-medium text-white border border-zinc-700 rounded-full px-8 py-4 hover:bg-white hover:text-zinc-900 transition-all duration-500 group"
            id="footer-cta"
          >
            Get in Touch
            <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
        </div>
      </div>

      <!-- Footer Info -->
      <div class="py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <!-- Contact -->
        <div>
          <h4 class="text-sm font-medium uppercase tracking-widest text-zinc-500 mb-4">Contact</h4>
          <div class="space-y-2">
            <a href="https://instagram.com/faresmohammedd" target="_blank" rel="noopener" class="block text-zinc-300 hover:text-white transition-colors duration-300 link-underline">
              @faresmohammedd
            </a>
            <a href="tel:+201016072716" class="block text-zinc-300 hover:text-white transition-colors duration-300 link-underline">
              +20 1016072716
            </a>
          </div>
        </div>

        <!-- Navigation -->
        <div>
          <h4 class="text-sm font-medium uppercase tracking-widest text-zinc-500 mb-4">Navigation</h4>
          <div class="space-y-2">
            <NuxtLink v-for="link in footerLinks" :key="link.path" :to="link.path" class="block text-zinc-300 hover:text-white transition-colors duration-300 link-underline">
              {{ link.label }}
            </NuxtLink>
          </div>
        </div>

        <!-- Info -->
        <div>
          <h4 class="text-sm font-medium uppercase tracking-widest text-zinc-500 mb-4">Info</h4>
          <p class="text-zinc-400 text-sm leading-relaxed">
            Visual Storyteller &amp; Senior Graphic Designer with 6+ years of experience in branding, packaging, and campaign design across Egypt and Saudi Arabia.
          </p>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="py-6 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-zinc-600 text-sm">
          &copy; {{ new Date().getFullYear() }} Fares Mohammed. All rights reserved.
        </p>
        <p class="text-zinc-700 text-xs">
          Designed with passion
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const footerLinks = [
  { label: 'Work', path: '/work' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]
</script>
