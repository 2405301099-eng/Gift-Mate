import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchWishlist, toggleWishlist as apiToggleWishlist, deleteReminder } from '../api/client';
import { useToast } from './ToastContext';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistIds, setWishlistIds] = useState(['prod-1', 'prod-2', 'prod-3']);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  const loadWishlist = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetchWishlist();
      if (res && res.itemIds) {
        setWishlistIds(res.itemIds);
        if (res.items) setWishlistItems(res.items);
      }
    } catch (err) {
      console.error('Error loading wishlist:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  const toggleItem = useCallback(async (product) => {
    if (!product || !product.id) return;
    const exists = wishlistIds.includes(product.id);
    
    // Optimistic UI update
    const updatedIds = exists 
      ? wishlistIds.filter(id => id !== product.id)
      : [...wishlistIds, product.id];
    setWishlistIds(updatedIds);

    if (exists) {
      setWishlistItems(prev => prev.filter(p => p.id !== product.id));
      showToast('Gift removed from your wishlist');
    } else {
      setWishlistItems(prev => [...prev, product]);
      showToast('Gift saved to your wishlist!');
    }

    try {
      const res = await apiToggleWishlist(product.id);
      if (res && res.itemIds) {
        setWishlistIds(res.itemIds);
        if (res.items) setWishlistItems(res.items);
      }
    } catch (err) {
      console.warn('API sync warning:', err.message);
    }
  }, [wishlistIds, showToast]);

  const removeItem = useCallback(async (productId) => {
    setWishlistIds(prev => prev.filter(id => id !== productId));
    setWishlistItems(prev => prev.filter(p => p.id !== productId));
    showToast('Gift removed from your wishlist');

    try {
      await apiToggleWishlist(productId);
    } catch (err) {
      console.warn('API sync warning:', err.message);
    }
  }, [showToast]);

  const isSaved = useCallback((productId) => {
    return wishlistIds.includes(productId);
  }, [wishlistIds]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistItems,
        wishlistCount: wishlistIds.length,
        isSaved,
        toggleItem,
        removeItem,
        refreshWishlist: loadWishlist,
        isLoading
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
