import React, { useState } from 'react';
import { Sparkles, Send, CreditCard, Lock, ArrowRight, Heart } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const Footer = ({ onSelectCategory }) => {
  const { addToast } = useShop();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      addToast('Please enter a valid email address.', 'warning');
      return;
    }
    addToast('🎉 You have been subscribed! Check your inbox for your 15% VIP welcome code.', 'success');
    setEmail('');
  };

  return (
    <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', paddingTop: '4.5rem', paddingBottom: '2.5rem' }}>
      <div className="container">
        {/* Newsletter Box */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)',
            border: '1px solid var(--border-highlight)',
            borderRadius: 'var(--radius-xl)',
            padding: '2.5rem 2rem',
            marginBottom: '4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem'
          }}
        >
          <div style={{ maxWidth: '520px' }}>
            <span className="badge badge-accent" style={{ marginBottom: '0.75rem' }}>
              VIP PRIVILEGE CLUB
            </span>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Unlock 15% Off Your First Purchase
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
              Join 45,000+ tastemakers receiving exclusive early drops, limited edition releases, and member-only private sales.
            </p>
          </div>

          <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem', flex: '1', maxWidth: '420px', minWidth: '280px' }}>
            <input
              type="email"
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: 1,
                padding: '0.85rem 1.2rem',
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                fontSize: '0.9rem'
              }}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '0.85rem 1.4rem' }}>
              <span>Join</span>
              <Send size={16} />
            </button>
          </form>
        </div>

        {/* Multi-Column Links */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '3.5rem' }}>
          {/* Col 1: Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'var(--gradient-brand)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff'
                }}
              >
                <Sparkles size={16} />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                NOVA <span style={{ color: 'var(--accent-primary)', fontWeight: 400 }}>COMMERCE</span>
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Curated premium instruments, minimalist luxury apparel, and next-generation lifestyle technology engineered for elevated living.
            </p>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.2rem', color: 'var(--text-primary)' }}>
              Explore Collections
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              {['Audio & Tech', 'Smart Wearables', 'Minimalist Fashion', 'Modern Living', 'Timepieces & EDC', 'Gaming & Desk'].map((cat, idx) => (
                <li key={idx}>
                  <a
                    href="#catalog-section"
                    style={{ transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.2rem', color: 'var(--text-primary)' }}>
              Customer Experience
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              {['Track Order Status', 'Global Shipping & Customs', '30-Day Hassle-Free Returns', 'Warranty & Authenticity', 'Help Center & Concierge'].map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{ transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Corporate & Legal */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.2rem', color: 'var(--text-primary)' }}>
              Company & Legal
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              {['Our Story & Craftsmanship', 'Sustainability & Materials', 'Privacy Policy', 'Terms of Service', 'Affiliate Program'].map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{ transition: 'color 0.2s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment icons */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.82rem',
            color: 'var(--text-muted)'
          }}
        >
          <div>
            © {new Date().getFullYear()} NOVACOMMERCE INC. All rights reserved. Crafted with precision for high-performance living.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Lock size={13} style={{ color: 'var(--accent-emerald)' }} />
              <span>256-Bit SSL Encrypted Checkout</span>
            </span>
            <span>•</span>
            <span>Visa, Mastercard, Apple Pay, Amex, PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
