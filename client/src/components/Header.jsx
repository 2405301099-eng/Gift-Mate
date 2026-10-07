import React from 'react';
import { useWishlist } from '../context/WishlistContext';

export default function Header({ onOpenDrawer, onOpenSearch, onNavigate, currentScreen }) {
  const { wishlistCount } = useWishlist();

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(38,0,89,0.05)] pt-safe">
      <div className="h-16 px-gutter-sm flex items-center justify-between gap-space-xs max-w-7xl mx-auto">
        <div className="flex items-center gap-space-sm">
          {/* Mobile Drawer Trigger Button */}
          <button 
            type="button"
            aria-label="Open navigation menu"
            onClick={onOpenDrawer}
            className="w-11 h-11 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container active:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>

          {/* Logo & Brand Identity */}
          <button 
            type="button"
            onClick={() => onNavigate('home-discovery')}
            className="flex items-center gap-space-xs text-left"
          >
            <img 
              alt="GiftMate Logo" 
              className="h-8 w-auto object-contain" 
              src="https://lh3.googleusercontent.com/aida/AEtjO1XCptS3rhCFMUq2LiBVCOxlbdhjalJov_NufXoQOrEqWcwqwLKLFne54clqG-3zExesd2fUzVjmrZLEAlWep5sy2Ef-Z1sicVDT15oiBaKS9z9JiT48U8RKjj0HqypT9GLk8oR3iPjhPoyYHr7RLjvd06XY4Vm2SHWXVX191ApkkvR3j5hbGH1Yjps3mI8tyTcDxKHaSKmyd_nsND5QlrghoThQb8dryfTa1jrXyK86" 
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight leading-none">GiftMate</span>
              <span className="font-label-md text-[10px] leading-tight text-tertiary-container font-semibold uppercase tracking-wider">Smart Gift Finder</span>
            </div>
          </button>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-space-xs">
          {/* Search Button */}
          <button 
            type="button"
            aria-label="Search gifts"
            onClick={onOpenSearch}
            className="w-11 h-11 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>

          {/* Saved Wishlist with Live Count */}
          <button 
            type="button"
            aria-label="Saved Wishlist"
            onClick={() => onNavigate('wishlist-and-compare')}
            className="w-11 h-11 relative flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[22px] text-secondary">favorite</span>
            {wishlistCount > 0 && (
              <span className="absolute top-2 right-2 min-w-[16px] h-4 px-1 rounded-full bg-secondary text-on-secondary font-label-md text-[10px] flex items-center justify-center font-bold">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Profile Avatar / Occasion Reminders Shortcut */}
          <button 
            type="button"
            aria-label="Occasion Reminders & Profile"
            onClick={() => onNavigate('festive-reminders')}
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ml-space-xs shadow-sm text-on-primary hover:opacity-90 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
}
