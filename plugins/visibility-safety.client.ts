/**
 * Global safety net plugin that ensures all animated elements
 * become visible even if ScrollTrigger/GSAP fails to fire.
 * 
 * Runs an IntersectionObserver that watches for elements stuck
 * at opacity:0 or clip-path:inset and forces them visible.
 */
export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.server) return

  const SAFETY_DELAY = 2000 // ms after element enters viewport

  function createObserver() {
    const timers = new WeakMap<Element, ReturnType<typeof setTimeout>>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement

          if (entry.isIntersecting) {
            // Element entered viewport — start safety timer
            const timer = setTimeout(() => {
              const style = getComputedStyle(el)
              const opacity = parseFloat(style.opacity)
              const clipPath = style.clipPath || style.getPropertyValue('clip-path')
              const isClipped = clipPath && clipPath !== 'none' && clipPath.includes('inset') && !clipPath.includes('0%')

              if (opacity < 0.1 || isClipped) {
                // Element is still hidden — force it visible
                el.style.opacity = '1'
                el.style.clipPath = 'inset(0% 0% 0% 0%)'
                el.style.transform = 'none'
                el.style.visibility = 'visible'
                el.style.transition = 'opacity 0.5s ease, clip-path 0.5s ease, transform 0.5s ease'
              }

              observer.unobserve(el)
              timers.delete(el)
            }, SAFETY_DELAY)

            timers.set(el, timer)
          } else {
            // Element left viewport — cancel timer
            const existing = timers.get(el)
            if (existing) {
              clearTimeout(existing)
              timers.delete(el)
            }
          }
        })
      },
      { threshold: 0.05 }
    )

    return observer
  }

  let observer: IntersectionObserver | null = null

  function observeHiddenElements() {
    if (observer) observer.disconnect()
    observer = createObserver()

    // Find all elements with hidden initial states
    const selectors = [
      '[style*="opacity: 0"]',
      '[style*="opacity:0"]',
      '[style*="clip-path: inset"]',
      '[style*="clip-path:inset"]',
      '[style*="visibility: hidden"]',
      '[style*="visibility:hidden"]',
    ]

    const elements = document.querySelectorAll(selectors.join(', '))
    elements.forEach((el) => observer!.observe(el))
  }

  // Run after each page navigation
  nuxtApp.hook('page:finish', () => {
    // Small delay to let GSAP set up its triggers first
    setTimeout(observeHiddenElements, 500)
  })

  // Also run on initial load
  nuxtApp.hook('app:mounted', () => {
    setTimeout(observeHiddenElements, 1500)
  })
})
