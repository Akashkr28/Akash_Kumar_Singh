'use client'
import { useRef } from 'react'
import { ExternalLink, Radio, BarChart2, CheckSquare, Layers } from 'lucide-react'
import { GithubIcon } from './BrandIcons'
import {
  SiReact, SiTypescript, SiNodedotjs, SiRedis,
  SiApachekafka, SiLeaflet, SiJavascript,
  SiNextdotjs, SiPostgresql, SiExpress,
} from 'react-icons/si'
import type { IconType } from 'react-icons'

/* ─── Types ─────────────────────────────────────── */
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
  highlight: 'indigo' | 'sky' | 'violet' | 'emerald' | 'rose' | 'amber'
  badge: string
  media?: ProjectMedia
}

/* ─── Tech icon map ──────────────────────────────── */
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

/* ─── Palette ────────────────────────────────────── */
const palette = {
  indigo:  { rgb: '99,102,241',   text: 'text-indigo-600',  bg: 'bg-indigo-50',   hex: '#6366f1' },
  sky:     { rgb: '14,165,233',   text: 'text-sky-600',     bg: 'bg-sky-50',      hex: '#0ea5e9' },
  violet:  { rgb: '139,92,246',   text: 'text-violet-600',  bg: 'bg-violet-50',   hex: '#8b5cf6' },
  emerald: { rgb: '16,185,129',   text: 'text-emerald-600', bg: 'bg-emerald-50',  hex: '#10b981' },
  rose:    { rgb: '244,63,94',    text: 'text-rose-600',    bg: 'bg-rose-50',     hex: '#f43f5e' },
  amber:   { rgb: '245,158,11',   text: 'text-amber-600',   bg: 'bg-amber-50',    hex: '#f59e0b' },
}

/* ─── Project data ───────────────────────────────── */
const projects: Project[] = [
  {
    title: 'Live Location Tracker',
    shortDesc: 'Real-time GPS map powered by Apache Kafka for high-throughput streaming. Multiple users share live positions with sub-second latency.',
    tech: ['React', 'Kafka', 'Leaflet.js', 'Node.js'],
    liveUrl: 'https://your-tracker-url.com',
    githubUrl: 'https://github.com/Akashkr28/location-tracker',
    icon: <Radio size={28} />, highlight: 'indigo', badge: 'Real-time',
  },
  {
    title: 'Pulseboard',
    shortDesc: 'Live polling platform for instant feedback. Create polls, share links, and watch results update as people vote — built for classrooms and teams.',
    tech: ['React', 'TypeScript', 'Socket.io', 'Node.js', 'MongoDB'],
    liveUrl: 'https://pulse-board-live-poll-for-feedback.vercel.app',
    githubUrl: 'https://github.com/Akashkr28/PulseBoard-Live-Poll-for-Feedback',
    icon: <BarChart2 size={28} />, highlight: 'sky', badge: 'Live',
    media: { type: 'video', src: '/previews/pulseboard.mp4' },
  },
  {
    title: '1 Million Checkboxes',
    shortDesc: 'One million checkboxes shared globally in real time. A viral experiment in distributed state, collaborative UX, and web scale.',
    tech: ['React', 'Redis', 'Node.js', 'JavaScript'],
    liveUrl: 'https://million-checkboxes-xtg8.onrender.com',
    githubUrl: 'https://github.com/Akashkr28/1-million-checkboxes',
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

/* ─── Browser mockup ─────────────────────────────── */
function MockBrowser({ project }: { project: Project }) {
  const cls = palette[project.highlight]
  const { media } = project

  return (
    <div className="rounded-xl overflow-hidden shadow-md shadow-slate-200/80 dark:shadow-slate-900/60 group/browser">
      {/* Chrome bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-white/90 dark:bg-slate-900/90 border-b border-slate-100 dark:border-slate-800">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 shrink-0" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 shrink-0" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 shrink-0" />
        <div className="flex-1 mx-3">
          <div className="bg-slate-100 dark:bg-slate-800 rounded px-3 py-0.5 text-[11px] text-slate-400 dark:text-slate-500 font-mono truncate">
            {project.liveUrl}
          </div>
        </div>
        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border shrink-0 ${cls.text} ${cls.bg} border-current/20`}>
          {project.badge}
        </span>
      </div>

      {/* Preview canvas */}
      <div className="relative aspect-video overflow-hidden bg-slate-50 dark:bg-slate-900">
        {media?.type === 'image' && (
          <img
            src={media.src}
            alt={`${project.title} preview`}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/browser:scale-105"
          />
        )}
        {media?.type === 'video' && (
          <video
            src={media.src}
            className="w-full h-full object-cover"
            autoPlay muted loop playsInline preload="metadata"
          />
        )}
        {media?.type === 'youtube' && (
          <iframe
            className="absolute inset-0 w-full h-full pointer-events-none"
            src={`https://www.youtube.com/embed/${media.videoId}?autoplay=1&mute=1&loop=1&playlist=${media.videoId}&controls=0&modestbranding=1&rel=0&playsinline=1&disablekb=1`}
            title="Project demo"
            allow="autoplay; encrypted-media"
            frameBorder="0"
          />
        )}
        {!media && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, rgba(${cls.rgb},0.08) 0%, #f8fafc 55%, rgba(${cls.rgb},0.04) 100%)` }}
          >
            {/* Subtle grid pattern */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                backgroundImage: `linear-gradient(rgba(${cls.rgb},0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(${cls.rgb},0.06) 1px, transparent 1px)`,
                backgroundSize: '32px 32px',
              }}
            />
            <div
              className="absolute w-36 h-36 rounded-full blur-3xl pointer-events-none"
              style={{ background: `rgba(${cls.rgb},0.18)` }}
            />
            <div className={`relative z-10 p-5 rounded-2xl ${cls.bg} ${cls.text} shadow-sm`}>
              {project.icon}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Project card (3-D tilt + glass) ───────────── */
function ProjectCard({ project }: { project: Project }) {
  const cls     = palette[project.highlight]
  const cardRef  = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card  = cardRef.current
    const glare = glareRef.current
    if (!card) return
    const rect  = card.getBoundingClientRect()
    const x     = e.clientX - rect.left
    const y     = e.clientY - rect.top
    const normX = x / rect.width  - 0.5
    const normY = y / rect.height - 0.5
    const rotY  =  normX * 16
    const rotX  = -normY * 10
    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.025,1.025,1.025)`
    card.style.boxShadow = `
      ${-normX * 24}px ${-normY * 16}px 48px rgba(${cls.rgb},0.20),
      0 24px 48px rgba(${cls.rgb},0.10),
      0 2px 8px rgba(0,0,0,0.04)
    `
    if (glare) {
      const gx = (x / rect.width  * 100).toFixed(1)
      const gy = (y / rect.height * 100).toFixed(1)
      glare.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.50) 0%, transparent 60%)`
    }
  }

  const onMouseLeave = () => {
    const card  = cardRef.current
    const glare = glareRef.current
    if (!card) return
    card.style.transform = ''
    card.style.boxShadow = ''
    if (glare) glare.style.background = 'transparent'
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group space-y-4 relative glass rounded-2xl p-4 pb-5"
      style={{ transition: 'transform 0.20s ease, box-shadow 0.20s ease' }}
    >
      {/* Specular glare */}
      <div
        ref={glareRef}
        className="absolute inset-0 rounded-2xl pointer-events-none z-10"
        style={{ mixBlendMode: 'overlay', transition: 'background 0.08s ease' }}
      />

      <MockBrowser project={project} />

      {/* Title */}
      <h3 className={`text-base font-bold text-slate-900 dark:text-white transition-colors duration-200 group-hover:${cls.text} px-1`}>
        {project.title}
      </h3>

      {/* Tech icons */}
      <div className="flex flex-wrap items-center gap-2 px-1">
        {project.tech.map(t => {
          const Icon = techIcons[t]
          return Icon ? (
            <div
              key={t}
              title={t}
              className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 transition-all hover:scale-110 shadow-sm"
            >
              <Icon size={14} color={cls.hex} style={{ opacity: 0.85 }} />
            </div>
          ) : (
            <span key={t} className="text-[10px] font-mono px-2 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 text-slate-500 dark:text-slate-400 shadow-sm">
              {t}
            </span>
          )
        })}
      </div>

      {/* Description */}
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed px-1">
        {project.shortDesc}
      </p>

      {/* Links */}
      <div className="flex items-center gap-5 px-1">
        <a
          href={project.githubUrl} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
        >
          <GithubIcon size={14} /> Source
        </a>
        <a
          href={project.liveUrl} target="_blank" rel="noopener noreferrer"
          className={`flex items-center gap-1.5 text-xs ${cls.text} opacity-80 hover:opacity-100 transition-opacity font-medium`}
        >
          <ExternalLink size={13} /> Live Demo
        </a>
      </div>
    </div>
  )
}

/* ─── Section ────────────────────────────────────── */
export default function Projects() {
  return (
    <section id="projects" className="py-28 relative overflow-hidden">
      {/* Header */}
      <div className="mb-16 text-center px-6">
        <p className="font-mono text-indigo-500 text-xs tracking-[0.3em] uppercase mb-3">02. Projects</p>
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Things I've Built</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">{projects.length} projects · all live and deployed</p>
      </div>

      {/* Infinite marquee — fade edges */}
      <div
        className="relative overflow-hidden"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
          maskImage:        'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
        }}
      >
        <div className="marquee-track flex gap-6 w-max px-6">
          {[...projects, ...projects].map((project, i) => (
            <div key={`${project.title}-${i}`} className="w-[420px] shrink-0">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      <p className="text-center font-mono text-xs text-slate-400 mt-10 tracking-widest uppercase">
        hover to pause · click to explore
      </p>
    </section>
  )
}
