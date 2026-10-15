import React, { useState, useEffect } from 'react';
import { Tag, Sparkles, Copy, Check, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const TopBanner = () => {
  const { applyCoupon } = useShop();
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const copyCode = () => {
    navigator.clipboard?.writeText('WELCOME20');
    setCopied(true);
    applyCoupon('WELCOME20');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div style={{
      background: 'linear-gradient(90deg, #4f46e5 0%, #7c3aed 50%, #db2777 100%)',
      color: '#ffffff',
      padding: '0.55rem 1rem',
      fontSize: '0.85rem',
      fontWeight: 500
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            background: 'rgba(255,255,255,0.2)',
            padding: '0.15rem 0.5rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.05em'
          }}>
            FLASH SALE
          </span>
          <span>Limited Time: Get <strong>20% OFF</strong> on all Flagship Collections</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontFamily: 'monospace', fontWeight: 700 }}>
            <span>Ends in:</span>
            <span style={{ background: 'rgba(0,0,0,0.3)', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>
              {String(timeLeft.hours).padStart(2, '0')}h
            </span>
            :
            <span style={{ background: 'rgba(0,0,0,0.3)', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>
              {String(timeLeft.minutes).padStart(2, '0')}m
            </span>
            :
            <span style={{ background: 'rgba(0,0,0,0.3)', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>
              {String(timeLeft.seconds).padStart(2, '0')}s
            </span>
          </div>

          <button
            onClick={copyCode}
            style={{
              background: 'rgba(255,255,255,0.95)',
              color: '#4f46e5',
              border: 'none',
              padding: '0.2rem 0.65rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.75rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            <span>{copied ? 'APPLIED (WELCOME20)' : 'CODE: WELCOME20'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
