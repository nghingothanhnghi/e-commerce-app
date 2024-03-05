// WishlistContext.js
import React, { createContext, useContext, useReducer, useMemo, useCallback, useEffect } from 'react';
import wishlistReducer, { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, CLEAR_WISHLIST, initialState } from '../reducers/wishlistReducer';
import { useToast } from "../hooks/useToast";

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || initialState;
  const [wishlistState, dispatch] = useReducer(wishlistReducer, storedWishlist);
  const { success: showToastSuccess } = useToast(); // Ensure that you are using the correct function

  const addToWishlist = useCallback((item) => {
    dispatch({ type: ADD_TO_WISHLIST, payload: item });
    triggerNotification(`Added ${item.name} to the wishlist`);
  }, []);

  const isItemInWishlist = useCallback((itemId) => {
    // Implement logic to check if an item is in the wishlist
    return wishlistState.items.some(item => item.id === itemId);
  }, [wishlistState.items]);

  const removeFromWishlist = useCallback((item) => {
    dispatch({ type: REMOVE_FROM_WISHLIST, payload: item });
  }, []);

  const clearWishlist = useCallback(() => {
    dispatch({ type: CLEAR_WISHLIST });
  }, []);

  const triggerNotification = (message) => {
    showToastSuccess(message); // Use the correct function from the useToast hook
  };

  // Save the wishlist state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistState));
  }, [wishlistState]);

  // Calculate and store the count of items in the wishlist
  const wishlistCount = useMemo(() => {
    return wishlistState.items.length;
  }, [wishlistState.items]);

  return (
    <WishlistContext.Provider value={{ wishlistState, wishlistCount, addToWishlist, isItemInWishlist, removeFromWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
