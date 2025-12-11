import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import { DM_Sans, Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import Header from "./components/Header"
import PostHogAnalyticsProvider from "./components/PostHogProvider"
import { CartProvider } from "./lib/cart-context"
import ClientVisitorTracker from "./components/ClientVisitorTracker"
import ClientTrackingInit from "./components/ClientTrackingInit"
import DiscountPopup from "./components/DiscountPopup"

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
  title: "Lumeye | Advanced Skincare Meets Light Therapy | LED Skincare Devices South Africa",
  description:
    "Advanced skincare meets light therapy. Lumeye Glow Wand and Glow Gel deliver clinical-grade LED innovation designed to smooth, brighten, and rejuvenate your skin — from home. 4.9/5 stars from 127+ reviews. Free shipping in South Africa.",
  keywords: "LED light therapy, red light therapy device, skincare device, LED wand, at-home facial, collagen production, skin rejuvenation, anti-aging device, South Africa, skincare technology, LED therapy wand",
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
    title: 'Lumeye | Advanced Skincare Meets Light Therapy | LED Skincare Devices South Africa',
    description: 'Advanced skincare meets light therapy. Lumeye Glow Wand and Glow Gel deliver clinical-grade LED innovation designed to smooth, brighten, and rejuvenate your skin — from home.',
    images: [
      {
        url: '/homepage-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Lumeye Glow Wand - Advanced LED Light Therapy Device',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lumeye | Advanced Skincare Meets Light Therapy | LED Skincare Devices South Africa',
    description: 'Advanced skincare meets light therapy. Lumeye Glow Wand and Glow Gel deliver clinical-grade LED innovation designed to smooth, brighten, and rejuvenate your skin — from home.',
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
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-15QPP5ED0B"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-15QPP5ED0B');
            `,
          }}
        />
        {/* Meta Pixel Code */}
        <Script
          id="facebook-pixel"
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
              fbq('init', '1355100322913889');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1355100322913889&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
        <Suspense fallback={null}>
          <PostHogAnalyticsProvider>
            <CartProvider>
              <ClientTrackingInit />
              <ClientVisitorTracker />
              <DiscountPopup />
              <Header />
              {children}
            </CartProvider>
          </PostHogAnalyticsProvider>
        </Suspense>
      </body>
    </html>
  )
}
