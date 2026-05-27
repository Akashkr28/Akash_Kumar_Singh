import { useEffect, useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Mail, ArrowDown } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import ParticleField from './ParticleField'

const roles = [
  'Full Stack Developer',
  'AI/ML Enthusiast',
  'Real-time Systems Builder',
  'MCA Student @ Amity',
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const spotRef    = useRef<HTMLDivElement>(null)
  const cardRef    = useRef<HTMLDivElement>(null)
  const glareRef   = useRef<HTMLDivElement>(null)

  // Typewriter
  useEffect(() => {
    const current = roles[roleIndex]
    let timeout: ReturnType<typeof setTimeout>
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60)
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIndex(i => (i + 1) % roles.length)
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, roleIndex])

  // Spotlight follows cursor
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!spotRef.current || !sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    spotRef.current.style.background =
      `radial-gradient(600px circle at ${x}px ${y}px, rgba(217,119,6,0.06), transparent 70%)`
  }, [])

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  // 3-D tilt on photo card
  const handle3DMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    const glare = glareRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const normX = (x / rect.width  - 0.5)
    const normY = (y / rect.height - 0.5)
    const rotY =  normX * 22
    const rotX = -normY * 16
    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03,1.03,1.03)`
    card.style.boxShadow = `
      ${-normX * 24}px ${-normY * 24}px 60px rgba(217,119,6,0.18),
      0 0 120px rgba(217,119,6,0.08),
      0 32px 64px rgba(120,113,108,0.15)
    `
    if (glare) {
      const gx = ((x / rect.width)  * 100).toFixed(1)
      const gy = ((y / rect.height) * 100).toFixed(1)
      glare.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.22) 0%, transparent 65%)`
    }
  }, [])

  const handle3DLeave = useCallback(() => {
    const card = cardRef.current
    const glare = glareRef.current
    if (!card) return
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
    card.style.boxShadow = '0 0 60px rgba(217,119,6,0.15), 0 0 120px rgba(217,119,6,0.08), 0 32px 64px rgba(120,113,108,0.12)'
    if (glare) glare.style.background = 'transparent'
  }, [])

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden"
    >
      <ParticleField />
      <div ref={spotRef} className="absolute inset-0 pointer-events-none transition-none z-[1]" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-400/[0.06] rounded-full blur-3xl pointer-events-none z-[1]" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-yellow-400/[0.04] rounded-full blur-3xl pointer-events-none z-[1]" />

      {/* ── Two-column layout ── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-28 flex flex-col md:flex-row items-center justify-between gap-12">

        {/* ── LEFT: text ── */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-mono text-amber-600 text-sm tracking-[0.3em] uppercase mb-6"
          >
            &gt; Hello, World! I'm
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-[1.1] tracking-tight"
          >
            <span className="gradient-text">Akash Kumar</span>
            <br />
            <span className="text-stone-900">Singh</span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.85, duration: 0.6, ease: 'easeOut' }}
            className="w-24 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 mb-6 origin-left"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="h-8 mb-8"
          >
            <span className="font-mono text-stone-700 text-lg md:text-xl">
              {displayed}
              <span className="animate-pulse text-amber-500">_</span>
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-stone-600 text-base md:text-lg max-w-lg mb-10 leading-relaxed"
          >
            MCA student at Amity University Online, building real-time web apps with Kafka,
            React, and modern tooling. Currently exploring mobile development.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="flex items-center gap-4 mb-10 flex-wrap"
          >
            <button
              onClick={() => scrollTo('projects')}
              className="relative px-7 py-3 font-semibold text-sm font-mono rounded overflow-hidden group"
            >
              <span className="absolute inset-0 bg-amber-500 group-hover:bg-amber-400 transition-colors duration-200" />
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.25) 50%, transparent 80%)' }}
              />
              <span className="relative text-white">View Projects</span>
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="px-7 py-3 border border-amber-400/50 text-amber-700 font-semibold rounded text-sm hover:bg-amber-50 hover:border-amber-500 transition-all duration-200 font-mono"
            >
              Get In Touch
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="flex items-center gap-7"
          >
            {[
              { icon: GithubIcon,   href: 'https://github.com/Akashkr28',                               label: 'GitHub'   },
              { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/akash-kumar-singh-2a3503364/', label: 'LinkedIn' },
              { icon: Mail,         href: 'mailto:akashkumarsingh816@gmail.com',                      label: 'Email'    },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="text-stone-400 hover:text-amber-600 transition-all duration-200 hover:scale-110"
              >
                <Icon size={22} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT: photo card ── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="shrink-0 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
            className="relative"
          >
            {/* Gradient border shell — 3-D tilt wrapper */}
            <div
              ref={cardRef}
              onMouseMove={handle3DMove}
              onMouseLeave={handle3DLeave}
              className="p-[3px] rounded-[2rem] shadow-2xl relative"
              style={{
                background: 'linear-gradient(145deg, #d97706 0%, #ca8a04 40%, #b45309 75%, #d97706 100%)',
                boxShadow: '0 0 60px rgba(217,119,6,0.15), 0 0 120px rgba(217,119,6,0.08), 0 32px 64px rgba(120,113,108,0.12)',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.18s ease, box-shadow 0.18s ease',
              }}
            >
              {/* Inner card */}
              <div className="w-72 md:w-80 lg:w-96 rounded-[calc(2rem-3px)] overflow-hidden relative">
                <img
                  src="/photo-card.jpg"
                  alt="Akash Kumar Singh"
                  className="w-full object-cover object-top"
                  draggable={false}
                />
                {/* Specular glare overlay */}
                <div
                  ref={glareRef}
                  className="absolute inset-0 rounded-[calc(2rem-3px)] pointer-events-none"
                  style={{ mixBlendMode: 'overlay', transition: 'background 0.08s ease' }}
                />
              </div>
            </div>

            {/* Badge — Open to work */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, type: 'spring', stiffness: 220 }}
              className="absolute -top-3 -right-3 flex items-center gap-2 bg-white/95 border border-amber-400/40 rounded-2xl px-3 py-1.5 shadow-lg backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
              <span className="text-xs font-mono text-stone-700">Open to work</span>
            </motion.div>

            {/* Badge — MCA · AI & ML */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6, type: 'spring', stiffness: 220 }}
              className="absolute -bottom-3 -left-3 flex items-center gap-2 bg-white/95 border border-amber-400/40 rounded-2xl px-3 py-1.5 shadow-lg backdrop-blur-sm"
            >
              <span className="text-xs font-mono text-stone-700">MCA · AI & ML</span>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-400 z-10"
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}>
          <ArrowDown size={15} />
        </motion.div>
      </motion.div>
    </section>
  )
}
