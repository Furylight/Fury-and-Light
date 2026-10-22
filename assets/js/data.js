/**
 * =========================================================================
 * FURY & LIGHT - STORE DATA & CONFIGURATION
 * =========================================================================
 * 
 * 💡 OWNER GUIDE (මෙය ඔබට පහසුවෙන්ම වෙනස් කළ හැක):
 * - Phone, WhatsApp, Email, Social Links, Prices, Products මෙහිදී පහසුවෙන් වෙනස් කරන්න.
 * - ඔබට අවශ්‍ය නම් වෙබ්සයිට් එකේ පහළ ඇති "⚙️ Manage Store" බටන් එක ක්ලික් කර
 *   Browser එක තුළදීම Direct Edit කර "Save" කර ගත හැක!
 * =========================================================================
 */

const DEFAULT_STORE_CONFIG = {
  brandName: "FURY & LIGHT",
  tagline: "Streetwear & Custom Print Collective",
  description: "Unisex premium baggy, regular & kids t-shirts crafted with 100% bio-washed cotton and ultra-durable HD prints. Express your fire and light.",
  
  // 📞 CONTACT DETAILS (මෙහි ඔබේ තොරතුරු ඇතුළත් කරන්න)
  phone: "+94 77 123 4567",
  whatsapp: "94771234567", // ජාත්‍යන්තර අංකය (no '+' or leading zero: e.g. 94771234567)
  email: "furyandlight.lk@gmail.com",
  address: "Colombo / Island-wide Delivery, Sri Lanka",
  currency: "Rs.",
  
  // 🌐 SOCIAL MEDIA LINKS
  socials: {
    whatsapp: "https://wa.me/94771234567?text=Hi%20Fury%20%26%20Light!%20I%20would%20like%20to%20order%20t-shirts.",
    instagram: "https://instagram.com/furyandlight",
    tiktok: "https://tiktok.com/@furyandlight",
    facebook: "https://facebook.com/furyandlight"
  },

  // 📢 TOP ANNOUNCEMENT BAR
  announcement: "⚡ FREE ISLAND-WIDE DELIVERY ON ORDERS OVER RS. 6,000 | 🐉 CUSTOM ORDERS OPEN",
  
  // 👕 HIGHLIGHTS
  qualityPillars: [
    { title: "240 GSM Heavyweight", desc: "Premium combed cotton for ideal baggy drape and durability." },
    { title: "HD Screen & DTF", desc: "Non-fade, zero-crack prints tested through 60+ machine washes." },
    { title: "Unisex Tailoring", desc: "Modern relaxed cuts for men, women, and kids." },
    { title: "Custom Prints Ready", desc: "Send your artwork, name or quote — printed in 24 hours." }
  ]
};

const DEFAULT_PRODUCTS = [
  // =================== BAGGY / OVERSIZED T-SHIRTS ===================
  {
    id: "fury-baggy-01",
    name: "Dragon Heart Signature Baggy Tee",
    category: "baggy",
    badge: "BESTSELLER",
    price: 2950,
    originalPrice: 3500,
    fit: "Baggy / Oversized (Unisex)",
    fabric: "240 GSM Combed Bio-Washed Cotton",
    description: "Our flagship streetwear piece featuring the iconic Black & White dragon heart crest with ice blue neon glowing eyes. Drop shoulder relaxed streetwear fit.",
    image: "assets/images/products/baggy-dragon-black.svg",
    featured: true,
    rating: 5.0,
    reviews: 64,
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: [
      { name: "Jet Black", hex: "#0a0d14", code: "black" },
      { name: "Ice Blue", hex: "#00e5ff", code: "ice" },
      { name: "Pure White", hex: "#f8fafc", code: "white" },
      { name: "Charcoal Grey", hex: "#2b3240", code: "charcoal" }
    ]
  },
  {
    id: "fury-baggy-02",
    name: "Cyber Dragon Oversized Tee",
    category: "baggy",
    badge: "HOT DROP",
    price: 3100,
    originalPrice: 3750,
    fit: "Baggy / Oversized (Unisex)",
    fabric: "240 GSM Heavyweight Cotton",
    description: "Vibrant Ice Blue body with futuristic obsidian dragon artwork. Built for ultimate comfort, streetwear aesthetics and breathable all-day wear.",
    image: "assets/images/products/baggy-cyber-ice.svg",
    featured: true,
    rating: 4.9,
    reviews: 42,
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: [
      { name: "Ice Blue", hex: "#00e5ff", code: "ice" },
      { name: "Jet Black", hex: "#0a0d14", code: "black" },
      { name: "Pure White", hex: "#f8fafc", code: "white" }
    ]
  },
  {
    id: "fury-baggy-03",
    name: "Light Fury Pure White Baggy Tee",
    category: "baggy",
    badge: "NEW",
    price: 2950,
    originalPrice: 3450,
    fit: "Baggy / Oversized (Unisex)",
    fabric: "240 GSM Bio-Washed White Cotton",
    description: "Ultra-clean crisp white aesthetic with high-definition dual dragon line art in deep obsidian and ice blue highlights. Non-sheer, thick fabric.",
    image: "assets/images/products/baggy-light-white.svg",
    featured: false,
    rating: 4.8,
    reviews: 31,
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: [
      { name: "Pure White", hex: "#f8fafc", code: "white" },
      { name: "Jet Black", hex: "#0a0d14", code: "black" },
      { name: "Ice Blue", hex: "#00e5ff", code: "ice" }
    ]
  },

  // =================== REGULAR UNISEX T-SHIRTS ===================
  {
    id: "fury-reg-01",
    name: "Fury & Light Classic Unisex Tee",
    category: "regular",
    badge: "POPULAR",
    price: 2450,
    originalPrice: 2850,
    fit: "Regular Fit (Unisex)",
    fabric: "200 GSM Premium Ring-Spun Cotton",
    description: "Timeless regular cut with comfortable crew neck. Features the balanced Fury & Light dragon emblem on the center chest.",
    image: "assets/images/products/regular-heart-black.svg",
    featured: true,
    rating: 4.9,
    reviews: 89,
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    colors: [
      { name: "Jet Black", hex: "#0a0d14", code: "black" },
      { name: "Pure White", hex: "#f8fafc", code: "white" },
      { name: "Ice Blue", hex: "#00e5ff", code: "ice" },
      { name: "Charcoal Grey", hex: "#2b3240", code: "charcoal" }
    ]
  },
  {
    id: "fury-reg-02",
    name: "Neon Aura Minimal Unisex Tee",
    category: "regular",
    badge: "LIMITED",
    price: 2550,
    originalPrice: 2990,
    fit: "Regular Fit (Unisex)",
    fabric: "200 GSM Ring-Spun Cotton",
    description: "Deep slate base paired with vibrant neon ice-blue dragon lines. Subtle yet eye-catching contrast that pairs with denim or cargo pants.",
    image: "assets/images/products/regular-light-ice.svg",
    featured: true,
    rating: 5.0,
    reviews: 52,
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: [
      { name: "Midnight Slate", hex: "#182335", code: "slate" },
      { name: "Jet Black", hex: "#0a0d14", code: "black" },
      { name: "Pure White", hex: "#f8fafc", code: "white" }
    ]
  },
  {
    id: "fury-reg-03",
    name: "Crest Minimal White Unisex Tee",
    category: "regular",
    badge: "ESSENTIAL",
    price: 2350,
    originalPrice: 2750,
    fit: "Regular Fit (Unisex)",
    fabric: "200 GSM Combed Cotton",
    description: "Clean minimalist chest crest print. Perfect for casual wear, office wear or layer under open shirts.",
    image: "assets/images/products/regular-white-crest.svg",
    featured: false,
    rating: 4.8,
    reviews: 38,
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    colors: [
      { name: "Pure White", hex: "#f8fafc", code: "white" },
      { name: "Jet Black", hex: "#0a0d14", code: "black" }
    ]
  },
  {
    id: "fury-reg-04",
    name: "Shadow Dragon Charcoal Tee",
    category: "regular",
    badge: "TRENDING",
    price: 2450,
    originalPrice: 2900,
    fit: "Regular Fit (Unisex)",
    fabric: "200 GSM Heather Charcoal Cotton",
    description: "Rich charcoal grey textured fabric with dual tone ice-blue dragon silhouette print.",
    image: "assets/images/products/regular-charcoal.svg",
    featured: false,
    rating: 4.9,
    reviews: 27,
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: [
      { name: "Charcoal Grey", hex: "#2b3240", code: "charcoal" },
      { name: "Jet Black", hex: "#0a0d14", code: "black" },
      { name: "Ice Blue", hex: "#00e5ff", code: "ice" }
    ]
  },

  // =================== KIDS UNISEX T-SHIRTS ===================
  {
    id: "fury-kids-01",
    name: "Little Dragon Squad Kids Tee",
    category: "kids",
    badge: "KIDS FAVORITE",
    price: 1950,
    originalPrice: 2350,
    fit: "Kids Relaxed (Unisex)",
    fabric: "180 GSM Ultra-Soft Hypoallergenic Cotton",
    description: "Super soft, kid-friendly combed cotton with adorable baby dragon duo illustration. Breathable and gentle on sensitive skin.",
    image: "assets/images/products/kids-dragon-black.svg",
    featured: true,
    rating: 5.0,
    reviews: 45,
    sizes: ["3-4 Yrs", "5-6 Yrs", "7-8 Yrs", "9-10 Yrs", "11-12 Yrs"],
    colors: [
      { name: "Jet Black", hex: "#0a0d14", code: "black" },
      { name: "Ice Blue", hex: "#00e5ff", code: "ice" },
      { name: "Pure White", hex: "#f8fafc", code: "white" }
    ]
  },
  {
    id: "fury-kids-02",
    name: "Hero Adventure Ice Blue Kids Tee",
    category: "kids",
    badge: "POPULAR",
    price: 1950,
    originalPrice: 2300,
    fit: "Kids Relaxed (Unisex)",
    fabric: "180 GSM Gentle Combed Cotton",
    description: "Bright sky ice-blue shade with heroic flying dragon print. Extra durable double-needle stitching for active playtime.",
    image: "assets/images/products/kids-ice-blue.svg",
    featured: false,
    rating: 4.9,
    reviews: 29,
    sizes: ["3-4 Yrs", "5-6 Yrs", "7-8 Yrs", "9-10 Yrs", "11-12 Yrs"],
    colors: [
      { name: "Ice Blue", hex: "#00e5ff", code: "ice" },
      { name: "Pure White", hex: "#f8fafc", code: "white" },
      { name: "Jet Black", hex: "#0a0d14", code: "black" }
    ]
  },
  {
    id: "fury-kids-03",
    name: "Dragon Duo Crisp White Kids Tee",
    category: "kids",
    badge: "NEW",
    price: 1850,
    originalPrice: 2200,
    fit: "Kids Relaxed (Unisex)",
    fabric: "180 GSM Soft Organic Cotton",
    description: "Crisp white kids tee with vibrant ice-blue and black baby dragon print. Machine washable, shrink resistant.",
    image: "assets/images/products/kids-white-star.svg",
    featured: false,
    rating: 4.9,
    reviews: 33,
    sizes: ["3-4 Yrs", "5-6 Yrs", "7-8 Yrs", "9-10 Yrs", "11-12 Yrs"],
    colors: [
      { name: "Pure White", hex: "#f8fafc", code: "white" },
      { name: "Ice Blue", hex: "#00e5ff", code: "ice" },
      { name: "Jet Black", hex: "#0a0d14", code: "black" }
    ]
  }
];

// Helper functions for reading & saving data
function getStoreConfig() {
  try {
    const saved = localStorage.getItem("FURY_STORE_CONFIG");
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn("Using default store config:", e);
  }
  return DEFAULT_STORE_CONFIG;
}

function saveStoreConfig(config) {
  localStorage.setItem("FURY_STORE_CONFIG", JSON.stringify(config));
}

function getProducts() {
  try {
    const saved = localStorage.getItem("FURY_PRODUCTS");
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn("Using default products:", e);
  }
  return DEFAULT_PRODUCTS;
}

function saveProducts(products) {
  localStorage.setItem("FURY_PRODUCTS", JSON.stringify(products));
}

function resetStoreData() {
  localStorage.removeItem("FURY_STORE_CONFIG");
  localStorage.removeItem("FURY_PRODUCTS");
}
