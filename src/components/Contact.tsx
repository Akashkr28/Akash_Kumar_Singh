import { useRef, useState, type FormEvent } from 'react'
import { motion, useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { Send, Mail, CheckCircle, AlertCircle } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'

// Replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const ref = useRef(null)
  const formRef = useRef<HTMLFormElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
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

  return (
    <section id="contact" className="py-24 px-6 bg-slate-950/50">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="font-mono text-cyan-400 text-xs tracking-[0.3em] uppercase mb-3">04. Contact</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Get In Touch</h2>
          <p className="text-slate-400 mt-3 max-w-lg mx-auto text-sm leading-relaxed">
            I'm open to internships, freelance work, and collaborations. Drop a message and I'll get back to you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-white font-semibold mb-4">Let's connect</h3>
              <div className="space-y-4">
                {[
                  {
                    icon: Mail,
                    label: 'Email',
                    value: 'akashkumarsingh816@gmail.com',
                    href: 'mailto:akashkumarsingh816@gmail.com',
                  },
                  {
                    icon: GithubIcon,
                    label: 'GitHub',
                    value: 'github.com/Akashkr28',
                    href: 'https://github.com/Akashkr28',
                  },
                  {
                    icon: LinkedinIcon,
                    label: 'LinkedIn',
                    value: 'linkedin.com/in/akash-kumar-singh-2a3503364',
                    href: 'https://www.linkedin.com/in/akash-kumar-singh-2a3503364/',
                  },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-slate-400 hover:text-cyan-400 transition-colors group"
                  >
                    <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg group-hover:border-cyan-400/30 transition-colors">
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-600 font-mono">{label}</p>
                      <p className="text-sm">{value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-800 pt-6">
              <p className="text-slate-500 text-sm font-mono">
                <span className="text-cyan-400">$</span> status: open_to_opportunities
              </p>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1.5">Name</label>
                <input
                  type="text"
                  name="from_name"
                  required
                  placeholder="Your name"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1.5">Email</label>
                <input
                  type="email"
                  name="from_email"
                  required
                  placeholder="your@email.com"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1.5">Message</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="What's on your mind?"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400/50 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2 bg-cyan-400 text-slate-950 font-semibold py-3 rounded-lg text-sm hover:bg-cyan-300 transition-colors disabled:opacity-60 disabled:cursor-not-allowed font-mono"
              >
                {status === 'sending' ? (
                  <>
                    <span className="animate-spin rounded-full border-2 border-slate-950 border-t-transparent w-4 h-4" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} /> Send Message
                  </>
                )}
              </button>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-green-400 text-sm"
                >
                  <CheckCircle size={16} /> Message sent! I'll get back to you soon.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-400 text-sm"
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
