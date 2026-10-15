import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, ChevronLeft, ChevronRight, Eye, ShoppingBag } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { formatPrice } from '../../utils/currency';

const HERO_SLIDES = [
  {
    id: 'slide-1',
    productId: 'prod-01',
    badge: 'FLAGSHIP LAUNCH 2026',
    badgeType: 'gold',
    title: 'Quantum Pulse ANC Studio Headphones',
    subtitle: 'Pure Audiophile Fidelity with Hybrid -45dB Active Noise Cancellation & 45-Hour Battery Life.',
    price: 349,
    originalPrice: 429,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=85',
    accentColor: '#6366f1',
    specs: ['45mm Titanium Drivers', '45h Battery', 'LDAC Lossless']
  },
  {
    id: 'slide-2',
    productId: 'prod-02',
    badge: 'LUXURY TITANIUM EDITION',
    badgeType: 'accent',
    title: 'Chronos Apex Titanium Smartwatch',
    subtitle: 'Grade 5 Aerospace Titanium with Unscratchable Sapphire Crystal & 14-Day Power Reserve.',
    price: 499,
    originalPrice: 599,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=85',
    accentColor: '#06b6d4',
    specs: ['Grade 5 Titanium', '100m Waterproof', '14-Day Battery']
  },
  {
    id: 'slide-3',
    productId: 'prod-04',
    badge: 'PRO ESPORTS HARDWARE',
    badgeType: 'purple',
    title: 'CyberBlade Magnetic Gasket Keyboard',
    subtitle: 'Hall Effect Rapid-Trigger Switches with 0.1mm Actuation and CNC Machined Anodized Chassis.',
    price: 219,
    originalPrice: 269,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1200&q=85',
    accentColor: '#8b5cf6',
    specs: ['Hall Effect Rapid Trigger', 'Gasket Mount', 'OLED Telemetry']
  }
];

export const HeroSlider = ({ onExploreClick }) => {
  const { currency, addToCart, openQuickView, products } = useShop();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(interval);
  }, []);

  const slide = HERO_SLIDES[currentSlide];
  const activeProduct = products.find((p) => p.id === slide.productId) || products[0];

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: '3.5rem 0 4.5rem 0', background: 'radial-gradient(ellipse at 50% 20%, rgba(99, 102, 241, 0.15), transparent 70%)' }}>
      <div className="container">
        <div
          style={{
            position: 'relative',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
            backdropFilter: 'blur(20px)',
            minHeight: '520px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          {/* Background Ambient Glow */}
          <div
            style={{
              position: 'absolute',
              top: '-20%',
              right: '-10%',
              width: '450px',
              height: '450px',
              borderRadius: '50%',
              background: slide.accentColor,
              opacity: 0.15,
              filter: 'blur(90px)',
              pointerEvents: 'none',
              transition: 'all 0.8s ease'
            }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', alignItems: 'center', gap: '2.5rem', padding: '3rem 2.5rem', position: 'relative', zIndex: 2 }}>
            {/* Left Content Column */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.2rem' }}>
                <span className={`badge badge-${slide.badgeType}`}>
                  <Sparkles size={12} />
                  {slide.badge}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                  ● In Stock & Ready to Ship
                </span>
              </div>

              <h1 style={{ fontSize: 'clamp(2.1rem, 3.5vw, 3.4rem)', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.15 }}>
                {slide.title}
              </h1>

              <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '1.75rem', maxWidth: '540px', lineHeight: 1.6 }}>
                {slide.subtitle}
              </p>

              {/* Key Specs Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '2rem' }}>
                {slide.specs.map((spec, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-subtle)',
                      padding: '0.35rem 0.85rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.82rem',
                      color: 'var(--text-primary)',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <Zap size={13} style={{ color: 'var(--accent-gold)' }} />
                    {spec}
                  </span>
                ))}
              </div>

              {/* Price & Call to Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem' }}>
                  <span style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                    {formatPrice(slide.price, currency)}
                  </span>
                  <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                    {formatPrice(slide.originalPrice, currency)}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => addToCart(activeProduct, 1, activeProduct.colors?.[0])}
                    className="btn btn-primary"
                    style={{ padding: '0.8rem 1.6rem' }}
                  >
                    <ShoppingBag size={18} />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={() => openQuickView(activeProduct)}
                    className="btn btn-secondary"
                    style={{ padding: '0.8rem 1.3rem' }}
                  >
                    <Eye size={18} />
                    <span>Quick View</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Visual Image Column */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '440px',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--border-medium)',
                  background: 'var(--bg-tertiary)',
                  aspectRatio: '1 / 1'
                }}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1rem',
                    right: '1rem',
                    background: 'rgba(10, 11, 14, 0.75)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ShieldCheck size={18} style={{ color: 'var(--accent-emerald)' }} />
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#ffffff' }}>
                      2-Year Global Warranty Included
                    </span>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Verified Authentic</span>
                </div>
              </div>
            </div>
          </div>

          {/* Slide Navigation Buttons & Indicators */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem 2.5rem',
              borderTop: '1px solid var(--border-subtle)',
              background: 'var(--bg-glass)',
              position: 'relative',
              zIndex: 3
            }}
          >
            {/* Indicators */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {HERO_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(idx)}
                  style={{
                    width: currentSlide === idx ? '32px' : '10px',
                    height: '8px',
                    borderRadius: 'var(--radius-full)',
                    background: currentSlide === idx ? 'var(--accent-primary)' : 'rgba(255,255,255,0.2)',
                    border: 'none',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  title={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Arrows */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={prevSlide}
                className="btn-icon"
                style={{ width: '36px', height: '36px' }}
                title="Previous Slide"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={nextSlide}
                className="btn-icon"
                style={{ width: '36px', height: '36px' }}
                title="Next Slide"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
