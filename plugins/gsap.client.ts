import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    gsap.registerPlugin(ScrollTrigger)

    gsap.defaults({
      ease: 'power3.out',
      duration: 1,
    })
  }

  return {
    provide: {
      gsap,
      ScrollTrigger,
    },
  }
})
