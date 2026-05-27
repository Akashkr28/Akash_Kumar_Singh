import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ExternalLink, Radio, BarChart2, CheckSquare, Layers,
} from 'lucide-react'
import { GithubIcon } from './BrandIcons'
import {
  SiReact, SiTypescript, SiNodedotjs, SiRedis,
  SiApachekafka, SiLeaflet, SiJavascript,
  SiNextdotjs, SiPostgresql, SiExpress,
} from 'react-icons/si'
import type { IconType } from 'react-icons'

gsap.registerPlugin(ScrollTrigger)

/* ─── Types ─────────────────────────────────────────────── */
interface ProjectMedia {
  /** 'image' = screenshot, 'video' = local mp4, 'youtube' = muted autoplay embed */
  type: 'image' | 'video' | 'youtube'
  /** Path relative to /public — used for image / video types */
  src?: string
  /** YouTube video ID — used for youtube type */
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
  /** Optional: provide a screenshot or screen-recording to show in the preview pane */
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
    liveUrl: 'https://your-tracker-url.com',            // ← replace with real URL
    githubUrl: 'https://github.com/Akashkr28/location-tracker',
    icon: <Radio size={28} />, highlight: 'cyan', badge: 'Real-time',
    // media: { type: 'video', src: '/previews/location-tracker.mp4' },
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

/* ─── Browser mockup preview ─────────────────────────────── */
function MockBrowser({ project }: { project: Project }) {
  const cls = palette[project.highlight]
  const { media } = project

  return (
    <div className="rounded-xl overflow-hidden border border-slate-800 shadow-2xl group/browser">
      {/* Chrome bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-950 border-b border-slate-800">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 shrink-0" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 shrink-0" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 shrink-0" />
        <div className="flex-1 mx-3">
          <div className="bg-slate-800/80 rounded px-3 py-0.5 text-[11px] text-slate-500 font-mono truncate">
            {project.liveUrl}
          </div>
        </div>
        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border border-current/20 shrink-0 ${cls.text}`}>
          {project.badge}
        </span>
      </div>

      {/* ── Preview canvas ── */}
      <div className="relative aspect-video overflow-hidden">

        {/* ── Case 1: Screenshot image ── */}
        {media?.type === 'image' && (
          <img
            src={media.src}
            alt={`${project.title} preview`}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/browser:scale-105"
          />
        )}

        {/* ── Case 2: Demo video (auto-plays silently) ── */}
        {media?.type === 'video' && (
          <video
            src={media.src}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        )}

        {/* ── Case 3: YouTube embed — muted autoplay loop, no controls ── */}
        {media?.type === 'youtube' && (
          <iframe
            className="absolute inset-0 w-full h-full pointer-events-none"
            src={`https://www.youtube.com/embed/${media.videoId}?autoplay=1&mute=1&loop=1&playlist=${media.videoId}&controls=0&modestbranding=1&rel=0&playsinline=1&disablekb=1`}
            title="Project demo"
            allow="autoplay; encrypted-media"
            frameBorder="0"
          />
        )}

        {/* ── Case 4: Placeholder (no media provided) ── */}
        {!media && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, rgba(${cls.rgb},0.10) 0%, #020617 55%, rgba(${cls.rgb},0.04) 100%)` }}
          >
            <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
            <div
              className="absolute w-44 h-44 rounded-full blur-3xl pointer-events-none"
              style={{ background: `rgba(${cls.rgb},0.18)` }}
            />
            <div className={`relative z-10 p-5 rounded-2xl ${cls.bg} ${cls.text}`}>
              {project.icon}
            </div>
            {/* Corner dots */}
            {(['top-3 left-3', 'bottom-3 right-3'] as const).map(pos => (
              <div key={pos} className={`absolute ${pos} flex gap-1 opacity-25`}>
                {[0,1,2].map(d => (
                  <div key={d} className="w-1 h-1 rounded-full" style={{ backgroundColor: cls.hex }} />
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Overlay hint shown on image/video when no media: "Add preview" label */}
        {!media && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-slate-950/70 text-[10px] font-mono text-slate-600 pointer-events-none whitespace-nowrap">
            add media → see below
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Project card ───────────────────────────────────────── */
function ProjectCard({ project }: { project: Project }) {
  const cls = palette[project.highlight]
  return (
    <div className="group space-y-4">
      <MockBrowser project={project} />

      {/* Title */}
      <h3 className={`text-lg font-bold text-white transition-colors duration-200 group-hover:${cls.text}`}>
        {project.title}
      </h3>

      {/* Tech logos */}
      <div className="flex flex-wrap items-center gap-2">
        {project.tech.map(t => {
          const Icon = techIcons[t]
          return Icon ? (
            <div
              key={t}
              title={t}
              className="p-1.5 rounded-lg bg-slate-800/80 border border-slate-700/50 hover:border-slate-600 transition-all hover:scale-110"
            >
              <Icon size={14} color={cls.hex} style={{ opacity: 0.75 }} />
            </div>
          ) : (
            <span key={t} className="text-[10px] font-mono px-2 py-1 rounded-md bg-slate-800/80 border border-slate-700/50 text-slate-400">
              {t}
            </span>
          )
        })}
      </div>

      {/* Description */}
      <p className="text-slate-400 text-sm leading-relaxed">
        {project.shortDesc}
      </p>

      {/* Links */}
      <div className="flex items-center gap-5">
        <a
          href={project.githubUrl} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-white transition-colors"
        >
          <GithubIcon size={14} /> Source
        </a>
        <a
          href={project.liveUrl} target="_blank" rel="noopener noreferrer"
          className={`flex items-center gap-1.5 text-xs ${cls.text} opacity-80 hover:opacity-100 transition-opacity`}
        >
          <ExternalLink size={13} /> Live Demo
        </a>
      </div>
    </div>
  )
}

/* ─── Main export ────────────────────────────────────────── */
export default function Projects() {
  const sectionRef  = useRef<HTMLElement>(null)
  const lineFillRef = useRef<HTMLDivElement>(null)
  const dotRefs     = useRef<(HTMLDivElement | null)[]>([])
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Line grows as you scroll */
      gsap.fromTo(lineFillRef.current,
        { scaleY: 0 },
        {
          scaleY: 1, ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 55%',
            end:   'bottom 65%',
            scrub: 1.5,
          },
        }
      )

      /* Dots pop in */
      dotRefs.current.forEach(dot => {
        if (!dot) return
        gsap.fromTo(dot,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2.5)',
            scrollTrigger: { trigger: dot, start: 'top 68%', once: true } }
        )
      })

      /* Cards slide in from left / right */
      cardRefs.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(card,
          { x: i % 2 === 0 ? -80 : 80, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 80%', once: true } }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-20 text-center">
          <p className="font-mono text-cyan-400 text-xs tracking-[0.3em] uppercase mb-3">02. Projects</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Things I've Built</h2>
          <p className="text-slate-500 mt-2 text-sm">{projects.length} projects · all live and deployed</p>
        </div>

        {/* ── Timeline container ── */}
        <div className="relative">

          {/* Background track */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-slate-800/60 hidden md:block" />

          {/* Animated colour fill */}
          <div
            ref={lineFillRef}
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] origin-top hidden md:block"
            style={{
              background: 'linear-gradient(to bottom, #22d3ee 0%, #4ade80 50%, #a78bfa 100%)',
              transform: 'scaleY(0)',
            }}
          />

          {/* Project rows */}
          <div className="flex flex-col" style={{ gap: '6rem' }}>
            {projects.map((project, i) => {
              const isLeft = i % 2 === 0
              return (
                <div key={project.title} className="relative">

                  {/* ── Desktop: alternating layout ── */}
                  <div className="hidden md:flex items-start">
                    {/* Left half */}
                    <div className="w-[calc(50%-32px)]">
                      {isLeft && (
                        <div ref={el => { cardRefs.current[i] = el }} className="pr-12">
                          <ProjectCard project={project} />
                        </div>
                      )}
                    </div>

                    {/* Centre dot */}
                    <div className="w-16 flex justify-center items-start pt-14 shrink-0 z-10">
                      <div
                        ref={el => { dotRefs.current[i] = el }}
                        className="w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 ring-[6px] ring-cyan-400/10"
                        style={{ transform: 'scale(0)', opacity: 0 }}
                      />
                    </div>

                    {/* Right half */}
                    <div className="w-[calc(50%-32px)]">
                      {!isLeft && (
                        <div ref={el => { cardRefs.current[i] = el }} className="pl-12">
                          <ProjectCard project={project} />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ── Mobile: single column with left accent ── */}
                  <div className="flex md:hidden gap-5 items-start">
                    <div className="flex flex-col items-center gap-0 pt-1 shrink-0">
                      <div className="w-3 h-3 rounded-full border-2 border-cyan-400 bg-slate-950 shrink-0" />
                      <div className="flex-1 w-px bg-gradient-to-b from-cyan-400/30 to-transparent mt-1" style={{ minHeight: '100%' }} />
                    </div>
                    <div ref={el => { cardRefs.current[i] = el }} className="flex-1 pb-2">
                      <ProjectCard project={project} />
                    </div>
                  </div>

                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
