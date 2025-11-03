"use client"

import { useState } from "react"
import ProductGallery from "../components/ProductGallery"
import ProductInfo from "../components/ProductInfo"
import ProductViewContentTracker from "../components/ProductViewContentTracker"

type ProductType = "wand" | "gel"

const products = {
  wand: { id: "lumeye-glow-wand", name: "Lumeye Glow Wand", price: 799 },
  gel: { id: "lumeye-glow-gel", name: "Lumeye Glow Gel", price: 99 },
}

export default function ProductPageClient() {
  const [selectedProduct, setSelectedProduct] = useState<ProductType>("wand")
  const currentProduct = products[selectedProduct]

  return (
    <>
      <ProductViewContentTracker 
        productId={currentProduct.id}
        productName={currentProduct.name}
        productPrice={currentProduct.price}
      />
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        <ProductGallery selectedProduct={selectedProduct} />
        <ProductInfo 
          selectedProduct={selectedProduct}
          onProductSelect={(product) => {
            setSelectedProduct(product)
          }}
        />
      </div>
    </>
  )
}

