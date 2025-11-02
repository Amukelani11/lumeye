import type { Metadata } from "next"
import CartPageClient from "./CartPageClient"

export const metadata: Metadata = {
  title: "Shopping Cart | Lumeye LED Light Therapy Devices",
  description: "Review your Lumeye Glow Wand, Glow Gel, and Glow Kit items. Free shipping on all orders across South Africa. Secure checkout with Yoco.",
  keywords: "shopping cart, Lumeye cart, LED therapy cart, checkout, add to cart",
}

export default function CartPage() {
  return <CartPageClient />
}
