import type React from "react"
import type { Metadata } from "next"
import { DM_Sans, Inter } from "next/font/google"
import "./globals.css"
import Header from "./components/Header"
import { CartProvider } from "./lib/cart-context"
import ClientVisitorTracker from "./components/ClientVisitorTracker"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Lumeye - Premium Under Eye Serum | Depuff & Brighten in 60 Seconds",
  description:
    "Transform tired eyes instantly with Lumeye Under Eye Serum. Clinically proven to reduce puffiness and brighten dark circles in just 60 seconds. Dermatologist tested, cruelty-free, and suitable for sensitive skin. Free shipping in South Africa.",
  keywords: "under eye serum, eye cream, depuffing serum, dark circles, eye care, skincare, anti-aging, brightening serum, South Africa, dermatologist tested, cruelty-free, sensitive skin, caffeine serum, vitamin C serum, hyaluronic acid",
  authors: [{ name: "Lumeye" }],
  creator: "Lumeye",
  publisher: "Lumeye",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://lumeye.co.za'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: 'https://lumeye.co.za',
    siteName: 'Lumeye',
    title: 'Lumeye - Premium Under Eye Serum | Depuff & Brighten in 60 Seconds',
    description: 'Transform tired eyes instantly with Lumeye Under Eye Serum. Clinically proven to reduce puffiness and brighten dark circles in just 60 seconds.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lumeye Under Eye Serum - Transform tired eyes in 60 seconds',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lumeye - Premium Under Eye Serum | Depuff & Brighten in 60 Seconds',
    description: 'Transform tired eyes instantly with Lumeye Under Eye Serum. Clinically proven to reduce puffiness and brighten dark circles in just 60 seconds.',
    images: ['/twitter-image.jpg'],
    creator: '@lumeye',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'Beauty & Personal Care',
  classification: 'Skincare',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${inter.variable}`}>
      <body className="font-inter bg-white">
        <CartProvider>
          <ClientVisitorTracker />
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
