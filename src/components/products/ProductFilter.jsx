import React from 'react';
import { CATEGORIES } from '../../data/products';
import { SlidersHorizontal, RotateCcw, Star, Check } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { formatPrice } from '../../utils/currency';

export const ProductFilter = ({
  selectedCategory,
  onSelectCategory,
  priceRange,
  onPriceChange,
  minRating,
  onRatingChange,
  inStockOnly,
  onInStockToggle,
  sortBy,
  onSortChange,
  onResetFilters,
  activeFilterCount
}) => {
  const { currency } = useShop();

  return (
    <div
      className="glass-panel"
      style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.75rem',
        position: 'sticky',
        top: '90px'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.05rem' }}>
          <SlidersHorizontal size={18} style={{ color: 'var(--accent-primary)' }} />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="badge badge-accent" style={{ fontSize: '0.7rem', padding: '0.1rem 0.45rem' }}>
              {activeFilterCount}
            </span>
          )}
        </div>

        {activeFilterCount > 0 && (
          <button
            onClick={onResetFilters}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '0.78rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-rose)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Categories */}
      <div>
        <h4 style={{ fontSize: '0.88rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
          Categories
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.5rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  background: isSelected ? 'var(--bg-tertiary)' : 'transparent',
                  border: isSelected ? '1px solid var(--border-highlight)' : '1px solid transparent',
                  color: isSelected ? 'var(--accent-primary)' : 'var(--text-primary)',
                  fontSize: '0.86rem',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <span>{cat.name}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({cat.count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <h4 style={{ fontSize: '0.88rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>
            Max Price
          </h4>
          <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent-primary)', fontFamily: 'var(--font-display)' }}>
            {formatPrice(priceRange, currency)}
          </span>
        </div>
        <input
          type="range"
          min="100"
          max="1000"
          step="25"
          value={priceRange}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          style={{
            width: '100%',
            accentColor: 'var(--accent-primary)',
            cursor: 'pointer'
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
          <span>{formatPrice(100, currency)}</span>
          <span>{formatPrice(1000, currency)}</span>
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h4 style={{ fontSize: '0.88rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
          Minimum Rating
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {[
            { val: 0, label: 'All Ratings' },
            { val: 4.5, label: '4.5 ★ & Above' },
            { val: 4.8, label: '4.8 ★ & Above' }
          ].map((r) => {
            const isSelected = minRating === r.val;
            return (
              <button
                key={r.val}
                onClick={() => onRatingChange(r.val)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.45rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  background: isSelected ? 'var(--bg-tertiary)' : 'transparent',
                  color: isSelected ? 'var(--accent-gold)' : 'var(--text-primary)',
                  border: isSelected ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid transparent',
                  fontSize: '0.85rem',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer'
                }}
              >
                <Star size={14} fill={r.val > 0 ? '#fbbf24' : 'none'} stroke="#fbbf24" />
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* In-Stock Toggle */}
      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
          <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            In-Stock Items Only
          </span>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onInStockToggle(e.target.checked)}
            style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
          />
        </label>
      </div>
    </div>
  );
};
