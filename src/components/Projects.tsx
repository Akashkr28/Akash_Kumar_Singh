import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { GithubIcon } from './BrandIcons'

/* ─── Types ─────────────────────────────────────────────── */
interface ProjectMedia {
  type: 'image' | 'video' | 'youtube'
  src?: string
  videoId?: string
}

interface Project {
  title: string
  shortDesc: string
  tech: string[]
  liveUrl: string
  githubUrl: string
  highlight: 'cyan' | 'green' | 'violet' | 'amber' | 'rose' | 'sky'
  badge: string
  media?: ProjectMedia
}

/* ─── Colour palette ─────────────────────────────────────── */
const palette = {
  cyan:   { rgb: '34,211,238',  hex: '#22d3ee' },
  green:  { rgb: '74,222,128',  hex: '#4ade80' },
  violet: { rgb: '167,139,250', hex: '#a78bfa' },
  amber:  { rgb: '251,191,36',  hex: '#fbbf24' },
  rose:   { rgb: '251,113,133', hex: '#fb7185' },
  sky:    { rgb: '56,189,248',  hex: '#38bdf8'  },
}

/* ─── Project data ───────────────────────────────────────── */
const projects: Project[] = [
  {
    title: 'Live Location Tracker',
    shortDesc: 'Real-time GPS map powered by Apache Kafka for high-throughput streaming. Multiple users share live positions with sub-second latency.',
    tech: ['React', 'Kafka', 'Leaflet.js', 'Node.js'],
    liveUrl: 'https://your-tracker-url.com',
    githubUrl: 'https://github.com/Akashkr28/location-tracker',
    highlight: 'cyan', badge: 'Real-time',
  },
  {
    title: 'Pulseboard',
    shortDesc: 'Live polling platform for instant feedback. Create polls, share links, and watch results update as people vote — built for classrooms and teams.',
    tech: ['React', 'TypeScript', 'Socket.io', 'Node.js', 'MongoDB'],
    liveUrl: 'https://pulse-board-live-poll-for-feedback.vercel.app',
    githubUrl: 'https://github.com/Akashkr28/pulseboard',
    highlight: 'green', badge: 'Live',
    media: { type: 'video', src: '/previews/pulseboard.mp4' },
  },
  {
    title: '1 Million Checkboxes',
    shortDesc: 'One million checkboxes shared globally in real time. A viral experiment in distributed state, collaborative UX, and web scale.',
    tech: ['React', 'Redis', 'Node.js', 'JavaScript'],
    liveUrl: 'https://million-checkboxes-xtg8.onrender.com',
    githubUrl: 'https://github.com/Akashkr28/1m-checkboxes',
    highlight: 'violet', badge: 'Viral',
    media: { type: 'video', src: '/previews/1m-checkboxes.mp4' },
  },
  {
    title: 'ChaiForm — Form Builder SaaS',
    shortDesc: 'Production-grade Typeform-inspired form builder on a Turborepo monorepo. Dynamic field schemas, Google OAuth, response analytics with CSV export, email notifications, and honeypot spam protection.',
    tech: ['Next.js', 'TypeScript', 'Express', 'PostgreSQL', 'Turborepo'],
    liveUrl: 'https://chaiforms-web-hjco.onrender.com',
    githubUrl: 'https://github.com/Akashkr28/ChaiForm_Form_Builder_SaaS',
    highlight: 'amber', badge: 'SaaS',
    media: { type: 'youtube', videoId: 'vEyni4YnQAw' },
  },
]

const AUTO_ADVANCE_MS = 6000

/* ─── Main component ─────────────────────────────────────── */
export default function Projects() {
  const [idx, setIdx]       = useState(0)
  const [paused, setPaused] = useState(false)
  const [prog, setProg]     = useState(0)

  const project = projects[idx]
  const cls     = palette[project.highlight]

  const goTo = useCallback((next: number) => {
    setIdx((next + projects.length) % projects.length)
    setProg(0)
  }, [])

  /* Auto-advance + rAF progress bar */
  useEffect(() => {
    if (paused) return
    const start = performance.now()
    let rafId: number
    const tick = (now: number) => {
      const elapsed = now - start
      setProg(Math.min(elapsed / AUTO_ADVANCE_MS, 1))
      if (elapsed < AUTO_ADVANCE_MS) {
        rafId = requestAnimationFrame(tick)
      } else {
        setIdx(i => (i + 1) % projects.length)
        setProg(0)
      }
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [idx, paused])

  return (
    <section id="projects" className="py-24 relative">

      {/* ── Section header ── */}
      <div className="text-center mb-10 px-6">
        <p className="font-mono text-cyan-400 text-xs tracking-[0.3em] uppercase mb-3">02. Projects</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Things I've Built</h2>
        <p className="text-slate-500 mt-2 text-sm">{projects.length} projects · all live and deployed</p>
      </div>

      {/* ══ Cinematic showcase ══ */}
      <div
        className="relative overflow-hidden"
        style={{ minHeight: '85vh' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >

        {/* ── Background ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`bg-${project.title}`}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            {project.media?.type === 'video' && (
              <video
                src={project.media.src}
                autoPlay muted loop playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            {project.media?.type === 'youtube' && (
              <img
                src={`https://img.youtube.com/vi/${project.media.videoId}/maxresdefault.jpg`}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            {!project.media && (
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse at 72% 28%, rgba(${cls.rgb},0.45) 0%, #020617 62%)`,
                }}
              />
            )}

            {/* Left-heavy dark overlay — text lives in the dark left zone */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(105deg, rgba(2,6,23,0.97) 0%, rgba(2,6,23,0.88) 30%, rgba(2,6,23,0.55) 60%, rgba(2,6,23,0.18) 100%)',
              }}
            />
            {/* Bottom vignette */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(2,6,23,0.92) 0%, transparent 42%)' }}
            />
          </motion.div>
        </AnimatePresence>

        {/* ── Top progress bar ── */}
        <div className="absolute top-0 left-0 right-0 h-[2px] z-20 bg-white/8">
          <div
            className="h-full"
            style={{ width: `${prog * 100}%`, backgroundColor: cls.hex, transition: 'none' }}
          />
        </div>

        {/* ── Main content ── */}
        <div className="relative z-10 min-h-[85vh] flex flex-col justify-between px-8 md:px-16 lg:px-24 py-10">

          {/* Top row: counter + badge */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-white/20 text-[10px] tracking-[0.5em] uppercase">
              {String(idx + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(projects.length).padStart(2, '0')}
            </span>
            <span
              className="text-[10px] font-mono px-3 py-1 rounded-full border tracking-[0.25em] uppercase"
              style={{ color: cls.hex, borderColor: `${cls.hex}45`, background: `${cls.hex}14` }}
            >
              {project.badge}
            </span>
          </div>

          {/* Center: editorial content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 55 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-[660px]"
            >
              {/* Small eyebrow label */}
              <p className="font-mono text-white/28 text-[11px] tracking-[0.45em] uppercase mb-2">
                Featured Project
              </p>

              {/* ── Giant watermark number (RTFKT style) ── */}
              <p
                className="font-black leading-none tracking-tighter select-none"
                style={{
                  fontSize: 'clamp(90px, 19vw, 230px)',
                  color: 'rgba(255,255,255,0.055)',
                  WebkitTextStroke: '1px rgba(255,255,255,0.07)',
                  lineHeight: 0.88,
                }}
              >
                {String(idx + 1).padStart(2, '0')}.
              </p>

              {/* Project title — overlaps the watermark number */}
              <h3
                className="font-black text-white tracking-tight leading-[1.05] mb-6"
                style={{
                  fontSize: 'clamp(26px, 4.8vw, 60px)',
                  marginTop: 'clamp(-24px, -4vw, -56px)',
                }}
              >
                {project.title}
              </h3>

              {/* ── Split pill — [BADGE | tech · tech · tech] ── */}
              <div className="inline-flex items-center rounded-full overflow-hidden mb-5 border border-white/10">
                <span
                  className="px-4 py-1.5 text-[11px] font-mono font-bold tracking-[0.2em] uppercase"
                  style={{ backgroundColor: cls.hex, color: '#020617' }}
                >
                  {project.badge}
                </span>
                <span className="px-4 py-1.5 text-[11px] font-mono text-white/45 bg-white/[0.05] tracking-wide">
                  {project.tech.slice(0, 4).join(' · ')}
                </span>
              </div>

              {/* Description */}
              <p className="text-white/45 text-sm md:text-[15px] leading-relaxed mb-9 max-w-[460px]">
                {project.shortDesc}
              </p>

              {/* CTA links */}
              <div className="flex items-center gap-7">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-2.5 text-[11px] font-mono font-bold tracking-[0.2em] uppercase rounded-full hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: cls.hex, color: '#020617' }}
                >
                  <ExternalLink size={12} /> Live Demo
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[11px] font-mono text-white/35 hover:text-white transition-colors tracking-[0.2em] uppercase"
                >
                  <GithubIcon size={14} /> Source
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Bottom bar ── */}
          <div className="flex items-end justify-between border-t border-white/[0.06] pt-5">

            {/* Left: project name + full tech stack */}
            <div>
              <p className="font-mono text-white/50 text-[11px] tracking-[0.35em] uppercase">
                {project.title}
              </p>
              <p className="font-mono text-white/18 text-[10px] tracking-wider uppercase mt-1">
                {project.tech.join(' · ')}
              </p>
            </div>

            {/* Right: navigation */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => goTo(idx - 1)}
                aria-label="Previous project"
                className="p-2 border border-white/10 rounded-full text-white/30 hover:text-white hover:border-white/25 transition-all duration-200"
              >
                <ChevronLeft size={15} />
              </button>

              {/* Dot indicators */}
              <div className="flex items-center gap-1.5">
                {projects.map((p, i) => (
                  <button
                    key={p.title}
                    onClick={() => goTo(i)}
                    aria-label={p.title}
                    className={`h-[3px] rounded-full transition-all duration-300 ${
                      i === idx ? 'w-9' : 'w-2.5 bg-white/20 hover:bg-white/35'
                    }`}
                    style={i === idx ? { backgroundColor: cls.hex } : {}}
                  />
                ))}
              </div>

              <button
                onClick={() => goTo(idx + 1)}
                aria-label="Next project"
                className="p-2 border border-white/10 rounded-full text-white/30 hover:text-white hover:border-white/25 transition-all duration-200"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Side arrows (large screens) ── */}
        <button
          onClick={() => goTo(idx - 1)}
          aria-label="Previous project"
          className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 items-center justify-center border border-white/10 rounded-full text-white/25 bg-black/20 hover:text-white hover:bg-black/40 hover:border-white/20 transition-all duration-200"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => goTo(idx + 1)}
          aria-label="Next project"
          className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 items-center justify-center border border-white/10 rounded-full text-white/25 bg-black/20 hover:text-white hover:bg-black/40 hover:border-white/20 transition-all duration-200"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  )
}
