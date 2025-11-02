export default function ProductStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Lumeye Glow Wand",
    "description": "Advanced skincare meets light therapy. Precision-engineered LED device with 660nm red light technology. Reduces fine lines, brightens skin, and promotes collagen production.",
    "brand": {
      "@type": "Brand",
      "name": "Lumeye"
    },
    "category": "Beauty & Personal Care > Skincare > LED Devices",
    "sku": "lumeye-glow-wand",
    "mpn": "LUM-GW-001",
    "gtin": "1234567890123",
    "image": [
      "https://lumeye.co.za/lumeyewandhero.png",
      "https://lumeye.co.za/lumeyebundleimage.png",
      "https://lumeye.co.za/lumeyegelhero.png"
    ],
    "offers": {
      "@type": "Offer",
      "price": "799.00",
      "priceCurrency": "ZAR",
      "availability": "https://schema.org/InStock",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "799.00",
        "priceCurrency": "ZAR",
        "referenceQuantity": {
          "@type": "QuantitativeValue",
          "value": 1,
          "unitCode": "C62"
        }
      },
      "highPrice": "999.00",
      "lowPrice": "799.00",
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
        "reviewBody": "Amazing results! My skin looks so much brighter and smoother. I use this device every morning and it's become my holy grail skincare tool. The LED therapy really works!"
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
        "reviewBody": "Works great! Love this LED device! The results are visible after a few weeks and my skin texture has improved significantly. My colleagues keep asking what I'm doing differently."
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
        "reviewBody": "Great for sensitive skin. No irritation at all and I can see a difference in my skin texture and brightness. Will definitely continue using."
      }
    ],
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Wavelength",
        "value": "660nm red light"
      },
      {
        "@type": "PropertyValue",
        "name": "Suitable for",
        "value": "All skin types, including sensitive skin"
      },
      {
        "@type": "PropertyValue",
        "name": "Treatment Time",
        "value": "5 minutes daily"
      },
      {
        "@type": "PropertyValue",
        "name": "Power Source",
        "value": "USB-C rechargeable"
      },
      {
        "@type": "PropertyValue",
        "name": "Dermatologist tested",
        "value": "Yes"
      },
      {
        "@type": "PropertyValue",
        "name": "Original Price",
        "value": "R999"
      },
      {
        "@type": "PropertyValue",
        "name": "Sale Price",
        "value": "R799"
      },
      {
        "@type": "PropertyValue",
        "name": "Savings",
        "value": "R200 (20% off)"
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