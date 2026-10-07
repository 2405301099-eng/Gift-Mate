import React, { useState, useEffect } from 'react';
import { fetchCategories, fetchProducts } from '../api/client';
import ProductCard from '../components/ProductCard';
import { formatINR } from '../utils/currency';

export default function FestiveCategories({ onNavigate, onOpenProductDetail }) {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function init() {
      const cats = await fetchCategories();
      setCategories(cats);
    }
    init();
  }, []);

  const handleSelectCategory = async (catId) => {
    setActiveCategory(catId);
    setLoading(true);
    try {
      const prods = await fetchProducts({ category: catId });
      setProducts(prods);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilter = () => {
    setActiveCategory(null);
    setProducts([]);
  };

  return (
    <div className="flex flex-col w-full pb-28 px-gutter-sm max-w-5xl mx-auto pt-space-sm">
      {/* Header */}
      <div className="mb-space-md">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-md text-label-md font-semibold mb-1 shadow-sm">
          <span className="material-symbols-outlined text-[16px] text-tertiary">grid_view</span>
          <span>Festive Gifting Catalog</span>
        </div>
        <h1 className="font-headline-lg-mobile sm:font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface">
          Explore by Occasion &amp; Category
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Handpicked artisanal collections curated for India’s grandest celebrations.
        </p>
      </div>

      {/* If a category is selected, show category filter banner and product cards */}
      {activeCategory ? (
        <div>
          <div className="p-space-md rounded-2xl bg-surface-container-high mb-space-md flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-space-sm">
              <span className="text-2xl">
                {categories.find(c => c.id === activeCategory)?.emoji || '🎁'}
              </span>
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">
                  {categories.find(c => c.id === activeCategory)?.name}
                </h2>
                <span className="font-body-sm text-[12px] text-on-surface-variant">
                  {products.length} Gifts Available
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleResetFilter}
              className="px-3.5 py-1.5 rounded-full bg-surface text-primary font-label-md text-[12px] font-bold shadow-sm hover:bg-surface-container"
            >
              All Categories
            </button>
          </div>

          {loading ? (
            <div className="py-12 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-4xl animate-spin text-primary">progress_activity</span>
              <p className="mt-2 font-label-md">Fetching gifts...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="py-12 text-center bg-surface-container-low rounded-2xl p-6">
              <p className="font-headline-sm text-on-surface">No gifts in this category right now</p>
              <button
                type="button"
                onClick={handleResetFilter}
                className="mt-4 px-5 py-2.5 rounded-full bg-primary text-on-primary font-label-md font-semibold"
              >
                Browse All Categories
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-space-sm sm:gap-space-md">
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
      ) : (
        /* Categories Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-md">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleSelectCategory(cat.id)}
              className="p-space-md rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md border border-outline-variant/30 hover:border-primary/40 transition-all cursor-pointer flex flex-col justify-between group active:scale-[0.98]"
            >
              <div>
                <div className="flex items-center justify-between mb-space-xs">
                  <span className="text-3xl p-2 rounded-xl bg-surface-container-low group-hover:scale-110 transition-transform">
                    {cat.emoji}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-[11px] font-bold">
                    {cat.itemCount} Items
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-snug">
                  {cat.description}
                </p>
              </div>

              <div className="mt-space-md pt-space-xs border-t border-outline-variant/20 flex items-center justify-between">
                <div>
                  <span className="font-body-sm text-[11px] text-on-surface-variant block">Starts from</span>
                  <span className="font-price-headline text-[16px] text-primary font-bold">
                    {formatINR(cat.startingPrice)}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
