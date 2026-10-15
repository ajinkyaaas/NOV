import React from 'react';
import { Headphones, Watch, Shirt, Home, Compass, Gamepad2, ArrowRight } from 'lucide-react';

const CATEGORY_TILES = [
  {
    id: 'audio',
    name: 'Audio & Tech',
    tagline: 'Lossless Studio Fidelity & ANC',
    count: '3 Products',
    icon: Headphones,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&q=80',
    color: '#6366f1'
  },
  {
    id: 'wearables',
    name: 'Smart Wearables',
    tagline: 'Titanium & Health Biometrics',
    count: '2 Products',
    icon: Watch,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&q=80',
    color: '#06b6d4'
  },
  {
    id: 'fashion',
    name: 'Minimalist Fashion',
    tagline: 'Tuscan Leather & Japanese Titanium',
    count: '2 Products',
    icon: Shirt,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
    color: '#10b981'
  },
  {
    id: 'living',
    name: 'Modern Living',
    tagline: 'Ergonomic Walnut & Ambient Light',
    count: '2 Products',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&q=80',
    color: '#f59e0b'
  },
  {
    id: 'gaming',
    name: 'Gaming & Desk Gear',
    tagline: 'Magnetic Hall Effect & 8000Hz',
    count: '2 Products',
    icon: Gamepad2,
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&q=80',
    color: '#8b5cf6'
  },
  {
    id: 'timepieces',
    name: 'Timepieces & EDC',
    tagline: 'Mechanical Skeleton Calibre',
    count: '1 Product',
    icon: Compass,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&q=80',
    color: '#ec4899'
  }
];

export const CategoriesGrid = ({ onSelectCategory, activeCategory }) => {
  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-subtitle">Curated Departments</div>
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-description">
            Explore meticulously designed ecosystems crafted with aerospace materials and uncompromising precision.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {CATEGORY_TILES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  const el = document.getElementById('catalog-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  position: 'relative',
                  height: '220px',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: isSelected ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                  boxShadow: isSelected ? 'var(--shadow-glow)' : 'var(--shadow-md)',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1)';
                }}
              >
                {/* Background Image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    filter: 'brightness(0.55)'
                  }}
                />

                {/* Dark Gradient Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(10,11,14,0.1) 0%, rgba(10,11,14,0.85) 100%)'
                  }}
                />

                {/* Content Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    zIndex: 2,
                    color: '#ffffff'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        background: 'rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(10px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Icon size={18} />
                    </div>
                    <span style={{ fontSize: '0.75rem', background: 'rgba(0,0,0,0.4)', padding: '0.2rem 0.55rem', borderRadius: 'var(--radius-full)' }}>
                      {cat.count}
                    </span>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.2rem', color: '#ffffff' }}>
                      {cat.name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <p style={{ fontSize: '0.8rem', color: '#cbd5e1', margin: 0 }}>
                        {cat.tagline}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--accent-primary)', fontSize: '0.82rem', fontWeight: 700 }}>
                        <span>Explore</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
