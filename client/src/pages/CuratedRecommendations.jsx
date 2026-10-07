import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../api/client';

export default function CuratedRecommendations({ onNavigate, onOpenProductDetail }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('featured');
  const [occasionFilter, setOccasionFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const occasions = [
    { id: 'all', label: 'All Gifts' },
    { id: 'diwali', label: 'Diwali' },
    { id: 'wedding', label: 'Weddings' },
    { id: 'anniversary', label: 'Anniversary' },
    { id: 'birthday', label: 'Birthday' },
    { id: 'corporate', label: 'Corporate' }
  ];

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetchProducts({
        occasion: occasionFilter !== 'all' ? occasionFilter : undefined,
        sort: sortOption !== 'featured' ? sortOption : undefined,
        search: searchQuery || undefined
      });
      setProducts(res);
      setLoading(false);
    }
    load();
  }, [occasionFilter, sortOption, searchQuery]);

  return (
    <div className="flex flex-col w-full pb-28 px-gutter-sm max-w-5xl mx-auto pt-space-sm">
      {/* Title */}
      <div className="mb-space-md">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-md text-label-md font-semibold mb-1 shadow-sm">
          <span className="material-symbols-outlined text-[16px] text-tertiary">recommend</span>
          <span>Curated Festive Selections</span>
        </div>
        <h1 className="font-headline-lg-mobile sm:font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface">
          All Handpicked Recommendations
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Artisanal items verified for presentation, authentic wax seals, and express Indian delivery.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-space-sm mb-space-md">
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Search Input */}
          <div className="relative flex-1">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-[20px]">
              search
            </span>
            <input 
              type="text"
              placeholder="Search gifts, candles, hampers, tea..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-surface-container-lowest border border-outline-variant/60 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary shadow-sm"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="font-label-md text-label-md text-on-surface-variant whitespace-nowrap">
              Sort by:
            </label>
            <select
              id="sort-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-3.5 py-2.5 rounded-full bg-surface-container-lowest border border-outline-variant/60 font-label-md text-label-md text-on-surface focus:outline-none focus:border-primary shadow-sm"
            >
              <option value="featured">Featured / AI Ranked</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>
        </div>

        {/* Occasion Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {occasions.map((occ) => (
            <button
              key={occ.id}
              type="button"
              onClick={() => setOccasionFilter(occ.id)}
              className={`px-3.5 py-1.5 rounded-full font-label-md text-[13px] whitespace-nowrap transition-all ${
                occasionFilter === occ.id
                  ? 'bg-primary text-on-primary font-bold shadow-sm'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
              }`}
            >
              {occ.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="py-16 text-center text-on-surface-variant">
          <span className="material-symbols-outlined text-4xl animate-spin text-primary">progress_activity</span>
          <p className="mt-2 font-label-md">Curating gifts for you...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="py-16 text-center bg-surface-container-low rounded-3xl p-8">
          <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">search_off</span>
          <h2 className="font-headline-sm text-headline-sm text-on-surface">No gifts match your query</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Try resetting your search filters or browse trending gifts.
          </p>
          <button
            type="button"
            onClick={() => { setSearchQuery(''); setOccasionFilter('all'); }}
            className="mt-4 px-6 py-2.5 rounded-full bg-primary text-on-primary font-label-md font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-space-sm sm:gap-space-md">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onViewDetails={onOpenProductDetail} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
