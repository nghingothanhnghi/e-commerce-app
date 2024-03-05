// cartReducer.js
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';

const saveStateToLocalStorage = (state) => {
  // Save the cart state to localStorage
  localStorage.setItem('cart', JSON.stringify({
    items: state.items,
    total: state.total,
  }));
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const newItem = action.payload;
      newItem.quantity = 1;

      const existingItemIndex = state.items.findIndex(item => item.id === newItem.id);

      if (existingItemIndex !== -1) {
        // If item already exists, create a new array with the updated item
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + newItem.quantity,
        };

        const updatedState = {
          ...state,
          items: updatedItems,
          total: state.total + (newItem.price * newItem.quantity),
        };

        saveStateToLocalStorage(updatedState);

        return updatedState;
      } else {
        // If item is not in the cart, create a new array with the new item
        const updatedState = {
          ...state,
          items: [...state.items, newItem],
          total: state.total + (newItem.price * newItem.quantity),
        };

        saveStateToLocalStorage(updatedState);

        return updatedState;
      }
    }

    case REMOVE_FROM_CART: {
      const removedItem = action.payload;
      const existingItem = state.items.find(item => item.id === removedItem.id);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          // If quantity is greater than 1, decrement the quantity
          existingItem.quantity -= 1;
        } else {
          // If quantity is 1, remove the item from the cart
          state.items = state.items.filter(item => item.id !== removedItem.id);
        }

        const updatedState = {
          ...state,
          total: state.total - removedItem.price,
        };

        saveStateToLocalStorage(updatedState);

        return updatedState;
      }

      return state;
    }

    case CLEAR_CART:
      localStorage.removeItem('cart'); // Remove the cart from localStorage when clearing
      return initialState;

    default:
      return state;
  }
};

export const initialState = {
  items: [],
  total: 0,
};

export default cartReducer;
