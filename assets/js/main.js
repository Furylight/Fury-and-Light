/**
 * =========================================================================
 * FURY & LIGHT - CORE APPLICATION SCRIPT
 * Handles Navigation, Cart, WhatsApp Ordering, Quick View, and Dynamic Data
 * =========================================================================
 */

// Cart State (stored in localStorage)
let cart = [];

function loadCart() {
  try {
    const saved = localStorage.getItem("FURY_CART");
    if (saved) cart = JSON.parse(saved);
  } catch (e) {
    cart = [];
  }
  updateCartUI();
}

function saveCart() {
  localStorage.setItem("FURY_CART", JSON.stringify(cart));
  updateCartUI();
}

function addToCart(productId, selectedSize, selectedColor) {
  const products = getProducts();
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const size = selectedSize || (product.sizes && product.sizes[0]) || "L";
  const color = selectedColor || (product.colors && product.colors[0].name) || "Jet Black";

  // Check if item with same size & color already in cart
  const existing = cart.find(item => item.id === productId && item.size === size && item.color === color);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: size,
      color: color,
      quantity: 1
    });
  }

  saveCart();
  openCartDrawer();
  showToast(`Added to cart: ${product.name} (${size})`);
}

function updateCartQuantity(index, delta) {
  if (cart[index]) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    saveCart();
  }
}

function removeFromCart(index) {
  if (cart[index]) {
    cart.splice(index, 1);
    saveCart();
  }
}

function updateCartUI() {
  const countEls = document.querySelectorAll(".cart-count");
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  countEls.forEach(el => el.textContent = totalCount);

  const container = document.getElementById("cartItemsContainer");
  const subtotalEl = document.getElementById("cartSubtotal");
  const config = getStoreConfig();

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart-state">
        <div class="empty-cart-icon">🛒</div>
        <h4>Your cart is empty</h4>
        <p style="margin-top:8px;font-size:0.88rem;">Explore our streetwear baggy & regular t-shirts!</p>
        <a href="shop.html" class="btn-primary" style="margin-top:20px;padding:10px 24px;font-size:0.85rem;">Browse Collection</a>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = `${config.currency} 0`;
    return;
  }

  let subtotal = 0;
  container.innerHTML = cart.map((item, index) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    return `
      <div class="cart-item-row">
        <div class="cart-item-img">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <div class="cart-item-meta">
            <span>Size: <strong>${item.size}</strong></span>
            <span>•</span>
            <span>Color: <strong>${item.color}</strong></span>
          </div>
          <div class="cart-item-qty-row">
            <button class="qty-btn" onclick="updateCartQuantity(${index}, -1)">-</button>
            <span class="qty-number">${item.quantity}</span>
            <button class="qty-btn" onclick="updateCartQuantity(${index}, 1)">+</button>
          </div>
        </div>
        <div>
          <div class="cart-item-price">${config.currency} ${itemTotal.toLocaleString()}</div>
          <span class="cart-item-remove" onclick="removeFromCart(${index})">Remove</span>
        </div>
      </div>
    `;
  }).join("");

  if (subtotalEl) {
    subtotalEl.textContent = `${config.currency} ${subtotal.toLocaleString()}`;
  }
}

function openCartDrawer() {
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("cartOverlay");
  if (drawer && overlay) {
    drawer.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("cartOverlay");
  if (drawer && overlay) {
    drawer.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// 📲 WhatsApp Direct Checkout Formatter
function checkoutViaWhatsApp() {
  if (cart.length === 0) {
    alert("Your cart is empty! Please add items first.");
    return;
  }

  const config = getStoreConfig();
  let subtotal = 0;
  
  let msg = `🔥 *NEW ORDER - FURY & LIGHT* 🔥\n`;
  msg += `--------------------------------------\n`;
  
  cart.forEach((item, i) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    msg += `${i + 1}. *${item.name}*\n`;
    msg += `   • Size: ${item.size} | Color: ${item.color}\n`;
    msg += `   • Qty: ${item.quantity} x ${config.currency} ${item.price.toLocaleString()}\n`;
    msg += `   • Sub: ${config.currency} ${itemTotal.toLocaleString()}\n\n`;
  });

  msg += `--------------------------------------\n`;
  msg += `💰 *TOTAL ESTIMATE: ${config.currency} ${subtotal.toLocaleString()}*\n\n`;
  msg += `📍 *Delivery Details:*\n`;
  msg += `Name: \n`;
  msg += `Phone Number: \n`;
  msg += `Delivery Address: \n`;
  msg += `City / District: \n`;
  msg += `Payment Method: (Cash on Delivery / Bank Transfer)\n\n`;
  msg += `Thank you! Please confirm my order.`;

  const encoded = encodeURIComponent(msg);
  const waUrl = `https://wa.me/${config.whatsapp}?text=${encoded}`;
  window.open(waUrl, "_blank");
}

// ⚡ Quick View Modal
let currentQvProduct = null;
let selectedQvSize = "";
let selectedQvColor = "";

function openQuickView(productId) {
  const products = getProducts();
  const product = products.find(p => p.id === productId);
  if (!product) return;

  currentQvProduct = product;
  selectedQvSize = product.sizes ? product.sizes[0] : "L";
  selectedQvColor = product.colors ? product.colors[0].name : "Jet Black";

  const modal = document.getElementById("quickViewModal");
  const content = document.getElementById("quickViewContent");
  const config = getStoreConfig();

  if (!modal || !content) return;

  content.innerHTML = `
    <div class="quickview-grid">
      <div class="qv-image-preview">
        <img id="qvPreviewImg" src="${product.image}" alt="${product.name}">
      </div>
      <div class="qv-details-col">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
          <span class="product-badge-float" style="position:static;">${product.badge || 'PREMIUM'}</span>
          <span class="product-fit-label">${product.fit}</span>
        </div>
        <h3>${product.name}</h3>
        <p style="color:var(--text-secondary);font-size:0.9rem;margin:10px 0 16px;line-height:1.6;">${product.description}</p>
        
        <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--radius-sm);padding:12px;margin-bottom:18px;">
          <div style="font-size:0.8rem;color:var(--text-muted);margin-bottom:4px;">FABRIC & PRINT QUALITY:</div>
          <div style="font-size:0.88rem;color:var(--ice-blue);font-weight:700;">${product.fabric}</div>
        </div>

        <div class="qv-color-selector-row">
          <span class="selector-label">Available Colors: <strong id="qvSelectedColorName" style="color:var(--ice-blue);">${selectedQvColor}</strong></span>
          <div class="product-colors-row">
            ${(product.colors || []).map((c, i) => `
              <div class="color-dot ${i === 0 ? 'active' : ''}" style="background-color: ${c.hex};" title="${c.name}" onclick="selectQvColor('${c.name}', this)"></div>
            `).join("")}
          </div>
        </div>

        <div class="qv-size-selector-row">
          <span class="selector-label">Choose Size: <strong id="qvSelectedSizeName" style="color:var(--ice-blue);">${selectedQvSize}</strong></span>
          <div class="size-pill-group">
            ${(product.sizes || []).map((s, i) => `
              <button class="size-pill ${i === 0 ? 'active' : ''}" onclick="selectQvSize('${s}', this)">${s}</button>
            `).join("")}
          </div>
        </div>

        <div class="product-price-row" style="margin:24px 0 20px;">
          <div class="product-current-price" style="font-size:1.6rem;">${config.currency} ${product.price.toLocaleString()}</div>
          ${product.originalPrice ? `<div class="product-orig-price" style="font-size:1rem;">${config.currency} ${product.originalPrice.toLocaleString()}</div>` : ''}
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <button class="btn-primary" onclick="addQvToCart()">
            🛒 Add To Cart
          </button>
          <button class="btn-secondary" style="border-color:#25d366;color:#25d366;" onclick="orderQvWhatsApp()">
            💬 Order on WhatsApp
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function selectQvSize(size, el) {
  selectedQvSize = size;
  const label = document.getElementById("qvSelectedSizeName");
  if (label) label.textContent = size;
  const pills = el.parentElement.querySelectorAll(".size-pill");
  pills.forEach(p => p.classList.remove("active"));
  el.classList.add("active");
}

function selectQvColor(colorName, el) {
  selectedQvColor = colorName;
  const label = document.getElementById("qvSelectedColorName");
  if (label) label.textContent = colorName;
  const dots = el.parentElement.querySelectorAll(".color-dot");
  dots.forEach(d => d.classList.remove("active"));
  el.classList.add("active");
}

function addQvToCart() {
  if (currentQvProduct) {
    addToCart(currentQvProduct.id, selectedQvSize, selectedQvColor);
    closeQuickView();
  }
}

function orderQvWhatsApp() {
  if (!currentQvProduct) return;
  const config = getStoreConfig();
  const text = `Hi Fury & Light! 🐉 I would like to order:\n\n*Product:* ${currentQvProduct.name}\n*Fit:* ${currentQvProduct.fit}\n*Size:* ${selectedQvSize}\n*Color:* ${selectedQvColor}\n*Price:* ${config.currency} ${currentQvProduct.price.toLocaleString()}\n\nPlease confirm availability and payment details. Thank you!`;
  window.open(`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
}

function closeQuickView() {
  const modal = document.getElementById("quickViewModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// 💬 Instant Single Product WhatsApp Order
function directWhatsAppOrder(productId) {
  const products = getProducts();
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const config = getStoreConfig();
  const defSize = product.sizes ? product.sizes[0] : "L";
  const defColor = product.colors ? product.colors[0].name : "Jet Black";

  const text = `Hi Fury & Light! 🐉 I am interested in ordering:\n\n*${product.name}*\n• Fit: ${product.fit}\n• Size: ${defSize}\n• Color: ${defColor}\n• Price: ${config.currency} ${product.price.toLocaleString()}\n\nPlease share delivery timeframe and details!`;
  window.open(`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
}

// Simple Toast Notification
function showToast(message) {
  let toast = document.getElementById("furyToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "furyToast";
    toast.style.cssText = `
      position: fixed;
      bottom: 100px;
      right: 28px;
      background: #111827;
      color: #00e5ff;
      border: 1px solid #00e5ff;
      border-radius: 9999px;
      padding: 12px 24px;
      font-size: 0.88rem;
      font-weight: 700;
      box-shadow: 0 10px 25px rgba(0, 229, 255, 0.3);
      z-index: 300;
      transition: all 0.3s ease;
      transform: translateY(20px);
      opacity: 0;
      pointer-events: none;
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.transform = "translateY(0)";
  toast.style.opacity = "1";

  setTimeout(() => {
    toast.style.transform = "translateY(20px)";
    toast.style.opacity = "0";
  }, 2800);
}

// Initialize Dynamic Page Elements
function initPage() {
  const config = getStoreConfig();

  // Announcement Bar
  const announceEl = document.querySelector(".announcement-bar span");
  if (announceEl && config.announcement) {
    announceEl.textContent = config.announcement;
  }

  // Floating WhatsApp link
  const floatWa = document.querySelector(".floating-whatsapp-btn");
  if (floatWa) {
    floatWa.href = `https://wa.me/${config.whatsapp}?text=Hi%20Fury%20%26%20Light!%20I%20have%20an%20inquiry%20about%20your%20t-shirts.`;
  }

  // Scroll Header Effect
  const header = document.querySelector(".header-nav");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  });

  // Mobile Menu Toggle
  const menuBtn = document.querySelector(".mobile-menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("mobile-open");
      const icon = menuBtn.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-times");
      }
    });
  }

  loadCart();
}

document.addEventListener("DOMContentLoaded", initPage);
