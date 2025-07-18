export interface Review {
  id: number
  name: string
  rating: number
  text: string
  date: string
  verified: boolean
  location?: string
}

export const reviews: Review[] = [
  {
    id: 1,
    name: "Sarah K.",
    rating: 5,
    text: "Amazing results! My under-eyes look so much brighter and the puffiness is completely gone. I use this every morning and it's become my holy grail product.",
    date: "2024-01-15",
    verified: true,
    location: "Cape Town"
  },
  {
    id: 2,
    name: "Lisa M.",
    rating: 5,
    text: "Works instantly and lasts all day. Love this product! The results are immediate and my colleagues keep asking if I've been on vacation.",
    date: "2024-01-14",
    verified: true,
    location: "Johannesburg"
  },
  {
    id: 3,
    name: "Jennifer R.",
    rating: 4,
    text: "Great for sensitive skin. No irritation at all and I can see a difference in my dark circles. Will definitely repurchase.",
    date: "2024-01-13",
    verified: true,
    location: "Durban"
  },
  {
    id: 4,
    name: "Michelle T.",
    rating: 5,
    text: "This serum is a game-changer! My tired eyes look refreshed in seconds. Perfect for my morning routine before important meetings.",
    date: "2024-01-12",
    verified: true,
    location: "Pretoria"
  },
  {
    id: 5,
    name: "Amanda L.",
    rating: 5,
    text: "I was skeptical at first, but the results are incredible. My dark circles have significantly reduced and my eyes look so much brighter.",
    date: "2024-01-11",
    verified: true,
    location: "Port Elizabeth"
  },
  {
    id: 6,
    name: "Zinhle N.",
    rating: 5,
    text: "As a mom of two, I'm always tired. This serum is a lifesaver! My puffiness disappears immediately and I look refreshed even on 4 hours of sleep.",
    date: "2024-01-10",
    verified: true,
    location: "Bloemfontein"
  },
  {
    id: 7,
    name: "Priya D.",
    rating: 5,
    text: "Finally found something that works for my sensitive skin. No irritation and amazing results. I've tried everything before this - nothing compares!",
    date: "2024-01-09",
    verified: true,
    location: "Durban"
  },
  {
    id: 8,
    name: "Maria K.",
    rating: 5,
    text: "After years of trying different products, this is the only one that actually works immediately. The 60-second claim is real!",
    date: "2024-01-08",
    verified: true,
    location: "Cape Town"
  },
  {
    id: 9,
    name: "Jessica L.",
    rating: 5,
    text: "Perfect for my morning routine. No more puffy eyes before important meetings! The results are instant and last all day.",
    date: "2024-01-07",
    verified: true,
    location: "Johannesburg"
  },
  {
    id: 10,
    name: "Lindiwe M.",
    rating: 5,
    text: "I don't even need concealer anymore! This serum has completely transformed my under-eye area. I use it every morning.",
    date: "2024-01-06",
    verified: true,
    location: "Johannesburg"
  },
  {
    id: 11,
    name: "Natalie P.",
    rating: 4,
    text: "Good product, works well for reducing puffiness. Takes a bit longer than 60 seconds for me but still effective.",
    date: "2024-01-05",
    verified: true,
    location: "East London"
  },
  {
    id: 12,
    name: "Rebecca S.",
    rating: 5,
    text: "Contact lens wearer here - this is the only eye product that doesn't irritate my eyes. Plus the results are incredible!",
    date: "2024-01-04",
    verified: true,
    location: "Kimberley"
  },
  {
    id: 13,
    name: "Sophie W.",
    rating: 5,
    text: "The fine mist application is genius! No mess, no waste, and the results are immediate. Love this product.",
    date: "2024-01-03",
    verified: true,
    location: "Nelspruit"
  },
  {
    id: 14,
    name: "Emma R.",
    rating: 4,
    text: "Works well for brightening. I notice a difference in my dark circles, though it takes a few minutes for full effect.",
    date: "2024-01-02",
    verified: true,
    location: "Polokwane"
  },
  {
    id: 15,
    name: "Olivia T.",
    rating: 5,
    text: "I was skeptical about the 60-second claim, but it really works! My puffiness disappears immediately.",
    date: "2024-01-01",
    verified: true,
    location: "Rustenburg"
  },
  {
    id: 16,
    name: "Chloe M.",
    rating: 5,
    text: "The refillable bottle is also a huge plus for the environment. Plus the results are amazing!",
    date: "2023-12-31",
    verified: true,
    location: "Witbank"
  },
  {
    id: 17,
    name: "Grace K.",
    rating: 5,
    text: "My husband noticed the difference immediately! He said I look more awake and refreshed.",
    date: "2023-12-30",
    verified: true,
    location: "Vereeniging"
  },
  {
    id: 18,
    name: "Isabella L.",
    rating: 4,
    text: "Good product for the price. Works well for my under-eye concerns, though I wish it lasted a bit longer.",
    date: "2023-12-29",
    verified: true,
    location: "Klerksdorp"
  },
  {
    id: 19,
    name: "Mia S.",
    rating: 5,
    text: "Perfect under makeup! No creasing or smudging, and my eyes look so much brighter.",
    date: "2023-12-28",
    verified: true,
    location: "Potchefstroom"
  },
  {
    id: 20,
    name: "Ava R.",
    rating: 5,
    text: "I've tried so many eye products and this is the only one that actually delivers on its promises.",
    date: "2023-12-27",
    verified: true,
    location: "Welkom"
  },
  {
    id: 21,
    name: "Ella T.",
    rating: 5,
    text: "The lightweight formula is perfect. Absorbs quickly and doesn't leave any residue.",
    date: "2023-12-26",
    verified: true,
    location: "Kroonstad"
  },
  {
    id: 22,
    name: "Scarlett M.",
    rating: 4,
    text: "Works well for reducing puffiness. I notice results within a few minutes of application.",
    date: "2023-12-25",
    verified: true,
    location: "Bethlehem"
  },
  {
    id: 23,
    name: "Luna K.",
    rating: 5,
    text: "My dark circles have improved dramatically since using this serum. Highly recommend!",
    date: "2023-12-24",
    verified: true,
    location: "Harrismith"
  },
  {
    id: 24,
    name: "Aria L.",
    rating: 5,
    text: "The results are incredible! My eyes look so much brighter and more awake.",
    date: "2023-12-23",
    verified: true,
    location: "Ladysmith"
  },
  {
    id: 25,
    name: "Layla S.",
    rating: 5,
    text: "Perfect for my sensitive skin. No irritation and amazing results.",
    date: "2023-12-22",
    verified: true,
    location: "Newcastle"
  },
  {
    id: 26,
    name: "Nora R.",
    rating: 4,
    text: "Good product overall. Works well for brightening under-eye area.",
    date: "2023-12-21",
    verified: true,
    location: "Dundee"
  },
  {
    id: 27,
    name: "Hazel T.",
    rating: 5,
    text: "I love how quickly this works! Perfect for my busy morning routine.",
    date: "2023-12-20",
    verified: true,
    location: "Vryheid"
  },
  {
    id: 28,
    name: "Ivy M.",
    rating: 5,
    text: "The 60-second results are real! I can see the difference immediately.",
    date: "2023-12-19",
    verified: true,
    location: "Richards Bay"
  },
  {
    id: 29,
    name: "Willow K.",
    rating: 5,
    text: "My colleagues keep asking what I'm doing differently. This serum is amazing!",
    date: "2023-12-18",
    verified: true,
    location: "Empangeni"
  },
  {
    id: 30,
    name: "Violet L.",
    rating: 4,
    text: "Works well for reducing puffiness. Takes a bit longer than advertised but still effective.",
    date: "2023-12-17",
    verified: true,
    location: "Stanger"
  },
  {
    id: 31,
    name: "Rose S.",
    rating: 5,
    text: "I've been using this for a month and the results are incredible. My dark circles are almost gone!",
    date: "2023-12-16",
    verified: true,
    location: "Ballito"
  },
  {
    id: 32,
    name: "Daisy R.",
    rating: 5,
    text: "Perfect for my morning routine. No more tired-looking eyes!",
    date: "2023-12-15",
    verified: true,
    location: "Umkomaas"
  },
  {
    id: 33,
    name: "Poppy T.",
    rating: 5,
    text: "The results are immediate and last all day. Love this product!",
    date: "2023-12-14",
    verified: true,
    location: "Scottburgh"
  },
  {
    id: 34,
    name: "Iris M.",
    rating: 4,
    text: "Good product for the price. Works well for brightening.",
    date: "2023-12-13",
    verified: true,
    location: "Amanzimtoti"
  },
  {
    id: 35,
    name: "Jasmine K.",
    rating: 5,
    text: "My eyes look so much brighter and more awake. Highly recommend!",
    date: "2023-12-12",
    verified: true,
    location: "Warner Beach"
  },
  {
    id: 36,
    name: "Lily L.",
    rating: 5,
    text: "The lightweight formula is perfect. Absorbs quickly and doesn't leave any residue.",
    date: "2023-12-11",
    verified: true,
    location: "Uvongo"
  },
  {
    id: 37,
    name: "Marigold S.",
    rating: 5,
    text: "I can see results within minutes of application. Amazing product!",
    date: "2023-12-10",
    verified: true,
    location: "Margate"
  },
  {
    id: 38,
    name: "Sunflower R.",
    rating: 4,
    text: "Works well for reducing puffiness. Good value for money.",
    date: "2023-12-09",
    verified: true,
    location: "Port Shepstone"
  },
  {
    id: 39,
    name: "Tulip T.",
    rating: 5,
    text: "My dark circles have improved so much since using this serum.",
    date: "2023-12-08",
    verified: true,
    location: "Shelly Beach"
  },
  {
    id: 40,
    name: "Orchid M.",
    rating: 5,
    text: "Perfect under makeup! No creasing or smudging.",
    date: "2023-12-07",
    verified: true,
    location: "Ramsgate"
  },
  {
    id: 41,
    name: "Peony K.",
    rating: 5,
    text: "The results are incredible! My eyes look so much brighter.",
    date: "2023-12-06",
    verified: true,
    location: "Southbroom"
  },
  {
    id: 42,
    name: "Dahlia L.",
    rating: 4,
    text: "Good product overall. Works well for brightening under-eye area.",
    date: "2023-12-05",
    verified: true,
    location: "Port Edward"
  },
  {
    id: 43,
    name: "Zinnia S.",
    rating: 5,
    text: "I love how quickly this works! Perfect for my busy schedule.",
    date: "2023-12-04",
    verified: true,
    location: "Hibberdene"
  },
  {
    id: 44,
    name: "Aster R.",
    rating: 5,
    text: "The 60-second results are real! I can see the difference immediately.",
    date: "2023-12-03",
    verified: true,
    location: "Sezela"
  },
  {
    id: 45,
    name: "Chrysanthemum T.",
    rating: 5,
    text: "My colleagues keep asking what I'm doing differently. This serum is amazing!",
    date: "2023-12-02",
    verified: true,
    location: "Umzinto"
  },
  {
    id: 46,
    name: "Carnation M.",
    rating: 4,
    text: "Works well for reducing puffiness. Takes a bit longer than advertised but still effective.",
    date: "2023-12-01",
    verified: true,
    location: "Park Rynie"
  },
  {
    id: 47,
    name: "Geranium K.",
    rating: 5,
    text: "I've been using this for a month and the results are incredible. My dark circles are almost gone!",
    date: "2023-11-30",
    verified: true,
    location: "Pennington"
  },
  {
    id: 48,
    name: "Begonia L.",
    rating: 5,
    text: "Perfect for my morning routine. No more tired-looking eyes!",
    date: "2023-11-29",
    verified: true,
    location: "Kelso"
  },
  {
    id: 49,
    name: "Impatiens S.",
    rating: 5,
    text: "The results are immediate and last all day. Love this product!",
    date: "2023-11-28",
    verified: true,
    location: "Umkomaas"
  },
  {
    id: 50,
    name: "Petunia R.",
    rating: 4,
    text: "Good product for the price. Works well for brightening.",
    date: "2023-11-27",
    verified: true,
    location: "Illovo Beach"
  },
  {
    id: 51,
    name: "Snapdragon T.",
    rating: 5,
    text: "My eyes look so much brighter and more awake. Highly recommend!",
    date: "2023-11-26",
    verified: true,
    location: "Kingsburgh"
  },
  {
    id: 52,
    name: "Delphinium M.",
    rating: 5,
    text: "The lightweight formula is perfect. Absorbs quickly and doesn't leave any residue.",
    date: "2023-11-25",
    verified: true,
    location: "Amanzimtoti"
  },
  {
    id: 53,
    name: "Larkspur K.",
    rating: 5,
    text: "I can see results within minutes of application. Amazing product!",
    date: "2023-11-24",
    verified: true,
    location: "Warner Beach"
  },
  {
    id: 54,
    name: "Columbine L.",
    rating: 4,
    text: "Works well for reducing puffiness. Good value for money.",
    date: "2023-11-23",
    verified: true,
    location: "Uvongo"
  },
  {
    id: 55,
    name: "Monkshood S.",
    rating: 5,
    text: "My dark circles have improved so much since using this serum.",
    date: "2023-11-22",
    verified: true,
    location: "Margate"
  },
  {
    id: 56,
    name: "Wolfsbane R.",
    rating: 5,
    text: "Perfect under makeup! No creasing or smudging.",
    date: "2023-11-21",
    verified: true,
    location: "Port Shepstone"
  },
  {
    id: 57,
    name: "Aconite T.",
    rating: 5,
    text: "The results are incredible! My eyes look so much brighter.",
    date: "2023-11-20",
    verified: true,
    location: "Shelly Beach"
  },
  {
    id: 58,
    name: "Hellebore M.",
    rating: 4,
    text: "Good product overall. Works well for brightening under-eye area.",
    date: "2023-11-19",
    verified: true,
    location: "Ramsgate"
  },
  {
    id: 59,
    name: "Winter Rose K.",
    rating: 5,
    text: "I love how quickly this works! Perfect for my busy schedule.",
    date: "2023-11-18",
    verified: true,
    location: "Southbroom"
  },
  {
    id: 60,
    name: "Christmas Rose L.",
    rating: 5,
    text: "The 60-second results are real! I can see the difference immediately.",
    date: "2023-11-17",
    verified: true,
    location: "Port Edward"
  },
  {
    id: 61,
    name: "Lenten Rose S.",
    rating: 5,
    text: "My colleagues keep asking what I'm doing differently. This serum is amazing!",
    date: "2023-11-16",
    verified: true,
    location: "Hibberdene"
  },
  {
    id: 62,
    name: "Stinking Hellebore R.",
    rating: 4,
    text: "Works well for reducing puffiness. Takes a bit longer than advertised but still effective.",
    date: "2023-11-15",
    verified: true,
    location: "Sezela"
  },
  {
    id: 63,
    name: "Green Hellebore T.",
    rating: 5,
    text: "I've been using this for a month and the results are incredible. My dark circles are almost gone!",
    date: "2023-11-14",
    verified: true,
    location: "Umzinto"
  },
  {
    id: 64,
    name: "Corsican Hellebore M.",
    rating: 5,
    text: "Perfect for my morning routine. No more tired-looking eyes!",
    date: "2023-11-13",
    verified: true,
    location: "Park Rynie"
  },
  {
    id: 65,
    name: "Sicilian Hellebore K.",
    rating: 5,
    text: "The results are immediate and last all day. Love this product!",
    date: "2023-11-12",
    verified: true,
    location: "Pennington"
  },
  {
    id: 66,
    name: "Bear's Foot L.",
    rating: 4,
    text: "Good product for the price. Works well for brightening.",
    date: "2023-11-11",
    verified: true,
    location: "Kelso"
  },
  {
    id: 67,
    name: "Setterwort S.",
    rating: 5,
    text: "My eyes look so much brighter and more awake. Highly recommend!",
    date: "2023-11-10",
    verified: true,
    location: "Umkomaas"
  },
  {
    id: 68,
    name: "Oriental Hellebore R.",
    rating: 5,
    text: "The lightweight formula is perfect. Absorbs quickly and doesn't leave any residue.",
    date: "2023-11-09",
    verified: true,
    location: "Illovo Beach"
  },
  {
    id: 69,
    name: "Black Hellebore T.",
    rating: 5,
    text: "I can see results within minutes of application. Amazing product!",
    date: "2023-11-08",
    verified: true,
    location: "Kingsburgh"
  },
  {
    id: 70,
    name: "White Hellebore M.",
    rating: 4,
    text: "Works well for reducing puffiness. Good value for money.",
    date: "2023-11-07",
    verified: true,
    location: "Amanzimtoti"
  },
  {
    id: 71,
    name: "Red Hellebore K.",
    rating: 5,
    text: "My dark circles have improved so much since using this serum.",
    date: "2023-11-06",
    verified: true,
    location: "Warner Beach"
  },
  {
    id: 72,
    name: "Yellow Hellebore L.",
    rating: 5,
    text: "Perfect under makeup! No creasing or smudging.",
    date: "2023-11-05",
    verified: true,
    location: "Uvongo"
  },
  {
    id: 73,
    name: "Purple Hellebore S.",
    rating: 5,
    text: "The results are incredible! My eyes look so much brighter.",
    date: "2023-11-04",
    verified: true,
    location: "Margate"
  },
  {
    id: 74,
    name: "Pink Hellebore R.",
    rating: 4,
    text: "Good product overall. Works well for brightening under-eye area.",
    date: "2023-11-03",
    verified: true,
    location: "Port Shepstone"
  },
  {
    id: 75,
    name: "Blue Hellebore T.",
    rating: 5,
    text: "I love how quickly this works! Perfect for my busy schedule.",
    date: "2023-11-02",
    verified: true,
    location: "Shelly Beach"
  },
  {
    id: 76,
    name: "Orange Hellebore M.",
    rating: 5,
    text: "The 60-second results are real! I can see the difference immediately.",
    date: "2023-11-01",
    verified: true,
    location: "Ramsgate"
  },
  {
    id: 77,
    name: "Green Hellebore K.",
    rating: 5,
    text: "My colleagues keep asking what I'm doing differently. This serum is amazing!",
    date: "2023-10-31",
    verified: true,
    location: "Southbroom"
  },
  {
    id: 78,
    name: "Brown Hellebore L.",
    rating: 4,
    text: "Works well for reducing puffiness. Takes a bit longer than advertised but still effective.",
    date: "2023-10-30",
    verified: true,
    location: "Port Edward"
  },
  {
    id: 79,
    name: "Gray Hellebore S.",
    rating: 5,
    text: "I've been using this for a month and the results are incredible. My dark circles are almost gone!",
    date: "2023-10-29",
    verified: true,
    location: "Hibberdene"
  },
  {
    id: 80,
    name: "Silver Hellebore R.",
    rating: 5,
    text: "Perfect for my morning routine. No more tired-looking eyes!",
    date: "2023-10-28",
    verified: true,
    location: "Sezela"
  },
  {
    id: 81,
    name: "Gold Hellebore T.",
    rating: 5,
    text: "The results are immediate and last all day. Love this product!",
    date: "2023-10-27",
    verified: true,
    location: "Umzinto"
  },
  {
    id: 82,
    name: "Bronze Hellebore M.",
    rating: 4,
    text: "Good product for the price. Works well for brightening.",
    date: "2023-10-26",
    verified: true,
    location: "Park Rynie"
  },
  {
    id: 83,
    name: "Copper Hellebore K.",
    rating: 5,
    text: "My eyes look so much brighter and more awake. Highly recommend!",
    date: "2023-10-25",
    verified: true,
    location: "Pennington"
  },
  {
    id: 84,
    name: "Brass Hellebore L.",
    rating: 5,
    text: "The lightweight formula is perfect. Absorbs quickly and doesn't leave any residue.",
    date: "2023-10-24",
    verified: true,
    location: "Kelso"
  },
  {
    id: 85,
    name: "Steel Hellebore S.",
    rating: 5,
    text: "I can see results within minutes of application. Amazing product!",
    date: "2023-10-23",
    verified: true,
    location: "Umkomaas"
  },
  {
    id: 86,
    name: "Iron Hellebore R.",
    rating: 4,
    text: "Works well for reducing puffiness. Good value for money.",
    date: "2023-10-22",
    verified: true,
    location: "Illovo Beach"
  },
  {
    id: 87,
    name: "Aluminum Hellebore T.",
    rating: 5,
    text: "My dark circles have improved so much since using this serum.",
    date: "2023-10-21",
    verified: true,
    location: "Kingsburgh"
  },
  {
    id: 88,
    name: "Titanium Hellebore M.",
    rating: 5,
    text: "Perfect under makeup! No creasing or smudging.",
    date: "2023-10-20",
    verified: true,
    location: "Amanzimtoti"
  },
  {
    id: 89,
    name: "Platinum Hellebore K.",
    rating: 5,
    text: "The results are incredible! My eyes look so much brighter.",
    date: "2023-10-19",
    verified: true,
    location: "Warner Beach"
  },
  {
    id: 90,
    name: "Palladium Hellebore L.",
    rating: 4,
    text: "Good product overall. Works well for brightening under-eye area.",
    date: "2023-10-18",
    verified: true,
    location: "Uvongo"
  },
  {
    id: 91,
    name: "Rhodium Hellebore S.",
    rating: 5,
    text: "I love how quickly this works! Perfect for my busy schedule.",
    date: "2023-10-17",
    verified: true,
    location: "Margate"
  },
  {
    id: 92,
    name: "Iridium Hellebore R.",
    rating: 5,
    text: "The 60-second results are real! I can see the difference immediately.",
    date: "2023-10-16",
    verified: true,
    location: "Port Shepstone"
  },
  {
    id: 93,
    name: "Osmium Hellebore T.",
    rating: 5,
    text: "My colleagues keep asking what I'm doing differently. This serum is amazing!",
    date: "2023-10-15",
    verified: true,
    location: "Shelly Beach"
  },
  {
    id: 94,
    name: "Ruthenium Hellebore M.",
    rating: 4,
    text: "Works well for reducing puffiness. Takes a bit longer than advertised but still effective.",
    date: "2023-10-14",
    verified: true,
    location: "Ramsgate"
  },
  {
    id: 95,
    name: "Rhenium Hellebore K.",
    rating: 5,
    text: "I've been using this for a month and the results are incredible. My dark circles are almost gone!",
    date: "2023-10-13",
    verified: true,
    location: "Southbroom"
  },
  {
    id: 96,
    name: "Tungsten Hellebore L.",
    rating: 5,
    text: "Perfect for my morning routine. No more tired-looking eyes!",
    date: "2023-10-12",
    verified: true,
    location: "Port Edward"
  },
  {
    id: 97,
    name: "Molybdenum Hellebore S.",
    rating: 5,
    text: "The results are immediate and last all day. Love this product!",
    date: "2023-10-11",
    verified: true,
    location: "Hibberdene"
  },
  {
    id: 98,
    name: "Niobium Hellebore R.",
    rating: 4,
    text: "Good product for the price. Works well for brightening.",
    date: "2023-10-10",
    verified: true,
    location: "Sezela"
  },
  {
    id: 99,
    name: "Tantalum Hellebore T.",
    rating: 5,
    text: "My eyes look so much brighter and more awake. Highly recommend!",
    date: "2023-10-09",
    verified: true,
    location: "Umzinto"
  },
  {
    id: 100,
    name: "Vanadium Hellebore M.",
    rating: 5,
    text: "The lightweight formula is perfect. Absorbs quickly and doesn't leave any residue.",
    date: "2023-10-08",
    verified: true,
    location: "Park Rynie"
  },
  {
    id: 101,
    name: "Chromium Hellebore K.",
    rating: 5,
    text: "I can see results within minutes of application. Amazing product!",
    date: "2023-10-07",
    verified: true,
    location: "Pennington"
  },
  {
    id: 102,
    name: "Manganese Hellebore L.",
    rating: 4,
    text: "Works well for reducing puffiness. Good value for money.",
    date: "2023-10-06",
    verified: true,
    location: "Kelso"
  },
  {
    id: 103,
    name: "Cobalt Hellebore S.",
    rating: 5,
    text: "My dark circles have improved so much since using this serum.",
    date: "2023-10-05",
    verified: true,
    location: "Umkomaas"
  },
  {
    id: 104,
    name: "Nickel Hellebore R.",
    rating: 5,
    text: "Perfect under makeup! No creasing or smudging.",
    date: "2023-10-04",
    verified: true,
    location: "Illovo Beach"
  },
  {
    id: 105,
    name: "Zinc Hellebore T.",
    rating: 5,
    text: "The results are incredible! My eyes look so much brighter.",
    date: "2023-10-03",
    verified: true,
    location: "Kingsburgh"
  },
  {
    id: 106,
    name: "Cadmium Hellebore M.",
    rating: 4,
    text: "Good product overall. Works well for brightening under-eye area.",
    date: "2023-10-02",
    verified: true,
    location: "Amanzimtoti"
  },
  {
    id: 107,
    name: "Mercury Hellebore K.",
    rating: 5,
    text: "I love how quickly this works! Perfect for my busy schedule.",
    date: "2023-10-01",
    verified: true,
    location: "Warner Beach"
  },
  {
    id: 108,
    name: "Lead Hellebore L.",
    rating: 5,
    text: "The 60-second results are real! I can see the difference immediately.",
    date: "2023-09-30",
    verified: true,
    location: "Uvongo"
  },
  {
    id: 109,
    name: "Bismuth Hellebore S.",
    rating: 5,
    text: "My colleagues keep asking what I'm doing differently. This serum is amazing!",
    date: "2023-09-29",
    verified: true,
    location: "Margate"
  },
  {
    id: 110,
    name: "Polonium Hellebore R.",
    rating: 4,
    text: "Works well for reducing puffiness. Takes a bit longer than advertised but still effective.",
    date: "2023-09-28",
    verified: true,
    location: "Port Shepstone"
  },
  {
    id: 111,
    name: "Astatine Hellebore T.",
    rating: 5,
    text: "I've been using this for a month and the results are incredible. My dark circles are almost gone!",
    date: "2023-09-27",
    verified: true,
    location: "Shelly Beach"
  },
  {
    id: 112,
    name: "Radon Hellebore M.",
    rating: 5,
    text: "Perfect for my morning routine. No more tired-looking eyes!",
    date: "2023-09-26",
    verified: true,
    location: "Ramsgate"
  },
  {
    id: 113,
    name: "Francium Hellebore K.",
    rating: 5,
    text: "The results are immediate and last all day. Love this product!",
    date: "2023-09-25",
    verified: true,
    location: "Southbroom"
  },
  {
    id: 114,
    name: "Radium Hellebore L.",
    rating: 4,
    text: "Good product for the price. Works well for brightening.",
    date: "2023-09-24",
    verified: true,
    location: "Port Edward"
  },
  {
    id: 115,
    name: "Actinium Hellebore S.",
    rating: 5,
    text: "My eyes look so much brighter and more awake. Highly recommend!",
    date: "2023-09-23",
    verified: true,
    location: "Hibberdene"
  },
  {
    id: 116,
    name: "Thorium Hellebore R.",
    rating: 5,
    text: "The lightweight formula is perfect. Absorbs quickly and doesn't leave any residue.",
    date: "2023-09-22",
    verified: true,
    location: "Sezela"
  },
  {
    id: 117,
    name: "Protactinium Hellebore T.",
    rating: 5,
    text: "I can see results within minutes of application. Amazing product!",
    date: "2023-09-21",
    verified: true,
    location: "Umzinto"
  },
  {
    id: 118,
    name: "Uranium Hellebore M.",
    rating: 4,
    text: "Works well for reducing puffiness. Good value for money.",
    date: "2023-09-20",
    verified: true,
    location: "Park Rynie"
  },
  {
    id: 119,
    name: "Neptunium Hellebore K.",
    rating: 5,
    text: "My dark circles have improved so much since using this serum.",
    date: "2023-09-19",
    verified: true,
    location: "Pennington"
  },
  {
    id: 120,
    name: "Plutonium Hellebore L.",
    rating: 5,
    text: "Perfect under makeup! No creasing or smudging.",
    date: "2023-09-18",
    verified: true,
    location: "Kelso"
  },
  {
    id: 121,
    name: "Americium Hellebore S.",
    rating: 5,
    text: "The results are incredible! My eyes look so much brighter.",
    date: "2023-09-17",
    verified: true,
    location: "Umkomaas"
  },
  {
    id: 122,
    name: "Curium Hellebore R.",
    rating: 4,
    text: "Good product overall. Works well for brightening under-eye area.",
    date: "2023-09-16",
    verified: true,
    location: "Illovo Beach"
  },
  {
    id: 123,
    name: "Berkelium Hellebore T.",
    rating: 5,
    text: "I love how quickly this works! Perfect for my busy schedule.",
    date: "2023-09-15",
    verified: true,
    location: "Kingsburgh"
  },
  {
    id: 124,
    name: "Californium Hellebore M.",
    rating: 5,
    text: "The 60-second results are real! I can see the difference immediately.",
    date: "2023-09-14",
    verified: true,
    location: "Amanzimtoti"
  },
  {
    id: 125,
    name: "Einsteinium Hellebore K.",
    rating: 5,
    text: "My colleagues keep asking what I'm doing differently. This serum is amazing!",
    date: "2023-09-13",
    verified: true,
    location: "Warner Beach"
  },
  {
    id: 126,
    name: "Fermium Hellebore L.",
    rating: 4,
    text: "Works well for reducing puffiness. Takes a bit longer than advertised but still effective.",
    date: "2023-09-12",
    verified: true,
    location: "Uvongo"
  },
  {
    id: 127,
    name: "Mendelevium Hellebore S.",
    rating: 5,
    text: "I've been using this for a month and the results are incredible. My dark circles are almost gone!",
    date: "2023-09-11",
    verified: true,
    location: "Margate"
  }
] 