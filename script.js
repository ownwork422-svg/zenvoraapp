/**
 * ============================================================================
 * ZENVORA - CORE ENGINE & E-COMMERCE LOGIC (VANILLA JS)
 * ============================================================================
 * Handles:
 * - Cart Management & Persistence (localStorage: "zenvora_cart")
 * - Live Dynamic Calculations (Subtotal, Free Shipping Tracker, Total)
 * - Order Now & Add to Cart Flows
 * - Inventory & Stock Checking (In Stock, Low Stock, Out of Stock)
 * - Cash on Delivery Checkout & Form Validation
 * - Automated WhatsApp Message Generation (0323 2974451)
 * - Order Confirmation Modals & Notifications
 * ============================================================================
 */

const ZENVORA_CONFIG = {
  brandName: "ZENVORA",
  whatsappNumber: "923232974451", // Official WhatsApp Number
  freeShippingThreshold: 5000,    // PKR 5,000+ = Free delivery
  standardShippingFee: 200,       // PKR 200 for orders under PKR 5,000
  storageKey: "zenvora_cart"
};

// ============================================================================
// 1. INVENTORY & STOCK ENGINE
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
    stock = (typeof stockData !== 'undefined' && stockData[productId] !== undefined)
      ? Number(stockData[productId])
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
// 2. CART PERSISTENCE & HELPERS
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
  localStorage.removeItem(ZENVORA_CONFIG.storageKey);
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
// 3. CART ACTIONS: ADD TO CART & ORDER NOW
// ============================================================================

/**
 * Add a product to cart and stay on current page
 */
function addToCart(productId, quantity = 1, size = null, color = null) {
  const stock = getStockInfo(productId);
  if (!stock.inStock) {
    showToast("This product is currently out of stock.", "error");
    return false;
  }

  const product = (typeof products !== 'undefined') ? products.find(p => p.id === productId) : null;
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

/**
 * Immediate Order Flow:
 * Adds item with full specifications to localStorage and REDIRECTS TO CHECKOUT.HTML IMMEDIATELY
 */
function orderNow(productId, quantity = 1, size = null, color = null) {
  const stock = getStockInfo(productId);
  if (!stock.inStock) {
    showToast("This item is currently out of stock.", "error");
    return false;
  }

  const product = (typeof products !== 'undefined') ? products.find(p => p.id === productId) : null;
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
  // Immediate direct redirect to checkout
  window.location.href = "checkout.html";
  return true;
}

/**
 * Update quantity of a specific cart item
 */
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

/**
 * Remove an item from cart
 */
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
// 4. CART PAGE RENDERER (cart.html)
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

  // If cart is empty
  if (cart.length === 0) {
    if (emptyState) emptyState.style.display = "block";
    if (cartList) cartList.innerHTML = "";
    if (filledLayout) filledLayout.style.display = "none";
    if (freeShippingBanner) freeShippingBanner.style.display = "none";
    return;
  }

  // Cart has items
  if (emptyState) emptyState.style.display = "none";
  if (filledLayout) filledLayout.style.display = "grid";
  if (freeShippingBanner) freeShippingBanner.style.display = "flex";

  // Update Free Shipping Banner
  if (shippingStatusText) {
    if (totals.isFreeShipping && totals.subtotal > 0) {
      shippingStatusText.innerHTML = `🎉 <strong>Congratulations!</strong> You qualify for <strong>FREE Nationwide Delivery</strong>.`;
    } else {
      shippingStatusText.innerHTML = `Add <strong>PKR ${totals.amountNeededForFreeShipping.toLocaleString()}</strong> more to unlock <strong>FREE Nationwide Delivery</strong>!`;
    }
  }

  // Render Product Cards/Rows
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

            <!-- Quantity Stepper -->
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

  // Update Summary Box
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
// 5. CHECKOUT PAGE LOGIC (checkout.html)
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

  // If cart is empty, warn customer
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

  // Render Checkout Items
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

  // Update Summary Rows
  if (checkoutSubtotal) checkoutSubtotal.textContent = `PKR ${totals.subtotal.toLocaleString()}`;
  if (checkoutShipping) {
    if (totals.shipping === 0) {
      checkoutShipping.innerHTML = `<span style="color: #166534; font-weight: 700;">FREE (Orders Over PKR 5,000)</span>`;
    } else {
      checkoutShipping.textContent = `PKR ${totals.shipping.toLocaleString()}`;
    }
  }
  if (checkoutTotal) checkoutTotal.textContent = `PKR ${totals.total.toLocaleString()}`;

  // Handle Form Submission (Place Order)
  checkoutForm.addEventListener("submit", function(e) {
    e.preventDefault();
    handlePlaceOrder();
  });
}

/**
 * Handle Order Submission & WhatsApp Message Generation
 */
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

  // Validation
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

  // Format WhatsApp Message exactly as requested
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

  // Show "Order Ready!" Success Modal
  showOrderReadyModal(name, totals.total, whatsappUrl);
}

/**
 * Display the Professional Order Ready Modal before redirecting to WhatsApp
 */
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

  // When user clicks the WhatsApp button, clear the cart
  const confirmBtn = document.getElementById("confirmWhatsAppOrderBtn");
  if (confirmBtn) {
    confirmBtn.addEventListener("click", function() {
      clearCart();
    });
  }
}

// ============================================================================
// 6. PRODUCT DETAIL PAGE CONTROLS (Single Product Pages)
// ============================================================================
function initProductDetailPage(productId) {
  const product = (typeof products !== 'undefined') ? products.find(p => p.id === productId) : null;
  if (!product) return;

  const stock = getStockInfo(productId);

  // Sync Stock Badge on Detail Page
  const stockBadge = document.getElementById("detailStockBadge");
  if (stockBadge) {
    stockBadge.textContent = stock.badgeText;
    stockBadge.className = `badge ${stock.badgeClass}`;
  }

  // Selected State
  let selectedSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : "Standard";
  let selectedColor = product.colors && product.colors.length > 0 ? product.colors[0] : "Standard";
  let quantity = 1;

  // Size Buttons
  const sizeBtns = document.querySelectorAll(".size-select-btn");
  sizeBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      sizeBtns.forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      selectedSize = this.getAttribute("data-size");
    });
  });

  // Color Buttons
  const colorBtns = document.querySelectorAll(".color-select-btn");
  const colorLabel = document.getElementById("selectedColorLabel");
  colorBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      colorBtns.forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      selectedColor = this.getAttribute("data-color");
      if (colorLabel) colorLabel.textContent = selectedColor;
    });
  });

  // Quantity Stepper
  const qtyInput = document.getElementById("detailQtyInput");
  const qtyMinus = document.getElementById("detailQtyMinus");
  const qtyPlus = document.getElementById("detailQtyPlus");

  if (qtyMinus && qtyInput) {
    qtyMinus.addEventListener("click", function() {
      if (quantity > 1) {
        quantity--;
        qtyInput.value = quantity;
      }
    });
  }

  if (qtyPlus && qtyInput) {
    qtyPlus.addEventListener("click", function() {
      if (stock.inStock && quantity < stock.qty) {
        quantity++;
        qtyInput.value = quantity;
      } else if (stock.inStock && quantity >= stock.qty) {
        showToast(`Only ${stock.qty} items available in stock.`, "info");
      }
    });
  }

  // Action Buttons
  const addToCartBtn = document.getElementById("detailAddToCartBtn");
  const orderNowBtn = document.getElementById("detailOrderNowBtn");

  if (addToCartBtn) {
    if (!stock.inStock) {
      addToCartBtn.disabled = true;
      addToCartBtn.textContent = "Out of Stock";
    } else {
      addToCartBtn.addEventListener("click", function() {
        addToCart(product.id, quantity, selectedSize, selectedColor);
      });
    }
  }

  if (orderNowBtn) {
    if (!stock.inStock) {
      orderNowBtn.disabled = true;
      orderNowBtn.textContent = "Out of Stock";
    } else {
      orderNowBtn.addEventListener("click", function() {
        orderNow(product.id, quantity, selectedSize, selectedColor);
      });
    }
  }

  // Image Thumbnails Gallery
  const mainImage = document.getElementById("detailMainImage");
  const thumbs = document.querySelectorAll(".detail-thumb");
  thumbs.forEach(thumb => {
    thumb.addEventListener("click", function() {
      thumbs.forEach(t => t.classList.remove("active"));
      this.classList.add("active");
      if (mainImage) mainImage.src = this.src;
    });
  });
}

// ============================================================================
// 7. PRODUCT CARD GENERATOR & CATALOGUE GRIDS
// ============================================================================
function createProductCardHTML(product) {
  if (!product) return '';
  const stock = getStockInfo(product.id);
  const detailLink = product.detailPage || `${product.id}.html`;
  const imgUrl = product.image || 'fallback-image.svg';
  const isOutOfStock = !stock.inStock;
  const categoryLabel = product.categoryLabel || (product.category ? product.category.toUpperCase() : 'FASHION');
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
          ${oldPriceFormatted ? `<span class="price-old">PKR ${oldPriceFormatted}</span>` : ''}
        </div>
        <div class="product-actions-grid">
          <a href="${detailLink}" class="btn btn-outline btn-sm">
            View Details
          </a>
          <button 
            type="button" 
            class="btn btn-primary btn-sm" 
            onclick="orderNow('${product.id}')"
            ${isOutOfStock ? 'disabled' : ''}>
            ${isOutOfStock ? 'Out of Stock' : 'Order Now'}
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderProducts(productList, container) {
  const targetEl = (typeof container === 'string') ? document.getElementById(container) : container;
  if (!targetEl) return;
  if (!productList || productList.length === 0) {
    targetEl.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">No products found in this collection.</div>`;
    return;
  }
  targetEl.innerHTML = productList.map(createProductCardHTML).join('');
}

function renderAllGrids() {
  if (typeof products === 'undefined' || !Array.isArray(products)) {
    console.warn("ZENVORA: 'products' array is not available.");
    return;
  }

  // 1. Featured Grid (index.html)
  const featuredGrid = document.getElementById("featuredGrid");
  if (featuredGrid) {
    const featuredItems = products.filter(p => p.newArrival === true || p.bestSeller === true || p.featured === true);
    renderProducts(featuredItems.length > 0 ? featuredItems.slice(0, 4) : products.slice(0, 4), featuredGrid);
  }

  // 2. All Products Grid (index.html)
  const allProductsGrid = document.getElementById("allProductsGrid");
  if (allProductsGrid) {
    renderProducts(products, allProductsGrid);
  }

  // 3. Category Page Detection & Rendering
  const currentPath = window.location.pathname.toLowerCase();
  const genericGrid = document.getElementById("productGrid");

  // Ladies Grid (ladies.html)
  const ladiesGrid = document.getElementById("ladiesGrid") || (currentPath.includes("ladies") ? genericGrid : null);
  if (ladiesGrid) {
    const ladiesProducts = products.filter(p => p.category === "ladies");
    renderProducts(ladiesProducts, ladiesGrid);
  }

  // Gents Grid (gents.html)
  const gentsGrid = document.getElementById("gentsGrid") || (currentPath.includes("gents") ? genericGrid : null);
  if (gentsGrid) {
    const gentsProducts = products.filter(p => p.category === "gents");
    renderProducts(gentsProducts, gentsGrid);
  }

  // Shoes & Sandals Grid (shoes.html)
  const shoesGrid = document.getElementById("shoesGrid") || (currentPath.includes("shoes") ? genericGrid : null);
  if (shoesGrid) {
    const shoesProducts = products.filter(p => p.category === "shoes");
    renderProducts(shoesProducts, shoesGrid);
  }

  // Watches Grid (watches.html)
  const watchesGrid = document.getElementById("watchesGrid") || (currentPath.includes("watches") ? genericGrid : null);
  if (watchesGrid) {
    const watchesProducts = products.filter(p => p.category === "watches");
    renderProducts(watchesProducts, watchesGrid);
  }

  // Accessories Grid (accessories.html)
  const accessoriesGrid = document.getElementById("accessoriesGrid") || (currentPath.includes("accessories") ? genericGrid : null);
  if (accessoriesGrid) {
    const accProducts = products.filter(p => p.category === "accessories");
    renderProducts(accProducts, accessoriesGrid);
  }

  // New Arrivals Grid (new-arrivals.html)
  const newArrivalsGrid = document.getElementById("newArrivalsGrid") || (currentPath.includes("new-arrivals") ? genericGrid : null);
  if (newArrivalsGrid) {
    const newArrivalsProducts = products.filter(p => p.newArrival === true);
    renderProducts(newArrivalsProducts, newArrivalsGrid);
  }
}

// ============================================================================
// 8. STOCK & INVENTORY PORTAL LOGIC (stock.html)
// ============================================================================
function initStockPortalPage() {
  const tableBody = document.getElementById("stockTableBody");
  if (!tableBody || typeof products === 'undefined') return;

  function renderStockRows() {
    let inStockCount = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;

    let html = '';
    products.forEach(product => {
      const stock = getStockInfo(product.id);
      if (!stock.inStock) outOfStockCount++;
      else if (stock.qty <= 3) lowStockCount++;
      else inStockCount++;

      const detailLink = product.detailPage || `${product.id}.html`;
      const imgUrl = product.image || 'fallback-image.svg';

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

    // Metrics
    const metricTotal = document.getElementById("metricTotalProducts");
    const metricIn = document.getElementById("metricInStock");
    const metricLow = document.getElementById("metricLowStock");
    const metricOut = document.getElementById("metricOutOfStock");

    if (metricTotal) metricTotal.textContent = products.length;
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
    resetAllBtn.addEventListener("click", function() {
      if (confirm("Reset all products to default 10 in stock?")) {
        products.forEach(p => updateProductStock(p.id, 10));
        renderStockRows();
        showToast("All products reset to In Stock (10 units).", "success");
      }
    });
  }

  renderStockRows();
}

// ============================================================================
// 9. TOAST NOTIFICATION SYSTEM
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
// 10. MOBILE NAVIGATION & GLOBAL INITIALIZATION
// ============================================================================
document.addEventListener("DOMContentLoaded", function() {
  // Sync Cart Badge on all pages
  updateCartBadge();

  // Render Product Grids across catalogue pages
  renderAllGrids();

  // Mobile Menu Drawer
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

  if (mobileMenuOpenBtn) mobileMenuOpenBtn.addEventListener("click", openMobileNav);
  if (mobileMenuCloseBtn) mobileMenuCloseBtn.addEventListener("click", closeMobileNav);
  if (mobileNavOverlay) mobileNavOverlay.addEventListener("click", closeMobileNav);

  // If on Cart Page, render Cart
  if (document.getElementById("cartItemsList")) {
    renderCartPage();

    const clearCartBtn = document.getElementById("clearCartBtn");
    if (clearCartBtn) {
      clearCartBtn.addEventListener("click", function() {
        if (confirm("Are you sure you want to clear your shopping cart?")) {
          clearCart();
          renderCartPage();
          showToast("Cart has been cleared.", "info");
        }
      });
    }
  }

  // If on Checkout Page, init Checkout
  if (document.getElementById("checkoutForm")) {
    initCheckoutPage();
  }

  // If on Stock Portal, init Portal
  if (document.getElementById("stockTableBody")) {
    initStockPortalPage();
  }
});

// Explicit Global Window Bindings
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
