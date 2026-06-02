'use client'
import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, GraduationCap, Briefcase, Cpu, Lightbulb, TrendingUp } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─── Milestone data ─────────────────────────────────────── */
type MilestoneType = 'education' | 'work' | 'pivot' | 'tech' | 'current'

interface Milestone {
  period: string
  title: string
  place: string
  desc: string
  bullets?: string[]
  note?: string
  type: MilestoneType
}

const milestones: Milestone[] = [
  {
    period: '2011',
    title: 'Secondary Education',
    place: 'Kasidih High School',
    desc: 'Completed 10th Board Examination — the first step of a long academic journey.',
    type: 'education',
  },
  {
    period: '2013',
    title: 'Higher Secondary Education',
    place: 'Kasidih High School',
    desc: 'Completed 12th Board Examination, building a strong academic foundation.',
    type: 'education',
  },
  {
    period: '2016',
    title: 'Graduation — B.Com (Hons)',
    place: 'Karim City College',
    desc: 'Completed Bachelor of Commerce with Honours, building foundational knowledge in business, finance, and management.',
    type: 'education',
  },
  {
    period: '2017 – 2020',
    title: 'Professional Experience',
    place: 'Chartered Accountant Firm',
    desc: 'Worked gaining hands-on experience across diverse business functions:',
    bullets: [
      'Accounting operations',
      'Reconciliation',
      'Financial documentation',
      'Client coordination',
      'Business workflows',
    ],
    note: 'This period helped develop professional discipline and analytical thinking.',
    type: 'work',
  },
  {
    period: '2020 – 2021',
    title: 'Skill Development Phase',
    place: 'Self-Directed Learning',
    desc: 'During the pandemic, focused extensively on self-learning and upskilling through online resources and technology exploration.',
    note: 'This phase marked the beginning of the transition toward the tech industry.',
    type: 'pivot',
  },
  {
    period: '2021 – 2025',
    title: 'MBA',
    place: 'IGNOU',
    desc: 'Pursued MBA to strengthen understanding of business management, operations, and organisational systems.',
    note: 'Result Awaited',
    type: 'education',
  },
  {
    period: '2022 – Present',
    title: 'Phoenix Engineers',
    place: 'Working Professional',
    desc: 'Currently working while simultaneously building technical expertise in software development and modern technologies. Responsibilities include:',
    bullets: [
      'Invoicing systems',
      'Reconciliation',
      'Reporting workflows',
      'Operational coordination',
    ],
    type: 'work',
  },
  {
    period: '2025 – Present',
    title: 'Transition Into Technology',
    place: 'Full-Stack Developer',
    desc: 'Actively transitioning into the technology field through:',
    bullets: [
      'Full-stack development',
      'Real-time applications',
      'Backend systems',
      'Cloud technologies',
      'AI-integrated applications',
    ],
    note: 'Built and deploying multiple live projects — Kafka-based Live Location Tracker, PulseBoard (Real-Time Polling System), and interactive scalable web applications.',
    type: 'tech',
  },
  {
    period: '2025 – Present',
    title: 'MCA — Artificial Intelligence & Machine Learning',
    place: 'Amity University Online',
    desc: 'Currently pursuing MCA with specialisation in AI & ML, focused on:',
    bullets: [
      'Scalable software systems',
      'AI-powered applications',
      'Backend architecture',
      'Modern web and mobile development',
    ],
    type: 'current',
  },
]

/* ─── Config per type ────────────────────────────────────── */
const typeConfig: Record<MilestoneType, {
  rgb: string; hex: string; label: string; Icon: React.ComponentType<{ size?: number }>
}> = {
  education: { rgb: '34,211,238',  hex: '#22d3ee', label: 'Education',  Icon: GraduationCap },
  work:      { rgb: '251,191,36',  hex: '#fbbf24', label: 'Experience', Icon: Briefcase    },
  pivot:     { rgb: '167,139,250', hex: '#a78bfa', label: 'Pivot',      Icon: Lightbulb    },
  tech:      { rgb: '74,222,128',  hex: '#4ade80', label: 'Tech',       Icon: Cpu          },
  current:   { rgb: '56,189,248',  hex: '#38bdf8', label: 'Current',    Icon: TrendingUp   },
}

/* ─── Single milestone card ─────────────────────────────── */
function MilestoneCard({ milestone, index }: { milestone: Milestone; index: number }) {
  const cfg = typeConfig[milestone.type]
  const isLeft = index % 2 === 0

  return (
    <div className="relative flex items-start gap-0 md:gap-0">

      {/* ── Desktop alternating layout ── */}
      <div className="hidden md:grid w-full" style={{ gridTemplateColumns: '1fr 64px 1fr' }}>

        {/* Left cell */}
        <div className="pr-10 flex justify-end">
          {isLeft && (
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md"
            >
              <Card milestone={milestone} cfg={cfg} />
            </motion.div>
          )}
        </div>

        {/* Centre dot */}
        <div className="flex justify-center items-start pt-6">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, delay: 0.15, type: 'spring', stiffness: 260 }}
            className="w-5 h-5 rounded-full border-2 flex items-center justify-center z-10 relative"
            style={{
              borderColor: cfg.hex,
              backgroundColor: '#020617',
              boxShadow: `0 0 14px ${cfg.hex}60`,
            }}
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cfg.hex }} />
          </motion.div>
        </div>

        {/* Right cell */}
        <div className="pl-10 flex justify-start">
          {!isLeft && (
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md"
            >
              <Card milestone={milestone} cfg={cfg} />
            </motion.div>
          )}
        </div>
      </div>

      {/* ── Mobile single column ── */}
      <div className="flex md:hidden gap-4 w-full">
        <div className="flex flex-col items-center gap-0 shrink-0 pt-1">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 260 }}
            className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
            style={{ borderColor: cfg.hex, backgroundColor: '#020617' }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.hex }} />
          </motion.div>
          <div className="flex-1 w-px mt-1" style={{ background: `linear-gradient(to bottom, ${cfg.hex}40, transparent)`, minHeight: '100%' }} />
        </div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="flex-1 pb-4"
        >
          <Card milestone={milestone} cfg={cfg} />
        </motion.div>
      </div>
    </div>
  )
}

/* ─── Card body ─────────────────────────────────────────── */
function Card({
  milestone, cfg,
}: {
  milestone: Milestone
  cfg: { rgb: string; hex: string; label: string; Icon: React.ComponentType<{ size?: number }> }
}) {
  const { Icon } = cfg
  return (
    <div
      className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm p-6 transition-all duration-300 hover:border-opacity-60 group"
      style={{ '--brand': cfg.hex } as React.CSSProperties}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = `${cfg.hex}40`
        el.style.boxShadow = `0 0 32px ${cfg.hex}18`
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = ''
        el.style.boxShadow = ''
      }}
    >
      {/* Header row */}
      <div className="flex items-start gap-3 mb-3">
        <div
          className="p-2 rounded-lg shrink-0 mt-0.5"
          style={{ background: `${cfg.hex}18`, color: cfg.hex }}
        >
          <Icon size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center flex-wrap gap-2 mb-1">
            <span
              className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
              style={{ color: cfg.hex, borderColor: `${cfg.hex}40`, background: `${cfg.hex}12` }}
            >
              {cfg.label}
            </span>
            <span className="text-[11px] font-mono text-slate-500">{milestone.period}</span>
          </div>
          <h3 className="text-white font-bold text-base leading-snug">{milestone.title}</h3>
          <p className="text-xs font-mono mt-0.5" style={{ color: cfg.hex }}>{milestone.place}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-400 text-sm leading-relaxed">{milestone.desc}</p>

      {/* Bullet list */}
      {milestone.bullets && (
        <ul className="mt-3 space-y-1.5">
          {milestone.bullets.map(b => (
            <li key={b} className="flex items-center gap-2 text-slate-300 text-sm">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: cfg.hex }} />
              {b}
            </li>
          ))}
        </ul>
      )}

      {/* Note */}
      {milestone.note && (
        <p className="mt-3 text-xs text-slate-500 italic leading-relaxed border-t border-slate-800 pt-3">
          {milestone.note}
        </p>
      )}
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────────── */
export default function Journey() {
  const heroRef      = useRef(null)
  const heroInView   = useInView(heroRef, { once: true })
  const timelineRef  = useRef<HTMLDivElement>(null)
  const bgPathRef    = useRef<SVGPathElement>(null)
  const animPathRef  = useRef<SVGPathElement>(null)

  /* Build a wavy bezier path that matches the container height */
  useEffect(() => {
    const container = timelineRef.current
    const bgPath    = bgPathRef.current
    const animPath  = animPathRef.current
    if (!container || !bgPath || !animPath) return

    const CX  = 80   // centre x of 160-px-wide SVG
    const AMP = 52   // how far the wave swings each side

    function buildPath(h: number) {
      const segs = milestones.length + 1
      const segH = h / segs
      let d = `M ${CX},0`
      for (let i = 0; i < segs; i++) {
        const yEnd = (i + 1) * segH
        const side = i % 2 === 0 ? CX - AMP : CX + AMP
        d += ` C ${side},${i * segH + segH * 0.35} ${side},${i * segH + segH * 0.65} ${CX},${yEnd}`
      }
      return d
    }

    // Capture as non-null for use inside closures
    const el   = container as HTMLDivElement
    const bg   = bgPath   as SVGPathElement
    const anim = animPath as SVGPathElement

    let st: ScrollTrigger | null = null

    function apply() {
      const h = el.offsetHeight
      const d = buildPath(h)
      bg.setAttribute('d', d)
      anim.setAttribute('d', d)

      const len = anim.getTotalLength()
      gsap.set(anim, { strokeDasharray: len, strokeDashoffset: len })

      st?.kill()
      st = ScrollTrigger.create({
        trigger: el,
        start: 'top 60%',
        end: 'bottom 70%',
        scrub: 1.8,
        onUpdate: (self) => {
          anim.style.strokeDashoffset = `${len * (1 - self.progress)}`
        },
      })
    }

    apply()

    const ro = new ResizeObserver(apply)
    ro.observe(el)

    return () => { ro.disconnect(); st?.kill() }
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-x-hidden">

      {/* Ambient top glow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[120px] opacity-20"
          style={{ background: 'radial-gradient(ellipse, #22d3ee 0%, #4ade80 60%, transparent 100%)' }} />
      </div>

      {/* ── Fixed top bar ── */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/60"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm font-mono group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </Link>
          <span className="font-mono text-cyan-400 text-sm font-bold tracking-wider">&lt;AKS /&gt;</span>
        </div>
      </motion.header>

      {/* ── Hero ── */}
      <section ref={heroRef} className="pt-36 pb-16 px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-cyan-400 text-xs tracking-[0.35em] uppercase mb-5">
            A Personal Timeline
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            <span className="text-white">From </span>
            <span style={{
              background: 'linear-gradient(135deg, #fbbf24 0%, #f97316 40%, #22d3ee 80%, #4ade80 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Commerce
            </span>
            <span className="text-white"> to </span>
            <span style={{
              background: 'linear-gradient(135deg, #22d3ee 0%, #4ade80 60%, #a78bfa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Tech
            </span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            A decade of discipline, reinvention, and relentless growth — from ledgers and balance sheets to distributed systems and AI.
          </p>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mt-10"
        >
          {(Object.entries(typeConfig) as [MilestoneType, typeof typeConfig[MilestoneType]][]).map(([, cfg]) => (
            <div key={cfg.label} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cfg.hex }} />
              <span className="text-xs font-mono text-slate-500">{cfg.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 flex flex-col items-center gap-2 text-slate-600"
        >
          <span className="text-xs font-mono tracking-widest uppercase">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-cyan-400/60 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── Timeline ── */}
      <section className="relative pb-32 px-6 z-10">
        <div className="max-w-5xl mx-auto">

          {/* ── Wavy SVG line (desktop only) ── */}
          <div ref={timelineRef} className="relative">
            <svg
              className="absolute top-0 left-1/2 -translate-x-[80px] h-full hidden md:block pointer-events-none overflow-visible"
              width="160"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="journeyWaveGrad" x1="0" y1="0%" x2="0" y2="100%">
                  <stop offset="0%"   stopColor="#22d3ee" />
                  <stop offset="28%"  stopColor="#fbbf24" />
                  <stop offset="55%"  stopColor="#a78bfa" />
                  <stop offset="78%"  stopColor="#4ade80" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
                <filter id="waveGlow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              {/* Grey track — always shown */}
              <path
                ref={bgPathRef}
                fill="none"
                stroke="rgba(30,41,59,0.55)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {/* Animated colour wave */}
              <path
                ref={animPathRef}
                fill="none"
                stroke="url(#journeyWaveGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                filter="url(#waveGlow)"
              />
            </svg>

            <div className="flex flex-col" style={{ gap: '4rem' }}>
              {milestones.map((m, i) => (
                <MilestoneCard key={`${m.period}-${m.title}`} milestone={m} index={i} />
              ))}
            </div>
          </div>

          {/* End cap */}
          <div className="hidden md:flex justify-center mt-16">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="flex flex-col items-center gap-3"
            >
              <div
                className="w-8 h-8 rounded-full border-2 border-cyan-400 flex items-center justify-center"
                style={{ boxShadow: '0 0 24px #22d3ee60', backgroundColor: '#020617' }}
              >
                <TrendingUp size={14} className="text-cyan-400" />
              </div>
              <p className="font-mono text-xs text-cyan-400 tracking-widest uppercase">Still Writing</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="pb-20 px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-lg mx-auto"
        >
          <p className="text-slate-500 text-sm font-mono mb-6">
            The journey continues — one commit at a time.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-mono font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors"
          >
            <ArrowLeft size={15} />
            Back to Portfolio
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
