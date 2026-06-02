'use client'
import { useRef, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { Send, Mail, CheckCircle, AlertCircle } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'

const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return
    setStatus('sending')
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY)
      setStatus('success')
      formRef.current.reset()
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/50 transition-all duration-200'

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="font-mono text-indigo-500 text-xs tracking-[0.3em] uppercase mb-3">04. Contact</p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">Get In Touch</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-lg mx-auto text-sm leading-relaxed">
            I'm open to internships, freelance work, and collaborations. Drop a message and I'll get back to you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Left: contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <h3 className="text-slate-800 dark:text-slate-200 font-semibold text-lg">Let's connect</h3>

            <div className="space-y-3">
              {[
                { icon: Mail,        label: 'Email',    value: 'akashkumarsingh816@gmail.com', href: 'mailto:akashkumarsingh816@gmail.com' },
                { icon: GithubIcon,  label: 'GitHub',   value: 'github.com/Akashkr28',         href: 'https://github.com/Akashkr28' },
                { icon: LinkedinIcon,label: 'LinkedIn', value: 'linkedin.com/in/akash-kumar…', href: 'https://www.linkedin.com/in/akash-kumar-singh-2a3503364/' },
              ].map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 glass rounded-xl px-4 py-3 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group shadow-sm hover:shadow-indigo-100/50 dark:hover:shadow-indigo-900/30"
                >
                  <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50 rounded-lg shrink-0 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-800/30 transition-colors">
                    <Icon size={15} className="text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">{label}</p>
                    <p className="text-sm font-medium">{value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Status */}
            <div className="glass rounded-xl px-4 py-3 flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="text-sm font-mono text-slate-600 dark:text-slate-300">status: <span className="text-indigo-600 dark:text-indigo-400">open_to_opportunities</span></span>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 glass rounded-2xl p-6 shadow-sm">
              <div>
                <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1.5">Name</label>
                <input type="text" name="from_name" required placeholder="Your name" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1.5">Email</label>
                <input type="email" name="from_email" required placeholder="your@email.com" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-500 dark:text-slate-400 mb-1.5">Message</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="What's on your mind?"
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2 text-white font-semibold py-3 rounded-xl text-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
                style={{ background: 'linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%)', boxShadow: '0 4px 16px rgba(99,102,241,0.30)' }}
              >
                {status === 'sending' ? (
                  <>
                    <span className="animate-spin rounded-full border-2 border-white border-t-transparent w-4 h-4" />
                    Sending...
                  </>
                ) : (
                  <><Send size={16} /> Send Message</>
                )}
              </button>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-emerald-600 text-sm"
                >
                  <CheckCircle size={16} /> Message sent! I'll get back to you soon.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-rose-500 text-sm"
                >
                  <AlertCircle size={16} /> Something went wrong. Try emailing directly.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
