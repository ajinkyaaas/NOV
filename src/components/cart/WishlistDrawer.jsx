import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { formatPrice } from '../../utils/currency';

export const WishlistDrawer = () => {
  const {
    isWishlistOpen,
    closeWishlist,
    wishlist,
    toggleWishlist,
    moveWishlistToCart,
    openQuickView,
    currency
  } = useShop();

  if (!isWishlistOpen) return null;

  return (
    <>
      <div className="drawer-overlay" onClick={closeWishlist} />
      <div className="drawer-content">
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-secondary)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Heart size={20} style={{ color: 'var(--accent-rose)' }} fill="var(--accent-rose)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Saved Wishlist</h3>
            <span className="badge badge-accent" style={{ fontSize: '0.72rem', background: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e', border: '1px solid rgba(244, 63, 94, 0.3)' }}>
              {wishlist.length} item{wishlist.length === 1 ? '' : 's'}
            </span>
          </div>

          <button onClick={closeWishlist} className="btn-icon" style={{ width: '36px', height: '36px' }}>
            <X size={18} />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {wishlist.length === 0 ? (
            <div style={{ textAlign: 'center', margin: 'auto', padding: '2rem 1rem' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'var(--bg-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto',
                  color: 'var(--accent-rose)'
                }}
              >
                <Heart size={28} />
              </div>
              <h4 style={{ fontSize: '1.15rem', marginBottom: '0.35rem' }}>Your Wishlist is Empty</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                Tap the heart icon on any product card to save your dream setup.
              </p>
              <button onClick={closeWishlist} className="btn btn-primary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}>
                Browse Catalog
              </button>
            </div>
          ) : (
            wishlist.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '70px 1fr auto',
                  gap: '0.9rem',
                  padding: '0.85rem',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  alignItems: 'center'
                }}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '70px', height: '70px', borderRadius: 'var(--radius-sm)', objectFit: 'cover', background: 'var(--bg-tertiary)', cursor: 'pointer' }}
                  onClick={() => {
                    openQuickView(item);
                    closeWishlist();
                  }}
                />

                {/* Details */}
                <div style={{ minWidth: 0 }}>
                  <h4
                    onClick={() => {
                      openQuickView(item);
                      closeWishlist();
                    }}
                    style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '0.2rem', cursor: 'pointer' }}
                  >
                    {item.name}
                  </h4>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                    {item.categoryName}
                  </div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--accent-primary)', fontFamily: 'var(--font-display)' }}>
                    {formatPrice(item.price, currency)}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                  <button
                    onClick={() => toggleWishlist(item)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px' }}
                    title="Remove from wishlist"
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-rose)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                  >
                    <Trash2 size={15} />
                  </button>

                  <button
                    onClick={() => moveWishlistToCart(item)}
                    className="btn btn-primary"
                    style={{ padding: '0.45rem 0.8rem', fontSize: '0.78rem', borderRadius: 'var(--radius-sm)' }}
                  >
                    <ShoppingBag size={13} />
                    <span>Move to Cart</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};
