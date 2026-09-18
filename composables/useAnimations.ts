import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Awwwards-level animation utilities for the portfolio.
 * Uses only free GSAP features (core + ScrollTrigger).
 */
export function useAnimations() {

  /**
   * Split text into individual characters wrapped in spans,
   * then animate them with stagger. No SplitText plugin needed.
   */
  function splitTextReveal(
    el: HTMLElement,
    options: {
      type?: 'chars' | 'words' | 'lines'
      duration?: number
      stagger?: number
      delay?: number
      from?: gsap.TweenVars
      to?: gsap.TweenVars
      scrollTrigger?: ScrollTrigger.Vars | null
    } = {}
  ) {
    const {
      type = 'chars',
      duration = 0.8,
      stagger = 0.03,
      delay = 0,
      from = { y: '100%', opacity: 0 },
      to = { y: '0%', opacity: 1 },
      scrollTrigger: st = null,
    } = options

    // Preserve original HTML
    const text = el.textContent || ''

    if (type === 'chars') {
      // Split into characters, preserving spaces
      el.innerHTML = text
        .split('')
        .map((char) =>
          char === ' '
            ? ' '
            : `<span class="split-char" style="display:inline-block;overflow:hidden"><span class="split-char-inner" style="display:inline-block">${char}</span></span>`
        )
        .join('')

      const innerChars = el.querySelectorAll('.split-char-inner')
      return gsap.fromTo(
        innerChars,
        { ...from },
        {
          ...to,
          duration,
          stagger,
          delay,
          ease: 'power4.out',
          ...(st ? { scrollTrigger: st } : {}),
        }
      )
    } else if (type === 'words') {
      el.innerHTML = text
        .split(' ')
        .map(
          (word) =>
            `<span class="split-word" style="display:inline-block;overflow:hidden;margin-right:0.3em"><span class="split-word-inner" style="display:inline-block">${word}</span></span>`
        )
        .join('')

      const innerWords = el.querySelectorAll('.split-word-inner')
      return gsap.fromTo(
        innerWords,
        { ...from },
        {
          ...to,
          duration,
          stagger: stagger * 3,
          delay,
          ease: 'power4.out',
          ...(st ? { scrollTrigger: st } : {}),
        }
      )
    }
  }

  /**
   * Parallax effect: element moves slower/faster than scroll.
   * Uses scrub for buttery-smooth scroll-linked movement.
   */
  function parallaxImage(
    el: HTMLElement,
    options: {
      speed?: number
      trigger?: HTMLElement | string
      scrub?: number | boolean
    } = {}
  ) {
    const { speed = 0.3, trigger, scrub = 1 } = options

    const yOffset = speed * 100

    return gsap.fromTo(
      el,
      { yPercent: -yOffset },
      {
        yPercent: yOffset,
        ease: 'none',
        scrollTrigger: {
          trigger: trigger || el,
          start: 'top bottom',
          end: 'bottom top',
          scrub,
        },
      }
    )
  }

  /**
   * Magnetic button effect: element subtly follows cursor within radius.
   * Accepts either a raw HTMLElement or a Vue component instance (will use $el).
   */
  function magneticElement(rawEl: any, strength: number = 0.3) {
    // Skip on touch devices
    if ('ontouchstart' in window) return

    // Resolve Vue component ref to DOM element
    const el: HTMLElement | null = rawEl?.$el ?? rawEl
    if (!el || typeof el.addEventListener !== 'function') return

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength

      gsap.to(el, {
        x: deltaX,
        y: deltaY,
        duration: 0.6,
        ease: 'power3.out',
      })
    }

    const handleLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.4)',
      })
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)

    // Return cleanup
    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }


  /**
   * Reveal element on scroll with configurable animation.
   */
  function revealOnScroll(
    el: HTMLElement | Element | Element[],
    options: {
      from?: gsap.TweenVars
      to?: gsap.TweenVars
      duration?: number
      delay?: number
      stagger?: number
      trigger?: HTMLElement | string
      start?: string
      scrub?: number | boolean
    } = {}
  ) {
    const {
      from = { y: 60, opacity: 0, clipPath: 'inset(10% 0% 10% 0%)' },
      to = { y: 0, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' },
      duration = 1,
      delay = 0,
      stagger = 0,
      trigger,
      start = 'top 85%',
      scrub = false,
    } = options

    return gsap.fromTo(el, from, {
      ...to,
      duration,
      delay,
      stagger,
      ease: scrub ? 'none' : 'power3.out',
      scrollTrigger: {
        trigger: (trigger || el) as HTMLElement,
        start,
        ...(scrub ? { scrub, end: 'bottom 20%' } : { toggleActions: 'play none none none' }),
      },
    })
  }

  /**
   * Clip-path reveal: element reveals via expanding clip-path.
   */
  function clipReveal(
    el: HTMLElement,
    options: {
      direction?: 'center' | 'left' | 'right' | 'top' | 'bottom'
      duration?: number
      delay?: number
      scrollTrigger?: ScrollTrigger.Vars | null
    } = {}
  ) {
    const { direction = 'center', duration = 1.2, delay = 0, scrollTrigger: st = null } = options

    const clipPaths: Record<string, { from: string; to: string }> = {
      center: {
        from: 'inset(50% 50% 50% 50%)',
        to: 'inset(0% 0% 0% 0%)',
      },
      left: {
        from: 'inset(0% 100% 0% 0%)',
        to: 'inset(0% 0% 0% 0%)',
      },
      right: {
        from: 'inset(0% 0% 0% 100%)',
        to: 'inset(0% 0% 0% 0%)',
      },
      top: {
        from: 'inset(0% 0% 100% 0%)',
        to: 'inset(0% 0% 0% 0%)',
      },
      bottom: {
        from: 'inset(100% 0% 0% 0%)',
        to: 'inset(0% 0% 0% 0%)',
      },
    }

    const cp = clipPaths[direction]

    return gsap.fromTo(
      el,
      { clipPath: cp.from },
      {
        clipPath: cp.to,
        duration,
        delay,
        ease: 'power4.inOut',
        ...(st ? { scrollTrigger: st } : {}),
      }
    )
  }

  /**
   * Counter animation: number counts up from 0 to target.
   */
  function counterAnimation(
    el: HTMLElement,
    target: number,
    options: {
      duration?: number
      suffix?: string
      scrollTrigger?: ScrollTrigger.Vars | null
    } = {}
  ) {
    const { duration = 2, suffix = '', scrollTrigger: st = null } = options
    const obj = { val: 0 }

    return gsap.to(obj, {
      val: target,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = Math.floor(obj.val) + suffix
      },
      ...(st ? { scrollTrigger: st } : {}),
    })
  }

  /**
   * Stagger cascade reveal for multiple elements.
   */
  function staggerReveal(
    elements: Element[] | NodeListOf<Element>,
    options: {
      from?: gsap.TweenVars
      to?: gsap.TweenVars
      stagger?: number | gsap.StaggerVars
      duration?: number
      trigger?: HTMLElement | string
      start?: string
    } = {}
  ) {
    const {
      from = { y: 40, opacity: 0 },
      to = { y: 0, opacity: 1 },
      stagger = 0.1,
      duration = 0.8,
      trigger,
      start = 'top 85%',
    } = options

    return gsap.fromTo(elements, from, {
      ...to,
      duration,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: (trigger || elements[0]) as HTMLElement,
        start,
        toggleActions: 'play none none none',
      },
    })
  }

  /**
   * Horizontal line draw animation.
   */
  function lineDraw(
    el: HTMLElement,
    options: {
      duration?: number
      scrollTrigger?: ScrollTrigger.Vars | null
    } = {}
  ) {
    const { duration = 1.5, scrollTrigger: st = null } = options

    gsap.set(el, { scaleX: 0, transformOrigin: 'left center' })

    return gsap.to(el, {
      scaleX: 1,
      duration,
      ease: 'power3.inOut',
      ...(st ? { scrollTrigger: st } : {}),
    })
  }

  /**
   * Scroll-linked fade out: hero fades as user scrolls down.
   */
  function scrollFadeOut(
    el: HTMLElement,
    options: {
      end?: string
      scale?: number
    } = {}
  ) {
    const { end = '+=50%', scale = 0.95 } = options

    return gsap.to(el, {
      opacity: 0,
      scale,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end,
        scrub: 0.5,
      },
    })
  }

  return {
    splitTextReveal,
    parallaxImage,
    magneticElement,
    revealOnScroll,
    clipReveal,
    counterAnimation,
    staggerReveal,
    lineDraw,
    scrollFadeOut,
  }
}
