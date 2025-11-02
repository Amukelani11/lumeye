import type { Metadata } from "next"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = {
  title: "Contact Us | Customer Support | Lumeye LED Light Therapy",
  description: "Get in touch with Lumeye customer support. Questions about our LED light therapy devices? Contact us via email or phone. We're here to help!",
  keywords: "contact Lumeye, customer support, LED therapy support, skincare advice, Lumeye help",
}

export default function ContactPage() {
  return <ContactPageClient />
}
