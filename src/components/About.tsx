import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GraduationCap, MapPin, Zap, Play } from 'lucide-react'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const details = [
  { icon: GraduationCap, text: 'MCA — AI & ML Specialization, Amity University Online' },
  { icon: MapPin, text: 'India' },
  { icon: Zap, text: 'Available for internships & freelance projects' },
]

// Paste your YouTube video ID here after uploading
const VIDEO_RESUME_YT_ID = ''

function VideoResumeCard() {
  const [active, setActive] = useState(false)

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
            background: 'linear-gradient(135deg, #d97706 0%, #ca8a04 45%, #b45309 100%)',
            boxShadow: '0 0 40px rgba(217,119,6,0.12), 0 16px 40px rgba(120,113,108,0.10)',
          }}
        >
          <div className="rounded-[calc(1rem-2px)] overflow-hidden bg-white">
            <div className="aspect-video flex flex-col items-center justify-center gap-4 bg-stone-50">
              <div className="w-16 h-16 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center">
                <Play size={24} className="text-stone-400 ml-1" />
              </div>
              <p className="font-mono text-stone-400 text-xs tracking-widest uppercase">Coming soon</p>
            </div>
          </div>
        </div>
        <p className="text-center font-mono text-xs text-stone-400 mt-3 tracking-wide">
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
      <div
        className="p-[2px] rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, #d97706 0%, #ca8a04 45%, #b45309 100%)',
          boxShadow: '0 0 40px rgba(217,119,6,0.12), 0 16px 40px rgba(120,113,108,0.10)',
        }}
      >
        <div className="rounded-[calc(1rem-2px)] overflow-hidden bg-white">
          <div className="relative aspect-video bg-stone-100">
            {active ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${VIDEO_RESUME_YT_ID}?autoplay=1&rel=0&modestbranding=1`}
                title="Akash Kumar Singh — Video Resume"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                onClick={() => setActive(true)}
                className="absolute inset-0 w-full h-full flex items-center justify-center group"
                aria-label="Play video resume"
              >
                <img
                  src={`https://img.youtube.com/vi/${VIDEO_RESUME_YT_ID}/maxresdefault.jpg`}
                  alt="Video thumbnail"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-stone-900/10 transition-colors duration-200" />
                <div className="relative w-16 h-16 rounded-full bg-amber-500/90 flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:bg-amber-400 group-hover:scale-110 transition-all duration-200 z-10">
                  <Play size={24} className="text-white ml-1" fill="currentColor" />
                </div>
              </button>
            )}
          </div>

          <div className="px-4 py-2.5 flex items-center gap-2 border-t border-stone-200 bg-stone-50">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
            <span className="font-mono text-xs text-stone-600">video resume · 60s</span>
            <a
              href={`https://www.youtube.com/watch?v=${VIDEO_RESUME_YT_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto font-mono text-xs text-stone-400 hover:text-amber-600 transition-colors"
            >
              open in YouTube ↗
            </a>
          </div>
        </div>
      </div>
      <p className="text-center font-mono text-xs text-stone-400 mt-3 tracking-wide">
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
      gsap.from(headingRef.current, {
        y: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%', once: true },
      })
      gsap.from(textColRef.current!.children, {
        y: 40, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: textColRef.current, start: 'top 80%', once: true },
      })
      gsap.from(terminalRef.current, {
        x: 60, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: terminalRef.current, start: 'top 80%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-28 px-6 relative overflow-hidden">
      <div className="absolute -left-40 top-1/3 w-80 h-80 bg-amber-400/[0.05] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <div ref={headingRef} className="mb-16 text-center">
          <p className="font-mono text-amber-600 text-xs tracking-[0.3em] uppercase mb-3">01. About</p>
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 tracking-tight">Who I Am</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div ref={textColRef} className="space-y-5 text-stone-600 leading-relaxed">
            <p>
              I'm <span className="text-stone-900 font-semibold">Akash Kumar Singh</span>, a passionate developer
              and MCA 3rd Semester student specializing in AI & ML at Amity University Online.
            </p>
            <p>
              I love building things that are <span className="text-amber-600 font-medium">live and interactive</span> —
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
                  <div className="p-1.5 rounded-md bg-amber-100 mt-0.5 shrink-0">
                    <Icon size={13} className="text-amber-600" />
                  </div>
                  <span className="text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div ref={terminalRef}>
            {/* Code card — light theme editor style */}
            <div
              className="relative rounded-xl overflow-hidden border border-stone-200 shadow-sm"
              style={{ background: 'linear-gradient(135deg, rgba(217,119,6,0.06), rgba(202,138,4,0.03) 50%, rgba(217,119,6,0.02))' }}
            >
              <div className="m-px rounded-xl overflow-hidden bg-white">
                {/* Title bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-stone-200 bg-stone-50">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <div className="w-3 h-3 rounded-full bg-green-400/80" />
                  <span className="ml-3 font-mono text-xs text-stone-400">akash.json</span>
                  <div className="ml-auto flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-stone-300" />
                    <div className="w-1 h-1 rounded-full bg-stone-300" />
                    <div className="w-1 h-1 rounded-full bg-stone-300" />
                  </div>
                </div>
                <pre className="p-5 font-mono text-sm leading-7 text-left overflow-auto bg-white">
                  <code>
                    <span className="text-stone-400">{'{'}</span>{'\n'}
                    {'  '}<span className="text-amber-600">"name"</span><span className="text-stone-400">: </span>
                    <span className="text-green-700">"Akash Kumar Singh"</span><span className="text-stone-400">,</span>{'\n'}
                    {'  '}<span className="text-amber-600">"role"</span><span className="text-stone-400">: </span>
                    <span className="text-green-700">"Full Stack Developer"</span><span className="text-stone-400">,</span>{'\n'}
                    {'  '}<span className="text-amber-600">"education"</span><span className="text-stone-400">: </span>
                    <span className="text-green-700">"MCA (AI/ML)"</span><span className="text-stone-400">,</span>{'\n'}
                    {'  '}<span className="text-amber-600">"interests"</span><span className="text-stone-400">: [</span>{'\n'}
                    {'    '}<span className="text-green-700">"Real-time Systems"</span><span className="text-stone-400">,</span>{'\n'}
                    {'    '}<span className="text-green-700">"AI & Machine Learning"</span><span className="text-stone-400">,</span>{'\n'}
                    {'    '}<span className="text-green-700">"Mobile Development"</span>{'\n'}
                    {'  '}<span className="text-stone-400">],</span>{'\n'}
                    {'  '}<span className="text-amber-600">"status"</span><span className="text-stone-400">: </span>
                    <span className="text-amber-700">"open to opportunities"</span>{'\n'}
                    <span className="text-stone-400">{'}'}</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* ── Video Resume ── */}
        <div className="mt-20">
          <div className="flex items-center gap-4 mb-10 justify-center">
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-stone-300" />
            <span className="font-mono text-stone-500 text-xs tracking-[0.28em] uppercase">
              → meet me in 60 seconds
            </span>
            <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-stone-300" />
          </div>
          <VideoResumeCard />
        </div>

      </div>
    </section>
  )
}
