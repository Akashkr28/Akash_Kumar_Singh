'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    /* Touch devices — keep the native cursor */
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = 0, my = 0
    let rx = 0, ry = 0
    let raf: number

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`
    }

    const tick = () => {
      rx += (mx - rx) * 0.13
      ry += (my - ry) * 0.13
      ring.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`
      raf = requestAnimationFrame(tick)
    }

    const expand = () => {
      ring.style.width  = '48px'
      ring.style.height = '48px'
      ring.style.borderColor  = '#22d3ee'
      ring.style.background   = 'rgba(34,211,238,0.08)'
      ring.style.marginLeft   = '-4px'
      ring.style.marginTop    = '-4px'
    }

    const collapse = () => {
      ring.style.width  = '40px'
      ring.style.height = '40px'
      ring.style.borderColor = 'rgba(255,255,255,0.22)'
      ring.style.background  = 'transparent'
      ring.style.marginLeft  = '0px'
      ring.style.marginTop   = '0px'
    }

    /* Attach hover listeners to all interactive elements */
    const attach = () => {
      document.querySelectorAll('a, button, [role="button"], [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', expand)
        el.addEventListener('mouseleave', collapse)
      })
    }

    document.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(tick)
    attach()

    const obs = new MutationObserver(attach)
    obs.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      obs.disconnect()
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 pointer-events-none z-[9998] mix-blend-difference"
        style={{ transition: 'none', willChange: 'transform' }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-white/22 pointer-events-none z-[9997]"
        style={{
          transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease, background 0.2s ease',
          willChange: 'transform',
        }}
      />
    </>
  )
}
