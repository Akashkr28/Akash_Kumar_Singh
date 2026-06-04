'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const sectionLinks = ['About', 'Projects', 'Skills', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname  = usePathname()
  const isHome    = pathname === '/'
  const isJourney = pathname === '/journey'

  // All hooks must be called before any conditional return (Rules of Hooks)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Journey has its own dedicated header — hide Navbar there
  if (isJourney) return null

  const scrollTo = (id: string) => {
    setMobileOpen(false)
    if (isHome) document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass shadow-sm shadow-indigo-100/40 dark:shadow-indigo-900/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-mono text-indigo-600 dark:text-indigo-400 text-lg font-bold tracking-wider hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors"
        >
          &lt;AKS /&gt;
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {isHome && sectionLinks.map(link => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-medium tracking-wide transition-colors duration-200 relative group"
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-indigo-500 group-hover:w-full transition-all duration-300" />
            </button>
          ))}

          <Link
            href="/journey"
            className={`text-sm font-medium tracking-wide transition-colors duration-200 relative group ${
              pathname === '/journey'
                ? 'text-indigo-600 dark:text-indigo-400'
                : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400'
            }`}
          >
            My Journey
            <span className={`absolute -bottom-1 left-0 h-px bg-indigo-500 transition-all duration-300 ${
              pathname === '/journey' ? 'w-full' : 'w-0 group-hover:w-full'
            }`} />
          </Link>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-indigo-400/50 text-indigo-600 dark:text-indigo-400 dark:border-indigo-500/50 text-sm font-mono rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-500 transition-all duration-200"
          >
            Resume
          </a>

          <ThemeToggle />
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            onClick={() => setMobileOpen(p => !p)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-b border-white/60 dark:border-white/10 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {isHome && sectionLinks.map(link => (
                <button
                  key={link}
                  onClick={() => scrollTo(link)}
                  className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm text-left transition-colors"
                >
                  {link}
                </button>
              ))}
              <Link
                href="/journey"
                onClick={() => setMobileOpen(false)}
                className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm text-left transition-colors"
              >
                My Journey
              </Link>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 text-sm font-mono"
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
