"use client"

import { useState } from "react"
import ProductGallery from "../components/ProductGallery"
import ProductInfo from "../components/ProductInfo"
import ProductViewContentTracker from "../components/ProductViewContentTracker"

type ProductType = "wand" | "gel" | "bundle"

const products = {
  wand: { id: "lumeye-glow-wand", name: "Lumeye Glow Wand", price: 559.3 },
  gel: { id: "lumeye-glow-gel", name: "Lumeye Glow Gel", price: 69.3 },
  bundle: { id: "lumeye-glow-kit", name: "Lumeye Glow Kit", price: 594.3 },
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
        <ProductGallery selectedProduct={selectedProduct === "bundle" ? "wand" : selectedProduct} />
        <ProductInfo 
          selectedProduct={selectedProduct}
          onProductSelect={(product) => {
            // Only update gallery for wand/gel, bundle doesn't change gallery
            if (product !== "bundle") {
              setSelectedProduct(product)
            }
          }}
        />
      </div>
    </>
  )
}

