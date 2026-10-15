import React, { useState, useEffect } from 'react';
import { ShoppingBag, Sparkles, X } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

const RECENT_ACTIVITIES = [
  { name: 'Sarah K.', city: 'New York, USA', product: 'Quantum Pulse ANC Studio Headphones', time: '2 mins ago', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80' },
  { name: 'David M.', city: 'London, UK', product: 'Chronos Apex Titanium Smartwatch', time: '4 mins ago', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80' },
  { name: 'Kenji S.', city: 'Tokyo, Japan', product: 'CyberBlade Magnetic Keyboard', time: '6 mins ago', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=100&q=80' },
  { name: 'Lucas P.', city: 'Berlin, Germany', product: 'Vanguard Minimalist Leather Backpack', time: '9 mins ago', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&q=80' }
];

export const LiveTicker = () => {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    if (isClosed) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % RECENT_ACTIVITIES.length);
        setIsVisible(true);
      }, 500);
    }, 9000);

    return () => clearInterval(interval);
  }, [isClosed]);

  if (isClosed || !isVisible) return null;

  const current = RECENT_ACTIVITIES[index];

  return (
    <div className="live-ticker">
      <img
        src={current.image}
        alt={current.product}
        style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover' }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          <strong>{current.name}</strong> ({current.city})
        </div>
        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          Purchased {current.product}
        </div>
        <div style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
          ● {current.time}
        </div>
      </div>
      <button
        onClick={() => setIsClosed(true)}
        style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px' }}
      >
        <X size={13} />
      </button>
    </div>
  );
};
