import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ExternalLink, Radio, BarChart2, CheckSquare, Layers,
  ChevronLeft, ChevronRight,
} from 'lucide-react'
import { GithubIcon } from './BrandIcons'
import {
  SiReact, SiTypescript, SiNodedotjs, SiRedis,
  SiApachekafka, SiLeaflet, SiJavascript,
  SiNextdotjs, SiPostgresql, SiExpress,
} from 'react-icons/si'
import type { IconType } from 'react-icons'

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
  icon: React.ReactNode
  highlight: 'cyan' | 'green' | 'violet' | 'amber' | 'rose' | 'sky'
  badge: string
  media?: ProjectMedia
}

/* ─── Tech icon lookup ───────────────────────────────────── */
const techIcons: Record<string, IconType> = {
  'React':      SiReact,
  'TypeScript': SiTypescript,
  'JavaScript': SiJavascript,
  'Node.js':    SiNodedotjs,
  'Redis':      SiRedis,
  'Kafka':      SiApachekafka,
  'Leaflet.js': SiLeaflet,
  'Next.js':    SiNextdotjs,
  'PostgreSQL': SiPostgresql,
  'Express':    SiExpress,
}

/* ─── Colour palette ─────────────────────────────────────── */
const palette = {
  cyan:   { rgb: '34,211,238',  text: 'text-cyan-400',   bg: 'bg-cyan-400/10',   hex: '#22d3ee' },
  green:  { rgb: '74,222,128',  text: 'text-green-400',  bg: 'bg-green-400/10',  hex: '#4ade80' },
  violet: { rgb: '167,139,250', text: 'text-violet-400', bg: 'bg-violet-400/10', hex: '#a78bfa' },
  amber:  { rgb: '251,191,36',  text: 'text-amber-400',  bg: 'bg-amber-400/10',  hex: '#fbbf24' },
  rose:   { rgb: '251,113,133', text: 'text-rose-400',   bg: 'bg-rose-400/10',   hex: '#fb7185' },
  sky:    { rgb: '56,189,248',  text: 'text-sky-400',    bg: 'bg-sky-400/10',    hex: '#38bdf8' },
}

/* ─── Project data ───────────────────────────────────────── */
const projects: Project[] = [
  {
    title: 'Live Location Tracker',
    shortDesc: 'Real-time GPS map powered by Apache Kafka for high-throughput streaming. Multiple users share live positions with sub-second latency.',
    tech: ['React', 'Kafka', 'Leaflet.js', 'Node.js'],
    liveUrl: 'https://your-tracker-url.com',
    githubUrl: 'https://github.com/Akashkr28/location-tracker',
    icon: <Radio size={28} />, highlight: 'cyan', badge: 'Real-time',
  },
  {
    title: 'Pulseboard',
    shortDesc: 'Live polling platform for instant feedback. Create polls, share links, and watch results update as people vote — built for classrooms and teams.',
    tech: ['React', 'TypeScript', 'Socket.io', 'Node.js', 'MongoDB'],
    liveUrl: 'https://pulse-board-live-poll-for-feedback.vercel.app',
    githubUrl: 'https://github.com/Akashkr28/pulseboard',
    icon: <BarChart2 size={28} />, highlight: 'green', badge: 'Live',
    media: { type: 'video', src: '/previews/pulseboard.mp4' },
  },
  {
    title: '1 Million Checkboxes',
    shortDesc: 'One million checkboxes shared globally in real time. A viral experiment in distributed state, collaborative UX, and web scale.',
    tech: ['React', 'Redis', 'Node.js', 'JavaScript'],
    liveUrl: 'https://million-checkboxes-xtg8.onrender.com',
    githubUrl: 'https://github.com/Akashkr28/1m-checkboxes',
    icon: <CheckSquare size={28} />, highlight: 'violet', badge: 'Viral',
    media: { type: 'video', src: '/previews/1m-checkboxes.mp4' },
  },
  {
    title: 'ChaiForm — Form Builder SaaS',
    shortDesc: 'Production-grade Typeform-inspired form builder on a Turborepo monorepo. Dynamic field schemas, Google OAuth, response analytics with CSV export, email notifications, and honeypot spam protection.',
    tech: ['Next.js', 'TypeScript', 'Express', 'PostgreSQL', 'Turborepo', 'tRPC', 'Drizzle ORM', 'Zod'],
    liveUrl: 'https://chaiforms-web-hjco.onrender.com',
    githubUrl: 'https://github.com/Akashkr28/ChaiForm_Form_Builder_SaaS',
    icon: <Layers size={28} />, highlight: 'amber', badge: 'SaaS',
    media: { type: 'youtube', videoId: 'vEyni4YnQAw' },
  },
]

const AUTO_ADVANCE_MS = 5000

/* ─── Shared media renderer (used in screen + reflection) ── */
function ScreenMedia({ media, project, tabIndex }: {
  media?: ProjectMedia
  project: Project
  tabIndex?: number
}) {
  const cls = palette[project.highlight]

  if (media?.type === 'video') return (
    <video
      src={media.src}
      className="w-full h-full object-cover"
      autoPlay muted loop playsInline preload="metadata"
    />
  )

  if (media?.type === 'youtube') return (
    <iframe
      tabIndex={tabIndex ?? 0}
      src={`https://www.youtube.com/embed/${media.videoId}?autoplay=1&mute=1&loop=1&playlist=${media.videoId}&controls=0&modestbranding=1&rel=0&playsinline=1&disablekb=1`}
      className="absolute inset-0 w-full h-full pointer-events-none"
      allow="autoplay; encrypted-media"
      frameBorder="0"
      title={project.title}
    />
  )

  /* Placeholder */
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ background: `linear-gradient(135deg, rgba(${cls.rgb},0.12) 0%, #020617 60%, rgba(${cls.rgb},0.05) 100%)` }}
    >
      <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />
      <div className="absolute w-52 h-52 rounded-full blur-3xl pointer-events-none"
        style={{ background: `rgba(${cls.rgb},0.16)` }} />
      <div className={`relative z-10 p-6 rounded-2xl ${cls.bg} ${cls.text}`}>{project.icon}</div>
    </div>
  )
}

/* ─── Main export ────────────────────────────────────────── */
export default function Projects() {
  const [idx, setIdx]       = useState(0)
  const [paused, setPaused] = useState(false)
  const [prog, setProg]     = useState(0)   // 0–1 progress for the auto-advance bar

  const project = projects[idx]
  const cls     = palette[project.highlight]

  const goTo = useCallback((next: number) => {
    setIdx((next + projects.length) % projects.length)
    setProg(0)
  }, [])

  /* Auto-advance + progress bar */
  useEffect(() => {
    if (paused) return
    const start   = performance.now()
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
    <section id="projects" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/5 to-transparent pointer-events-none" />

      {/* ── Header ── */}
      <div className="mb-14 text-center">
        <p className="font-mono text-cyan-400 text-xs tracking-[0.3em] uppercase mb-3">02. Projects</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Things I've Built</h2>
        <p className="text-slate-500 mt-2 text-sm">{projects.length} projects · all live and deployed</p>
      </div>

      {/* ── 3-D monitor wrapper ── */}
      <div className="max-w-3xl mx-auto" style={{ perspective: '1600px' }}>

        {/* ══ SCREEN ══ */}
        <div
          style={{
            transform: 'rotateX(4deg)',
            transformStyle: 'preserve-3d',
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Auto-advance progress bar — sits above the screen */}
          <div className="h-[2px] rounded-t-full overflow-hidden bg-slate-800/60 mb-0">
            <div
              className="h-full rounded-full transition-none"
              style={{
                width: `${prog * 100}%`,
                background: `linear-gradient(to right, ${cls.hex}, #a78bfa)`,
                transition: paused ? 'none' : undefined,
              }}
            />
          </div>

          {/* Screen body */}
          <div
            className="rounded-xl overflow-hidden border border-slate-700/30 bg-slate-950 shadow-2xl"
            style={{
              boxShadow: `0 0 0 1px rgba(255,255,255,0.04),
                          0 50px 100px rgba(0,0,0,0.75),
                          0 0 80px rgba(${cls.rgb},0.07)`,
            }}
          >
            {/* ── Video / media area ── */}
            <div className="relative aspect-video overflow-hidden bg-slate-950">
              <AnimatePresence mode="wait">
                <motion.div
                  key={project.title}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  <ScreenMedia media={project.media} project={project} />
                </motion.div>
              </AnimatePresence>

              {/* Screen glare — sells the 3D glass surface */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(130deg, rgba(255,255,255,0.05) 0%, transparent 45%)',
                }}
              />
              {/* Inner bezel shadow */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ boxShadow: 'inset 0 0 40px rgba(0,0,0,0.55)' }} />
            </div>

            {/* ── Project info (inside the screen, below video) ── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`info-${project.title}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="px-7 py-5 border-t border-slate-800/60"
              >
                {/* Title row */}
                <div className="flex items-center justify-between gap-4 mb-3">
                  <h3 className="text-white font-bold text-lg leading-tight tracking-tight">
                    {project.title}
                  </h3>
                  <span className={`shrink-0 text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-current/20 ${cls.text}`}>
                    {project.badge}
                  </span>
                </div>

                {/* Tech icons */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {project.tech.map(t => {
                    const Icon = techIcons[t]
                    return Icon ? (
                      <div key={t} title={t}
                        className="p-1.5 rounded-lg bg-slate-800/80 border border-slate-700/50 hover:border-slate-600 transition-all hover:scale-110">
                        <Icon size={13} color={cls.hex} style={{ opacity: 0.8 }} />
                      </div>
                    ) : (
                      <span key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/50 text-slate-400">
                        {t}
                      </span>
                    )
                  })}
                </div>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
                  {project.shortDesc}
                </p>

                {/* Links */}
                <div className="flex items-center gap-5">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-white transition-colors">
                    <GithubIcon size={14} /> Source
                  </a>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 text-xs ${cls.text} opacity-80 hover:opacity-100 transition-opacity`}>
                    <ExternalLink size={13} /> Live Demo
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ══ STAND ══ */}
        <div className="relative flex justify-center h-14 overflow-visible">
          {/* Left leg */}
          <div
            className="absolute bottom-0 w-px h-14 origin-bottom"
            style={{
              left: 'calc(50% - 56px)',
              background: 'linear-gradient(to bottom, rgba(100,116,139,0.6), rgba(51,65,85,0.2))',
              transform: 'rotate(-14deg)',
            }}
          />
          {/* Right leg */}
          <div
            className="absolute bottom-0 w-px h-14 origin-bottom"
            style={{
              right: 'calc(50% - 56px)',
              background: 'linear-gradient(to bottom, rgba(100,116,139,0.6), rgba(51,65,85,0.2))',
              transform: 'rotate(14deg)',
            }}
          />
          {/* Base bar */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-36 rounded-full"
            style={{ background: 'linear-gradient(to right, transparent, rgba(100,116,139,0.45), transparent)' }}
          />
        </div>

        {/* ══ REFLECTION ══ */}
        <div className="relative overflow-hidden h-28 -mt-px">
          {/* Flipped, blurred, faded duplicate of the media only */}
          <div
            className="rounded-xl overflow-hidden border border-slate-700/10"
            style={{
              transform: 'scaleY(-1) scaleX(0.97)',
              transformOrigin: 'top center',
              filter: 'blur(5px)',
              opacity: 0.13,
            }}
          >
            <div className="relative aspect-video overflow-hidden bg-slate-950">
              <ScreenMedia media={project.media} project={project} tabIndex={-1} />
            </div>
          </div>

          {/* Gradient fade — dark floor swallows the reflection */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, rgba(2,6,23,0.35) 0%, #020617 58%)' }}
          />
        </div>
      </div>

      {/* ── Navigation ── */}
      <div className="flex items-center justify-center gap-5 mt-6">
        <button
          onClick={() => goTo(idx - 1)}
          className="p-2 text-slate-600 hover:text-cyan-400 transition-colors"
          aria-label="Previous project"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {projects.map((p, i) => (
            <button
              key={p.title}
              onClick={() => goTo(i)}
              aria-label={p.title}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? 'w-7' : 'w-1.5 bg-slate-700 hover:bg-slate-500'}`}
              style={i === idx ? { backgroundColor: palette[p.highlight].hex } : {}}
            />
          ))}
        </div>

        <button
          onClick={() => goTo(idx + 1)}
          className="p-2 text-slate-600 hover:text-cyan-400 transition-colors"
          aria-label="Next project"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <p className="text-center font-mono text-xs text-slate-700 mt-3 tracking-widest uppercase">
        hover to pause · arrows or dots to navigate
      </p>
    </section>
  )
}
