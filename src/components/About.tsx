import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GraduationCap, MapPin, Zap, Play, Pause } from 'lucide-react'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const details = [
  { icon: GraduationCap, text: 'MCA — AI & ML Specialization, Amity University Online' },
  { icon: MapPin, text: 'India' },
  { icon: Zap, text: 'Available for internships & freelance projects' },
]

// Paste your YouTube video ID here after uploading (e.g. "dQw4w9WgXcQ" from youtube.com/watch?v=dQw4w9WgXcQ)
// Leave empty to show a "coming soon" placeholder
const VIDEO_RESUME_YT_ID = ''

function VideoResumeCard() {
  const [active, setActive] = useState(false)

  // Not uploaded yet — show a styled placeholder
  if (!VIDEO_RESUME_YT_ID) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl mx-auto"
      >
        <div
          className="p-[2px] rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, #22d3ee 0%, #4ade80 45%, #a78bfa 100%)',
            boxShadow: '0 0 50px rgba(34,211,238,0.14), 0 0 100px rgba(167,139,250,0.07), 0 24px 56px rgba(0,0,0,0.45)',
          }}
        >
          <div className="rounded-[calc(1rem-2px)] overflow-hidden bg-slate-900">
            <div className="aspect-video flex flex-col items-center justify-center gap-4 bg-slate-950/60">
              <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                <Play size={24} className="text-slate-600 ml-1" />
              </div>
              <p className="font-mono text-slate-600 text-xs tracking-widest uppercase">Coming soon</p>
            </div>
          </div>
        </div>
        <p className="text-center font-mono text-xs text-slate-600 mt-3 tracking-wide">
          Akash Kumar Singh — 60-second video resume
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Gradient border shell */}
      <div
        className="p-[2px] rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, #22d3ee 0%, #4ade80 45%, #a78bfa 100%)',
          boxShadow: '0 0 50px rgba(34,211,238,0.14), 0 0 100px rgba(167,139,250,0.07), 0 24px 56px rgba(0,0,0,0.45)',
        }}
      >
        <div className="rounded-[calc(1rem-2px)] overflow-hidden bg-slate-900">
          <div className="relative aspect-video bg-slate-950">
            {active ? (
              /* YouTube iframe — loads only after user clicks play */
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${VIDEO_RESUME_YT_ID}?autoplay=1&rel=0&modestbranding=1`}
                title="Akash Kumar Singh — Video Resume"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              /* Custom thumbnail / play button — no tracking until clicked */
              <button
                onClick={() => setActive(true)}
                className="absolute inset-0 w-full h-full flex items-center justify-center group"
                aria-label="Play video resume"
              >
                {/* YouTube thumbnail as bg */}
                <img
                  src={`https://img.youtube.com/vi/${VIDEO_RESUME_YT_ID}/maxresdefault.jpg`}
                  alt="Video thumbnail"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/20 transition-colors duration-200" />
                {/* Play button */}
                <div className="relative w-18 h-18 w-16 h-16 rounded-full bg-cyan-400/90 flex items-center justify-center shadow-lg shadow-cyan-400/30 group-hover:bg-cyan-300 group-hover:scale-110 transition-all duration-200 z-10">
                  <Play size={24} className="text-slate-950 ml-1" fill="currentColor" />
                </div>
              </button>
            )}
          </div>

          {/* Bottom label bar */}
          <div className="px-4 py-2.5 flex items-center gap-2 border-t border-slate-800 bg-slate-950/60">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
            <span className="font-mono text-xs text-slate-400">video resume · 60s</span>
            <a
              href={`https://www.youtube.com/watch?v=${VIDEO_RESUME_YT_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto font-mono text-xs text-slate-600 hover:text-cyan-400 transition-colors"
            >
              open in YouTube ↗
            </a>
          </div>
        </div>
      </div>

      <p className="text-center font-mono text-xs text-slate-600 mt-3 tracking-wide">
        Akash Kumar Singh — 60-second video resume
      </p>
    </motion.div>
  )
}

export default function About() {
  const sectionRef   = useRef<HTMLElement>(null)
  const headingRef   = useRef<HTMLDivElement>(null)
  const textColRef   = useRef<HTMLDivElement>(null)
  const terminalRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading slides up
      gsap.from(headingRef.current, {
        y: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%', once: true },
      })

      // Text column staggers in
      gsap.from(textColRef.current!.children, {
        y: 40, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: textColRef.current, start: 'top 80%', once: true },
      })

      // Terminal swings in from right
      gsap.from(terminalRef.current, {
        x: 60, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: terminalRef.current, start: 'top 80%', once: true },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-28 px-6 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute -left-40 top-1/3 w-80 h-80 bg-cyan-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <div ref={headingRef} className="mb-16 text-center">
          <p className="font-mono text-cyan-400 text-xs tracking-[0.3em] uppercase mb-3">01. About</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Who I Am</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div ref={textColRef} className="space-y-5 text-slate-400 leading-relaxed">
            <p>
              I'm <span className="text-white font-semibold">Akash Kumar Singh</span>, a passionate developer
              and MCA 3rd Semester student specializing in AI & ML at Amity University Online.
            </p>
            <p>
              I love building things that are <span className="text-cyan-400 font-medium">live and interactive</span> —
              from real-time location tracking with Kafka to collaborative polling platforms.
              My projects are deployed and working in the wild.
            </p>
            <p>
              Currently expanding into mobile development while deepening my understanding of
              distributed systems, AI/ML algorithms, and modern web architecture.
            </p>

            <div className="pt-4 space-y-3">
              {details.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <div className="p-1.5 rounded-md bg-cyan-400/10 mt-0.5 shrink-0">
                    <Icon size={13} className="text-cyan-400" />
                  </div>
                  <span className="text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div ref={terminalRef}>
            {/* Terminal card with glow border */}
            <div className="relative rounded-xl overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.15), rgba(74,222,128,0.08) 50%, rgba(34,211,238,0.05))' }}
            >
              <div className="m-px rounded-xl overflow-hidden bg-slate-900">
                {/* Title bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 bg-slate-950/60">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-3 font-mono text-xs text-slate-500">akash.json</span>
                  <div className="ml-auto flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-slate-700" />
                    <div className="w-1 h-1 rounded-full bg-slate-700" />
                    <div className="w-1 h-1 rounded-full bg-slate-700" />
                  </div>
                </div>
                <pre className="p-5 font-mono text-sm leading-7 text-left overflow-auto">
                  <code>
                    <span className="text-slate-600">{'{'}</span>{'\n'}
                    {'  '}<span className="text-cyan-400">"name"</span><span className="text-slate-600">: </span>
                    <span className="text-green-400">"Akash Kumar Singh"</span><span className="text-slate-600">,</span>{'\n'}
                    {'  '}<span className="text-cyan-400">"role"</span><span className="text-slate-600">: </span>
                    <span className="text-green-400">"Full Stack Developer"</span><span className="text-slate-600">,</span>{'\n'}
                    {'  '}<span className="text-cyan-400">"education"</span><span className="text-slate-600">: </span>
                    <span className="text-green-400">"MCA (AI/ML)"</span><span className="text-slate-600">,</span>{'\n'}
                    {'  '}<span className="text-cyan-400">"interests"</span><span className="text-slate-600">: [</span>{'\n'}
                    {'    '}<span className="text-green-400">"Real-time Systems"</span><span className="text-slate-600">,</span>{'\n'}
                    {'    '}<span className="text-green-400">"AI & Machine Learning"</span><span className="text-slate-600">,</span>{'\n'}
                    {'    '}<span className="text-green-400">"Mobile Development"</span>{'\n'}
                    {'  '}<span className="text-slate-600">],</span>{'\n'}
                    {'  '}<span className="text-cyan-400">"status"</span><span className="text-slate-600">: </span>
                    <span className="text-yellow-400">"open to opportunities"</span>{'\n'}
                    <span className="text-slate-600">{'}'}</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* ── Video Resume ── */}
        <div className="mt-20">
          <div className="flex items-center gap-4 mb-10 justify-center">
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-slate-800" />
            <span className="font-mono text-slate-500 text-xs tracking-[0.28em] uppercase">
              → meet me in 60 seconds
            </span>
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-slate-800" />
          </div>
          <VideoResumeCard />
        </div>

      </div>
    </section>
  )
}
