import React, { useState } from 'react';
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Plus,
  Minus,
  Sparkles,
  Send,
  MessageSquare
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { formatPrice } from '../../utils/currency';

export const QuickViewModal = () => {
  const {
    quickViewProduct,
    closeQuickView,
    currency,
    addToCart,
    toggleWishlist,
    isInWishlist,
    addProductReview,
    user
  } = useShop();

  if (!quickViewProduct) return null;

  const [selectedColor, setSelectedColor] = useState(
    quickViewProduct.colors?.[0] || { name: 'Standard', hex: '#000' }
  );
  const [selectedImage, setSelectedImage] = useState(
    quickViewProduct.colors?.[0]?.image || quickViewProduct.image
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'specs' | 'reviews' | 'shipping'

  // Review Form state
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');

  const isWish = isInWishlist(quickViewProduct.id);
  const gallery = quickViewProduct.gallery || [quickViewProduct.image];

  const handleColorChange = (color) => {
    setSelectedColor(color);
    if (color.image) setSelectedImage(color.image);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newComment.trim()) return;

    addProductReview(quickViewProduct.id, {
      rating: newRating,
      title: newTitle,
      comment: newComment
    });

    setNewTitle('');
    setNewComment('');
  };

  return (
    <div className="modal-overlay" onClick={closeQuickView}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ width: '100%', maxWidth: '960px', padding: 0, position: 'relative' }}
      >
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-medium)',
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          <X size={18} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))' }}>
          {/* Left: Product Images Gallery */}
          <div style={{ padding: '2rem', background: 'var(--bg-tertiary)', borderRight: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div
              style={{
                width: '100%',
                aspectRatio: '1 / 1',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-medium)',
                position: 'relative'
              }}
            >
              <img
                src={selectedImage}
                alt={quickViewProduct.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {quickViewProduct.badge && (
                <span
                  className={`badge badge-${quickViewProduct.badgeType || 'accent'}`}
                  style={{ position: 'absolute', top: '1rem', left: '1rem' }}
                >
                  {quickViewProduct.badge}
                </span>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div style={{ display: 'flex', gap: '0.65rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    border: selectedImage === img ? '2px solid var(--accent-primary)' : '1px solid var(--border-medium)',
                    cursor: 'pointer',
                    flexShrink: 0,
                    padding: 0,
                    background: 'transparent'
                  }}
                >
                  <img src={img} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Actions & Tabs */}
          <div style={{ padding: '2.25rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--accent-primary)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
              {quickViewProduct.categoryName}
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.25 }}>
              {quickViewProduct.name}
            </h2>

            {/* Rating & Stock */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.9rem', color: '#fbbf24', fontWeight: 700 }}>
                <Star size={15} fill="#fbbf24" stroke="#fbbf24" />
                <span>{quickViewProduct.rating}</span>
                <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({quickViewProduct.reviewCount} customer reviews)</span>
              </div>
              <span style={{ fontSize: '0.82rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                ● In Stock ({quickViewProduct.stockCount} units)
              </span>
            </div>

            {/* Price Box */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.5rem', padding: '0.85rem 1.2rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                {formatPrice(quickViewProduct.price, currency)}
              </span>
              {quickViewProduct.originalPrice && (
                <>
                  <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                    {formatPrice(quickViewProduct.originalPrice, currency)}
                  </span>
                  <span className="badge badge-accent" style={{ background: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e', border: '1px solid rgba(244, 63, 94, 0.3)' }}>
                    Save {quickViewProduct.discountPercent}%
                  </span>
                </>
              )}
            </div>

            {/* Color Swatch Picker */}
            {quickViewProduct.colors && (
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 600 }}>Selected Color:</span>
                  <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>{selectedColor.name}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  {quickViewProduct.colors.map((c, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleColorChange(c)}
                      style={{
                        padding: '0.4rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        background: selectedColor.name === c.name ? 'var(--bg-card-hover)' : 'var(--bg-tertiary)',
                        border: selectedColor.name === c.name ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        cursor: 'pointer'
                      }}
                    >
                      <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: c.hex, display: 'inline-block', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
                      <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Add to Cart */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.75rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.2rem'
                }}
              >
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', color: 'var(--text-primary)', cursor: 'pointer' }}
                >
                  <Minus size={15} />
                </button>
                <span style={{ width: '36px', textAlign: 'center', fontWeight: 700, fontSize: '0.95rem' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', color: 'var(--text-primary)', cursor: 'pointer' }}
                >
                  <Plus size={15} />
                </button>
              </div>

              <button
                onClick={() => {
                  addToCart(quickViewProduct, quantity, selectedColor);
                  closeQuickView();
                }}
                className="btn btn-primary"
                style={{ flex: 1, padding: '0.85rem 1.5rem', fontSize: '0.95rem' }}
              >
                <ShoppingBag size={18} />
                <span>Add to Cart ({formatPrice(quickViewProduct.price * quantity, currency)})</span>
              </button>

              <button
                onClick={() => toggleWishlist(quickViewProduct)}
                className="btn-icon"
                style={{ width: '48px', height: '48px', color: isWish ? 'var(--accent-rose)' : 'inherit' }}
                title="Wishlist"
              >
                <Heart size={20} fill={isWish ? 'var(--accent-rose)' : 'none'} />
              </button>
            </div>

            {/* Tabs Navigation */}
            <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '1rem' }}>
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'specs', label: 'Specifications' },
                { id: 'reviews', label: `Reviews (${quickViewProduct.reviews?.length || 0})` },
                { id: 'shipping', label: 'Shipping & Returns' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '0.5rem 0.85rem',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: activeTab === tab.id ? '2px solid var(--accent-primary)' : '2px solid transparent',
                    color: activeTab === tab.id ? 'var(--accent-primary)' : 'var(--text-muted)',
                    fontSize: '0.85rem',
                    fontWeight: activeTab === tab.id ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div style={{ minHeight: '160px', maxHeight: '240px', overflowY: 'auto', paddingRight: '0.5rem' }}>
              {activeTab === 'overview' && (
                <div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                    {quickViewProduct.description}
                  </p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                    {quickViewProduct.features?.map((f, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Check size={14} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'specs' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                  {Object.entries(quickViewProduct.specs || {}).map(([key, val], idx) => (
                    <div key={idx} style={{ padding: '0.6rem 0.8rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{key}</div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>{val}</div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  {/* Reviews List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    {quickViewProduct.reviews?.map((r) => (
                      <div key={r.id} style={{ padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                          <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{r.author}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{r.date}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '0.35rem' }}>
                          {[...Array(r.rating)].map((_, i) => (
                            <Star key={i} size={12} fill="#fbbf24" stroke="#fbbf24" />
                          ))}
                        </div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.2rem' }}>{r.title}</div>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>{r.comment}</p>
                      </div>
                    ))}
                  </div>

                  {/* Add Review Form */}
                  <form onSubmit={handleReviewSubmit} style={{ padding: '0.85rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.6rem' }}>Write a Customer Review</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.6rem' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Rating:</span>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setNewRating(star)}
                          style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                        >
                          <Star size={16} fill={newRating >= star ? '#fbbf24' : 'none'} stroke="#fbbf24" />
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Headline / Review title"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      required
                      style={{ width: '100%', padding: '0.45rem 0.75rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: '0.82rem', marginBottom: '0.5rem' }}
                    />
                    <textarea
                      placeholder="Share your experience with this item..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      required
                      rows={2}
                      style={{ width: '100%', padding: '0.45rem 0.75rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: '0.82rem', marginBottom: '0.5rem', resize: 'none' }}
                    />
                    <button type="submit" className="btn btn-primary" style={{ padding: '0.45rem 1rem', fontSize: '0.8rem' }}>
                      <Send size={13} />
                      <span>Submit Review</span>
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'shipping' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                    <Truck size={18} style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong>Free Worldwide Express Delivery</strong>
                      <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Orders over $150 qualify for 2-3 business day air shipping with live GPS tracking.</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                    <RotateCcw size={18} style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong>30-Day Risk-Free Return Guarantee</strong>
                      <p style={{ color: 'var(--text-secondary)', margin: 0 }}>If you are not 100% satisfied, return it within 30 days in original packaging for a full refund.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
