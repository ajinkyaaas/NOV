# NovaCommerce 🚀 | High-End Lifestyle & Modern Tech Store

NovaCommerce is an ultra-premium, interactive modern e-commerce web application engineered with React 19, Vite, Lucide Icons, and custom design tokens.

## ✨ Key Features

- **Dynamic Brand & Aesthetics**: Sleek dark/light theme switching, glassmorphic navigation header, fluid gradient accents, and micro-interactions.
- **Smart Catalog & Instant Filter Engine**: Live multi-criteria filtering by category, price slider, minimum customer rating, and real-time search query matching.
- **Interactive Product Modal & Reviews**: Quick-view modal with variant/color selection, high-resolution product carousels, stock indicators, and instant customer review submission.
- **Full-Featured Cart & Slide-out Drawers**: Real-time quantity adjustment, coupon code validation engine (`WELCOME20`, `NOVA50`, `FREESHIP`, `VIP30`), and free-shipping progress tracker.
- **Wishlist & Live Activity Ticker**: Quick one-click save-to-wishlist, interactive wishlist drawer, and real-time simulated buyer activity notification ticker.
- **Checkout Experience**: Full multi-step simulation with real-time interactive credit card preview, auto-fill demo credentials, order tracking timeline, and print receipt capability.

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Catalog Data**: Static product records bundled with the site
- **Icons**: Lucide React
- **Effects**: Canvas Confetti
- **Styling**: Vanilla CSS Design System with CSS variables and responsive glassmorphism

## 🚀 Local Setup

```bash
npm install
npm run dev
```

This starts the Vite frontend on http://localhost:5173. The product catalog is served from the repository's static source files.

## 📦 GitHub Live / GitHub Pages

GitHub Pages hosts the static catalog at https://ajinkyaaas.github.io/NOV/. Changes to catalog content require editing `src/data/products.js`, committing, and deploying. GitHub Pages cannot accept site submissions and write them back into the repository; cart, account, and order state are local to each browser.

The app is configured with a relative base path (`./`) for the `/NOV/` project path. Deploy frontend updates with:

```bash
npm run build
npm run deploy
```

## 🧪 Production Build

```bash
npm run build
```
