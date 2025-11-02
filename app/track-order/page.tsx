import type { Metadata } from "next"
import TrackOrderPageClient from "./TrackOrderPageClient"

export const metadata: Metadata = {
  title: "Track Your Order | Order Tracking | Lumeye",
  description: "Track your Lumeye order status in real-time. Enter your order number and email to see shipping updates and delivery information.",
  keywords: "track order, order tracking, Lumeye tracking, shipping status, delivery tracking",
}

export default function TrackOrderPage() {
  return <TrackOrderPageClient />
}
