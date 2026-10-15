import React from 'react';
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Calendar,
  CreditCard,
  Printer,
  Sparkles,
  X,
  ExternalLink
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { formatPrice } from '../../utils/currency';

export const OrderSuccessModal = () => {
  const {
    orderSuccessData,
    setOrderSuccessData,
    trackingOrderData,
    closeOrderTracking,
    currency
  } = useShop();

  const order = orderSuccessData || trackingOrderData;
  const isTrackingOnly = !orderSuccessData && !!trackingOrderData;

  if (!order) return null;

  const handleClose = () => {
    if (orderSuccessData) setOrderSuccessData(null);
    if (trackingOrderData) closeOrderTracking();
  };

  const handlePrint = () => {
    window.print();
  };

  // Tracking Stages
  const trackingStages = [
    { title: 'Order Confirmed', date: order.date, completed: true },
    { title: 'Quality Inspection & Packed', date: 'Same Day', completed: true },
    { title: 'Dispatched via Air Courier', date: 'In Transit', completed: order.status === 'Delivered' || order.status === 'In Transit' },
    { title: 'Delivered to Address', date: 'Expected in 2-3 Days', completed: order.status === 'Delivered' }
  ];

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '680px',
          padding: '2.5rem 2rem',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={17} />
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: 'var(--accent-emerald)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto'
            }}
          >
            <CheckCircle2 size={36} />
          </div>

          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.35rem' }}>
            {isTrackingOnly ? 'Live Order Tracking' : 'Thank You for Your Order!'}
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
            {isTrackingOnly
              ? `Real-time dispatch timeline for Order #${order.id}`
              : `Your luxury package is being prepared. Confirmation sent to your email.`}
          </p>
        </div>

        {/* Order Meta Header */}
        <div
          style={{
            background: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1.75rem'
          }}
        >
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Order Number</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-primary)', fontFamily: 'monospace' }}>
              #{order.id}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Tracking Code</div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, fontFamily: 'monospace' }}>
              {order.trackingNumber}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Amount</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
              {formatPrice(order.total, currency)}
            </div>
          </div>
        </div>

        {/* Tracking Timeline Progress */}
        <div style={{ marginBottom: '2rem', padding: '1.25rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Truck size={17} style={{ color: 'var(--accent-primary)' }} />
            <span>Delivery Timeline</span>
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {trackingStages.map((stage, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', position: 'relative' }}>
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: stage.completed ? 'var(--accent-emerald)' : 'var(--bg-tertiary)',
                    border: stage.completed ? 'none' : '2px solid var(--border-medium)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    zIndex: 2
                  }}
                >
                  {stage.completed ? <CheckCircle2 size={14} /> : idx + 1}
                </div>

                {idx < trackingStages.length - 1 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '24px',
                      left: '11px',
                      width: '2px',
                      height: 'calc(100% + 4px)',
                      background: stage.completed ? 'var(--accent-emerald)' : 'var(--border-subtle)',
                      zIndex: 1
                    }}
                  />
                )}

                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: stage.completed ? 700 : 500, color: stage.completed ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                    {stage.title}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{stage.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Items Summary */}
        <div style={{ marginBottom: '1.75rem' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Purchased Items ({order.items?.length || 0})
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {order.items?.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.6rem 0.8rem',
                  background: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '38px', height: '38px', borderRadius: '4px', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{item.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Qty: {item.quantity} • {item.color}</div>
                  </div>
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>
                  {formatPrice(item.price * item.quantity, currency)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <button onClick={handlePrint} className="btn btn-secondary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}>
            <Printer size={15} />
            <span>Print Invoice Receipt</span>
          </button>
          <button onClick={handleClose} className="btn btn-primary" style={{ padding: '0.65rem 1.5rem', fontSize: '0.85rem' }}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};
