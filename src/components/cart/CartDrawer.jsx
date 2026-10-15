import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Sparkles,
  Tag,
  ArrowRight,
  ShieldCheck,
  Truck,
  Check
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { formatPrice } from '../../utils/currency';

export const CartDrawer = () => {
  const {
    isCartOpen,
    closeCart,
    cart,
    cartCount,
    cartSubtotal,
    cartDiscount,
    shippingCost,
    cartTax,
    cartTotal,
    freeShippingThreshold,
    isFreeShipping,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    updateQuantity,
    removeFromCart,
    openCheckout,
    currency
  } = useShop();

  const [couponCode, setCouponCode] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const success = applyCoupon(couponCode);
    if (success) setCouponCode('');
  };

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  return (
    <>
      <div className="drawer-overlay" onClick={closeCart} />
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
            <ShoppingBag size={20} style={{ color: 'var(--accent-primary)' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Your Shopping Cart</h3>
            <span className="badge badge-accent" style={{ fontSize: '0.72rem' }}>
              {cartCount} item{cartCount === 1 ? '' : 's'}
            </span>
          </div>

          <button onClick={closeCart} className="btn-icon" style={{ width: '36px', height: '36px' }}>
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div style={{ padding: '0.9rem 1.5rem', background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.4rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600 }}>
              <Truck size={14} style={{ color: isFreeShipping ? 'var(--accent-emerald)' : 'var(--accent-primary)' }} />
              {isFreeShipping ? (
                <span style={{ color: 'var(--accent-emerald)' }}>🎉 You unlocked Free Express Shipping!</span>
              ) : (
                <span>Add <strong>{formatPrice(amountNeededForFreeShipping, currency)}</strong> more for <strong>FREE Shipping</strong></span>
              )}
            </span>
            <span style={{ fontWeight: 700, fontSize: '0.75rem' }}>{Math.round(freeShippingProgress)}%</span>
          </div>
          <div style={{ width: '100%', height: '6px', background: 'var(--border-subtle)', borderRadius: '3px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${freeShippingProgress}%`,
                height: '100%',
                background: isFreeShipping ? 'var(--accent-emerald)' : 'var(--gradient-brand)',
                borderRadius: '3px',
                transition: 'width 0.4s ease'
              }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {cart.length === 0 ? (
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
                  color: 'var(--text-muted)'
                }}
              >
                <ShoppingBag size={28} />
              </div>
              <h4 style={{ fontSize: '1.15rem', marginBottom: '0.35rem' }}>Your Cart is Empty</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                Discover flagship headphones, luxury watches, and smart gear.
              </p>
              <button onClick={closeCart} className="btn btn-primary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}>
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item, idx) => {
              const itemImage = item.selectedColor?.image || item.product.image;
              const itemKey = `${item.product.id}-${item.selectedColor?.name || 'def'}`;

              return (
                <div
                  key={itemKey}
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
                  {/* Thumbnail */}
                  <img
                    src={itemImage}
                    alt={item.product.name}
                    style={{ width: '70px', height: '70px', borderRadius: 'var(--radius-sm)', objectFit: 'cover', background: 'var(--bg-tertiary)' }}
                  />

                  {/* Info */}
                  <div style={{ minWidth: 0 }}>
                    <h4 style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '0.2rem' }}>
                      {item.product.name}
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                      <span>Color: {item.selectedColor?.name || 'Standard'}</span>
                    </div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--accent-primary)', fontFamily: 'var(--font-display)' }}>
                      {formatPrice(item.product.price, currency)}
                    </div>
                  </div>

                  {/* Actions (Qty + Delete) */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedColor?.name)}
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px' }}
                      title="Remove item"
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-rose)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                    >
                      <Trash2 size={15} />
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedColor?.name, item.quantity - 1)}
                        style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', color: 'var(--text-primary)', cursor: 'pointer' }}
                      >
                        <Minus size={11} />
                      </button>
                      <span style={{ width: '22px', textAlign: 'center', fontSize: '0.82rem', fontWeight: 700 }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedColor?.name, item.quantity + 1)}
                        style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', color: 'var(--text-primary)', cursor: 'pointer' }}
                      >
                        <Plus size={11} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer with Voucher, Price Breakdown & Checkout */}
        {cart.length > 0 && (
          <div style={{ borderTop: '1px solid var(--border-subtle)', padding: '1.25rem 1.5rem', background: 'var(--bg-secondary)' }}>
            {/* Coupon input */}
            <div style={{ marginBottom: '1rem' }}>
              {appliedCoupon ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0.8rem', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                    <Tag size={14} />
                    <span>Coupon: {appliedCoupon.code} ({appliedCoupon.description})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    style={{ background: 'transparent', border: 'none', color: 'var(--accent-rose)', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700 }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '0.4rem' }}>
                  <div style={{ position: 'relative', flex: 1 }}>
                    <Tag size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                      type="text"
                      placeholder="Promo code (e.g. WELCOME20)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.55rem 0.75rem 0.55rem 2.2rem',
                        background: 'var(--bg-input)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--text-primary)',
                        fontSize: '0.82rem',
                        textTransform: 'uppercase'
                      }}
                    />
                  </div>
                  <button type="submit" className="btn btn-secondary" style={{ padding: '0.55rem 0.9rem', fontSize: '0.82rem' }}>
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Price Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{formatPrice(cartSubtotal, currency)}</span>
              </div>

              {cartDiscount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-emerald)' }}>
                  <span>Discount</span>
                  <span style={{ fontWeight: 700 }}>-{formatPrice(cartDiscount, currency)}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Shipping</span>
                <span style={{ color: isFreeShipping ? 'var(--accent-emerald)' : 'var(--text-primary)', fontWeight: 600 }}>
                  {isFreeShipping ? 'FREE' : formatPrice(shippingCost, currency)}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Estimated Tax (8%)</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{formatPrice(cartTax, currency)}</span>
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.6rem', marginTop: '0.2rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                <span>Total Amount</span>
                <span style={{ color: 'var(--accent-primary)' }}>{formatPrice(cartTotal, currency)}</span>
              </div>
            </div>

            {/* Proceed to Checkout Button */}
            <button
              onClick={() => {
                closeCart();
                openCheckout();
              }}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.9rem', fontSize: '1rem' }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};
