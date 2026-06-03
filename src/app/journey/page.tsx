'use client'
import dynamic from 'next/dynamic'

// Journey uses GSAP ScrollTrigger + Framer Motion useInView which need
// browser APIs. ssr:false prevents server-side crashes.
const Journey = dynamic(() => import('@/components/Journey'), { ssr: false })

export default function JourneyPage() {
  return <Journey />
}
