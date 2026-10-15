import React, { useState, useMemo } from 'react';
import { useShop } from './context/ShopContext';
import { Navbar } from './components/layout/Navbar';
import { BenefitsBar } from './components/layout/BenefitsBar';
import { Footer } from './components/layout/Footer';
import { HeroSlider } from './components/home/HeroSlider';
import { FlashDeals } from './components/home/FlashDeals';
import { CategoriesGrid } from './components/home/CategoriesGrid';
import { ProductFilter } from './components/products/ProductFilter';
import { ProductGrid } from './components/products/ProductGrid';
import { QuickViewModal } from './components/products/QuickViewModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { WishlistDrawer } from './components/cart/WishlistDrawer';
import { AuthModal } from './components/auth/AuthModal';
import { UserProfileModal } from './components/auth/UserProfileModal';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { OrderSuccessModal } from './components/checkout/OrderSuccessModal';
import { ToastContainer } from './components/common/ToastContainer';
import { LiveTicker } from './components/common/LiveTicker';
import { CATEGORIES } from './data/products';

export function App() {
  const { products } = useShop();

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState(1000);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'all') count++;
    if (priceRange < 1000) count++;
    if (minRating > 0) count++;
    if (inStockOnly) count++;
    if (searchQuery.trim().length > 0) count++;
    return count;
  }, [selectedCategory, priceRange, minRating, inStockOnly, searchQuery]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category Match
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Price Match
      if (p.price > priceRange) {
        return false;
      }
      // Rating Match
      if (minRating > 0 && p.rating < minRating) {
        return false;
      }
      // In-Stock Match
      if (inStockOnly && !p.inStock) {
        return false;
      }
      // Search Query Match
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchTagline = p.tagline.toLowerCase().includes(q);
        const matchCat = p.categoryName.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        if (!matchName && !matchTagline && !matchCat && !matchDesc) {
          return false;
        }
      }
      return true;
    });
  }, [products, selectedCategory, priceRange, minRating, inStockOnly, searchQuery]);

  const activeCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory);
  const activeCategoryName = activeCategoryObj ? activeCategoryObj.name : 'All Products';

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setPriceRange(1000);
    setMinRating(0);
    setInStockOnly(false);
    setSearchQuery('');
  };

  return (
    <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Main Glass Navbar */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          const el = document.getElementById('catalog-section');
          if (el && q.trim()) el.scrollIntoView({ behavior: 'smooth' });
        }}
        activeCategory={selectedCategory}
        onSelectCategory={(catId) => setSelectedCategory(catId)}
      />

      <main style={{ flex: 1 }}>
        {/* Dynamic Hero Carousel */}
        <HeroSlider
          onExploreClick={() => {
            const el = document.getElementById('catalog-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Value Proposition Benefits Bar */}
        <BenefitsBar />

        {/* Flash Deals with Live Countdown */}
        <FlashDeals />

        {/* Shop By Visual Categories */}
        <CategoriesGrid
          activeCategory={selectedCategory}
          onSelectCategory={(catId) => setSelectedCategory(catId)}
        />

        {/* Main Product Catalog Section */}
        <section id="catalog-section" className="section-padding" style={{ background: 'var(--bg-primary)', scrollMarginTop: '80px' }}>
          <div className="container">
            <div className="section-header">
              <div className="section-subtitle">Precision Catalog</div>
              <h2 className="section-title">The Complete Collection</h2>
              <p className="section-description">
                Engineered with aerospace materials, titanium chassis, and timeless minimalist aesthetics.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem', alignItems: 'start' }} className="catalog-grid-wrapper">
              {/* Filter Sidebar */}
              <div className="catalog-sidebar">
                <ProductFilter
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  priceRange={priceRange}
                  onPriceChange={setPriceRange}
                  minRating={minRating}
                  onRatingChange={setMinRating}
                  inStockOnly={inStockOnly}
                  onInStockToggle={setInStockOnly}
                  onResetFilters={handleResetFilters}
                  activeFilterCount={activeFilterCount}
                />
              </div>

              {/* Product Grid & Sorting */}
              <div>
                <ProductGrid
                  products={filteredProducts}
                  activeCategoryName={activeCategoryName}
                  onResetFilters={handleResetFilters}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Multi-Column Luxury Footer */}
      <Footer onSelectCategory={(catId) => setSelectedCategory(catId)} />

      {/* Floating Modals & Drawers */}
      <CartDrawer />
      <WishlistDrawer />
      <QuickViewModal />
      <AuthModal />
      <UserProfileModal />
      <CheckoutModal />
      <OrderSuccessModal />
      <ToastContainer />
      <LiveTicker />
    </div>
  );
}

export default App;
