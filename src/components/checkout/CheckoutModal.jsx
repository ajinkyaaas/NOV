import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  ChevronRight,
  ShieldCheck,
  CreditCard,
  Truck,
  MapPin,
  Lock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { formatPrice } from '../../utils/currency';
import { CreditCardPreview } from './CreditCardPreview';

export const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    closeCheckout,
    cart,
    cartSubtotal,
    cartDiscount,
    cartTax,
    cartTotal,
    appliedCoupon,
    currency,
    user,
    placeOrder,
    addToast
  } = useShop();

  if (!isCheckoutOpen) return null;

  const [step, setStep] = useState(1); // 1: Shipping, 2: Delivery Method, 3: Payment, 4: Review

  // Step 1: Shipping Info
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zip: user?.address?.zip || '',
    country: user?.address?.country || 'United States'
  });

  // Step 2: Shipping Method
  const [shippingMethod, setShippingMethod] = useState('standard'); // 'standard' | 'express' | 'overnight'

  // Step 3: Payment Method
  const [paymentType, setPaymentType] = useState('card'); // 'card' | 'applepay' | 'paypal' | 'cod'
  const [cardData, setCardData] = useState({
    number: '',
    name: user?.name || '',
    expiry: '',
    cvv: ''
  });

  // Calculate Shipping Method Cost
  const getShippingCost = () => {
    if (appliedCoupon?.type === 'shipping') return 0;
    if (shippingMethod === 'standard') return cartSubtotal >= 150 ? 0 : 15;
    if (shippingMethod === 'express') return 18;
    if (shippingMethod === 'overnight') return 32;
    return 0;
  };

  const currentShippingCost = getShippingCost();
  const finalTotal = Math.max(0, cartSubtotal - cartDiscount + currentShippingCost + cartTax);

  const handleNextStep = (e) => {
    if (e) e.preventDefault();
    if (step === 1) {
      if (!shippingInfo.fullName || !shippingInfo.email || !shippingInfo.street || !shippingInfo.city || !shippingInfo.zip) {
        addToast('Please complete all required shipping fields.', 'warning');
        return;
      }
    } else if (step === 3) {
      if (paymentType === 'card' && (!cardData.number || !cardData.expiry || !cardData.cvv)) {
        addToast('Please fill in card details.', 'warning');
        return;
      }
    }
    setStep((prev) => Math.min(4, prev + 1));
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  // UPDATED: Connected directly to Firestore!
  const handleCompleteOrder = async () => {
    try {
      const formattedShippingMethod =
        shippingMethod === 'standard'
          ? 'Standard Tracked Delivery (3-5 Days)'
          : shippingMethod === 'express'
          ? 'Express Air Courier (2 Days)'
          : 'Priority Overnight Air (1 Day)';

      const formattedPaymentMethod =
        paymentType === 'card'
          ? `Credit Card (•••• ${cardData.number.slice(-4) || '4242'})`
          : paymentType === 'applepay'
          ? 'Apple Pay'
          : paymentType === 'paypal'
          ? 'PayPal'
          : 'Cash on Delivery (COD)';

      const generatedOrderId = `NOV-${Math.floor(100000 + Math.random() * 900000)}`;

      // 1. Save order to Firebase Firestore
      const docRef = await addDoc(collection(db, 'orders'), {
        orderId: generatedOrderId,
        items: cart,
        subtotal: cartSubtotal,
        discount: cartDiscount,
        tax: cartTax,
        shippingCost: currentShippingCost,
        total: finalTotal,
        shippingAddress: shippingInfo,
        shippingMethod: formattedShippingMethod,
        paymentMethod: formattedPaymentMethod,
        status: 'PROCESSING',
        createdAt: serverTimestamp()
      });

      console.log('Order successfully saved to Firestore with ID:', docRef.id);

      // 2. Clear cart & update state in app context
      placeOrder({
        shippingAddress: shippingInfo,
        shippingMethod: formattedShippingMethod,
        shippingCost: currentShippingCost,
        paymentMethod: formattedPaymentMethod
      });

    } catch (error) {
      console.error('Error writing order to Firestore:', error);
      addToast('Error placing order to database. Please check your connection.', 'error');
    }
  };

  return (
    <div className="modal-overlay" onClick={closeCheckout}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '920px',
          padding: 0,
          position: 'relative'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 2rem',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-secondary)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Lock size={18} style={{ color: 'var(--accent-emerald)' }} />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Secure Encrypted Checkout</h2>
          </div>

          <button onClick={closeCheckout} className="btn-icon" style={{ width: '36px', height: '36px' }}>
            <X size={18} />
          </button>
        </div>

        {/* Multi-Step Indicator Bar */}
        <div style={{ padding: '1rem 2rem', background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '600px', margin: '0 auto' }}>
            {[
              { num: 1, label: 'Shipping' },
              { num: 2, label: 'Delivery' },
              { num: 3, label: 'Payment' },
              { num: 4, label: 'Review' }
            ].map((s, idx) => {
              const isCompleted = step > s.num;
              const isCurrent = step === s.num;

              return (
                <React.Fragment key={s.num}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: isCompleted ? 'var(--accent-emerald)' : isCurrent ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                        border: isCurrent ? '2px solid var(--accent-primary)' : '1px solid var(--border-medium)',
                        color: isCompleted || isCurrent ? '#ffffff' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.8rem',
                        fontWeight: 700
                      }}
                    >
                      {isCompleted ? <Check size={14} /> : s.num}
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: isCurrent ? 700 : 500, color: isCurrent ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                      {s.label}
                    </span>
                  </div>
                  {idx < 3 && (
                    <div style={{ flex: 1, height: '2px', background: isCompleted ? 'var(--accent-emerald)' : 'var(--border-subtle)', margin: '0 0.5rem' }} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Step Body */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', minHeight: '440px' }}>
          {/* Main Form Column */}
          <div style={{ padding: '2rem', background: 'var(--bg-secondary)', overflowY: 'auto', maxHeight: '520px' }}>
            {/* Step 1: Shipping Details */}
            {step === 1 && (
              <form onSubmit={handleNextStep}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem' }}>Shipping & Customer Contact</h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      value={shippingInfo.fullName}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                      className="form-input"
                      placeholder="e.g. Alex Morgan"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                      className="form-input"
                      placeholder="alex.morgan@novacommerce.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Street Address *</label>
                  <input
                    type="text"
                    value={shippingInfo.street}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, street: e.target.value })}
                    className="form-input"
                    placeholder="e.g. 452 Fremont Street, Apt 8B"
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">City *</label>
                    <input
                      type="text"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                      className="form-input"
                      placeholder="San Francisco"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">State / Prov</label>
                    <input
                      type="text"
                      value={shippingInfo.state}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                      className="form-input"
                      placeholder="CA"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">ZIP Code *</label>
                    <input
                      type="text"
                      value={shippingInfo.zip}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                      className="form-input"
                      placeholder="94105"
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Country</label>
                    <input
                      type="text"
                      value={shippingInfo.country}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone (for Courier Tracking)</label>
                    <input
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                      className="form-input"
                      placeholder="+1 (555) 789-2045"
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                  <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem 1.6rem' }}>
                    <span>Continue to Delivery</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            )}

            {/* Step 2: Delivery Options */}
            {step === 2 && (
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem' }}>Choose Shipping Method</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                  {[
                    {
                      id: 'standard',
                      title: 'Standard Tracked Air Delivery',
                      desc: 'Delivered in 3-5 business days with full GPS tracking',
                      cost: cartSubtotal >= 150 ? 0 : 15
                    },
                    {
                      id: 'express',
                      title: 'Express Priority Courier (FedEx / DHL)',
                      desc: 'Guaranteed 2 business day delivery with signature requirement',
                      cost: 18
                    },
                    {
                      id: 'overnight',
                      title: 'Overnight VIP Expedited',
                      desc: 'Next morning delivery with white-glove packaging',
                      cost: 32
                    }
                  ].map((method) => {
                    const isSelected = shippingMethod === method.id;
                    return (
                      <div
                        key={method.id}
                        onClick={() => setShippingMethod(method.id)}
                        style={{
                          padding: '1.25rem',
                          borderRadius: 'var(--radius-md)',
                          background: isSelected ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                          border: isSelected ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div
                            style={{
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              border: isSelected ? '5px solid var(--accent-primary)' : '2px solid var(--border-medium)',
                              background: '#fff'
                            }}
                          />
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{method.title}</div>
                            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{method.desc}</div>
                          </div>
                        </div>

                        <div style={{ fontSize: '1rem', fontWeight: 800, color: method.cost === 0 ? 'var(--accent-emerald)' : 'var(--text-primary)' }}>
                          {method.cost === 0 ? 'FREE' : formatPrice(method.cost, currency)}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button onClick={handlePrevStep} className="btn btn-secondary">
                    <ArrowLeft size={16} />
                    <span>Back</span>
                  </button>
                  <button onClick={handleNextStep} className="btn btn-primary" style={{ padding: '0.8rem 1.6rem' }}>
                    <span>Continue to Payment</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment Method */}
            {step === 3 && (
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem' }}>Select Payment Method</h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {[
                    { id: 'card', label: 'Credit Card', icon: CreditCard },
                    { id: 'applepay', label: 'Apple Pay', icon: Sparkles },
                    { id: 'paypal', label: 'PayPal', icon: ShoppingBag },
                    { id: 'cod', label: 'Cash on Del.', icon: Truck }
                  ].map((p) => {
                    const isSelected = paymentType === p.id;
                    const Icon = p.icon;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPaymentType(p.id)}
                        style={{
                          padding: '0.65rem 0.5rem',
                          borderRadius: 'var(--radius-md)',
                          background: isSelected ? 'var(--bg-tertiary)' : 'var(--bg-card)',
                          border: isSelected ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                          color: isSelected ? 'var(--accent-primary)' : 'var(--text-secondary)',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '0.35rem',
                          cursor: 'pointer'
                        }}
                      >
                        <Icon size={16} />
                        <span>{p.label}</span>
                      </button>
                    );
                  })}
                </div>

                {paymentType === 'card' && (
                  <div>
                    <CreditCardPreview
                      cardNumber={cardData.number}
                      cardHolder={cardData.name}
                      expiryDate={cardData.expiry}
                      cvv={cardData.cvv}
                    />

                    <div className="form-group">
                      <label className="form-label">Card Number</label>
                      <input
                        type="text"
                        maxLength={19}
                        placeholder="4242 •••• •••• 4242"
                        value={cardData.number}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 16);
                          setCardData({ ...cardData, number: val });
                        }}
                        className="form-input"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Cardholder Name</label>
                      <input
                        type="text"
                        placeholder="Alex Morgan"
                        value={cardData.name}
                        onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                        className="form-input"
                        required
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div className="form-group">
                        <label className="form-label">Expiry Date (MM/YY)</label>
                        <input
                          type="text"
                          maxLength={5}
                          placeholder="08/28"
                          value={cardData.expiry}
                          onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                          className="form-input"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">CVV Code</label>
                        <input
                          type="password"
                          maxLength={4}
                          placeholder="•••"
                          value={cardData.cvv}
                          onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                          className="form-input"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
                  <button onClick={handlePrevStep} className="btn btn-secondary">
                    <ArrowLeft size={16} />
                    <span>Back</span>
                  </button>
                  <button onClick={handleNextStep} className="btn btn-primary" style={{ padding: '0.8rem 1.6rem' }}>
                    <span>Review Order</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Final Review */}
            {step === 4 && (
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem' }}>Review & Place Order</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>SHIPPING ADDRESS</div>
                    <div>{shippingInfo.fullName}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {shippingInfo.street}, {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}, {shippingInfo.country}
                    </div>
                  </div>

                  <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>PAYMENT & METHOD</div>
                    <div>
                      {paymentType === 'card'
                        ? `Credit Card (•••• ${cardData.number.slice(-4) || '4242'})`
                        : paymentType === 'applepay'
                        ? 'Apple Pay'
                        : paymentType === 'paypal'
                        ? 'PayPal'
                        : 'Cash on Delivery (COD)'}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button onClick={handlePrevStep} className="btn btn-secondary">
                    <ArrowLeft size={16} />
                    <span>Back</span>
                  </button>
                  <button onClick={handleCompleteOrder} className="btn btn-emerald" style={{ padding: '0.85rem 1.8rem', fontWeight: 800 }}>
                    <ShieldCheck size={18} />
                    <span>Place Order & Pay Now</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary Side Panel */}
          <div style={{ padding: '2rem 1.5rem', background: 'var(--bg-tertiary)', borderLeft: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Order Summary ({cart.length})</h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxHeight: '200px', overflowY: 'auto', marginBottom: '1.25rem' }}>
              {cart.map((item) => (
                <div key={item.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <img src={item.image} alt={item.name} style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Qty: {item.quantity}</div>
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{formatPrice(item.price * item.quantity, currency)}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                <span>{formatPrice(cartSubtotal, currency)}</span>
              </div>
              {cartDiscount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--accent-emerald)' }}>
                  <span>Discount</span>
                  <span>-{formatPrice(cartDiscount, currency)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Shipping</span>
                <span>{currentShippingCost === 0 ? 'FREE' : formatPrice(currentShippingCost, currency)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Est. Tax</span>
                <span>{formatPrice(cartTax, currency)}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '0.75rem',
                  marginTop: '0.25rem'
                }}
              >
                <span>Total</span>
                <span style={{ color: 'var(--accent-primary)' }}>{formatPrice(finalTotal, currency)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};