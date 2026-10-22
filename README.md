# 🐉 FURY & LIGHT - Streetwear & Custom T-Shirt Website

Welcome to the official website of **Fury & Light**!
This website is crafted with modern **HTML5, CSS3, and JavaScript**, featuring an obsidian black and glowing **Ice Blue** aesthetic inspired by the Black & White dragon logo.

---

## 🌟 Key Features (ප්‍රධාන අංග)

1. **Multiple Pages (පිටු කිහිපයක්)**:
   - `index.html` - Home Page (Hero banner with dragon glow, Quality pillars, Category showcase, Featured drops, Reviews).
   - `shop.html` - Full Store Catalog (Filter by Baggy, Regular, Kids fits, Color filters, Live search, Price sorting, Quick View).
   - `custom.html` - Interactive Custom T-Shirt Studio (Customers can choose fit, color, upload their own design/artwork, add text, choose print position, and order on WhatsApp).
   - `about.html` - Brand Story (The Dual Dragon ethos), 240 GSM Fabric Specs, and Complete Sizing Charts.
   - `contact.html` - Direct WhatsApp chat, Phone, Email, Social links (Instagram, TikTok, Facebook), and Message Form.
   - `terms.html` - 7-Day Exchange Policy, Island-Wide Delivery info, and Print Washing & Care Guide.

2. **Slide-Out Cart & WhatsApp Direct Ordering**:
   - Customers can add items to their bag with their preferred size and color.
   - **"Complete Order via WhatsApp"** button formats the entire order with items, sizes, colors, and total price into a ready-to-send WhatsApp message!

3. **In-Browser Admin / Visual Store Manager (⚙️ Manage Store)**:
   - Click the **"⚙️ Manage Store"** link at the bottom of any page.
   - Update WhatsApp number, phone, email, social links, and prices directly in your browser.
   - Add new t-shirts with title, price, category, and photo.
   - Click **"Download Updated data.js"** to export your changes anytime!

---

## 🚀 How to Open the Website (වෙබ්සයිට් එක Open කරන ආකාරය)

1. Simply double-click **`index.html`** in your folder.
2. It will open in Google Chrome, Microsoft Edge, or any web browser.
3. No complex installations or servers needed!

---

## ✏️ How to Edit Store Info & Products (තොරතුරු වෙනස් කරන ආකාරය)

You have **two easy ways** to edit your website:

### ක්‍රමය 1: Browser එක තුළදීම වෙනස් කිරීම (Quick Admin Mode)
1. වෙබ්සයිට් එකේ ඕනෑම පිටුවක පහළම (Footer එකේ) ඇති **"⚙️ Manage Store"** බටන් එක ක්ලික් කරන්න.
2. එහි ඇති Form එකෙන් ඔබේ WhatsApp අංකය, Phone අංකය, Email, Instagram/TikTok/FB ලින්ක් වෙනස් කර **"Save"** කරන්න.
3. **"Manage Products & Prices"** ටැබ් එකෙන් මිල ගණන් පහසුවෙන් වෙනස් කළ හැක.
4. **"Add New T-Shirt"** ටැබ් එකෙන් අලුත් T-Shirt ඇතුළත් කළ හැක.
5. ඔබ කළ වෙනස්කම් ස්ථිරව තබා ගැනීමට **"Export & Backup"** ටැබ් එකට ගොස් **"Download Updated data.js"** බටන් එක ඔබා, බාගත වන ගොනුව ඔබේ `assets/js/data.js` වෙනුවට Replace කරන්න.

### ක්‍රමය 2: `assets/js/data.js` File එක කෙලින්ම Edit කිරීම
- `assets/js/data.js` ගොනුව Notepad හෝ VS Code මඟින් Open කරන්න.
- එහි ඉහළින්ම ඔබේ Phone, WhatsApp, Email, Socials පැහැදිලිව සඳහන් කර ඇත. ඔබට කැමති අගයන් ලියා Save කරන්න.
- පහළින් ඇති `DEFAULT_PRODUCTS` ලැයිස්තුවේ T-Shirt වල මිල ගණන් (`price`), නම් (`name`), සහ විස්තර (`description`) පහසුවෙන් වෙනස් කළ හැක.

---

## 📸 Adding Your Own Real Photos (ඔබේ T-Shirt වල සැබෑ Photos දැමීම)

1. ඔබේ T-Shirt වල Photos (JPG හෝ PNG) **`assets/images/products/`** ෆෝල්ඩරයට Copy කරන්න (උදා: `my-shirt-1.jpg`).
2. `assets/js/data.js` ගොනුවේ අදාළ T-Shirt එකේ `image` පේළියට එම නම දෙන්න:
   ```javascript
   image: "assets/images/products/my-shirt-1.jpg"
   ```
3. පිටුව Refresh කළ පසු ඔබේ සැබෑ ඡායාරූපය වෙබ්සයිට් එකේ පෙන්වයි!

---

## 🌐 Free Online Hosting (වෙබ්සයිට් එක Internet එකට දැමීම)

ඔබට මෙම සම්පූර්ණ ෆෝල්ඩරය නොමිලේම අන්තර්ජාලයට එක් කළ හැක:
- **Netlify Drop**: [app.netlify.com/drop](https://app.netlify.com/drop) වෙත ගොස් මෙම `FURY AND LIGHT` ෆෝල්ඩරය Drag and Drop කරන්න. තත්පර 10කින් නොමිලේ Live Website Link එකක් ලැබේ!
- **Vercel** හෝ **GitHub Pages** මඟින්ද පහසුවෙන් නොමිලේ Host කළ හැක.

---
🐉 **FURY & LIGHT** — Express your fire and light!
