import React from 'react';
import { Truck, RotateCcw, Headphones, ShieldCheck } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { formatPrice } from '../../utils/currency';

export const BenefitsBar = () => {
  const { currency } = useShop();
  const benefits = [
    {
      icon: Truck,
      title: 'Free Express Global Delivery',
      description: `On all orders above ${formatPrice(150, currency)} with tracked air courier`
    },
    {
      icon: RotateCcw,
      title: '30-Day Trial Guarantee',
      description: 'Hassle-free worldwide returns & full refunds'
    },
    {
      icon: Headphones,
      title: '24/7 Dedicated Concierge',
      description: 'Live support via WhatsApp, phone, or instant chat'
    },
    {
      icon: ShieldCheck,
      title: 'Military-Grade Security',
      description: '256-bit SSL encrypted checkout & biometric pay'
    }
  ];

  return (
    <section style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-secondary)', padding: '2.5rem 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  padding: '0.5rem'
                }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(99, 102, 241, 0.12)',
                    border: '1px solid rgba(99, 102, 241, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-primary)',
                    flexShrink: 0
                  }}
                >
                  <Icon size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 700, marginBottom: '0.2rem', color: 'var(--text-primary)' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
