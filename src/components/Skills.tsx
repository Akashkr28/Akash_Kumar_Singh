'use client'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  SiReact, SiTypescript, SiJavascript, SiHtml5, SiCss,
  SiTailwindcss, SiNextdotjs, SiNodedotjs, SiExpress,
  SiApachekafka, SiMongodb, SiRedis, SiPostgresql, SiFirebase,
  SiPython, SiNumpy, SiPandas, SiTensorflow, SiScikitlearn,
  SiExpo, SiAndroid, SiGit, SiGithub, SiVercel, SiDocker,
  SiLinux, SiVite,
} from 'react-icons/si'
import type { IconType } from 'react-icons'

interface Tech {
  name: string
  Icon: IconType
  color: string
  floatDuration: number
  floatDelay: number
  floatY: number
  category: Category
}

type Category = 'All' | 'Frontend' | 'Backend' | 'Database' | 'AI / ML' | 'Mobile' | 'DevOps'

const CATEGORIES: Category[] = ['All', 'Frontend', 'Backend', 'Database', 'AI / ML', 'Mobile', 'DevOps']

const techs: Tech[] = [
  { name: 'React',        Icon: SiReact,       color: '#61DAFB', floatDuration: 3.2, floatDelay: 0.0,  floatY: 10, category: 'Frontend' },
  { name: 'TypeScript',   Icon: SiTypescript,  color: '#3178C6', floatDuration: 2.8, floatDelay: 0.3,  floatY: 8,  category: 'Frontend' },
  { name: 'JavaScript',   Icon: SiJavascript,  color: '#F7DF1E', floatDuration: 3.5, floatDelay: 0.6,  floatY: 12, category: 'Frontend' },
  { name: 'HTML5',        Icon: SiHtml5,       color: '#E34F26', floatDuration: 2.6, floatDelay: 0.9,  floatY: 7,  category: 'Frontend' },
  { name: 'CSS3',         Icon: SiCss,         color: '#1572B6', floatDuration: 3.8, floatDelay: 1.2,  floatY: 9,  category: 'Frontend' },
  { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#0694B4', floatDuration: 3.0, floatDelay: 0.4,  floatY: 11, category: 'Frontend' },
  { name: 'Next.js',      Icon: SiNextdotjs,   color: '#ffffff', floatDuration: 3.3, floatDelay: 0.7,  floatY: 8,  category: 'Frontend' },
  { name: 'Vite',         Icon: SiVite,        color: '#646CFF', floatDuration: 3.0, floatDelay: 0.4,  floatY: 11, category: 'Frontend' },
  { name: 'Node.js',      Icon: SiNodedotjs,   color: '#339933', floatDuration: 2.9, floatDelay: 1.0,  floatY: 10, category: 'Backend'  },
  { name: 'Express',      Icon: SiExpress,     color: '#ffffff', floatDuration: 3.6, floatDelay: 0.2,  floatY: 9,  category: 'Backend'  },
  { name: 'Kafka',        Icon: SiApachekafka, color: '#ffffff', floatDuration: 2.7, floatDelay: 0.5,  floatY: 12, category: 'Backend'  },
  { name: 'Python',       Icon: SiPython,      color: '#3776AB', floatDuration: 2.8, floatDelay: 0.9,  floatY: 9,  category: 'Backend'  },
  { name: 'MongoDB',      Icon: SiMongodb,     color: '#47A248', floatDuration: 3.4, floatDelay: 0.8,  floatY: 7,  category: 'Database' },
  { name: 'Redis',        Icon: SiRedis,       color: '#DC382D', floatDuration: 2.5, floatDelay: 1.1,  floatY: 10, category: 'Database' },
  { name: 'PostgreSQL',   Icon: SiPostgresql,  color: '#4169E1', floatDuration: 3.7, floatDelay: 0.1,  floatY: 8,  category: 'Database' },
  { name: 'Firebase',     Icon: SiFirebase,    color: '#F5A623', floatDuration: 3.1, floatDelay: 0.6,  floatY: 11, category: 'Database' },
  { name: 'NumPy',        Icon: SiNumpy,       color: '#4DABCF', floatDuration: 3.5, floatDelay: 0.3,  floatY: 7,  category: 'AI / ML'  },
  { name: 'Pandas',       Icon: SiPandas,      color: '#8B5CF6', floatDuration: 3.0, floatDelay: 1.3,  floatY: 12, category: 'AI / ML'  },
  { name: 'TensorFlow',   Icon: SiTensorflow,  color: '#FF6F00', floatDuration: 2.6, floatDelay: 0.7,  floatY: 10, category: 'AI / ML'  },
  { name: 'Scikit-learn', Icon: SiScikitlearn, color: '#E07B39', floatDuration: 3.8, floatDelay: 0.4,  floatY: 8,  category: 'AI / ML'  },
  { name: 'React Native', Icon: SiReact,       color: '#61DAFB', floatDuration: 3.2, floatDelay: 1.0,  floatY: 9,  category: 'Mobile'   },
  { name: 'Expo',         Icon: SiExpo,        color: '#ffffff', floatDuration: 2.9, floatDelay: 0.2,  floatY: 11, category: 'Mobile'   },
  { name: 'Android',      Icon: SiAndroid,     color: '#3DDC84', floatDuration: 3.3, floatDelay: 0.8,  floatY: 7,  category: 'Mobile'   },
  { name: 'Git',          Icon: SiGit,         color: '#F05032', floatDuration: 2.7, floatDelay: 1.2,  floatY: 10, category: 'DevOps'   },
  { name: 'GitHub',       Icon: SiGithub,      color: '#ffffff', floatDuration: 3.6, floatDelay: 0.5,  floatY: 8,  category: 'DevOps'   },
  { name: 'Vercel',       Icon: SiVercel,      color: '#ffffff', floatDuration: 3.1, floatDelay: 0.1,  floatY: 12, category: 'DevOps'   },
  { name: 'Docker',       Icon: SiDocker,      color: '#2496ED', floatDuration: 2.8, floatDelay: 0.6,  floatY: 9,  category: 'DevOps'   },
  { name: 'Linux',        Icon: SiLinux,       color: '#FCC624', floatDuration: 3.4, floatDelay: 1.1,  floatY: 7,  category: 'DevOps'   },
]

export default function Skills() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [active, setActive] = useState<Category>('All')

  const filtered = active === 'All' ? techs : techs.filter(t => t.category === active)

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-5xl mx-auto" ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="font-mono text-cyan-400 text-xs tracking-[0.3em] uppercase mb-3">03. Skills</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Tech Stack</h2>
          <p className="text-slate-500 text-sm mt-3 font-mono">hover to explore</p>
        </motion.div>

        {/* ── Category tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`relative px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
                active === cat
                  ? 'text-slate-950'
                  : 'text-slate-500 hover:text-slate-300 border border-slate-800 hover:border-slate-600'
              }`}
            >
              {active === cat && (
                <motion.span
                  layoutId="tab-bg"
                  className="absolute inset-0 rounded-full bg-cyan-400"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{cat}</span>
            </button>
          ))}
        </motion.div>

        {/* ── Icons grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="flex flex-wrap justify-center gap-5"
          >
            {filtered.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -tech.floatY, 0],
                }}
                transition={{
                  opacity: { duration: 0.35, delay: i * 0.03 },
                  scale:   { duration: 0.35, delay: i * 0.03, type: 'spring', stiffness: 200 },
                  y: {
                    duration: tech.floatDuration,
                    delay: tech.floatDelay,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'easeInOut',
                  },
                }}
                whileHover={{ scale: 1.18, zIndex: 10 }}
                className="group relative flex flex-col items-center gap-2 cursor-default"
              >
                {/* Icon card */}
                <div
                  className="w-16 h-16 flex items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 transition-all duration-300"
                  style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.30)' }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.boxShadow = `0 0 18px ${tech.color}35, 0 4px 16px rgba(0,0,0,0.35)`
                    el.style.borderColor = `${tech.color}55`
                    el.style.backgroundColor = `${tech.color}12`
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.30)'
                    el.style.borderColor = ''
                    el.style.backgroundColor = ''
                  }}
                >
                  <tech.Icon
                    size={30}
                    className="transition-all duration-300 opacity-60 group-hover:opacity-100"
                    style={{ color: tech.color }}
                  />
                </div>

                {/* Name */}
                <span className="text-xs font-mono text-slate-500 group-hover:text-slate-200 transition-colors duration-200 whitespace-nowrap">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Count badge */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center font-mono text-slate-700 text-[11px] tracking-widest uppercase mt-10"
        >
          {filtered.length} {active === 'All' ? 'total' : active} {filtered.length === 1 ? 'technology' : 'technologies'}
        </motion.p>
      </div>
    </section>
  )
}
