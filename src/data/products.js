export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Sparkles', count: 12 },
  { id: 'audio', name: 'Audio & Tech', icon: 'Headphones', count: 3 },
  { id: 'wearables', name: 'Smart Wearables', icon: 'Watch', count: 2 },
  { id: 'fashion', name: 'Minimalist Fashion', icon: 'Shirt', count: 2 },
  { id: 'living', name: 'Modern Living', icon: 'Home', count: 2 },
  { id: 'timepieces', name: 'Timepieces & EDC', icon: 'Compass', count: 1 },
  { id: 'gaming', name: 'Gaming & Desk', icon: 'Gamepad2', count: 2 }
];

export const PRODUCTS = [
  {
    id: 'prod-01',
    name: 'Quantum Pulse ANC Wireless Studio Headphones',
    tagline: 'Flagship Active Noise Cancelling with Spatial Audio & 45h Battery',
    category: 'audio',
    categoryName: 'Audio & Tech',
    price: 349,
    originalPrice: 429,
    discountPercent: 19,
    rating: 4.9,
    reviewCount: 284,
    badge: 'BESTSELLER',
    badgeType: 'gold',
    inStock: true,
    stockCount: 8,
    isFeatured: true,
    isFlashDeal: true,
    colors: [
      { name: 'Matte Obsidian', hex: '#1e2022', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80' },
      { name: 'Silver Mist', hex: '#d4d8dd', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80' },
      { name: 'Desert Sand', hex: '#d2b48c', image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80' }
    ],
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80'
    ],
    description: 'Immerse yourself in pure studio fidelity with custom 45mm titanium composite drivers. Proprietary Adaptive Noise Cancellation calibrates 50,000 times per second for silence, while high-res LDAC streaming reproduces every nuance of your favorite tracks.',
    features: [
      'Custom 45mm Titanium-Coated Drivers',
      'Adaptive Hybrid Noise Cancellation (-45dB)',
      '45-Hour Battery Life with Fast Charge (10 min = 5 hours)',
      'Multipoint Bluetooth 5.4 with LDAC & aptX Lossless',
      'Memory Foam Ear cushions with aerospace aluminum frame'
    ],
    specs: {
      'Driver Size': '45mm Titanium',
      'Frequency Response': '5Hz - 42,000Hz',
      'Battery Life': '45 Hours (ANC On)',
      'Weight': '258g',
      'Connectivity': 'Bluetooth 5.4 / 3.5mm / USB-C Lossless Audio'
    },
    reviews: [
      { id: 'r1', author: 'Marcus Vance', rating: 5, date: '2 days ago', title: 'Studio quality silence and punchy bass', comment: 'The noise cancellation completely blocks airplane drone. Battery easily lasted me a full 4-day trip without a single recharge.' },
      { id: 'r2', author: 'Elena Rostova', rating: 5, date: '1 week ago', title: 'Worth every penny', comment: 'Super comfortable for 8+ hour coding sessions. The titanium build feels incredibly luxury and durable.' }
    ]
  },
  {
    id: 'prod-02',
    name: 'Chronos Apex Titanium Sapphire Smartwatch',
    tagline: 'Grade 5 Aerospace Titanium, 14-Day Battery & Advanced ECG Sensor',
    category: 'wearables',
    categoryName: 'Smart Wearables',
    price: 499,
    originalPrice: 599,
    discountPercent: 17,
    rating: 4.8,
    reviewCount: 198,
    badge: 'HOT DEAL',
    badgeType: 'accent',
    inStock: true,
    stockCount: 5,
    isFeatured: true,
    isFlashDeal: true,
    colors: [
      { name: 'Titanium Slate', hex: '#4a5568', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80' },
      { name: 'Midnight Onyx', hex: '#1a202c', image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80' }
    ],
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80'
    ],
    description: 'Precision engineered from aerospace Grade 5 titanium with an unscratchable sapphire crystal face. Features continuous heart-rate tracking, medical-grade ECG, blood oxygen, dual-band GPS, and 100m water resistance.',
    features: [
      'Grade 5 Titanium Bezel & Sapphire Glass',
      '1.43” AMOLED Ultra-Bright Display (2,000 nits)',
      '14-Day Battery Life on a Single Charge',
      'Dual-Frequency Multi-GNSS Global Positioning',
      '10 ATM / 100-Meter Water Resistance rating'
    ],
    specs: {
      'Case Material': 'Grade 5 Titanium',
      'Display': '1.43” Always-On AMOLED',
      'Water Resistance': '10 ATM (100 meters)',
      'Battery': '14 Days standard / 36h full GPS',
      'Sensors': 'ECG, SpO2, Optical Heart Rate, Altimeter'
    },
    reviews: [
      { id: 'r3', author: 'Dr. Jason Lee', rating: 5, date: '3 days ago', title: 'Top tier build and battery', comment: 'Coming from a watch that I had to charge daily, this lasting 2 weeks is a revelation. The titanium finish is sleek.' }
    ]
  },
  {
    id: 'prod-03',
    name: 'Vanguard Minimalist Italian Leather Backpack',
    tagline: 'Full-Grain Tuscan Leather with Water-Repellent Nano Coating & Tech Vault',
    category: 'fashion',
    categoryName: 'Minimalist Fashion',
    price: 289,
    originalPrice: 340,
    discountPercent: 15,
    rating: 4.9,
    reviewCount: 142,
    badge: 'NEW',
    badgeType: 'emerald',
    inStock: true,
    stockCount: 12,
    isFeatured: true,
    isFlashDeal: false,
    colors: [
      { name: 'Midnight Charcoal', hex: '#2d3748', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80' },
      { name: 'Cognac Saddle', hex: '#8b4513', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80' }
    ],
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80'
    ],
    description: 'Handcrafted in Florence from certified Tuscan vegetable-tanned full grain leather. Features dedicated padded compartments for a 16” MacBook Pro, iPad, passport pocket, and magnetic Fidlock hardware.',
    features: [
      'Full-Grain Vegetable-Tanned Tuscan Leather',
      'Fidlock Magnetic Fast-Release German Hardware',
      'Shockproof 16” Laptop & Tablet Tech Sleeve',
      'Hidden RFID-blocking passport & wallet pocket',
      'Luggage pass-through strap for seamless travel'
    ],
    specs: {
      'Capacity': '22 Liters',
      'Dimensions': '45 x 30 x 15 cm',
      'Weight': '1.1 kg',
      'Laptop Fit': 'Up to 16-inch MacBook Pro / Dell XPS'
    },
    reviews: [
      { id: 'r4', author: 'Julian Thorne', rating: 5, date: '5 days ago', title: 'Exquisite leather craft', comment: 'The aroma of the leather and the smooth zipper action is unmatched. Perfect for work and travel.' }
    ]
  },
  {
    id: 'prod-04',
    name: 'CyberBlade Magnetic Gasket Mechanical Keyboard',
    tagline: 'CNC Anodized Aluminum Body, Hot-Swap Magnetic Switches & OLED Screen',
    category: 'gaming',
    categoryName: 'Gaming & Desk',
    price: 219,
    originalPrice: 269,
    discountPercent: 18,
    rating: 4.9,
    reviewCount: 310,
    badge: 'POPULAR',
    badgeType: 'purple',
    inStock: true,
    stockCount: 9,
    isFeatured: true,
    isFlashDeal: true,
    colors: [
      { name: 'Space Gray', hex: '#4a5568', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80' },
      { name: 'Cyberpunk Neon', hex: '#805ad5', image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&q=80' }
    ],
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&q=80',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80'
    ],
    description: 'The ultimate typing instrument. Built with high-precision CNC machined aluminum, 5-layer sound-dampening acoustic foam, and rapid-trigger magnetic Hall effect switches with 0.1mm adjustable actuation.',
    features: [
      'Hall Effect Magnetic Switches with Rapid Trigger (0.1mm - 4.0mm)',
      'Gasket Mount Design with 5-Layer Poron Foam Cushioning',
      'Interactive Custom OLED Screen for GIFs & telemetry',
      'Tri-Mode Connectivity: 2.4GHz Low-Latency, BT 5.3, Type-C',
      'South-Facing Per-Key RGB with 24 Dynamic Lighting Modes'
    ],
    specs: {
      'Layout': '75% Compact (82 Keys + Rotary Dial)',
      'Switch Type': 'Magnetic Hall Effect Linear',
      'Battery': '8,000 mAh Rechargeable (Up to 200h)',
      'Weight': '1.45 kg Solid Metal'
    },
    reviews: [
      { id: 'r5', author: 'Liam Wright', rating: 5, date: '1 day ago', title: 'Deep creamy thock sound right out of the box', comment: 'Zero ping, the stabilizers are perfectly factory lubed. Rapid trigger is super responsive.' }
    ]
  },
  {
    id: 'prod-05',
    name: 'Orbit Magnetic Levitation Ambient Warm Lamp',
    tagline: 'Floating Anti-Gravity Orb with Touch Dimmable Golden Spectrum',
    category: 'living',
    categoryName: 'Modern Living',
    price: 159,
    originalPrice: 199,
    discountPercent: 20,
    rating: 4.7,
    reviewCount: 95,
    badge: 'INNOVATION',
    badgeType: 'accent',
    inStock: true,
    stockCount: 15,
    isFeatured: false,
    isFlashDeal: false,
    colors: [
      { name: 'Walnut & Brass', hex: '#654321', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80' },
      { name: 'Obsidian Marble', hex: '#1a202c', image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80' }
    ],
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80'
    ],
    description: 'A conversation piece that defies gravity. The luminous sphere floats seamlessly mid-air powered by magnetic induction, casting a soothing 2700K golden aura across your living space or workspace.',
    features: [
      'True Magnetic Levitation & Wireless Induction Power',
      'Capacitive Touch Base for Stepless Brightness Control',
      'Warm 2700K Circadian-Friendly Relaxing Light Spectrum',
      'Solid FSC-Certified Walnut Wooden Base',
      'Automatic failsafe magnetic lock during power cut'
    ],
    specs: {
      'Base Material': 'FSC Solid Walnut & Aerospace Aluminum',
      'Color Temperature': '2200K - 3200K Adjustable',
      'Power Source': '12V DC Adapter Included',
      'Levitation Height': '15mm Air Gap'
    },
    reviews: [
      { id: 'r6', author: 'Sophia Chang', rating: 5, date: '4 days ago', title: 'Mesmerizing to watch', comment: 'Everyone who walks into my apartment asks where I got this. The floating orb creates such a soothing atmosphere.' }
    ]
  },
  {
    id: 'prod-06',
    name: 'Meridian Skeleton Automatic Mechanical Timepiece',
    tagline: 'Hand-Finished 28,800 VPH Movement with Double Curved Sapphire Glass',
    category: 'timepieces',
    categoryName: 'Timepieces & EDC',
    price: 680,
    originalPrice: 850,
    discountPercent: 20,
    rating: 5.0,
    reviewCount: 78,
    badge: 'LUXURY',
    badgeType: 'gold',
    inStock: true,
    stockCount: 3,
    isFeatured: true,
    isFlashDeal: false,
    colors: [
      { name: 'Brushed Platinum', hex: '#e2e8f0', image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80' },
      { name: 'Rose Gold Accent', hex: '#b76e79', image: 'https://images.unsplash.com/photo-1547996160-71dfa63582d8?w=800&q=80' }
    ],
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80',
      'https://images.unsplash.com/photo-1547996160-71dfa63582d8?w=800&q=80'
    ],
    description: 'An open-heart window into the art of horology. Featuring a custom skeletonized self-winding mechanical calibre with 42-hour power reserve, Geneva stripes, blued screws, and a top-grain hand-stitched strap.',
    features: [
      '24-Jewel Self-Winding Automatic Calibre (28,800 BPH)',
      'Double-Domed Anti-Reflective Sapphire Crystal',
      'Exhibition Glass Caseback with Skeleton Rotor',
      '316L Surgical Grade Stainless Steel Case',
      '50m Water Resistance'
    ],
    specs: {
      'Movement': 'Automatic Mechanical (Self-Winding)',
      'Case Diameter': '41mm',
      'Thickness': '11.2mm',
      'Power Reserve': '42 Hours'
    },
    reviews: [
      { id: 'r7', author: 'Arthur Pendelton', rating: 5, date: '1 week ago', title: 'Museum quality mechanical piece', comment: 'The level of finish on the skeletonized bridges is striking. Keeps accurate time within seconds.' }
    ]
  },
  {
    id: 'prod-07',
    name: 'Nova Pods Pro 3 Transparent Wireless Earbuds',
    tagline: 'Custom Bio-Cellulose Drivers, 38h Battery & Ultra-Low Latency Gaming Mode',
    category: 'audio',
    categoryName: 'Audio & Tech',
    price: 179,
    originalPrice: 219,
    discountPercent: 18,
    rating: 4.8,
    reviewCount: 420,
    badge: 'TRENDING',
    badgeType: 'purple',
    inStock: true,
    stockCount: 22,
    isFeatured: false,
    isFlashDeal: true,
    colors: [
      { name: 'Crystal Clear', hex: '#edf2f7', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80' },
      { name: 'Smoked Amber', hex: '#d69e2e', image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80' }
    ],
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80',
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80'
    ],
    description: 'Iconic transparent architectural design revealing the intricate circuit board and acoustic chamber. Featuring 11.6mm bio-cellulose drivers, 3 high-def microphones per earbud for crystal calls, and wireless Qi charging.',
    features: [
      'Architectural Transparent Enclosure with Smoked Finish',
      'Adaptive 40dB Active Noise Cancellation',
      '38 Hours Total Playtime with Fast Wireless Charging Case',
      'Clear Voice Technology with 6 Beamforming Microphones',
      'IP54 Sweat & Dust Resistance for workouts'
    ],
    specs: {
      'Driver': '11.6mm Custom Dynamic',
      'Battery': '8.5h per bud + 30h in case',
      'Weight': '4.5g per earbud',
      'Waterproof': 'IP54 rated'
    },
    reviews: [
      { id: 'r8', author: 'Chloe Brooks', rating: 5, date: '3 days ago', title: 'Design is futuristic and sound is crisp', comment: 'The fit in ear is so light I forget I am wearing them. Bass is deep and vocal clarity is clear.' }
    ]
  },
  {
    id: 'prod-08',
    name: 'Nebula Smart Health & Recovery Ring Gen 4',
    tagline: 'Titanium Ceramic Body with Medical Grade Temperature & Sleep Analytics',
    category: 'wearables',
    categoryName: 'Smart Wearables',
    price: 299,
    originalPrice: 349,
    discountPercent: 14,
    rating: 4.7,
    reviewCount: 165,
    badge: 'NEW',
    badgeType: 'emerald',
    inStock: true,
    stockCount: 11,
    isFeatured: false,
    isFlashDeal: false,
    colors: [
      { name: 'Stealth Matte Black', hex: '#171923', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80' },
      { name: 'Brushed Gold', hex: '#d69e2e', image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&q=80' }
    ],
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&q=80'
    ],
    description: 'Discreet, ultra-lightweight titanium biometric ring that monitors your body round the clock. Measures sleep architecture, continuous heart rate variability (HRV), skin temperature deviations, and readiness score.',
    features: [
      'Grade 5 Medical-Grade Titanium Inner Resin Coating',
      'Weightless 4-gram form factor with 7-Day Battery Life',
      'Precision Dual Photoplethysmography (PPG) Sensors',
      '100m Waterproof (Safe for swimming & saunas)',
      'Zero monthly subscription required — Lifetime App Access'
    ],
    specs: {
      'Weight': '4.2 grams',
      'Battery': '7 Days continuous tracking',
      'Water Rating': '100 Meters / 10 ATM',
      'Sizes': 'US 6 through 13 available'
    },
    reviews: [
      { id: 'r9', author: 'Derek Fox', rating: 5, date: '2 weeks ago', title: 'Replaced my bulky smartwatch', comment: 'Sleeping with this ring is so comfortable. The sleep phase breakdown is very detailed.' }
    ]
  },
  {
    id: 'prod-09',
    name: 'Solstice Polarized Titanium Aviator Sunglasses',
    tagline: 'Ultralight Japanese Beta-Titanium Frame with Carl Zeiss Anti-Glare Lenses',
    category: 'fashion',
    categoryName: 'Minimalist Fashion',
    price: 185,
    originalPrice: 220,
    discountPercent: 16,
    rating: 4.9,
    reviewCount: 89,
    badge: 'SUMMER',
    badgeType: 'accent',
    inStock: true,
    stockCount: 7,
    isFeatured: false,
    isFlashDeal: false,
    colors: [
      { name: 'Matte Gunmetal', hex: '#4a5568', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80' },
      { name: 'Rose Gold Mirror', hex: '#b76e79', image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800&q=80' }
    ],
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80',
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800&q=80'
    ],
    description: 'Precision handcrafted in Sabae, Japan. Engineered from flexible aerospace beta-titanium weighing only 18 grams. Equipped with 100% UV400 polarized Zeiss lenses that eliminate harsh glare while enhancing natural contrast.',
    features: [
      'Ultralight 18-gram Japanese Beta-Titanium Structure',
      'Carl Zeiss Category 3 Polarized Lenses',
      'Hydrophobic & Oleophobic Anti-Smudge Coating',
      'Self-adjusting soft silicone nose pads',
      'Includes genuine leather magnetic hard case'
    ],
    specs: {
      'Lens Width': '58mm',
      'Bridge': '15mm',
      'Temple Length': '145mm',
      'UV Protection': 'UV400 Category 3'
    },
    reviews: [
      { id: 'r10', author: 'Gabriel Silva', rating: 5, date: '1 month ago', title: 'Pure luxury feel', comment: 'Comfortable to wear all day while driving. The optical clarity from the lenses is top quality.' }
    ]
  },
  {
    id: 'prod-10',
    name: 'Phantom Pro 8000Hz Ultra-Light Gaming Mouse',
    tagline: '42g Magnesium Alloy Exoskeleton with 36,000 DPI Optical Sensor',
    category: 'gaming',
    categoryName: 'Gaming & Desk',
    price: 149,
    originalPrice: 179,
    discountPercent: 17,
    rating: 4.8,
    reviewCount: 215,
    badge: 'PRO ESPORTS',
    badgeType: 'purple',
    inStock: true,
    stockCount: 14,
    isFeatured: false,
    isFlashDeal: true,
    colors: [
      { name: 'Anodized Silver', hex: '#cbd5e0', image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80' },
      { name: 'Matte Obsidian', hex: '#1a202c', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80' }
    ],
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80'
    ],
    description: 'Forged from ultralight magnesium alloy skeleton. Delivering true 8,000Hz wireless polling rate (0.125ms response time) paired with optical switches rated for 90 million crisp clicks.',
    features: [
      'Magnesium Alloy Exoskeleton (42 grams weight)',
      'True 8,000Hz Wireless Polling Rate for zero latency',
      'PAW3950 Optical Sensor (36,000 DPI, 750 IPS tracking)',
      'Optical Micro-Switches with zero debounce delay',
      '100% Pure Virgin Grade PTFE Glide Skates'
    ],
    specs: {
      'Sensor': 'PAW3950 36K DPI',
      'Polling Rate': 'Up to 8,000Hz Wireless',
      'Weight': '42 Grams',
      'Battery Life': '90 Hours at 1,000Hz'
    },
    reviews: [
      { id: 'r11', author: 'Tyler Knox', rating: 5, date: '6 days ago', title: 'Insanely light and instant clicks', comment: 'Aim tracking feels instant. The 8k polling rate on my monitor is buttery smooth.' }
    ]
  },
  {
    id: 'prod-11',
    name: 'Arc Dual-Motor Ergonomic Solid Walnut Standing Desk',
    tagline: 'Solid American Walnut with Quiet Triple-Stage Dual Motors & Memory Presets',
    category: 'living',
    categoryName: 'Modern Living',
    price: 799,
    originalPrice: 950,
    discountPercent: 16,
    rating: 4.9,
    reviewCount: 112,
    badge: 'BESTSELLER',
    badgeType: 'gold',
    inStock: true,
    stockCount: 4,
    isFeatured: true,
    isFlashDeal: false,
    colors: [
      { name: 'Natural American Walnut', hex: '#5c4033', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80' },
      { name: 'Nordic Oak & White', hex: '#d2b48c', image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800&q=80' }
    ],
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80',
      'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800&q=80'
    ],
    description: 'Crafted from solid sustainable American Walnut hardwood. Features whisper-quiet (<42dB) dual motors capable of lifting 350 lbs with anti-collision safety sensors and an integrated wireless charger recessed into the wood.',
    features: [
      '100% Solid Natural American Walnut Hardwood Top',
      'Dual High-Torque Motors with 350 lb Lift Capacity',
      'Digital OLED Handset with 4 Memory Presets & Anti-Collision',
      'Built-in Recessed Fast Wireless Qi Charger on Desktop',
      'Complete Under-Desk Cable Management Raceway Tray'
    ],
    specs: {
      'Top Dimensions': '60” x 30” (152 x 76 cm)',
      'Height Range': '24.5” to 50.2” (62 to 127 cm)',
      'Motor Sound': '<42 Decibels',
      'Warranty': '10-Year Frame & Motor Guarantee'
    },
    reviews: [
      { id: 'r12', author: 'Nathalie Gomez', rating: 5, date: '2 weeks ago', title: 'Sturdiest desk I have owned', comment: 'Zero wobble even at maximum standing height with dual monitors mounted.' }
    ]
  },
  {
    id: 'prod-12',
    name: 'Hyperion Audiophile Vacuum Tube Desktop Amplifier',
    tagline: 'Hand-Selected 6J1 Tubes with ESS Sabre 32-Bit/384kHz Reference DAC',
    category: 'audio',
    categoryName: 'Audio & Tech',
    price: 320,
    originalPrice: 380,
    discountPercent: 16,
    rating: 4.9,
    reviewCount: 94,
    badge: 'AUDIOPHILE',
    badgeType: 'gold',
    inStock: true,
    stockCount: 6,
    isFeatured: false,
    isFlashDeal: false,
    colors: [
      { name: 'Brushed Charcoal', hex: '#2d3748', image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80' }
    ],
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80'
    ],
    description: 'Blends vintage tube warmth with modern high-resolution digital clarity. Dual matched vacuum tubes provide rich harmonic depth for headphones up to 600 ohms.',
    features: [
      'Dual Matched 6J1 Warm Harmonic Vacuum Tubes',
      'ESS Sabre ES9038Q2M 32-Bit/384kHz DSD512 DAC',
      'Balanced 4.4mm Pentaconn + 6.35mm Gold Plated Outputs',
      'Oversized CNC Machined Analog Volume Potentiometer',
      'Supports USB-C, Optical, Coaxial, and aptX HD Bluetooth'
    ],
    specs: {
      'Power Output': '2000mW @ 32 Ohms / 350mW @ 300 Ohms',
      'THD+N': '<0.0015%',
      'SNR': '120 dB',
      'Weight': '1.2 kg'
    },
    reviews: [
      { id: 'r13', author: 'Oliver Reed', rating: 5, date: '3 weeks ago', title: 'Breathed new life into my headphones', comment: 'Adds lush vocal texture and wide soundstage without losing crisp treble details. The warm tube glow at night is wonderful.' }
    ]
  }
];
