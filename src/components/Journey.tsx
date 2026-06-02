'use client'
import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, GraduationCap, Briefcase, Cpu, Lightbulb, TrendingUp, ArrowRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─── Types ──────────────────────────────────────────────── */
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

/* ─── Data ───────────────────────────────────────────────── */
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
    bullets: ['Accounting operations', 'Reconciliation', 'Financial documentation', 'Client coordination', 'Business workflows'],
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
    bullets: ['Invoicing systems', 'Reconciliation', 'Reporting workflows', 'Operational coordination'],
    type: 'work',
  },
  {
    period: '2025 – Present',
    title: 'Transition Into Technology',
    place: 'Full-Stack Developer',
    desc: 'Actively transitioning into the technology field through:',
    bullets: ['Full-stack development', 'Real-time applications', 'Backend systems', 'Cloud technologies', 'AI-integrated applications'],
    note: 'Built and deploying multiple live projects — Kafka-based Live Location Tracker, PulseBoard (Real-Time Polling System), and interactive scalable web applications.',
    type: 'tech',
  },
  {
    period: '2025 – Present',
    title: 'MCA — Artificial Intelligence & Machine Learning',
    place: 'Amity University Online',
    desc: 'Currently pursuing MCA with specialisation in AI & ML, focused on:',
    bullets: ['Scalable software systems', 'AI-powered applications', 'Backend architecture', 'Modern web and mobile development'],
    type: 'current',
  },
]

/* ─── Config per type ────────────────────────────────────── */
const typeConfig: Record<MilestoneType, {
  hex: string; label: string; gradient: string
  Icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>
  cardBg: string; cardBorder: string; pillBg: string; pillText: string
}> = {
  education: {
    hex: '#6366f1', label: 'Education', gradient: 'from-indigo-500 to-indigo-400',
    Icon: GraduationCap,
    cardBg: 'bg-indigo-50/60 dark:bg-indigo-900/10',
    cardBorder: 'border-indigo-200/60 dark:border-indigo-700/30',
    pillBg: 'bg-indigo-100 dark:bg-indigo-900/30',
    pillText: 'text-indigo-700 dark:text-indigo-300',
  },
  work: {
    hex: '#f59e0b', label: 'Experience', gradient: 'from-amber-500 to-amber-400',
    Icon: Briefcase,
    cardBg: 'bg-amber-50/60 dark:bg-amber-900/10',
    cardBorder: 'border-amber-200/60 dark:border-amber-700/30',
    pillBg: 'bg-amber-100 dark:bg-amber-900/30',
    pillText: 'text-amber-700 dark:text-amber-300',
  },
  pivot: {
    hex: '#a78bfa', label: 'Pivot', gradient: 'from-violet-500 to-violet-400',
    Icon: Lightbulb,
    cardBg: 'bg-violet-50/60 dark:bg-violet-900/10',
    cardBorder: 'border-violet-200/60 dark:border-violet-700/30',
    pillBg: 'bg-violet-100 dark:bg-violet-900/30',
    pillText: 'text-violet-700 dark:text-violet-300',
  },
  tech: {
    hex: '#10b981', label: 'Tech', gradient: 'from-emerald-500 to-emerald-400',
    Icon: Cpu,
    cardBg: 'bg-emerald-50/60 dark:bg-emerald-900/10',
    cardBorder: 'border-emerald-200/60 dark:border-emerald-700/30',
    pillBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    pillText: 'text-emerald-700 dark:text-emerald-300',
  },
  current: {
    hex: '#0ea5e9', label: 'Current', gradient: 'from-sky-500 to-sky-400',
    Icon: TrendingUp,
    cardBg: 'bg-sky-50/60 dark:bg-sky-900/10',
    cardBorder: 'border-sky-200/60 dark:border-sky-700/30',
    pillBg: 'bg-sky-100 dark:bg-sky-900/30',
    pillText: 'text-sky-700 dark:text-sky-300',
  },
}

/* ─── Spotlight card ─────────────────────────────────────── */
function MilestoneCard({ milestone, index }: { milestone: Milestone; index: number }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })
  const cfg    = typeConfig[milestone.type]
  const isLeft = index % 2 === 0
  const { Icon } = cfg

  return (
    <div ref={ref} className="relative grid md:grid-cols-[1fr_2px_1fr] items-start gap-0">

      {/* ── Left column ── */}
      <div className="hidden md:flex justify-end pr-10 pt-5">
        {isLeft ? (
          <motion.div
            initial={{ opacity: 0, filter: 'blur(16px)', scale: 0.88 }}
            animate={inView ? { opacity: 1, filter: 'blur(0px)', scale: 1 } : {}}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-sm"
          >
            <CardBody milestone={milestone} cfg={cfg} />
          </motion.div>
        ) : (
          /* Year label on left when card is right */
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-end gap-1 pt-1"
          >
            <span className="text-2xl font-black text-slate-200 dark:text-slate-700 font-mono tracking-tighter select-none">
              {milestone.period.split(' – ')[0]}
            </span>
            {milestone.period.includes('–') && (
              <span className="text-xs font-mono text-slate-400 dark:text-slate-600">→ {milestone.period.split('– ')[1]}</span>
            )}
          </motion.div>
        )}
      </div>

      {/* ── Centre spine dot ── */}
      <div className="hidden md:flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1, type: 'spring', stiffness: 280 }}
          className="relative z-10 mt-5"
        >
          {/* Glow ring */}
          <motion.div
            animate={inView ? { scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] } : {}}
            transition={{ duration: 2.2, delay: 0.5, repeat: Infinity, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full"
            style={{ background: cfg.hex, opacity: 0.3 }}
          />
          <div
            className="w-5 h-5 rounded-full border-2 flex items-center justify-center relative"
            style={{ borderColor: cfg.hex, backgroundColor: 'var(--bg-base)', boxShadow: `0 0 16px ${cfg.hex}60` }}
          >
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cfg.hex }} />
          </div>
        </motion.div>
      </div>

      {/* ── Right column ── */}
      <div className="hidden md:flex justify-start pl-10 pt-5">
        {!isLeft ? (
          <motion.div
            initial={{ opacity: 0, filter: 'blur(16px)', scale: 0.88 }}
            animate={inView ? { opacity: 1, filter: 'blur(0px)', scale: 1 } : {}}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-sm"
          >
            <CardBody milestone={milestone} cfg={cfg} />
          </motion.div>
        ) : (
          /* Year label on right when card is left */
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-1 pt-1"
          >
            <span className="text-2xl font-black text-slate-200 dark:text-slate-700 font-mono tracking-tighter select-none">
              {milestone.period.split(' – ')[0]}
            </span>
            {milestone.period.includes('–') && (
              <span className="text-xs font-mono text-slate-400 dark:text-slate-600">→ {milestone.period.split('– ')[1]}</span>
            )}
          </motion.div>
        )}
      </div>

      {/* ── Mobile single column ── */}
      <div className="flex md:hidden gap-4 w-full col-span-3">
        <div className="flex flex-col items-center shrink-0 pt-1 gap-1">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 260 }}
            className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
            style={{ borderColor: cfg.hex, backgroundColor: 'var(--bg-base)' }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.hex }} />
          </motion.div>
          <div className="flex-1 w-px" style={{ background: `linear-gradient(to bottom, ${cfg.hex}50, transparent)`, minHeight: 60 }} />
        </div>
        <motion.div
          initial={{ opacity: 0, filter: 'blur(12px)', scale: 0.92 }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 pb-4"
        >
          <span className="text-xs font-mono text-slate-400 dark:text-slate-500 mb-2 block">{milestone.period}</span>
          <CardBody milestone={milestone} cfg={cfg} />
        </motion.div>
      </div>

      {/* Icon badge — desktop only, floats on the spine */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.25, type: 'spring', stiffness: 260 }}
        className="absolute left-1/2 -translate-x-1/2 top-3 hidden md:flex items-center justify-center w-8 h-8 rounded-full shadow-md z-20"
        style={{ background: `linear-gradient(135deg, ${cfg.hex}33, ${cfg.hex}15)`, border: `1px solid ${cfg.hex}40` }}
      >
        <Icon size={14} className="transition-none" style={{ color: cfg.hex } as React.CSSProperties} />
      </motion.div>
    </div>
  )
}

/* ─── Card body ──────────────────────────────────────────── */
function CardBody({
  milestone, cfg,
}: {
  milestone: Milestone
  cfg: typeof typeConfig[MilestoneType]
}) {
  return (
    <div
      className={`rounded-2xl border p-5 transition-all duration-300 glass ${cfg.cardBorder}`}
      style={{ boxShadow: `0 2px 20px ${cfg.hex}0a` }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 28px ${cfg.hex}22`
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 2px 20px ${cfg.hex}0a`
      }}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center flex-wrap gap-2 mb-1.5">
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${cfg.pillBg} ${cfg.pillText}`}>
              {cfg.label}
            </span>
          </div>
          <h3 className="text-slate-900 dark:text-white font-bold text-sm leading-snug">{milestone.title}</h3>
          <p className="text-xs font-mono mt-0.5" style={{ color: cfg.hex }}>{milestone.place}</p>
        </div>
      </div>

      {/* Desc */}
      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{milestone.desc}</p>

      {/* Bullets */}
      {milestone.bullets && (
        <ul className="mt-2.5 space-y-1.5">
          {milestone.bullets.map(b => (
            <li key={b} className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-xs">
              <ArrowRight size={10} style={{ color: cfg.hex, flexShrink: 0 }} />
              {b}
            </li>
          ))}
        </ul>
      )}

      {/* Note */}
      {milestone.note && (
        <p className="mt-3 text-[11px] text-slate-500 dark:text-slate-400 italic leading-relaxed border-t border-slate-200/60 dark:border-slate-700/40 pt-3">
          {milestone.note}
        </p>
      )}
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────────── */
export default function Journey() {
  const heroRef     = useRef(null)
  const heroInView  = useInView(heroRef, { once: true })
  const timelineRef = useRef<HTMLDivElement>(null)
  const lineRef     = useRef<HTMLDivElement>(null)

  /* Animate the vertical spine line as you scroll */
  useEffect(() => {
    const el   = timelineRef.current
    const line = lineRef.current
    if (!el || !line) return
    let st: ScrollTrigger | null = null
    st = ScrollTrigger.create({
      trigger: el,
      start: 'top 65%',
      end: 'bottom 60%',
      scrub: 1.6,
      onUpdate: (self) => {
        line.style.transform = `scaleY(${self.progress})`
      },
    })
    return () => st?.kill()
  }, [])

  return (
    <div className="min-h-screen relative overflow-x-hidden">

      {/* ── Fixed top bar ── */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/60 dark:border-white/10 shadow-sm shadow-indigo-100/20 dark:shadow-slate-900/20"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm font-mono group"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </Link>
          <span className="font-mono text-indigo-600 dark:text-indigo-400 text-sm font-bold tracking-wider">&lt;AKS /&gt;</span>
        </div>
      </motion.header>

      {/* ── Hero ── */}
      <section ref={heroRef} className="pt-36 pb-16 px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-indigo-500 dark:text-indigo-400 text-xs tracking-[0.35em] uppercase mb-5">
            A Personal Timeline
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            <span className="text-slate-900 dark:text-white">From </span>
            <span style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 40%, #6366f1 80%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Commerce
            </span>
            <span className="text-slate-900 dark:text-white"> to </span>
            <span style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #0ea5e9 55%, #10b981 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Tech
            </span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            A decade of discipline, reinvention, and relentless growth — from ledgers and balance sheets to distributed systems and AI.
          </p>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mt-10"
        >
          {(Object.entries(typeConfig) as [MilestoneType, typeof typeConfig[MilestoneType]][]).map(([, cfg]) => (
            <div key={cfg.label} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${cfg.pillBg}`}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cfg.hex }} />
              <span className={`text-xs font-mono ${cfg.pillText}`}>{cfg.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 flex flex-col items-center gap-2 text-slate-400"
        >
          <span className="text-xs font-mono tracking-widest uppercase">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="w-px h-8"
            style={{ background: 'linear-gradient(to bottom, #6366f1, transparent)' }}
          />
        </motion.div>
      </section>

      {/* ── Timeline ── */}
      <section className="relative pb-32 px-4 md:px-6 z-10">
        <div className="max-w-5xl mx-auto">

          <div ref={timelineRef} className="relative">
            {/* Gradient spine (desktop) — animates from top as you scroll */}
            <div className="absolute left-1/2 -translate-x-[1px] top-0 h-full w-[2px] hidden md:block overflow-hidden pointer-events-none">
              {/* Track */}
              <div className="absolute inset-0 bg-slate-200/60 dark:bg-slate-800/60" />
              {/* Animated fill */}
              <div
                ref={lineRef}
                className="absolute inset-0 origin-top"
                style={{
                  background: 'linear-gradient(to bottom, #6366f1 0%, #f59e0b 28%, #a78bfa 55%, #10b981 78%, #0ea5e9 100%)',
                  transform: 'scaleY(0)',
                }}
              />
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-14 md:gap-20">
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
                className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                style={{ background: 'linear-gradient(135deg, #6366f1, #0ea5e9)', boxShadow: '0 0 24px rgba(99,102,241,0.40)' }}
              >
                <TrendingUp size={16} className="text-white" />
              </div>
              <p className="font-mono text-xs text-indigo-500 dark:text-indigo-400 tracking-widest uppercase">Still Writing</p>
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
          <p className="text-slate-500 dark:text-slate-400 text-sm font-mono mb-6">
            The journey continues — one commit at a time.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-mono font-semibold text-white transition-all duration-200 shadow-md hover:shadow-lg"
            style={{ background: 'linear-gradient(135deg, #6366f1, #0ea5e9)', boxShadow: '0 4px 16px rgba(99,102,241,0.30)' }}
          >
            <ArrowLeft size={15} />
            Back to Portfolio
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
