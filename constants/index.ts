import { ProductCard, ProductCategoryProps, ProductDetail } from "@/interfaces";

// Mock data for ProductCard
export const mockProductCards: ProductCard[] = [
  {
    "id": "prod-001",
    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    "name": "Wireless Bluetooth Headphones",
    "description":
      "Premium noise-cancelling headphones with 30-hour battery life",
    "price": "199.99",
    "rating": "4.5",
    "reviewsCount": 1247,
    "discount": "20",
    "hasDiscount": true,
   "categoryId": "cat-electronics",
  },
  {
    "id": "prod-002",
    "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    "name": "Smart Watch Series 5",
    "description": "Advanced fitness tracking and smartphone connectivity",
    "price": "349.99",
    "rating": "4.8",
    "reviewsCount": 892,
    "hasDiscount": false,
   "categoryId": "cat-electronics",
  },
  {
    "id": "prod-007",
    "image": "https://images.unsplash.com/photo-1580910051079-efbe9c032e5a",
    "name": "Portable Speaker",
    "description": "Compact wireless speaker with deep bass",
    "price": "79.99",
    "rating": "4.4",
    "reviewsCount": 432,
    "hasDiscount": false,
   "categoryId": "cat-electronics",
  },
  {
    "id": "prod-008",
    "image": "https://images.unsplash.com/photo-1580910051078-d9e6f9f032e7",
    "name": "VR Headset",
    "description": "Immersive VR headset for gaming and entertainment",
    "price": "299.99",
    "rating": "4.6",
    "reviewsCount": 321,
    "hasDiscount": true,
    "discount": "15",
   "categoryId": "cat-electronics",
  },

  {
    "id": "prod-003",
    "image": "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
    "name": "Running Shoes",
    "description": "Lightweight athletic shoes with superior cushioning",
    "price": "129.99",
    "rating": "4.3",
    "reviewsCount": 567,
    "hasDiscount": false,
   "categoryId": "cat-clothing",
  },
  {
    "id": "prod-009",
    "image": "https://images.unsplash.com/photo-1520975695695-3fbe4f3f5eab",
    "name": "Summer Dress",
    "description": "Floral lightweight dress perfect for summer",
    "price": "59.99",
    "rating": "4.5",
    "reviewsCount": 210,
    "hasDiscount": true,
    "discount": "10",
   "categoryId": "cat-clothing",
  },
  {
    "id": "prod-010",
    "image": "https://images.unsplash.com/photo-1520975695696-4bfe3f3f5eac",
    "name": "Leather Jacket",
    "description": "Premium quality leather jacket for men",
    "price": "199.99",
    "rating": "4.7",
    "reviewsCount": 145,
    "hasDiscount": false,
   "categoryId": "cat-clothing",
  },
  {
    "id": "prod-011",
    "image": "https://images.unsplash.com/photo-1520975695697-5cfe3f3f5ead",
    "name": "Casual T-Shirt",
    "description": "Comfortable cotton t-shirt",
    "price": "29.99",
    "rating": "4.2",
    "reviewsCount": 98,
    "hasDiscount": false,
   "categoryId": "cat-clothing",
  },

  {
    "id": "prod-004",
    "image": "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
    "name": "Ceramic Coffee Mug Set",
    "description": "Set of 4 elegant handcrafted ceramic mugs",
    "price": "45.99",
    "rating": "4.6",
    "reviewsCount": 234,
    "hasDiscount": false,
   "categoryId": "cat-furniture",
  },
  {
    "id": "prod-012",
    "image": "https://images.unsplash.com/photo-1598300054980-21c7f5c5a8bb",
    "name": "Wooden Dining Table",
    "description": "Solid wood dining table for 6 people",
    "price": "499.99",
    "rating": "4.8",
    "reviewsCount": 78,
    "hasDiscount": false,
   "categoryId": "cat-furniture",
  },
  {
    "id": "prod-013",
    "image": "https://images.unsplash.com/photo-1598300054981-32c7f5c5a8bc",
    "name": "Office Chair",
    "description": "Ergonomic office chair with lumbar support",
    "price": "149.99",
    "rating": "4.5",
    "reviewsCount": 123,
    "hasDiscount": true,
    "discount": "12",
   "categoryId": "cat-furniture",
  },
  {
    "id": "prod-014",
    "image": "https://images.unsplash.com/photo-1598300054982-43c7f5c5a8bd",
    "name": "Bedside Lamp",
    "description": "Modern bedside lamp with adjustable brightness",
    "price": "39.99",
    "rating": "4.3",
    "reviewsCount": 89,
    "hasDiscount": false,
   "categoryId": "cat-furniture",
  },
  {
    "id": "prod-005",
    "image": "https://images.unsplash.com/photo-1585386959984-a4155224a1ad",
    "name": "Leather Wallet",
    "description": "Genuine leather bifold wallet with multiple card slots",
    "price": "79.99",
    "rating": "4.7",
    "reviewsCount": 189,
    "discount": "10",
    "hasDiscount": true,
   "categoryId": "cat-accessories",
  },
  {
    "id": "prod-006",
    "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
    "name": "Waterproof Backpack",
    "description": "Durable 30L backpack with laptop compartment",
    "price": "89.99",
    "rating": "4.4",
    "reviewsCount": 456,
    "hasDiscount": false,
   "categoryId": "cat-accessories",
  },
  {
    "id": "prod-015",
    "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e13",
    "name": "Sunglasses",
    "description": "UV-protected stylish sunglasses",
    "price": "49.99",
    "rating": "4.6",
    "reviewsCount": 312,
    "hasDiscount": true,
    "discount": "5",
   "categoryId": "cat-accessories",
  },
  {
    "id": "prod-016",
    "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e14",
    "name": "Silk Scarf",
    "description": "Elegant silk scarf for formal and casual wear",
    "price": "39.99",
    "rating": "4.2",
    "reviewsCount": 98,
    "hasDiscount": false,
   "categoryId": "cat-accessories",
  },

  {
    "id": "prod-017",
    "image": "https://images.unsplash.com/photo-1600185363415-1b2f5e5e5e2a",
    "name": "Yoga Mat",
    "description": "Eco-friendly yoga mat with non-slip surface",
    "price": "29.99",
    "rating": "4.5",
    "reviewsCount": 210,
    "hasDiscount": false,
   "categoryId": "cat-lifestyles",
  },
  {
    "id": "prod-018",
    "image": "https://images.unsplash.com/photo-1600185363415-1b2f5e5e5e2b",
    "name": "Fitness Tracker",
    "description": "Monitor your daily activity and health",
    "price": "59.99",
    "rating": "4.6",
    "reviewsCount": 145,
    "hasDiscount": true,
    "discount": "8",
   "categoryId": "cat-lifestyles",
  },
  {
    "id": "prod-019",
    "image": "https://images.unsplash.com/photo-1600185363415-1b2f5e5e5e2c",
    "name": "Water Bottle",
    "description": "Stainless steel insulated water bottle",
    "price": "19.99",
    "rating": "4.4",
    "reviewsCount": 312,
    "hasDiscount": false,
   "categoryId": "cat-lifestyles",
  },
  {
    "id": "prod-020",
    "image": "https://images.unsplash.com/photo-1600185363415-1b2f5e5e5e2d",
    "name": "Smart Planner",
    "description": "Digital planner to organize your daily tasks",
    "price": "49.99",
    "rating": "4.3",
    "reviewsCount": 89,
    "hasDiscount": true,
    "discount": "10",
   "categoryId": "cat-lifestyles",
  }
]

export const mockProductDetails: ProductDetail[] = 
[
  {
    "id": "prod-001",
    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    "name": "Wireless Bluetooth Headphones",
    "description": "Experience superior sound quality with premium wireless headphones. Active noise cancellation, 30-hour battery, comfy ear cushions, and built-in mic for calls.",
    "price": "199.99",
    "rating": "4.5",
    "discount": "25",
    "reviewsCount": 1247,
    "hasDiscount": true,
   "categoryId": "cat-electronics",
    "stock": 45,
    "gallery": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b",
      "https://images.unsplash.com/photo-1599669454699-248893623464"
    ],
     },
  {
    "id": "prod-002",
    "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    "name": "Smart Watch Series 5",
    "description": "Advanced smartwatch with heart rate monitoring, GPS, sleep tracking, and seamless smartphone integration. Water-resistant with vibrant always-on display.",
    "price": "349.99",
    "rating": "4.8",
    "reviewsCount": 892,
    "hasDiscount": false,
   "categoryId": "cat-electronics",
    "stock": 23,
    "gallery": [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3",
      "https://images.unsplash.com/photo-1544117519-31a4b719223d"
    ],
     },
  {
    "id": "prod-007",
    "image": "https://images.unsplash.com/photo-1580910051079-efbe9c032e5a",
    "name": "Portable Speaker",
    "description": "Compact wireless speaker with deep bass, 12-hour battery, and Bluetooth connectivity for music on the go.",
    "price": "79.99",
    "rating": "4.4",
    "reviewsCount": 432,
    "hasDiscount": false,
   "categoryId": "cat-electronics",
    "stock": 34,
    "gallery": [
      "https://images.unsplash.com/photo-1580910051079-efbe9c032e5a",
      "https://images.unsplash.com/photo-1580910051079-efbe9c032e5b",
      "https://images.unsplash.com/photo-1580910051079-efbe9c032e5c"
    ],
     },
  {
    "id": "prod-008",
    "image": "https://images.unsplash.com/photo-1580910051078-d9e6f9f032e7",
    "name": "VR Headset",
    "description": "Immersive VR headset for gaming and entertainment with adjustable lenses, built-in audio, and high-resolution display.",
    "price": "299.99",
    "rating": "4.6",
    "discount": "15",
    "reviewsCount": 321,
    "hasDiscount": true,
   "categoryId": "cat-electronics",
    "stock": 12,
    "gallery": [
      "https://images.unsplash.com/photo-1580910051078-d9e6f9f032e7",
      "https://images.unsplash.com/photo-1580910051078-d9e6f9f032e8",
      "https://images.unsplash.com/photo-1580910051078-d9e6f9f032e9"
    ],
     },

  {
    "id": "prod-003",
    "image": "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
    "name": "Running Shoes",
    "description": "Lightweight athletic shoes with advanced cushioning, breathable mesh upper, and durable rubber outsole.",
    "price": "129.99",
    "rating": "4.3",
    "discount": "18",
    "reviewsCount": 567,
    "hasDiscount": true,
   "categoryId": "cat-clothing",
    "stock": 78,
    "gallery": [
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa"
    ],
      },
  {
    "id": "prod-009",
    "image": "https://images.unsplash.com/photo-1520975695695-3fbe4f3f5eab",
    "name": "Summer Dress",
    "description": "Floral lightweight dress perfect for summer, soft fabric, comfortable fit.",
    "price": "59.99",
    "rating": "4.5",
    "discount": "10",
    "reviewsCount": 210,
    "hasDiscount": true,
   "categoryId": "cat-clothing",
    "stock": 35,
    "gallery": [
      "https://images.unsplash.com/photo-1520975695695-3fbe4f3f5eab",
      "https://images.unsplash.com/photo-1520975695695-3fbe4f3f5eac",
      "https://images.unsplash.com/photo-1520975695695-3fbe4f3f5ead"
    ],
    
  },
  {
    "id": "prod-010",
    "image": "https://images.unsplash.com/photo-1520975695696-4bfe3f3f5eac",
    "name": "Leather Jacket",
    "description": "Premium quality leather jacket for men with soft lining and durable stitching.",
    "price": "199.99",
    "rating": "4.7",
    "reviewsCount": 145,
    "hasDiscount": false,
   "categoryId": "cat-clothing",
    "stock": 20,
    "gallery": [
      "https://images.unsplash.com/photo-1520975695696-4bfe3f3f5eac",
      "https://images.unsplash.com/photo-1520975695696-4bfe3f3f5ead",
      "https://images.unsplash.com/photo-1520975695696-4bfe3f3f5eae"
    ],
      },
  {
    "id": "prod-011",
    "image": "https://images.unsplash.com/photo-1520975695697-5cfe3f3f5ead",
    "name": "Casual T-Shirt",
    "description": "Comfortable cotton t-shirt, breathable and soft for everyday wear.",
    "price": "29.99",
    "rating": "4.2",
    "reviewsCount": 98,
    "hasDiscount": false,
   "categoryId": "cat-clothing",
    "stock": 60,
    "gallery": [
      "https://images.unsplash.com/photo-1520975695697-5cfe3f3f5ead",
      "https://images.unsplash.com/photo-1520975695697-5cfe3f3f5eae",
      "https://images.unsplash.com/photo-1520975695697-5cfe3f3f5eaf"
    ],
      },

  {
    "id": "prod-004",
    "image": "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
    "name": "Ceramic Coffee Mug Set",
    "description": "Set of 4 elegant handcrafted ceramic mugs with blue and white color.",
    "price": "45.99",
    "rating": "4.6",
    "reviewsCount": 234,
    "hasDiscount": false,
   "categoryId": "cat-furniture",
    "stock": 50,
    "gallery": [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f28",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f29"
    ],
    
  },
  {
    "id": "prod-012",
    "image": "https://images.unsplash.com/photo-1598300054980-21c7f5c5a8bb",
    "name": "Wooden Dining Table",
    "description": "Solid wood dining table for 6 people, sturdy and elegant design.",
    "price": "499.99",
    "rating": "4.8",
    "reviewsCount": 78,
    "hasDiscount": false,
   "categoryId": "cat-furniture",
    "stock": 10,
    "gallery": [
      "https://images.unsplash.com/photo-1598300054980-21c7f5c5a8bb",
      "https://images.unsplash.com/photo-1598300054980-21c7f5c5a8bc",
      "https://images.unsplash.com/photo-1598300054980-21c7f5c5a8bd"
    ],
      },
  {
    "id": "prod-013",
    "image": "https://images.unsplash.com/photo-1598300054981-32c7f5c5a8bc",
    "name": "Office Chair",
    "description": "Ergonomic office chair with lumbar support and adjustable height.",
    "price": "149.99",
    "rating": "4.5",
    "reviewsCount": 123,
    "discount": "12",
    "hasDiscount": true,
   "categoryId": "cat-furniture",
    "stock": 30,
    "gallery": [
      "https://images.unsplash.com/photo-1598300054981-32c7f5c5a8bc",
      "https://images.unsplash.com/photo-1598300054981-32c7f5c5a8bd",
      "https://images.unsplash.com/photo-1598300054981-32c7f5c5a8be"
    ],
    
  },
  {
    "id": "prod-014",
    "image": "https://images.unsplash.com/photo-1598300054982-43c7f5c5a8bd",
    "name": "Bedside Lamp",
    "description": "Modern bedside lamp with adjustable brightness and energy-efficient LED bulb.",
    "price": "39.99",
    "rating": "4.3",
    "reviewsCount": 89,
    "hasDiscount": false,
   "categoryId": "cat-furniture",
    "stock": 25,
    "gallery": [
      "https://images.unsplash.com/photo-1598300054982-43c7f5c5a8bd",
      "https://images.unsplash.com/photo-1598300054982-43c7f5c5a8be",
      "https://images.unsplash.com/photo-1598300054982-43c7f5c5a8bf"
    ],
    
  },
  {
    "id": "prod-005",
    "image": "https://images.unsplash.com/photo-1585386959984-a4155224a1ad",
    "name": "Leather Wallet",
    "description": "Genuine leather bifold wallet with multiple card slots.",
    "price": "79.99",
    "rating": "4.7",
    "reviewsCount": 189,
    "discount": "10",
    "hasDiscount": true,
   "categoryId": "cat-accessories",
    "stock": 60,
    "gallery": [
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ae",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1af"
    ],
     },
  {
    "id": "prod-006",
    "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
    "name": "Waterproof Backpack",
    "description": "Durable 30L backpack with laptop compartment and waterproof material.",
    "price": "89.99",
    "rating": "4.4",
    "reviewsCount": 456,
    "hasDiscount": false,
   "categoryId": "cat-accessories",
    "stock": 40,
    "gallery": [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e13",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e14"
    ],
     },
  {
    "id": "prod-015",
    "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e15",
    "name": "Sunglasses",
    "description": "UV-protection sunglasses with stylish frame, perfect for outdoor use.",
    "price": "49.99",
    "rating": "4.5",
    "reviewsCount": 312,
    "hasDiscount": false,
   "categoryId": "cat-accessories",
    "stock": 55,
    "gallery": [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e15",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e16",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e17"
    ],
     },
  {
    "id": "prod-016",
    "image": "https://images.unsplash.com/photo-1546868871-7041f2a55e18",
    "name": "Keychain Set",
    "description": "Set of 3 metal keychains with stylish design, perfect for gifts.",
    "price": "19.99",
    "rating": "4.2",
    "reviewsCount": 102,
    "hasDiscount": false,
   "categoryId": "cat-accessories",
    "stock": 70,
    "gallery": [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e18",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e19",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e20"
    ],
  },

  {
    "id": "prod-017",
    "image": "https://images.unsplash.com/photo-1600185363415-1b2f5e5e5e2a",
    "name": "Yoga Mat",
    "description": "Eco-friendly yoga mat with non-slip surface, comfortable and durable.",
    "price": "39.99",
    "rating": "4.5",
    "reviewsCount": 212,
    "hasDiscount": false,
   "categoryId": "cat-lifestyles",
    "stock": 60,
    "gallery": [
      "https://images.unsplash.com/photo-1600185363415-1b2f5e5e5e2a",
      "https://images.unsplash.com/photo-1600185363415-1b2f5e5e5e2b",
      "https://images.unsplash.com/photo-1600185363415-1b2f5e5e5e2c"
    ],
     },
  {
    "id": "prod-018",
    "image": "https://images.unsplash.com/photo-1600185363415-1b2f5e5e5e2d",
    "name": "Dumbbell Set",
    "description": "Adjustable dumbbell set for strength training at home or gym.",
    "price": "79.99",
    "rating": "4.6",
    "reviewsCount": 98,
    "hasDiscount": false,
   "categoryId": "cat-lifestyles",
    "stock": 40,
    "gallery": [
      "https://images.unsplash.com/photo-1600185363415-1b2f5e5e5e2d",
      "https://images.unsplash.com/photo-1600185363415-1b2f5e5e5e2e",
      "https://images.unsplash.com/photo-1600185363415-1b2f5e5e5e2f"
    ],
    
  },
  {
    "id": "prod-019",
    "image": "https://images.unsplash.com/photo-1600185363415-1b2f5e5e5e30",
    "name": "Fitness Tracker",
    "description": "Wearable fitness tracker to monitor steps, calories, and sleep quality.",
    "price": "59.99",
    "rating": "4.4",
    "reviewsCount": 140,
    "hasDiscount": false,
   "categoryId": "cat-lifestyles",
    "stock": 50,
    "gallery": [
      "https://images.unsplash.com/photo-1600185363415-1b2f5e5e5e30",
      "https://images.unsplash.com/photo-1600185363415-1b2f5e5e5e31",
      "https://images.unsplash.com/photo-1600185363415-1b2f5e5e5e32"
    ],
    
  },
  {
    "id": "prod-020",
    "image": "https://images.unsplash.com/photo-1600185363415-1b2f5e5e5e33",
    "name": "Meditation Cushion",
    "description": "Comfortable meditation cushion for mindfulness and relaxation practices.",
    "price": "49.99",
    "rating": "4.5",
    "reviewsCount": 88,
    "hasDiscount": false,
   "categoryId": "cat-lifestyles",
    "stock": 35,
    "gallery": [
      "https://images.unsplash.com/photo-1600185363415-1b2f5e5e5e33",
      "https://images.unsplash.com/photo-1600185363415-1b2f5e5e5e34",
      "https://images.unsplash.com/photo-1600185363415-1b2f5e5e5e35"
    ],
    
  }
];

// --- Helper functions ---
export const getProductById = ("id": string): ProductDetail | undefined => {
  return mockProductDetails.find(product => product.id === id);
};

export const getProductsByCategory = (category"Id": string): ProductCard[] => {
  return mockProductCards.filter(product => pr"oduct".categoryId ==="categoryId");
};


export const mockCategories: ProductCategoryProps[] = [
  {
    "id": "cat-electronics",
    "name": "Electronics",
    "image": "https://images.unsplash.com/photo-1518770660439-4636190af475", // Example electronics image
    "description": "Latest gadgets and tech"
  },
  {
    "id": "cat-clothing",
    "name": "Clothing",
    "image": "https://images.unsplash.com/photo-1520975695695-3fbe4f3f5eab", // Example clothing image
    "description": "Fashion and apparel"
  },
  {
    "id": "cat-furniture",
    "name": "Furniture",
    "image": "https://images.unsplash.com/photo-1598300054980-21c7f5c5a8bb", // Example furniture image
    "description": "Home and office furniture"
  },
  {
    "id": "cat-accessories",
    "name": "Accessories",
    "image": "https://images.unsplash.com/photo-1585386959984-a4155224a1ad", // Example accessories image
    "description": "Bags, wallets, and more"
  },
  {
    "id": "cat-lifestyles",
    "name": "Lifestyle",
    "image": "https://images.unsplash.com/photo-1600185363415-1b2f5e5e5e2a", // Example lifestyle image
    "description": "Fitness, health, and wellness"
  }
];