import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Providers from '@/components/Providers'
import LoadingScreen from '@/components/LoadingScreen'
import CustomCursor from '@/components/CustomCursor'

export const metadata: Metadata = {
  title: 'Akash Kumar Singh | Full Stack Developer',
  description:
    'MCA student at Amity University Online specialising in AI & ML. Building real-time web apps with Kafka, React, and modern tooling.',
  openGraph: {
    title: 'Akash Kumar Singh | Portfolio',
    description: 'Full Stack Developer — real-time systems, AI/ML, mobile.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* ── Fixed animated background blobs ── */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
          <div
            className="anim-blob-1 absolute -top-52 -left-52 w-[640px] h-[640px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 70%)' }}
          />
          <div
            className="anim-blob-2 absolute -bottom-52 -right-52 w-[720px] h-[720px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.17) 0%, transparent 70%)' }}
          />
          <div
            className="anim-blob-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[540px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%)' }}
          />
          <div
            className="anim-blob-4 absolute top-1/4 right-1/4 w-[380px] h-[380px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.10) 0%, transparent 70%)' }}
          />
        </div>

        <LoadingScreen />
        <CustomCursor />
        <Providers>
          <div className="relative z-10">
            <Navbar />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
