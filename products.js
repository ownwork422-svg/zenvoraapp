/**
 * ============================================================================
 * ZENVORA - PRODUCT DATABASE & STOCK CONFIGURATION
 * ============================================================================
 * Pure JavaScript - Simple to edit, add, or delete products.
 * 
 * Instructions:
 * To add a new product, copy one of the product objects below,
 * paste it at the end of the `products` list, and update the values.
 * 
 * Images: Use direct public image URLs or local image filenames in root.
 * ============================================================================
 */

// ============================================================================
// 1. STOCK CONFIGURATION (MANUAL STOCK CONTROL)
// Change the numbers below to update inventory for any product.
// 0 = OUT OF STOCK (Order Now & Add to Cart are disabled)
// 1, 2, 3 = LOW STOCK (Shows "ONLY X LEFT")
// 4 or more = IN STOCK
// ============================================================================
const stockData = {
  "ladies-black-suit": 5,
  "ladies-embroidered-lawn": 3,
  "ladies-chiffon-formal": 2,
  "gents-black-polo": 8,
  "gents-cotton-kurta": 6,
  "gents-oxford-shirt": 4,
  "leather-peshawari-sandals": 7,
  "leather-oxford-shoes": 3,
  "black-watch": 2,
  "rose-gold-watch": 4,
  "leather-wallet-belt-set": 9,
  "velvet-embroidered-shawl": 4
};

// ============================================================================
// 2. PRODUCTS LIST (ALL 12 LUXURY CATALOGUE ITEMS)
// ============================================================================
const products = [
  {
    id: "ladies-black-suit",
    name: "Ladies Black 3 Piece Embroidered Suit",
    category: "ladies",
    categoryLabel: "Ladies Suits",
    price: 3999,
    oldPrice: 4999,
    discount: "20% OFF",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80"
    ],
    detailPage: "ladies-black-suit.html",
    description: "Exquisite pure lawn shirt embellished with intricate golden tilla and thread embroidery, paired with a crinkle chiffon printed dupatta and dyed cambric trousers.",
    fabric: "Premium Lawn & Chiffon",
    material: "100% Breathable Combed Lawn",
    sizes: ["Unstitched", "Small", "Medium", "Large"],
    colors: ["Jet Black", "Midnight Blue"],
    specifications: [
      "Shirt: Embroidered Lawn (3.0 Meters)",
      "Dupatta: Digital Printed Crinkle Chiffon (2.5 Meters)",
      "Trouser: Dyed Cambric Cotton (2.5 Meters)",
      "Includes embroidered neckline patch & daman lace border"
    ],
    newArrival: true,
    bestSeller: true
  },
  {
    id: "ladies-embroidered-lawn",
    name: "Luxury Floral Embroidered Lawn 3 Piece",
    category: "ladies",
    categoryLabel: "Ladies Suits",
    price: 4499,
    oldPrice: 5999,
    discount: "25% OFF",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
    ],
    detailPage: "ladies-embroidered-lawn.html",
    description: "Refreshing pastel floral aesthetics rendered on swiss voile lawn with lavish organza laser-cut border embroidery and medium silk printed dupatta.",
    fabric: "Swiss Voile Lawn & Silk",
    material: "Swiss Voile 80/80 Cotton",
    sizes: ["Unstitched", "Small", "Medium", "Large"],
    colors: ["Sage Green", "Blush Peach", "Ivory"],
    specifications: [
      "Shirt: Heavy Embroidered Swiss Voile (3.0 Meters)",
      "Dupatta: Luxury Silk Printed Dupatta (2.5 Meters)",
      "Trouser: Dyed Cotton Pants (2.5 Meters)",
      "Includes Organza cutwork sleeve & daman embroidery"
    ],
    newArrival: true,
    bestSeller: false
  },
  {
    id: "ladies-chiffon-formal",
    name: "Royal Crimson Chiffon Festive Suit",
    category: "ladies",
    categoryLabel: "Ladies Suits",
    price: 6999,
    oldPrice: 8999,
    discount: "22% OFF",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
    ],
    detailPage: "ladies-chiffon-formal.html",
    description: "Opulent wedding and festive wear crafted with hand-embellished sequins, pearls, and metallic thread on pure crinkle chiffon with raw silk trousers.",
    fabric: "Crinkle Chiffon & Raw Silk",
    material: "Pure Crinkle Chiffon & Katan Silk",
    sizes: ["Unstitched", "Small", "Medium", "Large"],
    colors: ["Royal Crimson", "Emerald Green", "Deep Maroon"],
    specifications: [
      "Front: Hand Embellished Sequin Chiffon (1.0 Meter)",
      "Back & Sleeves: Embroidered Chiffon (2.0 Meters)",
      "Dupatta: Four-sided Embroidered Organza Border Chiffon (2.5 Meters)",
      "Trouser: Dyed Katan Silk (2.5 Meters) + Inner Included"
    ],
    newArrival: false,
    bestSeller: true
  },
  {
    id: "gents-black-polo",
    name: "Men's Classic Pique Cotton Polo",
    category: "gents",
    categoryLabel: "Gents Clothing",
    price: 1999,
    oldPrice: 2499,
    discount: "20% OFF",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
    ],
    detailPage: "gents-black-polo.html",
    description: "Tailored from combed organic pique cotton with mother-of-pearl buttons, ribbed collar, and minimal embroidered ZENVORA crest on the chest.",
    fabric: "100% Combed Pique Cotton",
    material: "220 GSM Breathable Organic Cotton",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Onyx Black", "Navy Blue", "Heather Grey"],
    specifications: [
      "Regular European Fit",
      "Two-button placket with pearl buttons",
      "Pre-shrunk fabric to prevent size shrinkage",
      "Machine washable with color-lock technology"
    ],
    newArrival: true,
    bestSeller: true
  },
  {
    id: "gents-cotton-kurta",
    name: "Handcrafted Embroidered Cotton Kurta",
    category: "gents",
    categoryLabel: "Gents Clothing",
    price: 3499,
    oldPrice: 4299,
    discount: "18% OFF",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80"
    ],
    detailPage: "gents-cotton-kurta.html",
    description: "Traditional ban collar kurta woven from premium textured Egyptian cotton with subtle tonal embroidery on the placket and cuffs.",
    fabric: "Textured Cotton Latha",
    material: "100% Egyptian Cotton",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Classic White", "Charcoal Slate", "Beige Sand"],
    specifications: [
      "Mandarin collar with subtle needlework",
      "Two functional side seam pockets",
      "Straight hem with side vents for comfortable movement",
      "Includes metallic finished signature buttons"
    ],
    newArrival: true,
    bestSeller: false
  },
  {
    id: "gents-oxford-shirt",
    name: "Men's Formal Egyptian Oxford Shirt",
    category: "gents",
    categoryLabel: "Gents Clothing",
    price: 2799,
    oldPrice: 3499,
    discount: "20% OFF",
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80"
    ],
    detailPage: "gents-oxford-shirt.html",
    description: "Timeless formal business button-down shirt made from durable 2-ply Oxford pinpoint cotton with reinforced collar points.",
    fabric: "2-Ply Pinpoint Oxford",
    material: "100% Giza Egyptian Cotton",
    sizes: ["15 (S)", "15.5 (M)", "16 (L)", "16.5 (XL)"],
    colors: ["Sky Blue", "Crisp White", "Soft Pink"],
    specifications: [
      "Tailored slim-contemporary silhouette",
      "Spread formal collar with removable collar stays",
      "Wrinkle-resistant easy-iron finish",
      "Single-cuff button closure"
    ],
    newArrival: false,
    bestSeller: false
  },
  {
    id: "leather-peshawari-sandals",
    name: "Handmade Pure Leather Peshawari Chappal",
    category: "shoes",
    categoryLabel: "Shoes & Sandals",
    price: 3499,
    oldPrice: 4499,
    discount: "22% OFF",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80"
    ],
    detailPage: "leather-peshawari-sandals.html",
    description: "Authentic double-gear Charsadda cut Peshawari sandals handcrafted from vegetable-tanned cow leather with durable tire-sole cushioning.",
    fabric: "Full Grain Cow Leather",
    material: "100% Genuine Handcrafted Leather",
    sizes: ["40 (6)", "41 (7)", "42 (8)", "43 (9)", "44 (10)", "45 (11)"],
    colors: ["Tan Mustard", "Dark Chocolate Brown", "Classic Black"],
    specifications: [
      "Hand-stitched upper with durable nylon threads",
      "Ergonomic padded leather insole for all-day comfort",
      "Recycled durable rubber tyre outsole with traction grip",
      "Adjustable heel buckle closure"
    ],
    newArrival: true,
    bestSeller: true
  },
  {
    id: "leather-oxford-shoes",
    name: "Formal Hand-Finished Leather Oxford Shoes",
    category: "shoes",
    categoryLabel: "Shoes & Sandals",
    price: 5999,
    oldPrice: 7999,
    discount: "25% OFF",
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80"
    ],
    detailPage: "leather-oxford-shoes.html",
    description: "Sleek closed-lacing Cap Toe Oxford shoes crafted in full grain calfskin leather with hand-burnished patina finish and cushioned arch support.",
    fabric: "Calfskin Leather",
    material: "100% Genuine Calf Leather",
    sizes: ["40 (6)", "41 (7)", "42 (8)", "43 (9)", "44 (10)", "45 (11)"],
    colors: ["Burnished Brown", "Deep Obsidian Black"],
    specifications: [
      "Closed-lacing 5-eyelet construction",
      "Full leather lining with anti-odor breathability",
      "Goodyear welted look with composite non-slip sole",
      "Comes with travel shoe horn and cotton dust bags"
    ],
    newArrival: false,
    bestSeller: false
  },
  {
    id: "black-watch",
    name: "Midnight Black Chronograph Luxury Watch",
    category: "watches",
    categoryLabel: "Watches",
    price: 5499,
    oldPrice: 7499,
    discount: "26% OFF",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"
    ],
    detailPage: "black-watch.html",
    description: "42mm matte black surgical stainless steel casing with multi-functional sub-dials, date calendar, luminous hands, and scratch-resistant sapphire crystal.",
    fabric: "316L Stainless Steel & Mineral Crystal",
    material: "Solid Stainless Steel & Japanese Quartz",
    sizes: ["One Size (Adjustable Links)"],
    colors: ["Matte Black", "Black with Rose Gold Accents"],
    specifications: [
      "Movement: Japanese Multi-function Chronograph Quartz",
      "Water Resistance: 5 ATM (50 Meters / 165 Feet)",
      "Glass: Scratch-proof hardened mineral crystal",
      "Packaging: Premium velvet-lined wooden ZENVORA gift box with 1-Year Warranty card"
    ],
    newArrival: true,
    bestSeller: true
  },
  {
    id: "rose-gold-watch",
    name: "Rose Gold Classic Minimalist Mesh Watch",
    category: "watches",
    categoryLabel: "Watches",
    price: 4299,
    oldPrice: 5999,
    discount: "28% OFF",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80"
    ],
    detailPage: "rose-gold-watch.html",
    description: "Ultra-slim 36mm luxury watch featuring an eggshell white dial with rose gold hour batons and an easily adjustable magnetic stainless steel mesh strap.",
    fabric: "Rose Gold Ion-Plated Steel",
    material: "Surgical Grade Steel & Quartz",
    sizes: ["One Size (Adjustable Mesh Strap)"],
    colors: ["Rose Gold", "Silver Mesh"],
    specifications: [
      "Ultra-thin 7mm profile casing",
      "Quick-release interchangeable strap mechanism",
      "Water Resistance: 3 ATM (Splash Proof)",
      "Includes microfiber cleaning cloth and presentation case"
    ],
    newArrival: false,
    bestSeller: true
  },
  {
    id: "leather-wallet-belt-set",
    name: "Executive Genuine Leather Wallet & Belt Gift Set",
    category: "accessories",
    categoryLabel: "Accessories",
    price: 2899,
    oldPrice: 3799,
    discount: "23% OFF",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80"
    ],
    detailPage: "leather-wallet-belt-set.html",
    description: "Handcrafted gift set comprising a RFID-blocking bifold genuine leather wallet with 8 card slots and a reversible classic pin buckle leather belt.",
    fabric: "100% Top Grain Leather",
    material: "Full Grain Hunter Leather & Gunmetal Buckle",
    sizes: ["Standard Gift Set"],
    colors: ["Rich Brown & Black Reversible", "Classic Black"],
    specifications: [
      "Wallet: 8 Card Slots, 2 Currency Compartments, ID Window",
      "RFID-Blocking technology prevents electronic pickpocketing",
      "Belt: Fits waist sizes from 30 inches to 44 inches (Trim-to-fit)",
      "Comes packaged in a signature embossed matte gift box"
    ],
    newArrival: true,
    bestSeller: true
  },
  {
    id: "velvet-embroidered-shawl",
    name: "Royal Velvet Embroidered Winter Shawl",
    category: "accessories",
    categoryLabel: "Accessories",
    price: 4999,
    oldPrice: 6999,
    discount: "28% OFF",
    image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=800&q=80"
    ],
    detailPage: "velvet-embroidered-shawl.html",
    description: "Heavy micro-velvet luxury winter shawl featuring four-sided intricate golden zari embroidery and kiran lace edging. Perfect for winter weddings and formal evenings.",
    fabric: "Micro 9000 Velvet",
    material: "Pure Soft Heavyweight Velvet",
    sizes: ["Free Size (2.75 Yards Length)"],
    colors: ["Deep Emerald Green", "Plum Purple", "Midnight Black"],
    specifications: [
      "Length: 2.75 Yards (approx 2.5 meters), Width: 1.25 Yards",
      "Four-sided laser-finished embroidery with golden tilla border",
      "Silky smooth satin inner lining",
      "Dry clean only"
    ],
    newArrival: false,
    bestSeller: false
  }
// Make globally available in all browser environments
if (typeof window !== "undefined") {
  window.products = products;
  window.stockData = stockData;
  window.ZENVORA_PRODUCTS = products;
  window.ZENVORA_STOCK = stockData;
  // If renderAllGrids is already defined, trigger it
  if (typeof window.renderAllGrids === "function") {
    window.renderAllGrids();
  }
}
