// CartContext.js
import React, { createContext, useContext, useReducer, useMemo, useCallback, useEffect } from 'react';
import cartReducer, { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, initialState } from '../reducers/cartReducer';
import { useToast } from "../hooks/useToast";
const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const storedCart = JSON.parse(localStorage.getItem('cart')) || initialState;
  const [cartState, dispatch] = useReducer(cartReducer, storedCart);
  const { success: showToastSuccess } = useToast(); // Ensure that you are using the correct function

  const addToCart = useCallback((item) => {
    console.log('Adding to cart:', item);
    dispatch({ type: ADD_TO_CART, payload: item });
    triggerNotification(`Added ${item.name} to the cart`);
  }, []);

  const removeFromCart = useCallback((item) => {
    dispatch({ type: REMOVE_FROM_CART, payload: item });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: CLEAR_CART });
  }, []);

  const triggerNotification = (message) => {
    showToastSuccess(message); // Use the correct function from the useToast hook
  };

  // Save the cart state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartState));
  }, [cartState]);

  // Calculate and store the count of items in the cart
  const cartCount = useMemo(() => {
    return cartState.items.reduce((count, item) => count + item.quantity, 0);
  }, [cartState.items]);
  return (
    <CartContext.Provider value={{ cartState, cartCount, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
