import React, { useState, useEffect } from 'react';
import { Flame, Clock, Sparkles, ShoppingBag, Eye, Heart } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { formatPrice } from '../../utils/currency';

export const FlashDeals = () => {
  const { products, currency, addToCart, openQuickView, toggleWishlist, isInWishlist } = useShop();
  const flashProducts = products.filter((p) => p.isFlashDeal);

  const [timeLeft, setTimeLeft] = useState({ hours: 9, minutes: 44, seconds: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Header with Countdown Clock */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: '2.5rem',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid var(--border-subtle)'
          }}
        >
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#f43f5e', fontWeight: 700, fontSize: '0.88rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>
              <Flame size={18} />
              <span>Limited Drop Event</span>
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>⚡ Flash Deals of the Day</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-medium)', padding: '0.6rem 1.25rem', borderRadius: 'var(--radius-lg)' }}>
            <Clock size={18} style={{ color: 'var(--accent-gold)' }} />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Offer Ends In:</span>
            <div style={{ display: 'flex', gap: '0.35rem', fontFamily: 'monospace', fontWeight: 800, fontSize: '1.1rem' }}>
              <span style={{ background: 'var(--bg-tertiary)', padding: '0.2rem 0.5rem', borderRadius: '6px', color: 'var(--accent-gold)' }}>
                {String(timeLeft.hours).padStart(2, '0')}h
              </span>
              :
              <span style={{ background: 'var(--bg-tertiary)', padding: '0.2rem 0.5rem', borderRadius: '6px', color: 'var(--accent-gold)' }}>
                {String(timeLeft.minutes).padStart(2, '0')}m
              </span>
              :
              <span style={{ background: 'var(--bg-tertiary)', padding: '0.2rem 0.5rem', borderRadius: '6px', color: 'var(--accent-gold)' }}>
                {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>
        </div>

        {/* Flash Deals Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
          {flashProducts.map((product) => {
            const isWish = isInWishlist(product.id);
            return (
              <div
                key={product.id}
                className="glass-panel"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = 'var(--border-highlight)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                }}
              >
                {/* Image Container with Badges */}
                <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', overflow: 'hidden', background: 'var(--bg-tertiary)' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />

                  {/* Top Badges */}
                  <div style={{ position: 'absolute', top: '0.85rem', left: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <span className="badge badge-accent" style={{ background: '#f43f5e', color: '#ffffff', border: 'none' }}>
                      -{product.discountPercent}% OFF
                    </span>
                  </div>

                  {/* Top Right Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    style={{
                      position: 'absolute',
                      top: '0.85rem',
                      right: '0.85rem',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'rgba(10, 11, 14, 0.75)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: isWish ? '#f43f5e' : '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    title="Save to Wishlist"
                  >
                    <Heart size={16} fill={isWish ? '#f43f5e' : 'none'} />
                  </button>

                  {/* Bottom Stock Progress */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(10, 11, 14, 0.85)', backdropFilter: 'blur(10px)', padding: '0.45rem 0.85rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#fbbf24', fontWeight: 700, marginBottom: '0.2rem' }}>
                      <span>Only {product.stockCount} left in stock!</span>
                      <span>Hurry!</span>
                    </div>
                    <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: `${Math.max(20, 100 - product.stockCount * 8)}%`, height: '100%', background: 'linear-gradient(90deg, #f59e0b, #ef4444)', borderRadius: '2px' }} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                    {product.categoryName}
                  </div>

                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem', lineHeight: 1.35, minHeight: '2.7rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {product.name}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.65rem', marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                      {formatPrice(product.price, currency)}
                    </span>
                    <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                      {formatPrice(product.originalPrice, currency)}
                    </span>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.5rem', marginTop: 'auto' }}>
                    <button
                      onClick={() => addToCart(product, 1, product.colors?.[0])}
                      className="btn btn-primary"
                      style={{ padding: '0.65rem 1rem', fontSize: '0.88rem' }}
                    >
                      <ShoppingBag size={15} />
                      <span>Add to Cart</span>
                    </button>

                    <button
                      onClick={() => openQuickView(product)}
                      className="btn btn-secondary"
                      style={{ padding: '0.65rem', width: '42px', height: '42px' }}
                      title="Quick View Details"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
