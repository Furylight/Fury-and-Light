/**
 * =========================================================================
 * FURY & LIGHT - CUSTOM T-SHIRT STUDIO ENGINE
 * Interactive Live Preview, Custom Artwork Upload, Text & WhatsApp Generator
 * =========================================================================
 */

const CUSTOM_FIT_PRICES = {
  baggy: { name: "Baggy / Oversized Fit", gsm: "240 GSM Heavyweight Cotton", price: 3200 },
  regular: { name: "Regular Unisex Fit", gsm: "200 GSM Bio-Washed Cotton", price: 2600 },
  kids: { name: "Kids Unisex Fit", gsm: "180 GSM Soft Organic Cotton", price: 2100 }
};

let customState = {
  fit: "baggy",
  colorName: "Jet Black",
  colorHex: "#0a0d14",
  size: "L",
  placement: "center", // center, pocket, back
  customText: "",
  textColor: "#00e5ff",
  customImageSrc: null,
  quantity: 1
};

function initCustomStudio() {
  const shirtPath = document.getElementById("customShirtPath");
  if (!shirtPath) return; // not on custom page

  // Initial render
  updateMockup();

  // Setup file upload listener
  const fileInput = document.getElementById("customArtworkUpload");
  if (fileInput) {
    fileInput.addEventListener("change", handleArtworkUpload);
  }

  // Setup text listener
  const textInput = document.getElementById("customTextInput");
  if (textInput) {
    textInput.addEventListener("input", (e) => {
      customState.customText = e.target.value;
      updateMockup();
    });
  }
}

function setCustomFit(fitKey, el) {
  customState.fit = fitKey;
  
  // Update UI tabs
  const tabs = document.querySelectorAll(".fit-option-card");
  tabs.forEach(t => t.classList.remove("active"));
  el.classList.add("active");

  // Update sizes based on fit
  updateSizesForFit(fitKey);
  updatePriceDisplay();
  updateMockup();
}

function updateSizesForFit(fitKey) {
  const sizeContainer = document.getElementById("customSizesContainer");
  if (!sizeContainer) return;

  const adultSizes = ["S", "M", "L", "XL", "2XL"];
  const kidsSizes = ["3-4 Yrs", "5-6 Yrs", "7-8 Yrs", "9-10 Yrs", "11-12 Yrs"];
  const list = fitKey === "kids" ? kidsSizes : adultSizes;

  customState.size = list[fitKey === "kids" ? 1 : 2]; // default

  sizeContainer.innerHTML = list.map((s, i) => `
    <button class="size-pill ${s === customState.size ? 'active' : ''}" onclick="setCustomSize('${s}', this)">${s}</button>
  `).join("");
}

function setCustomSize(size, el) {
  customState.size = size;
  const pills = el.parentElement.querySelectorAll(".size-pill");
  pills.forEach(p => p.classList.remove("active"));
  el.classList.add("active");
  const sizeLabel = document.getElementById("selectedCustomSizeLabel");
  if (sizeLabel) sizeLabel.textContent = size;
}

function setCustomColor(colorName, hex, el) {
  customState.colorName = colorName;
  customState.colorHex = hex;

  const dots = el.parentElement.querySelectorAll(".custom-color-swatch");
  dots.forEach(d => d.classList.remove("active"));
  el.classList.add("active");

  const label = document.getElementById("selectedCustomColorLabel");
  if (label) label.textContent = colorName;

  updateMockup();
}

function setCustomPlacement(placement, el) {
  customState.placement = placement;
  const btns = el.parentElement.querySelectorAll(".placement-btn");
  btns.forEach(b => b.classList.remove("active"));
  el.classList.add("active");

  updateMockup();
}

function setCustomTextColor(color, el) {
  customState.textColor = color;
  const dots = el.parentElement.querySelectorAll(".text-color-dot");
  dots.forEach(d => d.classList.remove("active"));
  el.classList.add("active");

  updateMockup();
}

function handleArtworkUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    customState.customImageSrc = e.target.result;
    
    // Show preview thumbnail in options
    const thumb = document.getElementById("uploadedThumbPreview");
    if (thumb) {
      thumb.src = e.target.result;
      thumb.style.display = "block";
    }

    updateMockup();
  };
  reader.readAsDataURL(file);
}

function clearCustomArtwork() {
  customState.customImageSrc = null;
  const fileInput = document.getElementById("customArtworkUpload");
  if (fileInput) fileInput.value = "";
  const thumb = document.getElementById("uploadedThumbPreview");
  if (thumb) thumb.style.display = "none";
  updateMockup();
}

function updatePriceDisplay() {
  const config = getStoreConfig();
  const info = CUSTOM_FIT_PRICES[customState.fit];
  const priceEl = document.getElementById("customStudioPrice");
  const gsmEl = document.getElementById("customStudioGsm");

  if (priceEl) priceEl.textContent = `${config.currency} ${info.price.toLocaleString()}`;
  if (gsmEl) gsmEl.textContent = `${info.name} • ${info.gsm}`;
}

// Live Mockup Renderer
function updateMockup() {
  const shirtPath = document.getElementById("customShirtPath");
  const collarPath = document.getElementById("customCollarPath");
  const printGuide = document.getElementById("printGuide");
  const printGuideLabel = document.getElementById("printGuideLabel");
  const livePrintOverlay = document.getElementById("livePrintOverlay");

  if (!shirtPath || !livePrintOverlay) return;

  // 1. Shirt Color
  shirtPath.setAttribute("fill", customState.colorHex);
  if (collarPath) {
    collarPath.setAttribute("fill", customState.colorHex === "#f8fafc" ? "#e2e8f0" : "#090c10");
  }

  // 2. Placement guide adjustment
  let guideX = 175, guideY = 150, guideW = 150, guideH = 200;
  let guideText = "CENTER CHEST";

  if (customState.placement === "pocket") {
    guideX = 190;
    guideY = 160;
    guideW = 55;
    guideH = 55;
    guideText = "LEFT POCKET CREST";
  } else if (customState.placement === "back") {
    guideX = 160;
    guideY = 130;
    guideW = 180;
    guideH = 240;
    guideText = "OVERSIZED BACK PRINT";
  }

  if (printGuide) {
    printGuide.setAttribute("x", guideX);
    printGuide.setAttribute("y", guideY);
    printGuide.setAttribute("width", guideW);
    printGuide.setAttribute("height", guideH);
  }
  if (printGuideLabel) {
    printGuideLabel.setAttribute("x", guideX + (guideW / 2));
    printGuideLabel.setAttribute("y", guideY - 8);
    printGuideLabel.textContent = `PRINT AREA (${guideText})`;
  }

  // 3. Render content inside printable overlay
  let contentHtml = "";

  if (customState.customImageSrc) {
    contentHtml += `
      <img src="${customState.customImageSrc}" alt="Custom Print" style="max-width: 90%; max-height: 85%; object-fit: contain; filter: drop-shadow(0 2px 8px rgba(0,0,0,0.5));">
    `;
  }

  if (customState.customText) {
    contentHtml += `
      <div style="font-family:'Outfit', sans-serif; font-size: ${customState.placement === 'pocket' ? '10px' : '18px'}; font-weight: 800; color: ${customState.textColor}; text-transform: uppercase; letter-spacing: 2px; text-shadow: 0 0 10px rgba(0,229,255,0.4); text-align: center; max-width: 90%; word-break: break-word; margin-top: 6px;">
        ${escapeHtml(customState.customText)}
      </div>
    `;
  }

  if (!customState.customImageSrc && !customState.customText) {
    contentHtml = `
      <div style="text-align:center; color: var(--ice-blue); opacity: 0.8; font-size: 0.8rem; font-weight: 600; padding: 10px;">
        <i class="fa fa-sparkles" style="font-size:1.4rem; display:block; margin-bottom:4px;"></i>
        Your Artwork / Text Here
      </div>
    `;
  }

  // Position live overlay box based on placement
  livePrintOverlay.style.left = `${(guideX / 500) * 100}%`;
  livePrintOverlay.style.top = `${(guideY / 550) * 100}%`;
  livePrintOverlay.style.width = `${(guideW / 500) * 100}%`;
  livePrintOverlay.style.height = `${(guideH / 550) * 100}%`;
  livePrintOverlay.innerHTML = contentHtml;
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// 📲 WhatsApp Order for Custom T-Shirt
function orderCustomViaWhatsApp() {
  const config = getStoreConfig();
  const fitInfo = CUSTOM_FIT_PRICES[customState.fit];

  let msg = `🐉 *CUSTOM T-SHIRT ORDER - FURY & LIGHT* 🐉\n`;
  msg += `-----------------------------------------------\n`;
  msg += `• *Style / Fit:* ${fitInfo.name}\n`;
  msg += `• *Fabric:* ${fitInfo.gsm}\n`;
  msg += `• *Base Color:* ${customState.colorName}\n`;
  msg += `• *Size:* ${customState.size}\n`;
  msg += `• *Print Placement:* ${customState.placement.toUpperCase()}\n`;
  
  if (customState.customText) {
    msg += `• *Custom Text:* "${customState.customText}" (Color: ${customState.textColor})\n`;
  }
  if (customState.customImageSrc) {
    msg += `• *Artwork / Logo:* (Attached image in chat / ready to send)\n`;
  }

  msg += `• *Price:* ${config.currency} ${fitInfo.price.toLocaleString()}\n`;
  msg += `-----------------------------------------------\n`;
  msg += `📍 *Customer Delivery Info:*\n`;
  msg += `Name: \n`;
  msg += `Phone: \n`;
  msg += `Address: \n\n`;
  msg += `I am sending my custom artwork / idea now. Please confirm print proof!`;

  window.open(`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
}

function addCustomToCart() {
  const fitInfo = CUSTOM_FIT_PRICES[customState.fit];
  const customItem = {
    id: `custom-${Date.now()}`,
    name: `Custom Tee: ${fitInfo.name}`,
    price: fitInfo.price,
    image: "assets/images/products/tshirt-mockup-blank.svg",
    size: customState.size,
    color: `${customState.colorName} (${customState.placement.toUpperCase()})`,
    quantity: 1
  };

  cart.push(customItem);
  saveCart();
  openCartDrawer();
  showToast("Custom design added to cart!");
}

document.addEventListener("DOMContentLoaded", initCustomStudio);
