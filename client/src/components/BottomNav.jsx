import React from 'react';
import { useWishlist } from '../context/WishlistContext';

export default function BottomNav({ currentScreen, onNavigate }) {
  const { wishlistCount } = useWishlist();

  const navItems = [
    {
      id: 'home-discovery',
      label: 'Home',
      icon: 'home',
      badge: null
    },
    {
      id: 'ai-gift-finder',
      label: 'Finder',
      icon: 'magic_button',
      customIcon: (
        <div className="relative flex items-center justify-center">
          <span className="material-symbols-outlined text-[24px] text-primary-container">magic_button</span>
          <span className="absolute -top-1 -right-3 px-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-[9px] font-bold">
            AI
          </span>
        </div>
      )
    },
    {
      id: 'festive-categories',
      label: 'Categories',
      icon: 'dashboard',
      badge: null
    },
    {
      id: 'festive-reminders',
      label: 'Reminders',
      icon: 'calendar_month',
      customIcon: (
        <div className="relative">
          <span className="material-symbols-outlined text-[24px]">calendar_month</span>
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-secondary"></span>
        </div>
      )
    },
    {
      id: 'wishlist-and-compare',
      label: 'Saved',
      icon: 'favorite',
      customIcon: (
        <div className="relative">
          <span className="material-symbols-outlined text-[24px]">favorite</span>
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-2 px-1 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-[9px] font-bold">
              {wishlistCount}
            </span>
          )}
        </div>
      )
    }
  ];

  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-1px_12px_rgba(38,0,89,0.06)]">
      <div className="flex justify-around items-center h-20 px-space-xs max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] h-14 transition-all ${
                isActive 
                  ? 'text-primary font-bold scale-105' 
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {item.customIcon ? item.customIcon : (
                <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
              )}
              <span className="font-label-md text-[11px] leading-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
