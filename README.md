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
- **Data Storage**: Firebase Firestore
- **Icons**: Lucide React
- **Effects**: Canvas Confetti
- **Styling**: Vanilla CSS Design System with CSS variables and responsive glassmorphism

## 🚀 Local Setup

```bash
npm install
npm run dev
```

This starts the Vite frontend on http://localhost:5173. The app loads its catalog and reviews from Firestore, with the bundled catalog as a fallback.

## 🔥 Firestore Setup

The app reads products from `products`, reads and writes reviews in `reviews`, and writes checkout orders to `orders`. Firebase web configuration is in `src/firebase.js`; it is a public client identifier, not an admin credential. Protect Firestore with rules.

To upload the bundled catalog, create a Firebase service-account key and save it outside this repository. Never commit or share this private key. In PowerShell, set its path and run the importer:

```powershell
$env:GOOGLE_APPLICATION_CREDENTIALS = 'C:\path\outside\repository\firebase-service-account.json'
npm run seed:firestore
```

The importer writes each item from `src/data/products.js` to `products` using its existing product ID. The Admin SDK bypasses Firestore rules and is only used by this local import script.

Example rules for public catalog/review reads and restricted creates; review and order reads remain disabled because this demo does not have real Firebase Authentication:

```text
rules_version = '2';
service cloud.firestore {
	match /databases/{database}/documents {
		match /products/{productId} {
			allow read: if true;
			allow write: if false;
		}
		match /reviews/{reviewId} {
			allow read: if true;
			allow create: if request.resource.data.productId is string
				&& request.resource.data.rating is number
				&& request.resource.data.rating >= 1
				&& request.resource.data.rating <= 5
				&& request.resource.data.title is string
				&& request.resource.data.comment is string;
			allow update, delete: if false;
		}
		match /orders/{orderId} {
			allow create: if request.resource.data.orderId is string
				&& request.resource.data.shippingAddress is map
				&& request.resource.data.total is number;
			allow read, update, delete: if false;
		}
	}
}
```

Checkout stores shipping details and order contents in Firestore. Add Firebase Authentication and ownership-based rules before using this for real customer accounts or order history.

## 📦 GitHub Live / GitHub Pages

GitHub Pages hosts the frontend at https://ajinkyaaas.github.io/NOV/. Firestore stores shared catalog, reviews, and orders independently of GitHub Pages. Cart and account demo state remain local to each browser.

The app is configured with a relative base path (`./`) for the `/NOV/` project path. Deploy frontend updates with:

```bash
npm run build
npm run deploy
```

## 🧪 Production Build

```bash
npm run build
```
