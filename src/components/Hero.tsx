'use client'
import { useEffect, useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Mail, ArrowDown } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'

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
  const cardRef  = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)

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

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  // 3-D tilt on photo card
  const handle3DMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card  = cardRef.current
    const glare = glareRef.current
    if (!card) return
    const rect  = card.getBoundingClientRect()
    const x     = e.clientX - rect.left
    const y     = e.clientY - rect.top
    const normX = (x / rect.width  - 0.5)
    const normY = (y / rect.height - 0.5)
    const rotY  =  normX * 22
    const rotX  = -normY * 16
    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03,1.03,1.03)`
    card.style.boxShadow = `
      ${-normX * 28}px ${-normY * 22}px 60px rgba(99,102,241,0.30),
      0 0 100px rgba(14,165,233,0.14),
      0 32px 64px rgba(99,102,241,0.16)
    `
    if (glare) {
      const gx = ((x / rect.width)  * 100).toFixed(1)
      const gy = ((y / rect.height) * 100).toFixed(1)
      glare.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.24) 0%, transparent 65%)`
    }
  }, [])

  const handle3DLeave = useCallback(() => {
    const card  = cardRef.current
    const glare = glareRef.current
    if (!card) return
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
    card.style.boxShadow = '0 0 50px rgba(99,102,241,0.20), 0 0 100px rgba(14,165,233,0.08), 0 32px 64px rgba(99,102,241,0.12)'
    if (glare) glare.style.background = 'transparent'
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Two-column layout */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-28 flex flex-col md:flex-row items-center justify-between gap-12">

        {/* LEFT: text */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">

          {/* Available pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Available for work</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-6xl lg:text-7xl font-black mb-4 leading-[1.1] tracking-tight"
          >
            <span className="text-slate-900 dark:text-white">Akash Kumar</span>
            <br />
            <span className="gradient-text">Singh</span>
          </motion.h1>

          {/* Accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.55, duration: 0.6, ease: 'easeOut' }}
            className="w-24 h-0.5 mb-6 origin-left"
            style={{ background: 'linear-gradient(to right, #6366f1, #0ea5e9)' }}
          />

          {/* Typewriter — glass pill */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-full px-5 py-2.5 mb-8 shadow-sm"
          >
            <span className="font-mono text-slate-700 dark:text-slate-200 text-base md:text-lg">
              {displayed}
              <span className="text-indigo-500 animate-pulse">|</span>
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-slate-600 dark:text-slate-300 text-base md:text-lg max-w-lg mb-10 leading-relaxed"
          >
            MCA student at Amity University Online, building real-time web apps with Kafka,
            React, and modern tooling. Currently exploring mobile development.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="flex items-center gap-4 mb-10 flex-wrap"
          >
            <button
              onClick={() => scrollTo('projects')}
              className="relative px-7 py-3 font-semibold text-sm rounded-xl overflow-hidden group text-white shadow-md"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%)',
                boxShadow: '0 4px 20px rgba(99,102,241,0.35)',
              }}
            >
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #0284c7 100%)' }}
              />
              <span className="relative">View Projects</span>
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="px-7 py-3 glass border border-indigo-300/60 dark:border-indigo-500/50 text-indigo-600 dark:text-indigo-400 font-semibold rounded-xl text-sm hover:border-indigo-400 dark:hover:border-indigo-400 hover:bg-white/80 dark:hover:bg-indigo-900/20 transition-all duration-200 shadow-sm"
            >
              Get In Touch
            </button>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex items-center gap-4"
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
                className="p-2.5 glass rounded-xl text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 hover:scale-110 shadow-sm hover:shadow-indigo-100 dark:hover:shadow-indigo-900/30"
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* RIGHT: photo card with 3D tilt */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
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
              className="p-[3px] rounded-[2rem] relative"
              style={{
                background: 'linear-gradient(145deg, #6366f1 0%, #0ea5e9 40%, #a78bfa 75%, #6366f1 100%)',
                boxShadow: '0 0 50px rgba(99,102,241,0.20), 0 0 100px rgba(14,165,233,0.08), 0 32px 64px rgba(99,102,241,0.12)',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.18s ease, box-shadow 0.18s ease',
              }}
            >
              {/* Inner card */}
              <div className="w-72 md:w-80 lg:w-96 rounded-[calc(2rem-3px)] overflow-hidden relative bg-white dark:bg-slate-800">
                <img
                  src="/photo-card.jpg"
                  alt="Akash Kumar Singh"
                  className="w-full object-cover object-top"
                  draggable={false}
                />
                {/* Specular glare */}
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
              transition={{ delay: 1.0, type: 'spring', stiffness: 220 }}
              className="absolute -top-3 -right-3 flex items-center gap-2 glass rounded-2xl px-3 py-1.5 shadow-lg"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="text-xs font-mono text-slate-600 dark:text-slate-300">Open to work</span>
            </motion.div>

            {/* Badge — MCA · AI & ML */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, type: 'spring', stiffness: 220 }}
              className="absolute -bottom-3 -left-3 flex items-center gap-2 glass rounded-2xl px-3 py-1.5 shadow-lg"
            >
              <span className="text-xs font-mono text-slate-600 dark:text-slate-300">MCA · AI & ML</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 z-10"
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}>
          <ArrowDown size={15} />
        </motion.div>
      </motion.div>
    </section>
  )
}
