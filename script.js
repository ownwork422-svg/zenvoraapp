/**
 * ============================================================================
 * ZENVORA - CORE STATIC ENGINE & E-COMMERCE LOGIC (VANILLA JAVASCRIPT)
 * ============================================================================
 * 100% Pure Static Vanilla JavaScript:
 * - Direct static product catalogue & instant rendering across all pages
 * - Netlify-compatible (No build step, no npm, no Vite, no React dependencies)
 * - Cart Management & Persistence (localStorage: "zenvora_cart")
 * - Live Dynamic Calculations (Subtotal, Free Shipping Tracker, Total)
 * - Order Now & Add to Cart Flows
 * - Inventory & Stock Checking (In Stock, Low Stock, Out of Stock)
 * - Cash on Delivery Checkout & Form Validation
 * - Automated WhatsApp Message Generation (0323 2974451)
 * - Order Confirmation Modals & Notifications
 * ============================================================================
 */

// ============================================================================
// 1. GLOBAL STORE CONFIGURATION
// ============================================================================
const ZENVORA_CONFIG = {
  brandName: "ZENVORA",
  whatsappNumber: "923232974451", // Official WhatsApp Helpline
  freeShippingThreshold: 5000,    // PKR 5,000+ = Free delivery
  standardShippingFee: 200,       // PKR 200 for orders under PKR 5,000
  storageKey: "zenvora_cart"
};

// ============================================================================
// 2. STATIC PRODUCT CATALOGUE & STOCK (EMBEDDED FOR 100% RELIABILITY)
// ============================================================================
const ZENVORA_DEFAULT_STOCK = {
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

const ZENVORA_DEFAULT_PRODUCTS = [
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
];

// Helper to safely get the active products list
function getProductsList() {
  if (typeof window !== "undefined" && Array.isArray(window.products) && window.products.length > 0) {
    return window.products;
  }
  if (typeof window !== "undefined" && Array.isArray(window.ZENVORA_PRODUCTS) && window.ZENVORA_PRODUCTS.length > 0) {
    return window.ZENVORA_PRODUCTS;
  }
  if (typeof products !== "undefined" && Array.isArray(products) && products.length > 0) {
    return products;
  }
  return ZENVORA_DEFAULT_PRODUCTS;
}

// Helper to safely get a single product by ID
function getProductById(productId) {
  const list = getProductsList();
  return list.find(p => p.id === productId) || null;
}

// ============================================================================
// 3. INVENTORY & STOCK ENGINE
// ============================================================================
function getStockInfo(productId) {
  let stock;
  try {
    const localStock = localStorage.getItem("zenvora_stock_overrides");
    if (localStock) {
      const parsed = JSON.parse(localStock);
      if (parsed && parsed[productId] !== undefined) {
        stock = Number(parsed[productId]);
      }
    }
  } catch (e) {
    // Ignore storage parse issues
  }

  if (stock === undefined) {
    const globalStock = (typeof window !== "undefined" && window.stockData) 
      ? window.stockData 
      : ((typeof stockData !== "undefined") ? stockData : ZENVORA_DEFAULT_STOCK);
    stock = (globalStock && globalStock[productId] !== undefined)
      ? Number(globalStock[productId])
      : 5;
  }

  if (stock <= 0) {
    return {
      inStock: false,
      qty: 0,
      badgeText: "OUT OF STOCK",
      badgeClass: "badge-out-of-stock",
      buttonText: "Out of Stock",
      disabled: true
    };
  } else if (stock <= 3) {
    return {
      inStock: true,
      qty: stock,
      badgeText: `ONLY ${stock} LEFT`,
      badgeClass: "badge-low-stock",
      buttonText: "Order Now",
      disabled: false
    };
  } else {
    return {
      inStock: true,
      qty: stock,
      badgeText: "IN STOCK",
      badgeClass: "badge-in-stock",
      buttonText: "Order Now",
      disabled: false
    };
  }
}

function updateProductStock(productId, qty) {
  try {
    const localStock = localStorage.getItem("zenvora_stock_overrides");
    const parsed = localStock ? JSON.parse(localStock) : {};
    parsed[productId] = Number(qty);
    localStorage.setItem("zenvora_stock_overrides", JSON.stringify(parsed));
  } catch (e) {
    console.error("ZENVORA: Error updating stock in localStorage", e);
  }
}

// ============================================================================
// 4. CART PERSISTENCE & HELPERS (localStorage)
// ============================================================================
function getCart() {
  try {
    const raw = localStorage.getItem(ZENVORA_CONFIG.storageKey);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("ZENVORA: Error reading cart from localStorage", e);
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(ZENVORA_CONFIG.storageKey, JSON.stringify(cart));
    updateCartBadge();
  } catch (e) {
    console.error("ZENVORA: Error saving cart to localStorage", e);
  }
}

function clearCart() {
  try {
    localStorage.removeItem(ZENVORA_CONFIG.storageKey);
  } catch (e) {}
  updateCartBadge();
}

function updateCartBadge() {
  const cart = getCart();
  const totalCount = cart.reduce((sum, item) => sum + (parseInt(item.quantity, 10) || 1), 0);
  const badges = document.querySelectorAll(".cart-badge");

  badges.forEach(badge => {
    if (totalCount > 0) {
      badge.textContent = totalCount > 99 ? "99+" : totalCount;
      badge.style.display = "inline-flex";
    } else {
      badge.textContent = "0";
      badge.style.display = "none";
    }
  });
}

function calculateCartTotals() {
  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + (Number(item.price) * (parseInt(item.quantity, 10) || 1)), 0);
  const isFreeShipping = subtotal >= ZENVORA_CONFIG.freeShippingThreshold || subtotal === 0;
  const shipping = (subtotal === 0 || isFreeShipping) ? 0 : ZENVORA_CONFIG.standardShippingFee;
  const total = subtotal + shipping;
  const totalItems = cart.reduce((sum, item) => sum + (parseInt(item.quantity, 10) || 1), 0);

  return {
    subtotal,
    shipping,
    total,
    isFreeShipping,
    totalItems,
    amountNeededForFreeShipping: Math.max(0, ZENVORA_CONFIG.freeShippingThreshold - subtotal)
  };
}

// ============================================================================
// 5. CART ACTIONS: ADD TO CART & ORDER NOW
// ============================================================================
function addToCart(productId, quantity = 1, size = null, color = null) {
  const stock = getStockInfo(productId);
  if (!stock.inStock) {
    showToast("This product is currently out of stock.", "error");
    return false;
  }

  const product = getProductById(productId);
  if (!product) {
    showToast("Product details not found.", "error");
    return false;
  }

  const chosenSize = size || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : "Standard");
  const chosenColor = color || (product.colors && product.colors.length > 0 ? product.colors[0] : "Standard");
  const qty = Math.max(1, parseInt(quantity, 10) || 1);

  const cart = getCart();
  const existingIndex = cart.findIndex(item => 
    item.id === productId && item.size === chosenSize && item.color === chosenColor
  );

  if (existingIndex > -1) {
    const newQty = cart[existingIndex].quantity + qty;
    if (stock.qty > 0 && newQty > stock.qty) {
      cart[existingIndex].quantity = stock.qty;
      showToast(`Updated to maximum available stock (${stock.qty} items).`, "info");
    } else {
      cart[existingIndex].quantity = newQty;
      showToast(`Updated "${product.name}" quantity (${cart[existingIndex].quantity}) in cart! 🛍️`, "success");
    }
  } else {
    if (stock.qty > 0 && qty > stock.qty) {
      showToast(`Only ${stock.qty} items available in stock.`, "info");
      return false;
    }
    cart.push({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      oldPrice: product.oldPrice ? Number(product.oldPrice) : null,
      image: product.image,
      detailPage: product.detailPage || `${product.id}.html`,
      size: chosenSize,
      color: chosenColor,
      quantity: qty
    });
    showToast(`Added "${product.name}" to cart! 🛍️`, "success");
  }

  saveCart(cart);
  return true;
}

function orderNow(productId, quantity = 1, size = null, color = null) {
  const stock = getStockInfo(productId);
  if (!stock.inStock) {
    showToast("This item is currently out of stock.", "error");
    return false;
  }

  const product = getProductById(productId);
  if (!product) {
    showToast("Product details not found.", "error");
    return false;
  }

  const chosenSize = size || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : "Standard");
  const chosenColor = color || (product.colors && product.colors.length > 0 ? product.colors[0] : "Standard");
  const qty = Math.max(1, parseInt(quantity, 10) || 1);

  const cart = getCart();
  const existingIndex = cart.findIndex(item => 
    item.id === productId && item.size === chosenSize && item.color === chosenColor
  );

  if (existingIndex > -1) {
    if (cart[existingIndex].quantity < qty) {
      cart[existingIndex].quantity = qty;
    }
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      oldPrice: product.oldPrice ? Number(product.oldPrice) : null,
      image: product.image,
      detailPage: product.detailPage || `${product.id}.html`,
      size: chosenSize,
      color: chosenColor,
      quantity: qty
    });
  }

  saveCart(cart);
  // Direct redirect to checkout
  window.location.href = "checkout.html";
  return true;
}

function updateItemQuantity(index, newQty) {
  const cart = getCart();
  if (index < 0 || index >= cart.length) return;

  const item = cart[index];
  const stock = getStockInfo(item.id);

  const qty = parseInt(newQty, 10);
  if (isNaN(qty) || qty <= 0) {
    removeFromCart(index);
    return;
  }

  if (stock.inStock && qty > stock.qty) {
    cart[index].quantity = stock.qty;
    showToast(`Only ${stock.qty} items available in stock.`, "info");
  } else {
    cart[index].quantity = qty;
  }

  saveCart(cart);
  renderCartPage();
}

function removeFromCart(index) {
  const cart = getCart();
  if (index >= 0 && index < cart.length) {
    const removedName = cart[index].name;
    cart.splice(index, 1);
    saveCart(cart);
    showToast(`Removed "${removedName}" from cart.`, "info");
    renderCartPage();
    if (document.getElementById("checkoutForm")) {
      initCheckoutPage();
    }
  }
}

// ============================================================================
// 6. CART PAGE RENDERER (cart.html)
// ============================================================================
function renderCartPage() {
  const cartList = document.getElementById("cartItemsList");
  const emptyState = document.getElementById("emptyCartState");
  const filledLayout = document.getElementById("cartFilledLayout");
  const freeShippingBanner = document.getElementById("cartFreeShippingBanner");
  const shippingStatusText = document.getElementById("shippingStatusText");

  if (!cartList) return;

  const cart = getCart();
  const totals = calculateCartTotals();

  if (cart.length === 0) {
    if (emptyState) emptyState.style.display = "block";
    if (cartList) cartList.innerHTML = "";
    if (filledLayout) filledLayout.style.display = "none";
    if (freeShippingBanner) freeShippingBanner.style.display = "none";
    return;
  }

  if (emptyState) emptyState.style.display = "none";
  if (filledLayout) filledLayout.style.display = "grid";
  if (freeShippingBanner) freeShippingBanner.style.display = "flex";

  if (shippingStatusText) {
    if (totals.isFreeShipping && totals.subtotal > 0) {
      shippingStatusText.innerHTML = `🎉 <strong>Congratulations!</strong> You qualify for <strong>FREE Nationwide Delivery</strong>.`;
    } else {
      shippingStatusText.innerHTML = `Add <strong>PKR ${totals.amountNeededForFreeShipping.toLocaleString()}</strong> more to unlock <strong>FREE Nationwide Delivery</strong>!`;
    }
  }

  let html = "";
  cart.forEach((item, index) => {
    const itemSubtotal = item.price * item.quantity;
    const stock = getStockInfo(item.id);
    const maxStock = stock.inStock ? stock.qty : 10;

    html += `
      <div class="cart-item-card" data-index="${index}">
        <a href="${item.detailPage || 'index.html'}" class="cart-item-img-link">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.onerror=null;this.src='fallback-image.svg';" />
        </a>
        
        <div class="cart-item-details">
          <div class="cart-item-header">
            <h3 class="cart-item-name">
              <a href="${item.detailPage || 'index.html'}">${item.name}</a>
            </h3>
            <button type="button" class="btn-remove-item" onclick="removeFromCart(${index})" title="Remove item" aria-label="Remove item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>

          <div class="cart-item-variants">
            <span class="variant-badge">Size: <strong>${item.size || 'Standard'}</strong></span>
            <span class="variant-badge">Color: <strong>${item.color || 'Standard'}</strong></span>
          </div>

          <div class="cart-item-footer">
            <div class="cart-item-price-unit">
              PKR ${item.price.toLocaleString()}
            </div>

            <div class="quantity-control">
              <button type="button" class="qty-btn" onclick="updateItemQuantity(${index}, ${item.quantity - 1})" aria-label="Decrease quantity">−</button>
              <input type="text" class="qty-input" value="${item.quantity}" readonly />
              <button type="button" class="qty-btn" onclick="updateItemQuantity(${index}, ${item.quantity + 1})" ${item.quantity >= maxStock ? 'disabled title="Max stock reached"' : ''} aria-label="Increase quantity">+</button>
            </div>

            <div class="cart-item-subtotal">
              <span class="subtotal-label">Subtotal:</span>
              <span class="subtotal-val">PKR ${itemSubtotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  cartList.innerHTML = html;

  const subtotalEl = document.getElementById("cartSubtotal");
  const shippingEl = document.getElementById("cartShipping");
  const totalEl = document.getElementById("cartTotal");

  if (subtotalEl) subtotalEl.textContent = `PKR ${totals.subtotal.toLocaleString()}`;
  if (shippingEl) {
    if (totals.shipping === 0) {
      shippingEl.innerHTML = `<span style="color: #166534; font-weight: 700;">FREE</span>`;
    } else {
      shippingEl.textContent = `PKR ${totals.shipping.toLocaleString()}`;
    }
  }
  if (totalEl) totalEl.textContent = `PKR ${totals.total.toLocaleString()}`;
}

// ============================================================================
// 7. CHECKOUT PAGE LOGIC (checkout.html)
// ============================================================================
function initCheckoutPage() {
  const checkoutForm = document.getElementById("checkoutForm");
  if (!checkoutForm) return;

  const cart = getCart();
  const totals = calculateCartTotals();

  const checkoutItemsList = document.getElementById("checkoutItemsList");
  const checkoutSubtotal = document.getElementById("checkoutSubtotal");
  const checkoutShipping = document.getElementById("checkoutShipping");
  const checkoutTotal = document.getElementById("checkoutTotal");
  const checkoutItemCount = document.getElementById("checkoutItemCount");

  if (cart.length === 0) {
    if (checkoutItemsList) {
      checkoutItemsList.innerHTML = `
        <div style="text-align: center; padding: 2rem 1rem; color: var(--text-muted);">
          <p style="margin-bottom: 1rem;">Your shopping cart is currently empty.</p>
          <a href="index.html" class="btn btn-primary btn-sm">Explore Products</a>
        </div>
      `;
    }
    if (checkoutSubtotal) checkoutSubtotal.textContent = "PKR 0";
    if (checkoutShipping) checkoutShipping.textContent = "PKR 0";
    if (checkoutTotal) checkoutTotal.textContent = "PKR 0";
    if (checkoutItemCount) checkoutItemCount.textContent = "0";
    return;
  }

  if (checkoutItemCount) checkoutItemCount.textContent = totals.totalItems;

  if (checkoutItemsList) {
    let itemsHtml = "";
    cart.forEach(item => {
      itemsHtml += `
        <div class="checkout-item-card">
          <img src="${item.image}" alt="${item.name}" class="checkout-item-thumb" onerror="this.onerror=null;this.src='fallback-image.svg';" />
          <div class="checkout-item-details">
            <h4 class="checkout-item-name">${item.name}</h4>
            <div class="checkout-item-meta">
              <span>Size: <strong>${item.size || 'Standard'}</strong></span> • 
              <span>Color: <strong>${item.color || 'Standard'}</strong></span>
            </div>
            <div class="checkout-item-numbers">
              <span>Qty: <strong>${item.quantity}</strong> × PKR ${item.price.toLocaleString()}</span>
              <span class="checkout-item-price">PKR ${(item.price * item.quantity).toLocaleString()}</span>
            </div>
          </div>
        </div>
      `;
    });
    checkoutItemsList.innerHTML = itemsHtml;
  }

  if (checkoutSubtotal) checkoutSubtotal.textContent = `PKR ${totals.subtotal.toLocaleString()}`;
  if (checkoutShipping) {
    if (totals.shipping === 0) {
      checkoutShipping.innerHTML = `<span style="color: #166534; font-weight: 700;">FREE (Orders Over PKR 5,000)</span>`;
    } else {
      checkoutShipping.textContent = `PKR ${totals.shipping.toLocaleString()}`;
    }
  }
  if (checkoutTotal) checkoutTotal.textContent = `PKR ${totals.total.toLocaleString()}`;

  // Detach previous event listeners if any, then attach
  checkoutForm.onsubmit = function(e) {
    e.preventDefault();
    handlePlaceOrder();
  };
}

function handlePlaceOrder() {
  const cart = getCart();
  if (cart.length === 0) {
    showToast("Your cart is empty! Please add products before checking out.", "error");
    return;
  }

  const nameInput = document.getElementById("custName");
  const phoneInput = document.getElementById("custPhone");
  const cityInput = document.getElementById("custCity");
  const areaInput = document.getElementById("custArea");
  const addressInput = document.getElementById("custAddress");
  const notesInput = document.getElementById("custNotes");

  const name = nameInput ? nameInput.value.trim() : "";
  const phone = phoneInput ? phoneInput.value.trim() : "";
  const city = cityInput ? cityInput.value.trim() : "";
  const area = areaInput ? areaInput.value.trim() : "";
  const address = addressInput ? addressInput.value.trim() : "";
  const notes = notesInput ? notesInput.value.trim() : "";

  if (!name) {
    showToast("Please enter your Full Name.", "error");
    if (nameInput) nameInput.focus();
    return;
  }
  if (!phone) {
    showToast("Please enter your WhatsApp / Mobile phone number.", "error");
    if (phoneInput) phoneInput.focus();
    return;
  }
  if (!city) {
    showToast("Please select your Delivery City.", "error");
    if (cityInput) cityInput.focus();
    return;
  }
  if (!area) {
    showToast("Please enter your Area or Town name.", "error");
    if (areaInput) areaInput.focus();
    return;
  }
  if (!address) {
    showToast("Please provide your complete Delivery Address.", "error");
    if (addressInput) addressInput.focus();
    return;
  }

  const totals = calculateCartTotals();

  let orderMessage = `*ZENVORA ORDER*\n\n`;
  orderMessage += `*Customer Details*\n\n`;
  orderMessage += `*Name:* ${name}\n`;
  orderMessage += `*WhatsApp:* ${phone}\n`;
  orderMessage += `*City:* ${city}\n`;
  orderMessage += `*Area:* ${area}\n`;
  orderMessage += `*Address:* ${address}\n`;
  if (notes) {
    orderMessage += `*Notes:* ${notes}\n`;
  }
  orderMessage += `\n*Order Details*\n\n`;

  cart.forEach((item, index) => {
    orderMessage += `${index + 1}. *${item.name}* (Size: ${item.size || 'Standard'}, Color: ${item.color || 'Standard'})\n`;
    orderMessage += `   *Quantity:* ${item.quantity}\n`;
    orderMessage += `   *Price:* PKR ${item.price.toLocaleString()}\n`;
    orderMessage += `   *Item Total:* PKR ${(item.price * item.quantity).toLocaleString()}\n\n`;
  });

  orderMessage += `*Subtotal:* PKR ${totals.subtotal.toLocaleString()}\n`;
  orderMessage += `*Delivery:* ${totals.shipping === 0 ? 'PKR 0 (FREE)' : 'PKR ' + totals.shipping.toLocaleString()}\n`;
  orderMessage += `*Total:* PKR ${totals.total.toLocaleString()}\n\n`;
  orderMessage += `*Payment Method:*\nCash on Delivery`;

  const whatsappUrl = `https://wa.me/${ZENVORA_CONFIG.whatsappNumber}?text=${encodeURIComponent(orderMessage)}`;

  showOrderReadyModal(name, totals.total, whatsappUrl);
}

function showOrderReadyModal(customerName, orderTotal, whatsappUrl) {
  let modalOverlay = document.getElementById("orderSuccessModal");
  if (!modalOverlay) {
    modalOverlay = document.createElement("div");
    modalOverlay.id = "orderSuccessModal";
    modalOverlay.className = "modal-overlay";
    document.body.appendChild(modalOverlay);
  }

  modalOverlay.innerHTML = `
    <div class="modal-card">
      <div class="modal-icon-wrap">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>

      <h2 class="modal-title">Order Ready!</h2>
      <p class="modal-desc">
        Thank you, <strong>${customerName}</strong>! Your order totaling <strong>PKR ${Number(orderTotal).toLocaleString()}</strong> with <strong>Cash on Delivery</strong> has been prepared.
      </p>
      
      <div class="modal-notice">
        Click below to send your order details directly to our official WhatsApp (<strong>0323 2974451</strong>) for instant confirmation.
      </div>

      <div class="modal-actions">
        <a href="${whatsappUrl}" target="_blank" id="confirmWhatsAppOrderBtn" class="btn btn-whatsapp btn-lg btn-block">
          💬 Send Order via WhatsApp
        </a>
        <a href="index.html" class="btn btn-outline btn-block" style="margin-top: 0.5rem;" onclick="clearCart()">
          Return to Home
        </a>
      </div>
    </div>
  `;

  modalOverlay.style.display = "flex";

  const confirmBtn = document.getElementById("confirmWhatsAppOrderBtn");
  if (confirmBtn) {
    confirmBtn.addEventListener("click", function() {
      clearCart();
    });
  }
}

// ============================================================================
// 8. PRODUCT DETAIL PAGE CONTROLS (Single Product Pages)
// ============================================================================
function initProductDetailPage(productId) {
  const product = getProductById(productId);
  if (!product) return;

  const stock = getStockInfo(productId);

  const stockBadge = document.getElementById("detailStockBadge");
  if (stockBadge) {
    stockBadge.textContent = stock.badgeText;
    stockBadge.className = `badge ${stock.badgeClass}`;
  }

  let selectedSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : "Standard";
  let selectedColor = product.colors && product.colors.length > 0 ? product.colors[0] : "Standard";
  let quantity = 1;

  const sizeBtns = document.querySelectorAll(".size-select-btn");
  sizeBtns.forEach(btn => {
    btn.onclick = function() {
      sizeBtns.forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      selectedSize = this.getAttribute("data-size");
    };
  });

  const colorBtns = document.querySelectorAll(".color-select-btn");
  const colorLabel = document.getElementById("selectedColorLabel");
  colorBtns.forEach(btn => {
    btn.onclick = function() {
      colorBtns.forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      selectedColor = this.getAttribute("data-color");
      if (colorLabel) colorLabel.textContent = selectedColor;
    };
  });

  const qtyInput = document.getElementById("detailQtyInput");
  const qtyMinus = document.getElementById("detailQtyMinus");
  const qtyPlus = document.getElementById("detailQtyPlus");

  if (qtyMinus && qtyInput) {
    qtyMinus.onclick = function() {
      if (quantity > 1) {
        quantity--;
        qtyInput.value = quantity;
      }
    };
  }

  if (qtyPlus && qtyInput) {
    qtyPlus.onclick = function() {
      if (stock.inStock && quantity < stock.qty) {
        quantity++;
        qtyInput.value = quantity;
      } else if (stock.inStock && quantity >= stock.qty) {
        showToast(`Only ${stock.qty} items available in stock.`, "info");
      }
    };
  }

  const addToCartBtn = document.getElementById("detailAddToCartBtn");
  const orderNowBtn = document.getElementById("detailOrderNowBtn");

  if (addToCartBtn) {
    if (!stock.inStock) {
      addToCartBtn.disabled = true;
      addToCartBtn.textContent = "Out of Stock";
    } else {
      addToCartBtn.disabled = false;
      addToCartBtn.onclick = function() {
        addToCart(product.id, quantity, selectedSize, selectedColor);
      };
    }
  }

  if (orderNowBtn) {
    if (!stock.inStock) {
      orderNowBtn.disabled = true;
      orderNowBtn.textContent = "Out of Stock";
    } else {
      orderNowBtn.disabled = false;
      orderNowBtn.onclick = function() {
        orderNow(product.id, quantity, selectedSize, selectedColor);
      };
    }
  }

  const mainImage = document.getElementById("detailMainImage");
  const thumbs = document.querySelectorAll(".detail-thumb");
  thumbs.forEach(thumb => {
    thumb.onclick = function() {
      thumbs.forEach(t => t.classList.remove("active"));
      this.classList.add("active");
      if (mainImage) mainImage.src = this.src;
    };
  });
}

// ============================================================================
// 9. PRODUCT CARD GENERATOR & CATALOGUE GRIDS (VANILLA HTML RENDERING)
// ============================================================================
function createProductCardHTML(product) {
  if (!product) return "";
  const stock = getStockInfo(product.id);
  const detailLink = product.detailPage || `${product.id}.html`;
  const imgUrl = product.image || "fallback-image.svg";
  const isOutOfStock = !stock.inStock;
  const categoryLabel = product.categoryLabel || (product.category ? product.category.toUpperCase() : "FASHION");
  const priceFormatted = Number(product.price || 0).toLocaleString();
  const oldPriceFormatted = product.oldPrice ? Number(product.oldPrice).toLocaleString() : null;

  return `
    <div class="product-card" data-product-id="${product.id}">
      <div class="product-image-wrap">
        <div class="badge-container">
          ${product.discount ? `<span class="badge badge-discount">${product.discount}</span>` : `<span></span>`}
          <span class="badge ${stock.badgeClass}">${stock.badgeText}</span>
        </div>
        <a href="${detailLink}" class="product-image-link" aria-label="${product.name}">
          <img 
            src="${imgUrl}" 
            alt="ZENVORA ${product.name}" 
            class="product-img" 
            loading="lazy" 
            onerror="this.onerror=null;this.src='fallback-image.svg';"
          />
        </a>
      </div>
      <div class="product-info">
        <div class="product-cat-label">${categoryLabel}</div>
        <h3 class="product-title">
          <a href="${detailLink}">${product.name}</a>
        </h3>
        <div class="product-price-row">
          <span class="price-current">PKR ${priceFormatted}</span>
          ${oldPriceFormatted ? `<span class="price-old">PKR ${oldPriceFormatted}</span>` : ""}
        </div>
        <div class="product-actions-grid">
          <a href="${detailLink}" class="btn btn-outline btn-sm">
            View Details
          </a>
          <button 
            type="button" 
            class="btn btn-primary btn-sm" 
            onclick="orderNow('${product.id}')"
            ${isOutOfStock ? "disabled" : ""}>
            ${isOutOfStock ? "Out of Stock" : "Order Now"}
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderProducts(productList, container) {
  const targetEl = (typeof container === "string") ? document.getElementById(container) : container;
  if (!targetEl) return;
  if (!productList || productList.length === 0) {
    targetEl.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">No products found in this collection.</div>`;
    return;
  }
  targetEl.innerHTML = productList.map(createProductCardHTML).join("");
}

function renderAllGrids() {
  const allProducts = getProductsList();
  if (!allProducts || !Array.isArray(allProducts) || allProducts.length === 0) {
    return;
  }

  // 1. Featured Grid (index.html)
  const featuredGrid = document.getElementById("featuredGrid");
  if (featuredGrid) {
    const featuredItems = allProducts.filter(p => p.newArrival === true || p.bestSeller === true);
    renderProducts(featuredItems.length > 0 ? featuredItems.slice(0, 4) : allProducts.slice(0, 4), featuredGrid);
  }

  // 2. All Products Grid (index.html)
  const allProductsGrid = document.getElementById("allProductsGrid");
  if (allProductsGrid) {
    renderProducts(allProducts, allProductsGrid);
  }

  // 3. Specific Category Page Grids:
  const ladiesGrid = document.getElementById("ladiesGrid");
  if (ladiesGrid) {
    const ladiesProducts = allProducts.filter(p => p.category === "ladies");
    renderProducts(ladiesProducts, ladiesGrid);
  }

  const gentsGrid = document.getElementById("gentsGrid");
  if (gentsGrid) {
    const gentsProducts = allProducts.filter(p => p.category === "gents");
    renderProducts(gentsProducts, gentsGrid);
  }

  const shoesGrid = document.getElementById("shoesGrid");
  if (shoesGrid) {
    const shoesProducts = allProducts.filter(p => p.category === "shoes");
    renderProducts(shoesProducts, shoesGrid);
  }

  const watchesGrid = document.getElementById("watchesGrid");
  if (watchesGrid) {
    const watchesProducts = allProducts.filter(p => p.category === "watches");
    renderProducts(watchesProducts, watchesGrid);
  }

  const accessoriesGrid = document.getElementById("accessoriesGrid");
  if (accessoriesGrid) {
    const accProducts = allProducts.filter(p => p.category === "accessories");
    renderProducts(accProducts, accessoriesGrid);
  }

  const newArrivalsGrid = document.getElementById("newArrivalsGrid");
  if (newArrivalsGrid) {
    const newArrivalsProducts = allProducts.filter(p => p.newArrival === true);
    renderProducts(newArrivalsProducts, newArrivalsGrid);
  }

  // 4. Generic fallback grid if any other page uses id="productGrid"
  const genericGrid = document.getElementById("productGrid");
  if (genericGrid && !genericGrid.innerHTML.trim()) {
    const currentPath = (typeof window !== "undefined" && window.location) ? window.location.pathname.toLowerCase() : "";
    if (currentPath.includes("ladies")) {
      renderProducts(allProducts.filter(p => p.category === "ladies"), genericGrid);
    } else if (currentPath.includes("gents")) {
      renderProducts(allProducts.filter(p => p.category === "gents"), genericGrid);
    } else if (currentPath.includes("shoe")) {
      renderProducts(allProducts.filter(p => p.category === "shoes"), genericGrid);
    } else if (currentPath.includes("watch")) {
      renderProducts(allProducts.filter(p => p.category === "watches"), genericGrid);
    } else if (currentPath.includes("access")) {
      renderProducts(allProducts.filter(p => p.category === "accessories"), genericGrid);
    } else if (currentPath.includes("new-arrival") || currentPath.includes("new_arrival")) {
      renderProducts(allProducts.filter(p => p.newArrival === true), genericGrid);
    } else {
      renderProducts(allProducts, genericGrid);
    }
  }
}

// ============================================================================
// 10. STOCK & INVENTORY PORTAL LOGIC (stock.html)
// ============================================================================
function initStockPortalPage() {
  const tableBody = document.getElementById("stockTableBody");
  const allProducts = getProductsList();
  if (!tableBody || !allProducts) return;

  function renderStockRows() {
    let inStockCount = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;

    let html = "";
    allProducts.forEach(product => {
      const stock = getStockInfo(product.id);
      if (!stock.inStock) outOfStockCount++;
      else if (stock.qty <= 3) lowStockCount++;
      else inStockCount++;

      const detailLink = product.detailPage || `${product.id}.html`;
      const imgUrl = product.image || "fallback-image.svg";

      html += `
        <tr style="border-bottom: 1px solid var(--border-light);">
          <td style="padding: 1rem; display: flex; align-items: center; gap: 0.75rem;">
            <img src="${imgUrl}" alt="${product.name}" onerror="this.onerror=null;this.src='fallback-image.svg';" style="width: 44px; height: 54px; object-fit: cover; border-radius: 4px; border: 1px solid var(--border-light);" />
            <div>
              <strong style="display:block; color: var(--text-main); font-size: 0.9375rem;">${product.name}</strong>
              <span style="font-size: 0.75rem; color: var(--text-muted);">${detailLink}</span>
            </div>
          </td>
          <td style="padding: 1rem; color: var(--text-muted);">
            <div style="font-weight: 600; color: var(--text-main);">${product.id}</div>
            <div style="font-size: 0.75rem;">${product.categoryLabel || product.category}</div>
          </td>
          <td style="padding: 1rem; font-weight: 700; color: var(--text-main);">
            PKR ${Number(product.price).toLocaleString()}
          </td>
          <td style="padding: 1rem;">
            <span class="badge ${stock.badgeClass}">${stock.badgeText}</span>
          </td>
          <td style="padding: 1rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <input 
                type="number" 
                min="0" 
                max="99" 
                class="stock-input" 
                id="stock_input_${product.id}" 
                value="${stock.qty}" 
                style="width: 65px; padding: 0.35rem; border: 1px solid var(--border-light); border-radius: 4px; text-align: center; font-weight: 700;"
              />
              <button 
                type="button" 
                class="btn btn-outline btn-sm" 
                onclick="saveProductStock('${product.id}')"
                style="padding: 0.35rem 0.65rem; font-size: 0.75rem;">
                Save
              </button>
            </div>
          </td>
          <td style="padding: 1rem;">
            <a href="${detailLink}" class="btn btn-outline btn-sm" style="font-size: 0.75rem; padding: 0.35rem 0.65rem;">
              View Page ↗
            </a>
          </td>
        </tr>
      `;
    });

    tableBody.innerHTML = html;

    const metricTotal = document.getElementById("metricTotalProducts");
    const metricIn = document.getElementById("metricInStock");
    const metricLow = document.getElementById("metricLowStock");
    const metricOut = document.getElementById("metricOutOfStock");

    if (metricTotal) metricTotal.textContent = allProducts.length;
    if (metricIn) metricIn.textContent = inStockCount;
    if (metricLow) metricLow.textContent = lowStockCount;
    if (metricOut) metricOut.textContent = outOfStockCount;
  }

  window.saveProductStock = function(productId) {
    const input = document.getElementById(`stock_input_${productId}`);
    if (!input) return;
    const newQty = parseInt(input.value, 10);
    if (isNaN(newQty) || newQty < 0) {
      showToast("Please enter a valid stock number.", "error");
      return;
    }
    updateProductStock(productId, newQty);
    renderStockRows();
    showToast(`Stock updated for ${productId}.`, "success");
  };

  const resetAllBtn = document.getElementById("resetAllStockBtn");
  if (resetAllBtn) {
    resetAllBtn.onclick = function() {
      if (confirm("Reset all products to default 10 in stock?")) {
        allProducts.forEach(p => updateProductStock(p.id, 10));
        renderStockRows();
        showToast("All products reset to In Stock (10 units).", "success");
      }
    };
  }

  renderStockRows();
}

// ============================================================================
// 11. TOAST NOTIFICATION SYSTEM
// ============================================================================
function showToast(message, type = "success") {
  let toastContainer = document.getElementById("zenvoraToastContainer");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "zenvoraToastContainer";
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-content">
      <span>${message}</span>
    </div>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("fade-out");
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 3200);
}

// ============================================================================
// 12. GLOBAL APPLICATION INITIALIZATION (NETLIFY / STATIC SAFE)
// ============================================================================
function initZenvoraApp() {
  // 1. Sync Cart Badge on all pages
  updateCartBadge();

  // 2. Render Product Grids across catalogue pages
  renderAllGrids();

  // 3. Mobile Menu Drawer
  const mobileMenuOpenBtn = document.getElementById("mobileMenuOpenBtn");
  const mobileMenuCloseBtn = document.getElementById("mobileMenuCloseBtn");
  const mobileNavDrawer = document.getElementById("mobileNavDrawer");
  const mobileNavOverlay = document.getElementById("mobileNavOverlay");

  function openMobileNav() {
    if (mobileNavDrawer) mobileNavDrawer.classList.add("active");
  }

  function closeMobileNav() {
    if (mobileNavDrawer) mobileNavDrawer.classList.remove("active");
  }

  if (mobileMenuOpenBtn) mobileMenuOpenBtn.onclick = openMobileNav;
  if (mobileMenuCloseBtn) mobileMenuCloseBtn.onclick = closeMobileNav;
  if (mobileNavOverlay) mobileNavOverlay.onclick = closeMobileNav;

  // 4. If on Cart Page, render Cart
  if (document.getElementById("cartItemsList")) {
    renderCartPage();

    const clearCartBtn = document.getElementById("clearCartBtn");
    if (clearCartBtn) {
      clearCartBtn.onclick = function() {
        if (confirm("Are you sure you want to clear your shopping cart?")) {
          clearCart();
          renderCartPage();
          showToast("Cart has been cleared.", "info");
        }
      };
    }
  }

  // 5. If on Checkout Page, init Checkout
  if (document.getElementById("checkoutForm")) {
    initCheckoutPage();
  }

  // 6. If on Stock Portal, init Portal
  if (document.getElementById("stockTableBody")) {
    initStockPortalPage();
  }

  // 7. Auto-detect Product Detail Pages (e.g. black-watch.html, ladies-black-suit.html)
  if (document.getElementById("detailStockBadge") || document.getElementById("detailAddToCartBtn")) {
    try {
      const pageFile = window.location.pathname.split("/").pop().replace(".html", "").toLowerCase();
      if (pageFile) {
        initProductDetailPage(pageFile);
      }
    } catch (e) {}
  }
}

// Ensure execution regardless of script load timing
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initZenvoraApp);
  } else {
    // DOM is already parsed (Netlify cache or deferred script load)
    initZenvoraApp();
  }
}

// Secondary backup triggers
if (typeof window !== "undefined") {
  window.addEventListener("load", function() {
    renderAllGrids();
    updateCartBadge();
  });
  // Immediate invocation if elements exist
  setTimeout(renderAllGrids, 10);
  setTimeout(renderAllGrids, 200);
}

// ============================================================================
// 13. EXPLICIT GLOBAL WINDOW BINDINGS
// ============================================================================
if (typeof window !== "undefined") {
  window.ZENVORA_PRODUCTS = ZENVORA_DEFAULT_PRODUCTS;
  window.ZENVORA_STOCK = ZENVORA_DEFAULT_STOCK;
  if (!window.products) window.products = ZENVORA_DEFAULT_PRODUCTS;
  if (!window.stockData) window.stockData = ZENVORA_DEFAULT_STOCK;

  window.addToCart = addToCart;
  window.orderNow = orderNow;
  window.removeFromCart = removeFromCart;
  window.updateItemQuantity = updateItemQuantity;
  window.clearCart = clearCart;
  window.renderProducts = renderProducts;
  window.renderAllGrids = renderAllGrids;
  window.createProductCardHTML = createProductCardHTML;
  window.initProductDetailPage = initProductDetailPage;
  window.initCheckoutPage = initCheckoutPage;
  window.renderCartPage = renderCartPage;
  window.showToast = showToast;
  window.initZenvoraApp = initZenvoraApp;
}
