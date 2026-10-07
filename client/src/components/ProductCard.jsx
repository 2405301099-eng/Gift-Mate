import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { formatINR } from '../utils/currency';

export default function ProductCard({ product, onViewDetails, showMatchScore = false }) {
  const { isSaved, toggleItem } = useWishlist();
  const saved = isSaved(product.id);

  const getBadgeStyle = (badge) => {
    if (!badge) return 'bg-primary text-on-primary';
    if (badge.includes('OFF')) return 'bg-secondary text-on-secondary';
    if (badge.includes('Tech')) return 'bg-primary text-on-primary';
    if (badge.includes('Handcrafted')) return 'bg-tertiary-container text-on-tertiary';
    if (badge.includes('Bestseller')) return 'bg-amber-600 text-white';
    return 'bg-secondary-container text-on-secondary-container';
  };

  return (
    <div className="flex flex-col rounded-2xl bg-surface-container-lowest shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden relative group">
      {/* Floating Discount / Tag Badge */}
      <div className={`absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full font-label-md text-[10px] font-bold shadow-sm ${getBadgeStyle(product.badge)}`}>
        {product.badge || 'Curated'}
      </div>

      {/* Floating Wishlist Heart Button */}
      <button 
        type="button"
        aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
        onClick={(e) => {
          e.stopPropagation();
          toggleItem(product);
        }}
        className={`absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center shadow-sm active:scale-90 transition-transform ${
          saved ? 'text-secondary' : 'text-on-surface-variant hover:text-secondary'
        }`}
      >
        <span 
          className="material-symbols-outlined text-[16px]"
          style={saved ? { fontVariationSettings: "'FILL' 1" } : {}}
        >
          {saved ? 'favorite' : 'favorite'}
        </span>
      </button>

      {/* Product Image */}
      <div 
        className="w-full h-36 relative overflow-hidden bg-surface-container cursor-pointer"
        onClick={() => onViewDetails(product)}
      >
        <img 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          src={product.image} 
          alt={product.name}
          loading="lazy"
        />
        {showMatchScore && product.matchScore && (
          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-primary/90 backdrop-blur-sm text-on-primary font-label-md text-[10px] font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px] text-tertiary-fixed">auto_awesome</span>
            <span>{product.matchScore}% Match</span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-3 flex flex-col flex-1 justify-between">
        <div>
          {/* AI Reason Badge */}
          <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-surface-container text-primary font-label-md text-[10px] mb-1 max-w-full truncate">
            <span className="material-symbols-outlined text-[12px] flex-shrink-0">auto_awesome</span>
            <span className="truncate">{product.aiTag || product.categoryName || 'Curated Festive Choice'}</span>
          </div>

          <h3 
            className="font-label-lg text-label-lg text-on-surface font-semibold line-clamp-2 leading-tight cursor-pointer hover:text-primary transition-colors"
            onClick={() => onViewDetails(product)}
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1">
            <span 
              className="material-symbols-outlined text-[14px] text-tertiary-container" 
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span className="font-label-md text-[11px] font-bold text-on-surface">
              {product.rating || '4.9'}
            </span>
            <span className="font-body-sm text-[10px] text-on-surface-variant">
              ({product.reviewCount ? (product.reviewCount > 999 ? `${(product.reviewCount/1000).toFixed(1)}k` : product.reviewCount) : '850'})
            </span>
          </div>
        </div>

        <div className="mt-2.5">
          <div className="flex items-baseline gap-1.5">
            <span className="font-price-headline text-price-headline text-on-surface font-bold">
              {formatINR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="font-body-sm text-[11px] text-outline line-through">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>

          <button 
            type="button"
            onClick={() => onViewDetails(product)}
            className="w-full mt-2 py-2 rounded-full bg-surface-container-high hover:bg-primary hover:text-on-primary text-primary font-label-md text-label-md font-semibold transition-colors flex items-center justify-center gap-1 active:scale-95"
          >
            <span>View Gift</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
