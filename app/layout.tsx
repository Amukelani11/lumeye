import type React from "react"
import type { Metadata } from "next"
import { DM_Sans, Inter } from "next/font/google"
import "./globals.css"
import Header from "./components/Header"
import { CartProvider } from "./lib/cart-context"
import Script from "next/script"
import EmailCaptureWrapper from "./components/EmailCaptureWrapper"

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
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-G2YY6DJHV8"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-G2YY6DJHV8');
          `}
        </Script>
        
        {/* Meta Pixel Code */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '3319769888188811');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=3319769888188811&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      <body className="font-inter bg-white">
        <CartProvider>
          <Header />
          {children}
          <EmailCaptureWrapper />
        </CartProvider>
      </body>
    </html>
  )
}
