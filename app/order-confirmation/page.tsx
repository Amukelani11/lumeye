import type { Metadata } from "next"
import OrderConfirmationContent from "./OrderConfirmationContent"

export const metadata: Metadata = {
  title: "Order Confirmation | Thank You | Lumeye",
  description: "Your Lumeye order has been confirmed! Thank you for your purchase. Your order confirmation email has been sent with tracking details.",
  keywords: "order confirmation, Lumeye order, order tracking, thank you",
}

export default function OrderConfirmationPage() {
  return <OrderConfirmationContent />
}
