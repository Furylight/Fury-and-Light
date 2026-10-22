/**
 * =========================================================================
 * FURY & LIGHT - IN-BROWSER VISUAL STORE & PRODUCT MANAGER (ADMIN MODE)
 * Allows the owner to edit prices, contact details, socials and products
 * directly in the browser with instant saving & data.js file export!
 * =========================================================================
 */

function openAdminModal() {
  let modal = document.getElementById("adminModal");
  if (!modal) {
    createAdminModalDOM();
    modal = document.getElementById("adminModal");
  }

  loadAdminFormData();
  renderAdminProductsTable();
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeAdminModal() {
  const modal = document.getElementById("adminModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

function createAdminModalDOM() {
  const div = document.createElement("div");
  div.id = "adminModal";
  div.className = "modal-overlay";
  div.innerHTML = `
    <div class="modal-content-card admin-modal-card">
      <button class="modal-close-btn" onclick="closeAdminModal()">×</button>
      
      <div class="admin-header">
        <h2><i class="fa fa-sliders"></i> Fury & Light - Store Manager</h2>
        <p style="font-size:0.85rem;color:var(--text-secondary);margin-top:4px;">
          මෙම පැනලය මඟින් වෙබ්සයිට් එකේ WhatsApp අංකය, මිල ගණන්, සහ T-Shirt විස්තර පහසුවෙන් වෙනස් කර Save කරගත හැක.
        </p>
      </div>

      <div class="admin-tabs">
        <button class="admin-tab-btn active" onclick="switchAdminTab('contact', this)">📞 Contact & Socials</button>
        <button class="admin-tab-btn" onclick="switchAdminTab('products', this)">👕 Manage Products & Prices</button>
        <button class="admin-tab-btn" onclick="switchAdminTab('add', this)">➕ Add New T-Shirt</button>
        <button class="admin-tab-btn" onclick="switchAdminTab('export', this)">💾 Export & Backup</button>
      </div>

      <!-- TAB 1: CONTACT & SOCIALS -->
      <div id="adminTabContact" class="admin-tab-pane">
        <form id="adminContactForm" onsubmit="handleSaveContact(event)">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <div class="admin-form-group">
              <label>WhatsApp Number (Only digits with country code: 9477...)</label>
              <input type="text" id="adminWhatsapp" class="admin-input" required placeholder="94771234567">
            </div>
            <div class="admin-form-group">
              <label>Display Phone Number</label>
              <input type="text" id="adminPhone" class="admin-input" required placeholder="+94 77 123 4567">
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <div class="admin-form-group">
              <label>Contact Email</label>
              <input type="email" id="adminEmail" class="admin-input" required placeholder="furyandlight.lk@gmail.com">
            </div>
            <div class="admin-form-group">
              <label>Store Location / Delivery Area</label>
              <input type="text" id="adminAddress" class="admin-input" placeholder="Colombo / Island-wide Delivery, Sri Lanka">
            </div>
          </div>

          <div class="admin-form-group">
            <label>Top Announcement Banner Text</label>
            <input type="text" id="adminAnnouncement" class="admin-input" placeholder="⚡ FREE ISLAND-WIDE DELIVERY...">
          </div>

          <h4 style="margin:20px 0 12px;font-size:0.95rem;color:var(--ice-blue);">🌐 Social Media Links</h4>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <div class="admin-form-group">
              <label>Instagram URL</label>
              <input type="text" id="adminInsta" class="admin-input" placeholder="https://instagram.com/furyandlight">
            </div>
            <div class="admin-form-group">
              <label>TikTok URL</label>
              <input type="text" id="adminTiktok" class="admin-input" placeholder="https://tiktok.com/@furyandlight">
            </div>
          </div>
          <div class="admin-form-group">
            <label>Facebook URL</label>
            <input type="text" id="adminFb" class="admin-input" placeholder="https://facebook.com/furyandlight">
          </div>

          <button type="submit" class="btn-primary" style="margin-top:10px;">💾 Save Store Settings</button>
        </form>
      </div>

      <!-- TAB 2: PRODUCTS TABLE -->
      <div id="adminTabProducts" class="admin-tab-pane" style="display:none;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
          <h4 style="color:var(--ice-blue);">Existing Products in Catalog</h4>
          <span style="font-size:0.8rem;color:var(--text-muted);">Click price or delete to update live</span>
        </div>
        <div style="overflow-x:auto;">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price (Rs.)</th>
                <th>Badge</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="adminProductsTableBody"></tbody>
          </table>
        </div>
      </div>

      <!-- TAB 3: ADD NEW PRODUCT -->
      <div id="adminTabAdd" class="admin-tab-pane" style="display:none;">
        <form id="adminAddProductForm" onsubmit="handleAddProduct(event)">
          <div style="display:grid;grid-template-columns:2fr 1fr;gap:16px;">
            <div class="admin-form-group">
              <label>T-Shirt Title</label>
              <input type="text" id="newProdName" class="admin-input" required placeholder="e.g. Mythic Ice Blue Oversized Tee">
            </div>
            <div class="admin-form-group">
              <label>Category</label>
              <select id="newProdCategory" class="admin-select" required>
                <option value="baggy">Baggy / Oversized</option>
                <option value="regular">Regular Unisex</option>
                <option value="kids">Kids Unisex</option>
              </select>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;">
            <div class="admin-form-group">
              <label>Price (Rs.)</label>
              <input type="number" id="newProdPrice" class="admin-input" required placeholder="2950">
            </div>
            <div class="admin-form-group">
              <label>Original Price (Rs. - Optional strikeout)</label>
              <input type="number" id="newProdOrigPrice" class="admin-input" placeholder="3500">
            </div>
            <div class="admin-form-group">
              <label>Badge Tag</label>
              <input type="text" id="newProdBadge" class="admin-input" placeholder="e.g. HOT DROP / NEW">
            </div>
          </div>

          <div class="admin-form-group">
            <label>Fabric / Quality Specs</label>
            <input type="text" id="newProdFabric" class="admin-input" placeholder="e.g. 240 GSM Combed Cotton • Bio-Washed">
          </div>

          <div class="admin-form-group">
            <label>Description</label>
            <textarea id="newProdDesc" class="admin-textarea" rows="3" placeholder="Describe the print, fit and details..."></textarea>
          </div>

          <div class="admin-form-group">
            <label>Image Mockup Path or URL</label>
            <input type="text" id="newProdImage" class="admin-input" placeholder="assets/images/products/baggy-dragon-black.svg" value="assets/images/products/baggy-dragon-black.svg">
          </div>

          <button type="submit" class="btn-primary" style="margin-top:10px;">➕ Add T-Shirt To Store</button>
        </form>
      </div>

      <!-- TAB 4: EXPORT & BACKUP -->
      <div id="adminTabExport" class="admin-tab-pane" style="display:none;">
        <div style="background:var(--bg-card);border:1px solid var(--border-ice);border-radius:var(--radius-md);padding:24px;margin-bottom:20px;">
          <h4 style="color:var(--ice-blue);margin-bottom:8px;">📥 Export Updated data.js File</h4>
          <p style="font-size:0.88rem;color:var(--text-secondary);margin-bottom:18px;line-height:1.6;">
            ඔබ මෙහිදී සිදුකළ සියලුම වෙනස්කම් ස්ථිරවම කේත ගොනුවක් ලෙස ලබා ගැනීමට මෙම බටන් එක ක්ලික් කර <strong>data.js</strong> ගොනුව බාගත කරන්න. ඉන්පසු එය ඔබේ <code>assets/js/data.js</code> වෙනුවට Replace කරන්න.
          </p>
          <button class="btn-primary" onclick="exportDataJsFile()">
            <i class="fa fa-download"></i> Download Updated data.js
          </button>
        </div>

        <div style="background:var(--bg-card);border:1px solid rgba(239,68,68,0.3);border-radius:var(--radius-md);padding:24px;">
          <h4 style="color:#ef4444;margin-bottom:8px;">⚠️ Reset to Default</h4>
          <p style="font-size:0.88rem;color:var(--text-secondary);margin-bottom:16px;">
            ඔබ සිදුකළ සියලුම වෙනස්කම් ඉවත් කර වෙබ්සයිට් එක මුල් සාමාන්‍ය තත්ත්වයට පත් කිරීමට අවශ්‍ය නම් මෙතැනින් Reset කරන්න.
          </p>
          <button class="btn-secondary" style="border-color:#ef4444;color:#ef4444;" onclick="handleResetFactory()">
            🔄 Reset All Store Data
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(div);
}

function switchAdminTab(tabKey, btn) {
  const tabs = document.querySelectorAll(".admin-tab-pane");
  tabs.forEach(t => t.style.display = "none");
  const btns = document.querySelectorAll(".admin-tab-btn");
  btns.forEach(b => b.classList.remove("active"));

  if (btn) btn.classList.add("active");

  if (tabKey === "contact") document.getElementById("adminTabContact").style.display = "block";
  if (tabKey === "products") {
    document.getElementById("adminTabProducts").style.display = "block";
    renderAdminProductsTable();
  }
  if (tabKey === "add") document.getElementById("adminTabAdd").style.display = "block";
  if (tabKey === "export") document.getElementById("adminTabExport").style.display = "block";
}

function loadAdminFormData() {
  const config = getStoreConfig();
  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.value = val || "";
  };

  setVal("adminWhatsapp", config.whatsapp);
  setVal("adminPhone", config.phone);
  setVal("adminEmail", config.email);
  setVal("adminAddress", config.address);
  setVal("adminAnnouncement", config.announcement);
  setVal("adminInsta", config.socials?.instagram);
  setVal("adminTiktok", config.socials?.tiktok);
  setVal("adminFb", config.socials?.facebook);
}

function handleSaveContact(e) {
  e.preventDefault();
  const config = getStoreConfig();

  config.whatsapp = document.getElementById("adminWhatsapp").value.trim();
  config.phone = document.getElementById("adminPhone").value.trim();
  config.email = document.getElementById("adminEmail").value.trim();
  config.address = document.getElementById("adminAddress").value.trim();
  config.announcement = document.getElementById("adminAnnouncement").value.trim();

  config.socials = {
    whatsapp: `https://wa.me/${config.whatsapp}?text=Hi%20Fury%20%26%20Light!`,
    instagram: document.getElementById("adminInsta").value.trim(),
    tiktok: document.getElementById("adminTiktok").value.trim(),
    facebook: document.getElementById("adminFb").value.trim()
  };

  saveStoreConfig(config);
  showToast("Store settings saved successfully!");
  
  // Reload page data
  setTimeout(() => window.location.reload(), 800);
}

function renderAdminProductsTable() {
  const tbody = document.getElementById("adminProductsTableBody");
  if (!tbody) return;

  const products = getProducts();
  const config = getStoreConfig();

  tbody.innerHTML = products.map((p, index) => `
    <tr>
      <td>
        <img src="${p.image}" alt="${p.name}" style="width:42px;height:42px;border-radius:6px;background:#000;object-fit:contain;">
      </td>
      <td>
        <strong>${p.name}</strong>
        <div style="font-size:0.75rem;color:var(--text-muted);">${p.fit || ''}</div>
      </td>
      <td><span style="text-transform:uppercase;font-size:0.78rem;color:var(--ice-blue);font-weight:700;">${p.category}</span></td>
      <td>
        <input type="number" value="${p.price}" style="width:80px;padding:4px 8px;background:var(--bg-surface);border:1px solid var(--border-ice);border-radius:4px;color:#fff;" onchange="updateProductPrice('${p.id}', this.value)">
      </td>
      <td><span style="font-size:0.72rem;background:rgba(0,229,255,0.1);color:var(--ice-blue);padding:2px 8px;border-radius:999px;">${p.badge || 'STANDARD'}</span></td>
      <td>
        <button onclick="handleDeleteProduct('${p.id}')" style="color:#ef4444;font-size:0.82rem;font-weight:700;padding:4px 8px;border-radius:4px;background:rgba(239,68,68,0.1);">Delete</button>
      </td>
    </tr>
  `).join("");
}

function updateProductPrice(id, newPrice) {
  const products = getProducts();
  const p = products.find(item => item.id === id);
  if (p) {
    p.price = parseInt(newPrice, 10) || p.price;
    saveProducts(products);
    showToast(`Updated price for ${p.name}`);
  }
}

function handleDeleteProduct(id) {
  if (!confirm("Are you sure you want to remove this T-Shirt from the store?")) return;
  let products = getProducts();
  products = products.filter(p => p.id !== id);
  saveProducts(products);
  renderAdminProductsTable();
  showToast("Product deleted from store.");
}

function handleAddProduct(e) {
  e.preventDefault();
  const products = getProducts();

  const name = document.getElementById("newProdName").value.trim();
  const category = document.getElementById("newProdCategory").value;
  const price = parseInt(document.getElementById("newProdPrice").value, 10);
  const origPrice = parseInt(document.getElementById("newProdOrigPrice").value, 10) || null;
  const badge = document.getElementById("newProdBadge").value.trim() || "NEW";
  const fabric = document.getElementById("newProdFabric").value.trim() || "220 GSM Bio-Washed Combed Cotton";
  const desc = document.getElementById("newProdDesc").value.trim() || "Premium high quality unisex printed t-shirt.";
  const image = document.getElementById("newProdImage").value.trim() || "assets/images/products/baggy-dragon-black.svg";

  const fitMap = {
    baggy: "Baggy / Oversized (Unisex)",
    regular: "Regular Fit (Unisex)",
    kids: "Kids Relaxed (Unisex)"
  };

  const newP = {
    id: `fury-${category}-${Date.now().toString().slice(-4)}`,
    name: name,
    category: category,
    badge: badge,
    price: price,
    originalPrice: origPrice,
    fit: fitMap[category],
    fabric: fabric,
    description: desc,
    image: image,
    featured: true,
    rating: 5.0,
    reviews: 1,
    sizes: category === "kids" ? ["3-4 Yrs", "5-6 Yrs", "7-8 Yrs", "9-10 Yrs", "11-12 Yrs"] : ["S", "M", "L", "XL", "2XL"],
    colors: [
      { name: "Jet Black", hex: "#0a0d14", code: "black" },
      { name: "Ice Blue", hex: "#00e5ff", code: "ice" },
      { name: "Pure White", hex: "#f8fafc", code: "white" }
    ]
  };

  products.unshift(newP);
  saveProducts(products);
  showToast(`Added ${name} to store!`);
  switchAdminTab('products');
  setTimeout(() => window.location.reload(), 1000);
}

function handleResetFactory() {
  if (confirm("Reset everything to original factory defaults? All custom changes will be wiped.")) {
    resetStoreData();
    alert("Reset complete! Refreshing page...");
    window.location.reload();
  }
}

// 💾 Downloadable data.js Generator
function exportDataJsFile() {
  const config = getStoreConfig();
  const products = getProducts();

  const fileContent = `/**
 * =========================================================================
 * FURY & LIGHT - STORE DATA & CONFIGURATION (EXPORTED)
 * =========================================================================
 */

const DEFAULT_STORE_CONFIG = ${JSON.stringify(config, null, 2)};

const DEFAULT_PRODUCTS = ${JSON.stringify(products, null, 2)};

function getStoreConfig() {
  try {
    const saved = localStorage.getItem("FURY_STORE_CONFIG");
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return DEFAULT_STORE_CONFIG;
}

function saveStoreConfig(config) {
  localStorage.setItem("FURY_STORE_CONFIG", JSON.stringify(config));
}

function getProducts() {
  try {
    const saved = localStorage.getItem("FURY_PRODUCTS");
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return DEFAULT_PRODUCTS;
}

function saveProducts(products) {
  localStorage.setItem("FURY_PRODUCTS", JSON.stringify(products));
}

function resetStoreData() {
  localStorage.removeItem("FURY_STORE_CONFIG");
  localStorage.removeItem("FURY_PRODUCTS");
}
`;

  const blob = new Blob([fileContent], { type: "text/javascript;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "data.js";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast("data.js downloaded! Replace in assets/js/data.js");
}
