// wishlistReducer.js
export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST';
export const CLEAR_WISHLIST = 'CLEAR_WISHLIST';

const saveStateToLocalStorage = (state) => {
  // Save the wishlist state to localStorage
  localStorage.setItem('wishlist', JSON.stringify({
    items: state.items,
  }));
};

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST: {
      const newItem = action.payload;

      const existingItemIndex = state.items.findIndex(item => item.id === newItem.id);

      if (existingItemIndex === -1) {
        // If item is not in the wishlist, create a new array with the new item
        const updatedState = {
          ...state,
          items: [...state.items, newItem],
        };

        saveStateToLocalStorage(updatedState);

        return updatedState;
      }

      return state;
    }

    case REMOVE_FROM_WISHLIST: {
      const removedItem = action.payload;

      const updatedState = {
        ...state,
        items: state.items.filter(item => item.id !== removedItem.id),
      };

      saveStateToLocalStorage(updatedState);

      return updatedState;
    }

    case CLEAR_WISHLIST:
      localStorage.removeItem('wishlist'); // Remove the wishlist from localStorage when clearing
      return initialState;

    default:
      return state;
  }
};

export const initialState = {
  items: [],
};

export default wishlistReducer;
