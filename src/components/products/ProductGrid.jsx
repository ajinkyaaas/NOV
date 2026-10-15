import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import { LayoutGrid, List, SlidersHorizontal, ArrowUpDown, Sparkles } from 'lucide-react';

export const ProductGrid = ({ products, activeCategoryName, onResetFilters }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');

  // Sorting
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
    return 0; // 'featured'
  });

  return (
    <div>
      {/* Top Bar: Results Count, Sort Dropdown, View Mode Switcher */}
      <div
        className="glass-panel"
        style={{
          padding: '0.85rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.75rem'
        }}
      >
        <div>
          <span style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
            Showing <strong style={{ color: 'var(--text-primary)' }}>{sortedProducts.length}</strong> products in <strong style={{ color: 'var(--accent-primary)' }}>{activeCategoryName}</strong>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Sort Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.4rem 0.75rem',
                fontSize: '0.85rem',
                color: 'var(--text-primary)',
                cursor: 'pointer'
              }}
            >
              <option value="featured">Featured & Trending</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated (★)</option>
              <option value="reviews">Most Popular</option>
            </select>
          </div>

          {/* View Switcher (Grid / List) */}
          <div style={{ display: 'flex', gap: '0.25rem', background: 'var(--bg-tertiary)', padding: '3px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                background: viewMode === 'grid' ? 'var(--bg-card-hover)' : 'transparent',
                color: viewMode === 'grid' ? 'var(--accent-primary)' : 'var(--text-muted)',
                border: 'none',
                padding: '0.35rem 0.5rem',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
              title="Grid View"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                background: viewMode === 'list' ? 'var(--bg-card-hover)' : 'transparent',
                color: viewMode === 'list' ? 'var(--accent-primary)' : 'var(--text-muted)',
                border: 'none',
                padding: '0.35rem 0.5rem',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
              title="List View"
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {sortedProducts.length === 0 ? (
        <div
          className="glass-panel"
          style={{
            padding: '4rem 2rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(99, 102, 241, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-primary)'
            }}
          >
            <Sparkles size={28} />
          </div>
          <h3 style={{ fontSize: '1.4rem' }}>No Products Found</h3>
          <p style={{ color: 'var(--text-muted)', maxWidth: '400px' }}>
            We couldn't find any products matching your selected filters. Try broadening your criteria.
          </p>
          <button onClick={onResetFilters} className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
            Reset All Filters
          </button>
        </div>
      ) : (
        /* Products List/Grid */
        <div className={viewMode === 'grid' ? 'products-grid' : 'products-list'}>
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  );
};
