import { useEffect } from 'react'
import Lenis from 'lenis'

let lenis: Lenis | null = null

export function useLenis() {
  useEffect(() => {
    lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    })

    let rafId: number
    function raf(time: number) {
      lenis!.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Expose lenis so GSAP ScrollTrigger can sync with it
    ;(window as unknown as Record<string, unknown>).__lenis__ = lenis

    return () => {
      cancelAnimationFrame(rafId)
      lenis?.destroy()
      lenis = null
    }
  }, [])
}
