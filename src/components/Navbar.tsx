import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const sectionLinks = ['About', 'Projects', 'Skills', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (id: string) => {
    setMobileOpen(false)
    if (isHome) {
      document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#f9f8f4]/92 backdrop-blur-md border-b border-stone-200 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="font-mono text-amber-600 text-lg font-bold tracking-wider hover:text-amber-700 transition-colors"
        >
          &lt;AKS /&gt;
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {isHome && sectionLinks.map(link => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-stone-500 hover:text-stone-900 text-sm font-medium tracking-wide transition-colors duration-200 relative group"
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-500 group-hover:w-full transition-all duration-300" />
            </button>
          ))}

          <Link
            to="/journey"
            className={`text-sm font-medium tracking-wide transition-colors duration-200 relative group ${
              location.pathname === '/journey'
                ? 'text-amber-600'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            My Journey
            <span className={`absolute -bottom-1 left-0 h-px bg-amber-500 transition-all duration-300 ${
              location.pathname === '/journey' ? 'w-full' : 'w-0 group-hover:w-full'
            }`} />
          </Link>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-amber-400/70 text-amber-700 text-sm font-mono rounded hover:bg-amber-50 hover:border-amber-500 transition-all duration-200"
          >
            Resume
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-stone-500 hover:text-amber-600 transition-colors"
          onClick={() => setMobileOpen(p => !p)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#f9f8f4]/97 backdrop-blur-md border-b border-stone-200 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {isHome && sectionLinks.map(link => (
                <button
                  key={link}
                  onClick={() => scrollTo(link)}
                  className="text-stone-600 hover:text-amber-600 text-sm text-left transition-colors"
                >
                  {link}
                </button>
              ))}
              <Link
                to="/journey"
                onClick={() => setMobileOpen(false)}
                className="text-stone-600 hover:text-amber-600 text-sm text-left transition-colors"
              >
                My Journey
              </Link>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-600 text-sm font-mono"
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
