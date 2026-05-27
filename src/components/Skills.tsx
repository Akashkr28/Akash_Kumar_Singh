import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
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
}

const techs: Tech[] = [
  { name: 'React',        Icon: SiReact,             color: '#61DAFB', floatDuration: 3.2, floatDelay: 0.0,  floatY: 10 },
  { name: 'TypeScript',   Icon: SiTypescript,        color: '#3178C6', floatDuration: 2.8, floatDelay: 0.3,  floatY: 8  },
  { name: 'JavaScript',   Icon: SiJavascript,        color: '#F7DF1E', floatDuration: 3.5, floatDelay: 0.6,  floatY: 12 },
  { name: 'HTML5',        Icon: SiHtml5,             color: '#E34F26', floatDuration: 2.6, floatDelay: 0.9,  floatY: 7  },
  { name: 'CSS3',         Icon: SiCss,               color: '#1572B6', floatDuration: 3.8, floatDelay: 1.2,  floatY: 9  },
  { name: 'Tailwind CSS', Icon: SiTailwindcss,       color: '#06B6D4', floatDuration: 3.0, floatDelay: 0.4,  floatY: 11 },
  { name: 'Next.js',      Icon: SiNextdotjs,         color: '#ffffff', floatDuration: 3.3, floatDelay: 0.7,  floatY: 8  },
  { name: 'Node.js',      Icon: SiNodedotjs,         color: '#339933', floatDuration: 2.9, floatDelay: 1.0,  floatY: 10 },
  { name: 'Express',      Icon: SiExpress,           color: '#ffffff', floatDuration: 3.6, floatDelay: 0.2,  floatY: 9  },
  { name: 'Kafka',        Icon: SiApachekafka,       color: '#ffffff', floatDuration: 2.7, floatDelay: 0.5,  floatY: 12 },
  { name: 'MongoDB',      Icon: SiMongodb,           color: '#47A248', floatDuration: 3.4, floatDelay: 0.8,  floatY: 7  },
  { name: 'Redis',        Icon: SiRedis,             color: '#DC382D', floatDuration: 2.5, floatDelay: 1.1,  floatY: 10 },
  { name: 'PostgreSQL',   Icon: SiPostgresql,        color: '#4169E1', floatDuration: 3.7, floatDelay: 0.1,  floatY: 8  },
  { name: 'Firebase',     Icon: SiFirebase,          color: '#FFCA28', floatDuration: 3.1, floatDelay: 0.6,  floatY: 11 },
  { name: 'Python',       Icon: SiPython,            color: '#3776AB', floatDuration: 2.8, floatDelay: 0.9,  floatY: 9  },
  { name: 'NumPy',        Icon: SiNumpy,             color: '#4DABCF', floatDuration: 3.5, floatDelay: 0.3,  floatY: 7  },
  { name: 'Pandas',       Icon: SiPandas,            color: '#150458', floatDuration: 3.0, floatDelay: 1.3,  floatY: 12 },
  { name: 'TensorFlow',   Icon: SiTensorflow,        color: '#FF6F00', floatDuration: 2.6, floatDelay: 0.7,  floatY: 10 },
  { name: 'Scikit-learn', Icon: SiScikitlearn,       color: '#F7931E', floatDuration: 3.8, floatDelay: 0.4,  floatY: 8  },
  { name: 'React Native', Icon: SiReact,             color: '#61DAFB', floatDuration: 3.2, floatDelay: 1.0,  floatY: 9  },
  { name: 'Expo',         Icon: SiExpo,              color: '#ffffff', floatDuration: 2.9, floatDelay: 0.2,  floatY: 11 },
  { name: 'Android',      Icon: SiAndroid,           color: '#3DDC84', floatDuration: 3.3, floatDelay: 0.8,  floatY: 7  },
  { name: 'Git',          Icon: SiGit,               color: '#F05032', floatDuration: 2.7, floatDelay: 1.2,  floatY: 10 },
  { name: 'GitHub',       Icon: SiGithub,            color: '#ffffff', floatDuration: 3.6, floatDelay: 0.5,  floatY: 8  },
  { name: 'Vercel',       Icon: SiVercel,            color: '#ffffff', floatDuration: 3.1, floatDelay: 0.1,  floatY: 12 },
  { name: 'Docker',       Icon: SiDocker,            color: '#2496ED', floatDuration: 2.8, floatDelay: 0.6,  floatY: 9  },
  { name: 'Linux',        Icon: SiLinux,             color: '#FCC624', floatDuration: 3.4, floatDelay: 1.1,  floatY: 7  },
  { name: 'Vite',         Icon: SiVite,              color: '#646CFF', floatDuration: 3.0, floatDelay: 0.4,  floatY: 11 },
]

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="font-mono text-cyan-400 text-xs tracking-[0.3em] uppercase mb-3">03. Skills</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Tech Stack</h2>
          <p className="text-slate-500 text-sm mt-3 font-mono">hover to explore</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          {techs.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? {
                opacity: 1,
                scale: 1,
                y: [0, -tech.floatY, 0],
              } : {}}
              transition={{
                opacity: { duration: 0.4, delay: i * 0.04 },
                scale:   { duration: 0.4, delay: i * 0.04, type: 'spring', stiffness: 200 },
                y: {
                  duration: tech.floatDuration,
                  delay: tech.floatDelay,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeInOut',
                },
              }}
              whileHover={{ scale: 1.15, zIndex: 10 }}
              className="group relative flex flex-col items-center gap-2 cursor-default"
              style={{ position: 'relative' }}
            >
              {/* Icon card */}
              <div
                className="w-16 h-16 flex items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 transition-all duration-300 group-hover:border-opacity-60"
                style={{
                  '--brand': tech.color,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                } as React.CSSProperties}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.boxShadow = `0 0 20px ${tech.color}40, 0 4px 16px rgba(0,0,0,0.4)`
                  el.style.borderColor = `${tech.color}60`
                  el.style.backgroundColor = `${tech.color}12`
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.boxShadow = '0 4px 16px rgba(0,0,0,0.3)'
                  el.style.borderColor = ''
                  el.style.backgroundColor = ''
                }}
              >
                <tech.Icon
                  size={30}
                  className="transition-all duration-300 opacity-50 group-hover:opacity-100"
                  style={{ color: tech.color }}
                />
              </div>

              {/* Name tooltip below */}
              <span className="text-xs font-mono text-slate-600 group-hover:text-slate-300 transition-colors duration-200 whitespace-nowrap">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
