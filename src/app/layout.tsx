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
    <html lang="en">
      <body>
        <LoadingScreen />
        <CustomCursor />
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
