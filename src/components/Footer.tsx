'use client'
export default function Footer() {
  return (
    <footer className="border-t border-slate-200/60 dark:border-slate-800/60 py-8 px-6 text-center glass">
      <p className="font-mono text-slate-500 text-xs">
        <span className="text-indigo-500">{'<'}</span>
        {'  '}Built by{' '}
        <span className="text-slate-700 dark:text-slate-300 font-medium">Akash Kumar Singh</span>
        {'  '}
        <span className="text-indigo-500">{'/>'}</span>
        {'  '}·{'  '}Next.js + TypeScript + Tailwind
      </p>
    </footer>
  )
}
