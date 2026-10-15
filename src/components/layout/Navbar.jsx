import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  UserPlus,
  Sun,
  Moon,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Package,
  LogOut,
  SlidersHorizontal,
  Compass,
  Headphones,
  Watch,
  Shirt,
  Home,
  Gamepad2
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { CURRENCIES, formatPrice } from '../../utils/currency';

export const Navbar = ({ onSearchChange, searchQuery, onSelectCategory, activeCategory }) => {
  const {
    theme,
    toggleTheme,
    currency,
    setCurrency,
    cartCount,
    openCart,
    wishlist,
    openWishlist,
    user,
    openAuthModal,
    logout,
    openProfileModal,
    products,
    openQuickView
  } = useShop();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const userMenuRef = useRef(null);
  const currencyMenuRef = useRef(null);
  const searchContainerRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
      if (currencyMenuRef.current && !currencyMenuRef.current.contains(e.target)) {
        setIsCurrencyMenuOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered search preview items
  const searchResults = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.tagline.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 4)
    : [];

  const navCategories = [
    { id: 'all', label: 'All Showcase' },
    { id: 'audio', label: 'Audio & Tech' },
    { id: 'wearables', label: 'Wearables' },
    { id: 'fashion', label: 'Fashion' },
    { id: 'living', label: 'Living' },
    { id: 'gaming', label: 'Gaming' }
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 900,
        background: 'var(--bg-glass-heavy)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border-subtle)',
        transition: 'all 0.3s ease'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '74px', gap: '1.25rem' }}>
        {/* Brand Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (onSelectCategory) onSelectCategory('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'var(--gradient-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: 'var(--shadow-glow)'
            }}
          >
            <Sparkles size={20} />
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.45rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #ffffff 30%, #a5b4fc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: theme === 'dark' ? 'transparent' : 'var(--text-primary)'
              }}
            >
              NOVA
            </span>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.45rem',
                fontWeight: 400,
                letterSpacing: '-0.01em',
                marginLeft: '3px',
                color: 'var(--accent-primary)'
              }}
            >
              COMMERCE
            </span>
          </div>
        </a>

        {/* Desktop Category Navigation */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '0.5rem',
            ...(window.innerWidth > 992 ? { display: 'flex' } : {})
          }}
          className="desktop-nav"
        >
          {navCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  if (onSelectCategory) onSelectCategory(cat.id);
                  const el = document.getElementById('catalog-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  background: isActive ? 'var(--bg-card-hover)' : 'transparent',
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  border: isActive ? '1px solid var(--border-highlight)' : '1px solid transparent',
                  padding: '0.45rem 0.9rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 600 : 500,
                  transition: 'all var(--transition-fast)'
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </nav>

        {/* Live Search Bar with Dropdown Preview */}
        <div
          ref={searchContainerRef}
          style={{
            position: 'relative',
            flex: '1',
            maxWidth: '340px',
            display: 'none',
            ...(window.innerWidth > 640 ? { display: 'block' } : {})
          }}
          className="desktop-search"
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'var(--bg-input)',
              border: searchFocused ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-full)',
              padding: '0.45rem 1rem',
              transition: 'all var(--transition-fast)',
              boxShadow: searchFocused ? '0 0 0 3px rgba(99, 102, 241, 0.15)' : 'none'
            }}
          >
            <Search size={16} style={{ color: 'var(--text-muted)', marginRight: '0.5rem', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search products, brands, tech..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.88rem'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', padding: '2px', cursor: 'pointer' }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Predictive Search Dropdown Preview */}
          {searchFocused && searchQuery.trim().length > 0 && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: 0,
                right: 0,
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                padding: '0.75rem',
                zIndex: 1000,
                maxHeight: '380px',
                overflowY: 'auto'
              }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Found {searchResults.length} Match{searchResults.length === 1 ? '' : 'es'}
              </div>
              {searchResults.length === 0 ? (
                <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  No items matching "{searchQuery}"
                </div>
              ) : (
                searchResults.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      openQuickView(item);
                      setSearchFocused(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-card-hover)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.categoryName}</div>
                    </div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
                      {formatPrice(item.price, currency)}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Right Action Icons & Auth Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {/* Currency Switcher */}
          <div ref={currencyMenuRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)}
              className="btn-icon"
              style={{ width: 'auto', padding: '0 0.65rem', height: '38px', fontSize: '0.8rem', fontWeight: 700, gap: '0.25rem' }}
              title="Change Currency"
            >
              <span>{currency}</span>
              <ChevronDown size={13} />
            </button>

            {isCurrencyMenuOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  right: 0,
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-lg)',
                  padding: '0.35rem',
                  zIndex: 1000,
                  minWidth: '130px'
                }}
              >
                {Object.keys(CURRENCIES).map((currCode) => (
                  <button
                    key={currCode}
                    onClick={() => {
                      setCurrency(currCode);
                      setIsCurrencyMenuOpen(false);
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '0.5rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      background: currency === currCode ? 'var(--bg-card-hover)' : 'transparent',
                      color: currency === currCode ? 'var(--accent-primary)' : 'var(--text-primary)',
                      fontSize: '0.85rem',
                      fontWeight: currency === currCode ? 700 : 500,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>{CURRENCIES[currCode].label}</span>
                    <span>{CURRENCIES[currCode].symbol}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dark / Light Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn-icon"
            style={{ width: '38px', height: '38px' }}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun size={17} style={{ color: '#fbbf24' }} /> : <Moon size={17} style={{ color: '#6366f1' }} />}
          </button>

          {/* Wishlist Button */}
          <button
            onClick={openWishlist}
            className="btn-icon"
            style={{ width: '38px', height: '38px', position: 'relative' }}
            title="Wishlist"
          >
            <Heart size={17} />
            {wishlist.length > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: 'var(--accent-rose)',
                  color: '#ffffff',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(244, 63, 94, 0.4)'
                }}
              >
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={openCart}
            className="btn-icon"
            style={{ width: '38px', height: '38px', position: 'relative', background: 'rgba(99, 102, 241, 0.15)', borderColor: 'rgba(99, 102, 241, 0.3)' }}
            title="Shopping Cart"
          >
            <ShoppingBag size={17} style={{ color: 'var(--accent-primary)' }} />
            {cartCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: 'var(--gradient-brand)',
                  color: '#ffffff',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(99, 102, 241, 0.4)'
                }}
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* Authentication & User Profile */}
          {user ? (
            <div ref={userMenuRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.25rem 0.65rem 0.25rem 0.3rem',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', maxWidth: '85px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user.name.split(' ')[0]}
                </span>
                <ChevronDown size={13} style={{ color: 'var(--text-muted)' }} />
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    width: '230px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-lg)',
                    padding: '0.75rem',
                    zIndex: 1000,
                    animation: 'popUp 0.2s ease'
                  }}
                >
                  <div style={{ padding: '0.4rem 0.5rem 0.75rem 0.5rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '0.5rem' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>{user.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</div>
                    <div style={{ marginTop: '0.35rem' }}>
                      <span className="badge badge-gold" style={{ fontSize: '0.65rem', padding: '0.15rem 0.45rem' }}>
                        {user.membership || 'VIP Customer'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      openProfileModal('profile');
                      setIsUserMenuOpen(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '0.5rem 0.65rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'transparent',
                      color: 'var(--text-primary)',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-card-hover)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <User size={15} style={{ color: 'var(--accent-primary)' }} />
                    <span>My Account Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      openProfileModal('orders');
                      setIsUserMenuOpen(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '0.5rem 0.65rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'transparent',
                      color: 'var(--text-primary)',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-card-hover)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <Package size={15} style={{ color: 'var(--accent-emerald)' }} />
                    <span>My Order History</span>
                  </button>

                  <button
                    onClick={() => {
                      openWishlist();
                      setIsUserMenuOpen(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '0.5rem 0.65rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'transparent',
                      color: 'var(--text-primary)',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-card-hover)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <Heart size={15} style={{ color: 'var(--accent-rose)' }} />
                    <span>Saved Wishlist ({wishlist.length})</span>
                  </button>

                  <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '0.5rem 0' }} />

                  <button
                    onClick={() => {
                      logout();
                      setIsUserMenuOpen(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '0.5rem 0.65rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'transparent',
                      color: 'var(--accent-rose)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(244, 63, 94, 0.1)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <LogOut size={15} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('register')}
              className="btn btn-primary"
              style={{
                padding: '0.45rem 1.05rem',
                fontSize: '0.85rem',
                borderRadius: 'var(--radius-full)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontWeight: 600,
                boxShadow: 'var(--shadow-glow)'
              }}
              title="Sign Up for NovaCommerce"
            >
              <UserPlus size={15} />
              <span>Sign Up</span>
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="btn-icon"
            style={{ width: '38px', height: '38px', display: 'flex' }}
            id="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div
          style={{
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-medium)',
            padding: '1.25rem',
            animation: 'fadeIn 0.2s ease'
          }}
        >
          {/* Mobile Search input */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '0.6rem 0.9rem',
              marginBottom: '1rem'
            }}
          >
            <Search size={16} style={{ color: 'var(--text-muted)', marginRight: '0.5rem' }} />
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{ width: '100%', background: 'transparent', border: 'none', color: 'var(--text-primary)', fontSize: '0.9rem' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
            {navCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  if (onSelectCategory) onSelectCategory(cat.id);
                  setIsMobileMenuOpen(false);
                  const el = document.getElementById('catalog-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  padding: '0.65rem 0.8rem',
                  borderRadius: 'var(--radius-md)',
                  background: activeCategory === cat.id ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                  border: activeCategory === cat.id ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                  color: activeCategory === cat.id ? 'var(--accent-primary)' : 'var(--text-primary)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  textAlign: 'left'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {!user && (
            <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
              <button
                onClick={() => {
                  openAuthModal('register');
                  setIsMobileMenuOpen(false);
                }}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: 600
                }}
              >
                <UserPlus size={16} />
                <span>Create Account / Sign Up</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
