import React from 'react';
import { Wifi, Sparkles } from 'lucide-react';

export const CreditCardPreview = ({
  cardNumber = '',
  cardHolder = '',
  expiryDate = '',
  cvv = '',
  isFlipped = false
}) => {
  // Format Card Number into 4-digit chunks
  const formattedNumber = cardNumber
    ? cardNumber.padEnd(16, '•').replace(/(.{4})/g, '$1 ').trim()
    : '•••• •••• •••• ••••';

  // Determine card brand
  const getBrand = () => {
    if (cardNumber.startsWith('4')) return 'VISA';
    if (cardNumber.startsWith('5')) return 'MASTERCARD';
    if (cardNumber.startsWith('3')) return 'AMEX';
    return 'CREDIT CARD';
  };

  return (
    <div
      style={{
        perspective: '1000px',
        width: '100%',
        maxWidth: '360px',
        margin: '0 auto 1.5rem auto'
      }}
    >
      <div
        style={{
          width: '100%',
          height: '210px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4338ca 70%, #6366f1 100%)',
          boxShadow: '0 15px 35px rgba(49, 46, 129, 0.45)',
          padding: '1.5rem',
          color: '#ffffff',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          overflow: 'hidden'
        }}
      >
        {/* Background ambient shine */}
        <div
          style={{
            position: 'absolute',
            top: '-50%',
            right: '-30%',
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        {/* Top: Chip & Wifi & Brand */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Holographic Chip */}
            <div
              style={{
                width: '42px',
                height: '32px',
                borderRadius: '6px',
                background: 'linear-gradient(135deg, #ffd700 0%, #d4af37 50%, #f3e5ab 100%)',
                border: '1px solid rgba(0,0,0,0.2)',
                boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.5)'
              }}
            />
            <Wifi size={18} style={{ transform: 'rotate(90deg)', opacity: 0.8 }} />
          </div>

          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.1em', opacity: 0.9 }}>
            {getBrand()}
          </div>
        </div>

        {/* Middle: 16-digit Card Number */}
        <div style={{ zIndex: 2 }}>
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: '1.25rem',
              letterSpacing: '0.15em',
              fontWeight: 700,
              textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}
          >
            {formattedNumber}
          </div>
        </div>

        {/* Bottom: Cardholder Name & Expiry Date */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', zIndex: 2 }}>
          <div>
            <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.7 }}>
              Cardholder Name
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.92rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                maxWidth: '200px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {cardHolder || 'FULL NAME'}
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.7 }}>
              Expires
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '0.92rem', fontWeight: 700 }}>
              {expiryDate || 'MM/YY'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
