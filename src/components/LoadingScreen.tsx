'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    /* Only play once per browser session */
    if (sessionStorage.getItem('aks-loaded')) {
      setVisible(false)
      return
    }
    const t = setTimeout(() => {
      setVisible(false)
      sessionStorage.setItem('aks-loaded', '1')
    }, 2400)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#eff3ff] flex flex-col items-center justify-center gap-10"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          {/* Logo */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-indigo-600 text-4xl md:text-5xl font-bold tracking-wider select-none"
          >
            &lt;AKS /&gt;
          </motion.p>

          {/* Progress bar */}
          <div className="w-48 h-px bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              style={{ transformOrigin: 'left', background: 'linear-gradient(to right, #6366f1, #0ea5e9)' }}
            />
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="font-mono text-slate-400 text-[11px] tracking-[0.4em] uppercase"
          >
            Full Stack Developer
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
