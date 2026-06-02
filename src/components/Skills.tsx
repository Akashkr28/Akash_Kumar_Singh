'use client'
import { motion } from 'framer-motion'
import {
  SiReact, SiTypescript, SiJavascript, SiHtml5, SiCss,
  SiTailwindcss, SiNextdotjs, SiNodedotjs, SiExpress,
  SiApachekafka, SiMongodb, SiRedis, SiPostgresql, SiFirebase,
  SiPython, SiNumpy, SiPandas, SiTensorflow, SiScikitlearn,
  SiExpo, SiAndroid, SiGit, SiGithub, SiVercel, SiDocker,
  SiLinux, SiVite,
} from 'react-icons/si'
import type { IconType } from 'react-icons'
import {
  Code2, Server, Database, Brain, Smartphone, Wrench,
} from 'lucide-react'

interface TechItem { name: string; Icon: IconType; color: string }

interface Category {
  id: string
  label: string
  Icon: React.ComponentType<{ size?: number; className?: string }>
  accent: string        // tailwind text color
  darkAccent: string
  accentHex: string
  bgClass: string
  borderClass: string
  darkBg: string
  techs: TechItem[]
}

const categories: Category[] = [
  {
    id: 'frontend', label: 'Frontend', Icon: Code2,
    accent: 'text-indigo-600', darkAccent: 'dark:text-indigo-400', accentHex: '#6366f1',
    bgClass: 'bg-indigo-50', borderClass: 'border-indigo-100', darkBg: 'dark:bg-indigo-900/20',
    techs: [
      { name: 'React',        Icon: SiReact,       color: '#61DAFB' },
      { name: 'TypeScript',   Icon: SiTypescript,  color: '#3178C6' },
      { name: 'JavaScript',   Icon: SiJavascript,  color: '#F7DF1E' },
      { name: 'Next.js',      Icon: SiNextdotjs,   color: '#000000' },
      { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#0694B4' },
      { name: 'Vite',         Icon: SiVite,        color: '#646CFF' },
      { name: 'HTML5',        Icon: SiHtml5,       color: '#E34F26' },
      { name: 'CSS3',         Icon: SiCss,         color: '#1572B6' },
    ],
  },
  {
    id: 'backend', label: 'Backend', Icon: Server,
    accent: 'text-sky-600', darkAccent: 'dark:text-sky-400', accentHex: '#0ea5e9',
    bgClass: 'bg-sky-50', borderClass: 'border-sky-100', darkBg: 'dark:bg-sky-900/20',
    techs: [
      { name: 'Node.js', Icon: SiNodedotjs,   color: '#339933' },
      { name: 'Express', Icon: SiExpress,     color: '#888888' },
      { name: 'Kafka',   Icon: SiApachekafka, color: '#888888' },
      { name: 'Python',  Icon: SiPython,      color: '#3776AB' },
    ],
  },
  {
    id: 'database', label: 'Database', Icon: Database,
    accent: 'text-emerald-600', darkAccent: 'dark:text-emerald-400', accentHex: '#10b981',
    bgClass: 'bg-emerald-50', borderClass: 'border-emerald-100', darkBg: 'dark:bg-emerald-900/20',
    techs: [
      { name: 'MongoDB',    Icon: SiMongodb,    color: '#47A248' },
      { name: 'Redis',      Icon: SiRedis,      color: '#DC382D' },
      { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
      { name: 'Firebase',   Icon: SiFirebase,   color: '#F5A623' },
    ],
  },
  {
    id: 'aiml', label: 'AI / ML', Icon: Brain,
    accent: 'text-violet-600', darkAccent: 'dark:text-violet-400', accentHex: '#7c3aed',
    bgClass: 'bg-violet-50', borderClass: 'border-violet-100', darkBg: 'dark:bg-violet-900/20',
    techs: [
      { name: 'TensorFlow',   Icon: SiTensorflow,  color: '#FF6F00' },
      { name: 'Scikit-learn', Icon: SiScikitlearn, color: '#E07B39' },
      { name: 'NumPy',        Icon: SiNumpy,       color: '#4DABCF' },
      { name: 'Pandas',       Icon: SiPandas,      color: '#150458' },
    ],
  },
  {
    id: 'mobile', label: 'Mobile', Icon: Smartphone,
    accent: 'text-rose-600', darkAccent: 'dark:text-rose-400', accentHex: '#e11d48',
    bgClass: 'bg-rose-50', borderClass: 'border-rose-100', darkBg: 'dark:bg-rose-900/20',
    techs: [
      { name: 'React Native', Icon: SiReact,   color: '#61DAFB' },
      { name: 'Expo',         Icon: SiExpo,    color: '#888888' },
      { name: 'Android',      Icon: SiAndroid, color: '#3DDC84' },
    ],
  },
  {
    id: 'devops', label: 'DevOps', Icon: Wrench,
    accent: 'text-amber-600', darkAccent: 'dark:text-amber-400', accentHex: '#d97706',
    bgClass: 'bg-amber-50', borderClass: 'border-amber-100', darkBg: 'dark:bg-amber-900/20',
    techs: [
      { name: 'Git',    Icon: SiGit,    color: '#F05032' },
      { name: 'GitHub', Icon: SiGithub, color: '#181717' },
      { name: 'Docker', Icon: SiDocker, color: '#2496ED' },
      { name: 'Vercel', Icon: SiVercel, color: '#181717' },
      { name: 'Linux',  Icon: SiLinux,  color: '#FCC624' },
    ],
  },
]

/* ─── Category glass card ────────────────────────── */
function CategoryCard({ cat, delay }: { cat: Category; delay: number }) {
  const { Icon } = cat
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      className="glass rounded-2xl p-5 hover:shadow-lg transition-shadow duration-300 group"
      style={{
        boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px rgba(${cat.accentHex.replace('#','')},0.15), 0 2px 8px rgba(0,0,0,0.04)`
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.04)'
      }}
    >
      {/* Card header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className={`p-1.5 rounded-lg ${cat.bgClass} ${cat.darkBg} border ${cat.borderClass}`}>
          <Icon size={15} className={`${cat.accent} ${cat.darkAccent}`} />
        </div>
        <span className={`text-sm font-semibold ${cat.accent} ${cat.darkAccent}`}>{cat.label}</span>
        <span className="ml-auto text-xs font-mono text-slate-400 dark:text-slate-500">{cat.techs.length}</span>
      </div>

      {/* Tech icons */}
      <div className="flex flex-wrap gap-2">
        {cat.techs.map(({ name, Icon: TechIcon, color }) => (
          <div
            key={name}
            title={name}
            className="group/icon flex flex-col items-center gap-1 cursor-default"
          >
            <div
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-sm transition-all duration-200 group-hover/icon:scale-110 group-hover/icon:shadow-md"
              style={{ '--icon-color': color } as React.CSSProperties}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = `${color}55`
                el.style.backgroundColor = `${color}12`
                el.style.boxShadow = `0 4px 12px ${color}30`
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = ''
                el.style.backgroundColor = ''
                el.style.boxShadow = ''
              }}
            >
              <TechIcon size={20} style={{ color }} />
            </div>
            <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 group-hover/icon:text-slate-600 dark:group-hover/icon:text-slate-300 transition-colors whitespace-nowrap max-w-[44px] truncate text-center">
              {name}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

/* ─── Section ────────────────────────────────────── */
export default function Skills() {
  const totalTechs = categories.reduce((sum, c) => sum + c.techs.length, 0)

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="font-mono text-indigo-500 text-xs tracking-[0.3em] uppercase mb-3">03. Skills</p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">Tech Stack</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-3">{totalTechs} technologies across {categories.length} domains</p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Row 1: Frontend (wide) + Backend */}
          <div className="lg:col-span-2">
            <CategoryCard cat={categories[0]} delay={0.05} />
          </div>
          <div>
            <CategoryCard cat={categories[1]} delay={0.10} />
          </div>

          {/* Row 2: Database + AI/ML + Mobile */}
          <div>
            <CategoryCard cat={categories[2]} delay={0.15} />
          </div>
          <div>
            <CategoryCard cat={categories[3]} delay={0.20} />
          </div>
          <div>
            <CategoryCard cat={categories[4]} delay={0.25} />
          </div>

          {/* Row 3: DevOps full width */}
          <div className="sm:col-span-2 lg:col-span-3">
            <CategoryCard cat={categories[5]} delay={0.30} />
          </div>
        </div>

      </div>
    </section>
  )
}
