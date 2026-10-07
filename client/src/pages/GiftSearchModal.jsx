import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../api/client';
import { formatINR } from '../utils/currency';

export default function GiftSearchModal({ isOpen, onClose, onOpenProductDetail }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const quickSearches = ['Diwali Hampers', 'Photo Frame', 'Earbuds', 'Soy Candles', 'Under ₹1000', 'Heirloom'];

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      if (query.trim()) {
        setIsSearching(true);
        const data = await fetchProducts({ search: query });
        setResults(data);
        setIsSearching(false);
      } else {
        setResults([]);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query, isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 bg-on-surface/40 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div 
        className="bg-surface-container-lowest w-full max-w-lg rounded-3xl p-space-md shadow-2xl relative flex flex-col max-h-[85vh] animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-2 p-1.5 rounded-full bg-surface-container-low border border-outline-variant/60 mb-space-sm">
          <span className="material-symbols-outlined text-[22px] text-primary ml-2">search</span>
          <input 
            type="text"
            placeholder="Search gifts, recipients, or occasions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 px-2 py-1.5 bg-transparent font-body-md text-body-md text-on-surface focus:outline-none"
          />
          {query && (
            <button 
              type="button" 
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[18px]">clear</span>
            </button>
          )}
          <button 
            type="button" 
            onClick={onClose}
            className="px-3 py-1.5 rounded-full bg-surface-container text-primary font-label-md text-[12px] font-bold"
          >
            Cancel
          </button>
        </div>

        {/* Quick searches chips */}
        <div className="flex flex-wrap gap-1.5 mb-space-sm px-1">
          {quickSearches.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setQuery(item.replace('Under ₹1000', '1000'))}
              className="px-2.5 py-1 rounded-full bg-surface-container-low text-on-surface-variant hover:text-primary font-label-md text-[11px] hover:bg-surface-container transition-colors"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar max-h-96">
          {isSearching ? (
            <div className="py-8 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-3xl animate-spin text-primary">progress_activity</span>
              <p className="mt-1 font-label-md text-sm">Searching festive gifts...</p>
            </div>
          ) : query && results.length === 0 ? (
            <div className="py-8 text-center text-on-surface-variant">
              <p className="font-body-md">No gifts found for "{query}".</p>
              <p className="text-sm mt-1">Try "Diwali", "Candle", or "Hamper".</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {results.map((prod) => (
                <div 
                  key={prod.id}
                  onClick={() => {
                    onOpenProductDetail(prod);
                    onClose();
                  }}
                  className="p-2.5 rounded-2xl bg-surface-container-low hover:bg-surface-container flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-label-md text-[13px] text-on-surface font-bold line-clamp-1">
                        {prod.name}
                      </h4>
                      <span className="font-body-sm text-[11px] text-on-surface-variant">
                        {prod.categoryName} • ⭐ {prod.rating}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="font-price-headline text-[15px] text-primary font-bold block">
                      {formatINR(prod.price)}
                    </span>
                    <span className="text-[10px] text-secondary font-bold">View Gift &gt;</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
