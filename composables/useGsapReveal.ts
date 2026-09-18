import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useGsapReveal() {
  const revealElements = (selector: string, options: gsap.TweenVars = {}) => {
    if (!import.meta.client) return

    const elements = document.querySelectorAll(selector)
    if (!elements.length) return

    elements.forEach((el) => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          ...options,
        }
      )
    })
  }

  const revealStagger = (container: string, children: string, options: gsap.TweenVars = {}) => {
    if (!import.meta.client) return

    const containerEl = document.querySelector(container)
    if (!containerEl) return

    gsap.fromTo(
      `${container} ${children}`,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerEl,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        ...options,
      }
    )
  }

  const parallaxImage = (selector: string, speed: number = 0.3) => {
    if (!import.meta.client) return

    const elements = document.querySelectorAll(selector)
    elements.forEach((el) => {
      gsap.to(el, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
  }

  const revealText = (selector: string) => {
    if (!import.meta.client) return

    const elements = document.querySelectorAll(selector)
    elements.forEach((el) => {
      const text = el.textContent || ''
      el.innerHTML = ''

      text.split('').forEach((char) => {
        const span = document.createElement('span')
        span.style.display = 'inline-block'
        span.style.opacity = '0'
        span.style.transform = 'translateY(100%)'
        span.textContent = char === ' ' ? '\u00A0' : char
        el.appendChild(span)
      })

      gsap.to(el.querySelectorAll('span'), {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.02,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    })
  }

  const cleanupScrollTriggers = () => {
    if (!import.meta.client) return
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  }

  return {
    revealElements,
    revealStagger,
    parallaxImage,
    revealText,
    cleanupScrollTriggers,
  }
}
