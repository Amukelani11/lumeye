export default function ProductStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Lumeye Under Eye Serum",
    "description": "Transform tired eyes instantly with Lumeye Under Eye Serum. Clinically proven to reduce puffiness and brighten dark circles in just 60 seconds.",
    "brand": {
      "@type": "Brand",
      "name": "Lumeye"
    },
    "category": "Beauty & Personal Care > Skincare > Eye Care",
    "sku": "lumeye-serum-001",
    "mpn": "LUM001",
    "gtin": "1234567890123",
    "image": [
      "https://lumeye.co.za/product-image-1.jpg",
      "https://lumeye.co.za/product-image-2.jpg",
      "https://lumeye.co.za/product-image-3.jpg"
    ],
    "offers": {
      "@type": "Offer",
      "price": "159.00",
      "priceCurrency": "ZAR",
      "availability": "https://schema.org/InStock",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "159.00",
        "priceCurrency": "ZAR",
        "referenceQuantity": {
          "@type": "QuantitativeValue",
          "value": 1,
          "unitCode": "ML"
        }
      },
      "highPrice": "318.00",
      "lowPrice": "159.00",
      "priceValidUntil": "2024-12-31",
      "seller": {
        "@type": "Organization",
        "name": "Lumeye"
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": "ZAR"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 2,
            "unitCode": "DAY"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 2,
            "maxValue": 5,
            "unitCode": "DAY"
          }
        }
      },
      "returnPolicy": {
        "@type": "ReturnPolicy",
        "applicableCountry": "ZA",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 30
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Sarah K."
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Amazing results! My under-eyes look so much brighter and the puffiness is completely gone. I use this every morning and it's become my holy grail product."
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Lisa M."
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Works instantly and lasts all day. Love this product! The results are immediate and my colleagues keep asking if I've been on vacation."
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Jennifer R."
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "4",
          "bestRating": "5"
        },
        "reviewBody": "Great for sensitive skin. No irritation at all and I can see a difference in my dark circles. Will definitely repurchase."
      }
    ],
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Volume",
        "value": "30ml"
      },
      {
        "@type": "PropertyValue",
        "name": "Suitable for",
        "value": "All skin types, including sensitive skin"
      },
      {
        "@type": "PropertyValue",
        "name": "Results",
        "value": "Visible in 60 seconds"
      },
      {
        "@type": "PropertyValue",
        "name": "Cruelty-free",
        "value": "Yes"
      },
      {
        "@type": "PropertyValue",
        "name": "Dermatologist tested",
        "value": "Yes"
      },
      {
        "@type": "PropertyValue",
        "name": "Original Price",
        "value": "R599"
      },
      {
        "@type": "PropertyValue",
        "name": "Sale Price",
        "value": "R159"
      },
      {
        "@type": "PropertyValue",
        "name": "Savings",
        "value": "R159 (50% off)"
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
} 