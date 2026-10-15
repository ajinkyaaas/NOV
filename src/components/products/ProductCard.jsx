import React, { useState } from 'react';
import { Star, Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { formatPrice } from '../../utils/currency';

export const ProductCard = ({ product, viewMode = 'grid' }) => {
  const { currency, addToCart, openQuickView, toggleWishlist, isInWishlist } = useShop();
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const [isHovered, setIsHovered] = useState(false);

  const isWish = isInWishlist(product.id);
  const currentImage = selectedColor?.image || product.image;

  if (viewMode === 'list') {
    return (
      <div
        className="glass-panel"
        style={{
          display: 'grid',
          gridTemplateColumns: '220px 1fr auto',
          gap: '1.5rem',
          padding: '1.25rem',
          alignItems: 'center',
          transition: 'all 0.25s ease'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <div style={{ position: 'relative', width: '100%', height: '180px', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--bg-tertiary)' }}>
          <img
            src={currentImage}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease', transform: isHovered ? 'scale(1.06)' : 'scale(1)' }}
          />
          {product.badge && (
            <span
              className={`badge badge-${product.badgeType || 'accent'}`}
              style={{ position: 'absolute', top: '0.6rem', left: '0.6rem' }}
            >
              {product.badge}
            </span>
          )}
        </div>

        {/* Details */}
        <div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
            {product.categoryName}
          </div>
          <h3
            onClick={() => openQuickView(product)}
            style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.4rem', cursor: 'pointer', color: isHovered ? 'var(--accent-primary)' : 'var(--text-primary)', transition: 'color 0.2s ease' }}
          >
            {product.name}
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {product.tagline}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem' }}>
              <Star size={14} fill="#fbbf24" stroke="#fbbf24" />
              <span style={{ fontWeight: 700 }}>{product.rating}</span>
              <span style={{ color: 'var(--text-muted)' }}>({product.reviewCount})</span>
            </div>

            {/* Colors Swatches */}
            {product.colors && product.colors.length > 1 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Color:</span>
                {product.colors.map((c, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(c)}
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: c.hex,
                      border: selectedColor?.name === c.name ? '2px solid var(--accent-primary)' : '1px solid rgba(255,255,255,0.3)',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                      cursor: 'pointer'
                    }}
                    title={c.name}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Pricing & Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', gap: '1rem', minWidth: '160px', borderLeft: '1px solid var(--border-subtle)', paddingLeft: '1.5rem' }}>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', textAlign: 'right' }}>
              {formatPrice(product.price, currency)}
            </div>
            {product.originalPrice && (
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textDecoration: 'line-through', textAlign: 'right' }}>
                {formatPrice(product.originalPrice, currency)}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => toggleWishlist(product)}
              className="btn-icon"
              style={{ color: isWish ? 'var(--accent-rose)' : 'inherit' }}
              title="Wishlist"
            >
              <Heart size={16} fill={isWish ? 'var(--accent-rose)' : 'none'} />
            </button>
            <button
              onClick={() => addToCart(product, 1, selectedColor)}
              className="btn btn-primary"
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem' }}
            >
              <ShoppingBag size={16} />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid Mode Card
  return (
    <div
      className="glass-panel"
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        height: '100%'
      }}
      onMouseEnter={(e) => {
        setIsHovered(true);
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.borderColor = 'var(--border-highlight)';
      }}
      onMouseLeave={(e) => {
        setIsHovered(false);
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--border-subtle)';
      }}
    >
      {/* Product Image Area */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', overflow: 'hidden', background: 'var(--bg-tertiary)' }}>
        <img
          src={currentImage}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
            transform: isHovered ? 'scale(1.08)' : 'scale(1)'
          }}
        />

        {/* Top Badges */}
        <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {product.badge && (
            <span className={`badge badge-${product.badgeType || 'accent'}`}>
              {product.badge}
            </span>
          )}
          {product.discountPercent && (
            <span className="badge badge-accent" style={{ background: '#f43f5e', color: '#fff', border: 'none' }}>
              -{product.discountPercent}%
            </span>
          )}
        </div>

        {/* Top Right Wishlist Action */}
        <button
          onClick={() => toggleWishlist(product)}
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
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
            transition: 'all 0.2s ease',
            zIndex: 3
          }}
          title="Save to Wishlist"
        >
          <Heart size={16} fill={isWish ? '#f43f5e' : 'none'} />
        </button>

        {/* Quick View Button Hover Layer */}
        <div
          style={{
            position: 'absolute',
            bottom: '0.75rem',
            left: '0.75rem',
            right: '0.75rem',
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.25s ease',
            zIndex: 3
          }}
        >
          <button
            onClick={() => openQuickView(product)}
            className="btn btn-secondary"
            style={{ width: '100%', padding: '0.55rem', fontSize: '0.82rem', background: 'rgba(10,11,14,0.85)', backdropFilter: 'blur(10px)' }}
          >
            <Eye size={15} />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {product.categoryName}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', color: '#fbbf24', fontWeight: 700 }}>
            <Star size={13} fill="#fbbf24" stroke="#fbbf24" />
            <span>{product.rating}</span>
            <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({product.reviewCount})</span>
          </div>
        </div>

        <h3
          onClick={() => openQuickView(product)}
          style={{
            fontSize: '1.05rem',
            fontWeight: 700,
            marginBottom: '0.4rem',
            lineHeight: 1.35,
            minHeight: '2.8rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            cursor: 'pointer'
          }}
        >
          {product.name}
        </h3>

        {/* Color Swatches */}
        {product.colors && product.colors.length > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem' }}>
            {product.colors.map((c, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedColor(c)}
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: c.hex,
                  border: selectedColor?.name === c.name ? '2px solid var(--accent-primary)' : '1px solid rgba(255,255,255,0.25)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                  cursor: 'pointer',
                  transform: selectedColor?.name === c.name ? 'scale(1.15)' : 'scale(1)',
                  transition: 'all 0.15s ease'
                }}
                title={c.name}
              />
            ))}
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginLeft: '4px' }}>
              {selectedColor?.name}
            </span>
          </div>
        )}

        {/* Pricing & Add to Cart */}
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
              {formatPrice(product.price, currency)}
            </span>
            {product.originalPrice && (
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                {formatPrice(product.originalPrice, currency)}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1, selectedColor)}
            className="btn btn-primary"
            style={{ padding: '0.6rem 1.1rem', fontSize: '0.85rem' }}
          >
            <ShoppingBag size={15} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
