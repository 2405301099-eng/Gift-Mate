import React, { useState } from 'react';
import { useWishlist } from '../context/WishlistContext';
import { formatINR } from '../utils/currency';
import { checkPincode } from '../api/client';

export default function ProductDetailModal({ product, isOpen, onClose, onNavigate }) {
  const { isSaved, toggleItem } = useWishlist();
  const [pincode, setPincode] = useState('');
  const [pinResult, setPinResult] = useState(null);
  const [isCheckingPin, setIsCheckingPin] = useState(false);

  if (!isOpen || !product) return null;

  const saved = isSaved(product.id);

  const handleSave = () => {
    toggleItem(product);
    onClose();
  };

  const handleCompare = () => {
    if (!saved) {
      toggleItem(product);
    }
    onClose();
    onNavigate('wishlist-and-compare');
  };

  const handleCheckPincode = async (e) => {
    e.preventDefault();
    if (!pincode || pincode.length !== 6) return;
    setIsCheckingPin(true);
    try {
      const res = await checkPincode(pincode);
      setPinResult(res);
    } catch (err) {
      console.warn('Pincode check error:', err);
    } finally {
      setIsCheckingPin(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-on-surface/40 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div 
        className="bg-surface-container-lowest w-full max-w-md rounded-t-3xl sm:rounded-3xl p-space-lg shadow-2xl relative flex flex-col max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-space-sm">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">verified</span>
            <span className="font-label-md text-label-md text-primary font-bold">Curated Festive Selection</span>
          </div>
          <button 
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Product image if available */}
        {product.image && (
          <div className="w-full h-44 rounded-2xl overflow-hidden mb-space-sm bg-surface-container">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <h3 className="font-headline-md text-headline-md text-on-surface mb-1">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-2 mb-space-sm">
          <span className="font-price-headline text-price-headline text-secondary font-bold">
            {formatINR(product.price)}
          </span>
          {product.originalPrice && (
            <span className="font-body-sm text-[13px] text-outline line-through">
              {formatINR(product.originalPrice)}
            </span>
          )}
          {product.badge && (
            <span className="ml-auto px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-[11px] font-bold">
              {product.badge}
            </span>
          )}
        </div>

        <p className="font-body-md text-body-md text-on-surface-variant mb-space-md leading-relaxed">
          {product.description}
        </p>

        {/* Festive Packaging & Delivery Highlights */}
        <div className="flex flex-col gap-space-xs mb-space-md p-space-sm rounded-xl bg-surface-container-low">
          <div className="flex items-center gap-2 text-on-surface font-label-md text-label-md">
            <span className="material-symbols-outlined text-[18px] text-secondary flex-shrink-0">redeem</span>
            <span>{product.packaging || 'Complimentary Festive Velvet Box + Wax Sealed Envelope'}</span>
          </div>
          <div className="flex items-center gap-2 text-on-surface font-label-md text-label-md">
            <span className="material-symbols-outlined text-[18px] text-primary flex-shrink-0">local_shipping</span>
            <span>{product.deliveryTime || 'Dispatch within 24 Hours via Bluedart / Delhivery'}</span>
          </div>
          <div className="flex items-center gap-2 text-on-surface font-label-md text-label-md">
            <span className="material-symbols-outlined text-[18px] text-tertiary-container flex-shrink-0">workspace_premium</span>
            <span>Personalization: {product.personalizationDepth || 'High (Custom Note & Wax Seal)'}</span>
          </div>
        </div>

        {/* PIN Code Delivery Checker */}
        <form onSubmit={handleCheckPincode} className="mb-space-md flex flex-col gap-1.5">
          <label htmlFor="pincode-input" className="font-label-md text-[12px] text-on-surface-variant font-semibold">
            Check Express Delivery to PIN Code:
          </label>
          <div className="flex gap-2">
            <input 
              id="pincode-input"
              type="text" 
              placeholder="e.g. 110001, 560001" 
              maxLength={6}
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
              className="flex-1 px-3 py-2 rounded-xl bg-surface border border-outline-variant/60 font-body-md text-[13px] text-on-surface focus:outline-none focus:border-primary"
            />
            <button 
              type="submit"
              disabled={pincode.length !== 6 || isCheckingPin}
              className="px-4 py-2 rounded-xl bg-surface-container-high text-primary font-label-md text-[12px] font-bold hover:bg-primary hover:text-on-primary transition-colors disabled:opacity-50"
            >
              {isCheckingPin ? 'Checking...' : 'Check'}
            </button>
          </div>
          {pinResult && (
            <div className="p-2 rounded-lg bg-surface-container text-[12px] text-primary flex items-center justify-between">
              <span>📍 {pinResult.city}: Delivery in <strong>{pinResult.estimatedDelivery}</strong></span>
              <span className="font-bold text-secondary">Free Wrap</span>
            </div>
          )}
        </form>

        {/* Action buttons matching Stitch UI */}
        <div className="flex gap-space-sm pt-2">
          <button 
            type="button"
            onClick={handleSave}
            className={`flex-1 py-3 rounded-full font-label-lg text-label-lg font-bold flex items-center justify-center gap-1 active:scale-95 transition-all ${
              saved 
                ? 'bg-secondary text-on-secondary shadow-sm' 
                : 'bg-surface-container text-primary hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {saved ? 'favorite' : 'favorite_border'}
            </span>
            <span>{saved ? 'Saved' : 'Save'}</span>
          </button>

          <button 
            type="button"
            onClick={handleCompare}
            className="flex-1 py-3 rounded-full bg-primary text-on-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-1 shadow-md hover:bg-primary-container active:scale-95 transition-all"
          >
            <span>Compare Gift</span>
            <span className="material-symbols-outlined text-[18px]">compare_arrows</span>
          </button>
        </div>
      </div>
    </div>
  );
}
