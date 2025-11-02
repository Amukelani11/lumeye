import type { Metadata } from "next"
import CheckoutPageClient from "./CheckoutPageClient"

export const metadata: Metadata = {
  title: "Checkout | Complete Your Order | Lumeye LED Light Therapy",
  description: "Complete your purchase of Lumeye Glow Wand, Glow Gel, or Glow Kit. Secure checkout with free shipping across South Africa. Pay with Yoco - all major cards accepted.",
  keywords: "checkout, buy LED light therapy, Lumeye checkout, secure payment, South Africa",
}

export default function CheckoutPage() {
  return <CheckoutPageClient />
}
