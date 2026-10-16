import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS as INITIAL_PRODUCTS } from '../data/products';
import { describeCoupon, VALID_COUPONS } from '../data/coupons';
import confetti from 'canvas-confetti';
import { formatPrice } from '../utils/currency';

const ShopContext = createContext();

const DEMO_USER = {
  id: 'usr_demo_101',
  name: 'Alex Morgan',
  email: 'alex.morgan@novacommerce.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
  phone: '+1 (555) 789-2045',
  membership: 'VIP Member (Tier 2)',
  address: {
    fullName: 'Alex Morgan',
    street: '452 Fremont Street, Apt 8B',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
    country: 'United States'
  },
  savedCards: [
    { last4: '4242', brand: 'Visa', exp: '08/28' }
  ]
};

const INITIAL_DEMO_ORDERS = [
  {
    id: 'NOV-89421',
    date: 'Sep 02, 2026',
    status: 'Delivered',
    trackingNumber: 'TRK-992014882US',
    total: 349,
    items: [
      {
        id: 'prod-01',
        name: 'Quantum Pulse ANC Wireless Studio Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
        price: 349,
        quantity: 1,
        color: 'Matte Obsidian'
      }
    ],
    shippingAddress: {
      fullName: 'Alex Morgan',
      street: '452 Fremont Street, Apt 8B',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105'
    }
  }
];

export const ShopProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('nova_theme') || localStorage.getItem('aura_theme') || 'dark';
  });

  // Currency state
  const [currency, setCurrency] = useState(() => {
    if (localStorage.getItem('nova_currency_inr_migration') !== 'complete') {
      localStorage.setItem('nova_currency_inr_migration', 'complete');
      localStorage.setItem('nova_currency', 'INR');
      return 'INR';
    }
    return localStorage.getItem('nova_currency') || 'INR';
  });

  // Auth & User State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('nova_user') || localStorage.getItem('aura_user');
    if (!saved) return null;
    try {
      const parsed = JSON.parse(saved);
      // If it was the auto-populated demo user, reset to null so visitor starts fresh with Sign Up option
      if (parsed?.id === 'usr_demo_101') {
        localStorage.removeItem('nova_user');
        localStorage.removeItem('aura_user');
        return null;
      }
      return parsed;
    } catch {
      return null;
    }
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('nova_orders') || localStorage.getItem('aura_orders');
    return saved ? JSON.parse(saved) : INITIAL_DEMO_ORDERS;
  });

  // Products with dynamic review support
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  // Cart state
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('nova_cart') || localStorage.getItem('aura_cart');
    return saved ? JSON.parse(saved) : [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        selectedColor: INITIAL_PRODUCTS[0].colors[0]
      }
    ];
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('nova_wishlist') || localStorage.getItem('aura_wishlist');
    return saved ? JSON.parse(saved) : [INITIAL_PRODUCTS[1]];
  });

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('register'); // 'register' | 'login' | 'forgot'
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileActiveTab, setProfileActiveTab] = useState('profile'); // 'profile' | 'orders' | 'addresses'
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderSuccessData, setOrderSuccessData] = useState(null);
  const [trackingOrderData, setTrackingOrderData] = useState(null);

  // Toast notification state
  const [toasts, setToasts] = useState([]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('nova_theme', theme);
  }, [theme]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('nova_currency', currency);
  }, [currency]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('nova_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('nova_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('nova_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('nova_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('nova_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Toast manager
  const addToast = (message, type = 'success', duration = 3500) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Toggle Theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Auth actions
  const openAuthModal = (mode = 'register') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = (email, password) => {
    const loggedUser = {
      id: 'usr_' + Date.now(),
      name: email.split('@')[0].replace('.', ' ').toUpperCase(),
      email: email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
      phone: '+1 (555) 321-7890',
      membership: 'Club Member',
      address: {
        fullName: email.split('@')[0],
        street: '123 Market Street, Suite 400',
        city: 'San Francisco',
        state: 'CA',
        zip: '94103',
        country: 'United States'
      }
    };
    setUser(loggedUser);
    closeAuthModal();
    addToast(`Welcome back, ${loggedUser.name}!`, 'success');
  };

  const loginDemo = (accountName = 'Alex Morgan') => {
    setUser(DEMO_USER);
    closeAuthModal();
    addToast(`Signed in as ${accountName} (Demo Account)`, 'success');
  };

  const signup = (name, email, password) => {
    const newUser = {
      id: 'usr_' + Date.now(),
      name: name,
      email: email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
      phone: '+1 (555) 456-7890',
      membership: 'Standard Member',
      address: {
        fullName: name,
        street: '100 Innovation Way',
        city: 'Austin',
        state: 'TX',
        zip: '78701',
        country: 'United States'
      }
    };
    setUser(newUser);
    closeAuthModal();
    addToast(`Account created successfully! Welcome to NovaCommerce, ${name}.`, 'success');
  };

  const logout = () => {
    setUser(null);
    setIsProfileModalOpen(false);
    addToast('You have been logged out.', 'info');
  };

  const updateProfile = (updatedData) => {
    setUser((prev) => ({
      ...prev,
      ...updatedData
    }));
    addToast('Profile updated successfully!', 'success');
  };

  const openProfileModal = (tab = 'profile') => {
    setProfileActiveTab(tab);
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  // Cart actions
  const addToCart = (product, quantity = 1, selectedColor = null) => {
    const colorToUse = selectedColor || product.colors?.[0] || { name: 'Standard', hex: '#000' };

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedColor?.name === colorToUse.name
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, quantity, selectedColor: colorToUse }];
      }
    });

    addToast(`Added "${product.name}" to cart!`, 'success');
  };

  const updateQuantity = (productId, colorName, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId, colorName);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.product.id === productId && item.selectedColor?.name === colorName) {
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId, colorName) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.product.id === productId && item.selectedColor?.name === colorName)
      )
    );
    addToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist actions
  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      addToast(`Removed "${product.name}" from wishlist`, 'info');
    } else {
      setWishlist((prev) => [...prev, product]);
      addToast(`Added "${product.name}" to wishlist!`, 'success');
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const moveWishlistToCart = (product) => {
    addToCart(product, 1, product.colors?.[0]);
    setWishlist((prev) => prev.filter((item) => item.id !== product.id));
  };

  // Coupon actions
  const applyCoupon = (codeStr) => {
    const cleanCode = codeStr.trim().toUpperCase();
    const found = VALID_COUPONS.find((c) => c.code === cleanCode);

    if (!found) {
      addToast(`Coupon "${codeStr}" is invalid or expired.`, 'error');
      return false;
    }

    if (found.minSpend && cartSubtotal < found.minSpend) {
      addToast(`Minimum spend of ${formatPrice(found.minSpend, currency)} required for this coupon.`, 'warning');
      return false;
    }

    setAppliedCoupon(found);
    addToast(`Coupon "${found.code}" applied! ${describeCoupon(found, currency)}`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon removed', 'info');
  };

  // Product reviews
  const addProductReview = (productId, review) => {
    const reviewData = {
      id: 'rev_' + Date.now(),
      author: user ? user.name : 'Verified Customer',
      rating: review.rating,
      date: 'Just now',
      title: review.title,
      comment: review.comment
    };

    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updatedReviews = [
            reviewData,
            ...(p.reviews || [])
          ];
          const newAvg = (
            updatedReviews.reduce((acc, curr) => acc + curr.rating, 0) / updatedReviews.length
          ).toFixed(1);

          return {
            ...p,
            rating: parseFloat(newAvg),
            reviewCount: (p.reviewCount || 0) + 1,
            reviews: updatedReviews
          };
        }
        return p;
      })
    );
    addToast('Thank you! Your review has been submitted.', 'success');
  };

  // Order Placement
  const placeOrder = async (orderInfo) => {
    const orderId = 'NOV-' + Math.floor(100000 + Math.random() * 900000);
    const trackingNo = 'TRK-' + Math.floor(100000000 + Math.random() * 900000000) + 'US';

    const newOrder = {
      id: orderId,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Processing',
      trackingNumber: trackingNo,
      items: cart.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        color: item.selectedColor?.name || 'Standard',
        image: item.selectedColor?.image || item.product.image
      })),
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shipping: orderInfo.shippingCost,
      shippingMethod: orderInfo.shippingMethod,
      tax: cartTax,
      total: cartTotal,
      currency: currency,
      shippingAddress: orderInfo.shippingAddress,
      paymentMethod: orderInfo.paymentMethod,
      couponUsed: appliedCoupon ? appliedCoupon.code : null
    };

    setOrders((prev) => [newOrder, ...prev]);

    clearCart();
    setAppliedCoupon(null);
    setIsCheckoutOpen(false);
    setOrderSuccessData(newOrder);

    // Confetti burst
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 300);
    } catch (e) {
      console.log('Confetti effect');
    }

    addToast(`Order ${orderId} placed successfully!`, 'success');
  };

  // Cart Computations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const freeShippingThreshold = 150;
  const isFreeShipping = cartSubtotal >= freeShippingThreshold || appliedCoupon?.type === 'shipping';
  const defaultShippingCost = isFreeShipping ? 0 : (cart.length > 0 ? 15 : 0);

  let cartDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percent') {
      cartDiscount = (cartSubtotal * appliedCoupon.value) / 100;
    } else if (appliedCoupon.type === 'fixed') {
      cartDiscount = Math.min(appliedCoupon.value, cartSubtotal);
    }
  }

  const taxableAmount = Math.max(0, cartSubtotal - cartDiscount);
  const cartTax = taxableAmount > 0 ? Math.round(taxableAmount * 0.08 * 100) / 100 : 0;
  const cartTotal = Math.max(0, taxableAmount + defaultShippingCost + cartTax);

  return (
    <ShopContext.Provider
      value={{
        // Theme & Currency
        theme,
        toggleTheme,
        currency,
        setCurrency,

        // Auth & User
        user,
        login,
        loginDemo,
        signup,
        logout,
        updateProfile,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        isProfileModalOpen,
        profileActiveTab,
        setProfileActiveTab,
        openProfileModal,
        closeProfileModal,

        // Products & Reviews
        products,
        addProductReview,

        // Cart
        cart,
        cartCount,
        cartSubtotal,
        cartDiscount,
        shippingCost: defaultShippingCost,
        cartTax,
        cartTotal,
        freeShippingThreshold,
        isFreeShipping,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),

        // Wishlist
        wishlist,
        toggleWishlist,
        isInWishlist,
        moveWishlistToCart,
        isWishlistOpen,
        setIsWishlistOpen,
        openWishlist: () => setIsWishlistOpen(true),
        closeWishlist: () => setIsWishlistOpen(false),

        // Quick View
        quickViewProduct,
        openQuickView: (prod) => setQuickViewProduct(prod),
        closeQuickView: () => setQuickViewProduct(null),

        // Checkout & Orders
        isCheckoutOpen,
        openCheckout: () => setIsCheckoutOpen(true),
        closeCheckout: () => setIsCheckoutOpen(false),
        orders,
        placeOrder,
        orderSuccessData,
        setOrderSuccessData,
        trackingOrderData,
        setTrackingOrderData,
        openOrderTracking: (order) => setTrackingOrderData(order),
        closeOrderTracking: () => setTrackingOrderData(null),

        // Toasts
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
