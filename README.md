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
- **API & Storage**: Node.js + SQLite
- **Icons**: Lucide React
- **Effects**: Canvas Confetti
- **Styling**: Vanilla CSS Design System with CSS variables and responsive glassmorphism

## 🚀 Local Setup

```bash
npm install
npm run dev
```

This starts:

- the Vite frontend on http://localhost:5173
- the SQLite API on http://localhost:4000

Health check:

```bash
curl http://localhost:4000/api/health
```

## 📦 GitHub Live / GitHub Pages

GitHub Pages only supports static frontend hosting. A SQLite database cannot run directly on GitHub Pages because the platform does not execute a Node.js backend.

For static live hosting, you can deploy the built frontend with:

```bash
npm run build
npm run deploy
```

The app is configured with a relative base path (`./`) so it works as a static Pages site. For persistent data, the SQLite API should run on a host like Render, Railway, or your own VPS instead of GitHub Pages.

## 🗄️ SQLite / firestore firebase


The project now includes a local SQLite database in `data/novacommerce.db` and a lightweight API at `server/index.js`.

Available endpoints:

- `GET /api/health`
- `GET /api/products`
- `GET /api/orders`
- `POST /api/orders`

## 🧪 Production Build

```bash
npm run build
```
