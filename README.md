# Metalora Storefront

Premium Cookware & Smart Kitchen Appliances Storefront for **Metalora**.

---

## Features & Configuration

1. **Brand Identity**: Rebranded to **Metalora** with custom vector logo ([metalora-logo.svg](file:///Users/viveksalimath/Downloads/shop.ttkMetalora.com/shop.ttkMetalora.com/media/logo/stores/1/metalora-logo.svg)), updated page title, search placeholders, metadata, and copyright notices.
2. **`package.json`**: Configured with dependencies (`express`, `cors`, `morgan`) and runtime scripts (`npm start`, `npm run dev`).
3. **`server.js`**: An Express server tailored for this storefront:
   - Dynamic URL rewriting in `index.html` (points absolute remote paths to local `/static/`, `/media/`, etc.).
   - Mapped external third-party assets (`fonts.googleapis.com`, `video.lively.li`, `unpkg.com`, `code.ionicframework.com`).
   - Mocked e-commerce AJAX endpoints (`/customer/section/load`, `/ajaxmincart/ajax/crosssellproducts`, `/swatches/ajax/media`).
   - Silenced tracking/beacon 404 console errors (`analytics`, `facebook`, `doubleclick`, `clarity`).
4. **Asset symlinks**: Configured `.renditions` symlink under `media/` to ensure banner and product thumbnails resolve properly.

---

## How to Run

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```

Open your browser and navigate to:
```
http://localhost:3000
```
