import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NavDrawer from './components/NavDrawer';
import BottomNav from './components/BottomNav';
import FloatingAIButton from './components/FloatingAIButton';
import ProductDetailModal from './components/ProductDetailModal';
import { ToastProvider } from './context/ToastContext';
import { WishlistProvider } from './context/WishlistContext';

// Pages
import HomeDiscovery from './pages/HomeDiscovery';
import AIGiftFinder from './pages/AIGiftFinder';
import FestiveCategories from './pages/FestiveCategories';
import CuratedRecommendations from './pages/CuratedRecommendations';
import WishlistAndCompare from './pages/WishlistAndCompare';
import FestiveReminders from './pages/FestiveReminders';
import AIConversation from './pages/AIConversation';
import GiftSearchModal from './pages/GiftSearchModal';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState('home-discovery');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeModalProduct, setActiveModalProduct] = useState(null);

  // Sync with window.location.hash for smooth routing & back button support
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && [
        'home-discovery',
        'ai-gift-finder',
        'festive-categories',
        'curated-recommendations',
        'wishlist-and-compare',
        'festive-reminders',
        'ai-conversation'
      ].includes(hash)) {
        setCurrentScreen(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    if (window.location.hash) {
      handleHashChange();
    }
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (screenId) => {
    setCurrentScreen(screenId);
    window.location.hash = screenId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProductDetail = (product) => {
    setActiveModalProduct(product);
  };

  const handleCloseProductDetail = () => {
    setActiveModalProduct(null);
  };

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface flex flex-col min-h-screen relative selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      {/* Top Navigation Header */}
      <Header 
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigate={handleNavigate}
        currentScreen={currentScreen}
      />

      {/* Side Drawer */}
      <NavDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onNavigate={handleNavigate}
        currentScreen={currentScreen}
      />

      {/* Instant Gift Search Modal */}
      <GiftSearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onOpenProductDetail={handleOpenProductDetail}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal 
        product={activeModalProduct}
        isOpen={!!activeModalProduct}
        onClose={handleCloseProductDetail}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main className="flex flex-col relative w-full pt-16 bg-surface min-h-[calc(100vh-5rem)]">
        {currentScreen === 'home-discovery' && (
          <HomeDiscovery 
            onNavigate={handleNavigate} 
            onOpenProductDetail={handleOpenProductDetail} 
          />
        )}

        {currentScreen === 'ai-gift-finder' && (
          <AIGiftFinder 
            onNavigate={handleNavigate} 
            onOpenProductDetail={handleOpenProductDetail} 
          />
        )}

        {currentScreen === 'festive-categories' && (
          <FestiveCategories 
            onNavigate={handleNavigate} 
            onOpenProductDetail={handleOpenProductDetail} 
          />
        )}

        {currentScreen === 'curated-recommendations' && (
          <CuratedRecommendations 
            onNavigate={handleNavigate} 
            onOpenProductDetail={handleOpenProductDetail} 
          />
        )}

        {currentScreen === 'wishlist-and-compare' && (
          <WishlistAndCompare 
            onNavigate={handleNavigate} 
            onOpenProductDetail={handleOpenProductDetail} 
          />
        )}

        {currentScreen === 'festive-reminders' && (
          <FestiveReminders 
            onNavigate={handleNavigate} 
            onOpenProductDetail={handleOpenProductDetail} 
          />
        )}

        {currentScreen === 'ai-conversation' && (
          <AIConversation 
            onNavigate={handleNavigate} 
            onOpenProductDetail={handleOpenProductDetail} 
          />
        )}
      </main>

      {/* Floating Action Button (FAB) for AI Assistant */}
      {currentScreen !== 'ai-conversation' && (
        <FloatingAIButton onClick={() => handleNavigate('ai-conversation')} />
      )}

      {/* Bottom Sticky Navigation */}
      <BottomNav 
        currentScreen={currentScreen} 
        onNavigate={handleNavigate} 
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <WishlistProvider>
        <AppContent />
      </WishlistProvider>
    </ToastProvider>
  );
}
