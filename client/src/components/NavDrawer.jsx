import React from 'react';
import { useWishlist } from '../context/WishlistContext';

export default function NavDrawer({ isOpen, onClose, onNavigate, currentScreen }) {
  const { wishlistCount } = useWishlist();

  const handleNav = (screenId) => {
    onNavigate(screenId);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        id="drawer-backdrop"
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-on-surface/30 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Aside Drawer */}
      <aside 
        id="nav-drawer"
        className={`fixed top-0 bottom-0 left-0 w-80 max-w-[85vw] z-50 bg-surface/95 backdrop-blur-2xl shadow-[0_20px_45px_-8px_rgba(76,29,149,0.22)] transition-transform duration-300 ease-out flex flex-col pt-safe pb-safe ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-space-lg flex items-center justify-between border-b border-outline-variant/20">
          <div className="flex items-center gap-space-sm">
            <img 
              alt="GiftMate Logo" 
              className="h-8 w-auto object-contain" 
              src="https://lh3.googleusercontent.com/aida/AEtjO1XCptS3rhCFMUq2LiBVCOxlbdhjalJov_NufXoQOrEqWcwqwLKLFne54clqG-3zExesd2fUzVjmrZLEAlWep5sy2Ef-Z1sicVDT15oiBaKS9z9JiT48U8RKjj0HqypT9GLk8oR3iPjhPoyYHr7RLjvd06XY4Vm2SHWXVX191ApkkvR3j5hbGH1Yjps3mI8tyTcDxKHaSKmyd_nsND5QlrghoThQb8dryfTa1jrXyK86" 
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary leading-tight">GiftMate</span>
              <span className="font-label-md text-label-md text-tertiary font-medium">Festive AI Assistant</span>
            </div>
          </div>
          <button 
            type="button"
            aria-label="Close navigation"
            onClick={onClose}
            className="w-11 h-11 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container active:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Currency & Edition pill */}
        <div className="px-space-lg py-space-xs">
          <div className="p-space-sm rounded-DEFAULT bg-surface-container-low flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">Indian Festive Edition</span>
            <span className="font-price-headline text-[15px] text-tertiary-container font-bold">INR (₹)</span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto px-space-md py-space-sm flex flex-col gap-1">
          <button 
            type="button"
            onClick={() => handleNav('home-discovery')}
            className={`flex items-center gap-space-md px-space-md h-12 rounded-full text-left transition-colors ${
              currentScreen === 'home-discovery' ? 'bg-surface-container text-primary font-bold' : 'text-on-surface hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-primary text-[22px]">home</span>
            <span className="font-label-lg text-label-lg">Home</span>
          </button>

          <button 
            type="button"
            onClick={() => handleNav('ai-gift-finder')}
            className={`flex items-center justify-between px-space-md h-12 rounded-full text-left transition-colors ${
              currentScreen === 'ai-gift-finder' ? 'bg-surface-container text-primary font-bold' : 'text-on-surface hover:bg-surface-container'
            }`}
          >
            <div className="flex items-center gap-space-md">
              <span className="material-symbols-outlined text-primary-container text-[22px]">auto_awesome</span>
              <span className="font-label-lg text-label-lg">Find a Gift</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-label-md font-bold uppercase tracking-wider">
              AI Magic
            </span>
          </button>

          <button 
            type="button"
            onClick={() => handleNav('festive-categories')}
            className={`flex items-center gap-space-md px-space-md h-12 rounded-full text-left transition-colors ${
              currentScreen === 'festive-categories' ? 'bg-surface-container text-primary font-bold' : 'text-on-surface hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-on-surface-variant text-[22px]">grid_view</span>
            <span className="font-label-lg text-label-lg">Categories</span>
          </button>

          <button 
            type="button"
            onClick={() => handleNav('curated-recommendations')}
            className={`flex items-center gap-space-md px-space-md h-12 rounded-full text-left transition-colors ${
              currentScreen === 'curated-recommendations' ? 'bg-surface-container text-primary font-bold' : 'text-on-surface hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-tertiary text-[22px]">recommend</span>
            <span className="font-label-lg text-label-lg">Recommendations</span>
          </button>

          <button 
            type="button"
            onClick={() => handleNav('wishlist-and-compare')}
            className={`flex items-center justify-between px-space-md h-12 rounded-full text-left transition-colors ${
              currentScreen === 'wishlist-and-compare' ? 'bg-surface-container text-primary font-bold' : 'text-on-surface hover:bg-surface-container'
            }`}
          >
            <div className="flex items-center gap-space-md">
              <span className="material-symbols-outlined text-secondary text-[22px]">compare_arrows</span>
              <span className="font-label-lg text-label-lg">Compare &amp; Wishlist</span>
            </div>
            {wishlistCount > 0 && (
              <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-primary-container text-on-primary font-label-md text-[11px] flex items-center justify-center font-bold">
                {wishlistCount}
              </span>
            )}
          </button>

          <button 
            type="button"
            onClick={() => handleNav('festive-reminders')}
            className={`flex items-center justify-between px-space-md h-12 rounded-full text-left transition-colors ${
              currentScreen === 'festive-reminders' ? 'bg-surface-container text-primary font-bold' : 'text-on-surface hover:bg-surface-container'
            }`}
          >
            <div className="flex items-center gap-space-md">
              <span className="material-symbols-outlined text-on-surface-variant text-[22px]">event_upcoming</span>
              <span className="font-label-lg text-label-lg">Occasion Reminders</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
          </button>

          <button 
            type="button"
            onClick={() => handleNav('ai-conversation')}
            className={`flex items-center gap-space-md px-space-md h-12 rounded-full text-left transition-colors ${
              currentScreen === 'ai-conversation' ? 'bg-surface-container text-primary font-bold' : 'text-on-surface hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-primary text-[22px]">smart_toy</span>
            <span className="font-label-lg text-label-lg">GiftMate Assistant</span>
          </button>
        </nav>

        {/* Footer callout banner */}
        <div className="p-space-lg">
          <div className="p-space-md rounded-lg bg-surface-container-high flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-tertiary text-[24px]">celebration</span>
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-on-surface font-semibold">Diwali &amp; Wedding Gifting</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Personalized in Seconds</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
