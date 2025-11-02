"use client"

import { useState } from "react"
import ProductGallery from "../components/ProductGallery"
import ProductInfo from "../components/ProductInfo"

type ProductType = "wand" | "gel"

export default function ProductPageClient() {
  const [selectedProduct, setSelectedProduct] = useState<ProductType>("wand")

  return (
    <div className="grid lg:grid-cols-2 gap-12 mb-16">
      <ProductGallery selectedProduct={selectedProduct} />
      <ProductInfo 
        selectedProduct={selectedProduct}
        onProductSelect={(product) => {
          setSelectedProduct(product)
        }}
      />
    </div>
  )
}

