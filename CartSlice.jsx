import { createSlice } from '@reduxjs/toolkit';

/**
 * CartSlice – Redux Toolkit slice for the Paradise Nursery shopping cart.
 *
 * State shape:
 *   items: Array<{ id, name, image, cost, quantity }>
 *
 * Reducers:
 *   addItem(state, action)       – Adds a plant to the cart or increments qty
 *   removeItem(state, action)    – Removes a plant entirely from the cart
 *   updateQuantity(state, action)– Updates the quantity of a specific item
 */

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * addItem
     * Payload: plant object { id, name, image, cost, ... }
     * If the item already exists in the cart, its quantity is incremented by 1.
     * Otherwise, the item is added with quantity = 1.
     */
    addItem: (state, action) => {
      const plant = action.payload;
      const existingItem = state.items.find((item) => item.id === plant.id);

      if (existingItem) {
        // Item already in cart — increment quantity
        existingItem.quantity += 1;
      } else {
        // New item — add to cart with quantity 1
        state.items.push({ ...plant, quantity: 1 });
      }
    },

    /**
     * removeItem
     * Payload: plant id (string or number)
     * Removes the item with the matching id from the cart entirely,
     * regardless of its current quantity.
     */
    removeItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },

    /**
     * updateQuantity
     * Payload: { id, quantity }
     * Updates the quantity of the cart item with the given id.
     * If the new quantity is 0 or less, the item is removed from the cart.
     */
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      if (quantity <= 0) {
        // Remove the item if quantity drops to 0
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        const item = state.items.find((item) => item.id === id);
        if (item) {
          item.quantity = quantity;
        }
      }
    },
  },
});

// Export action creators
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;

export const selectCartTotalItems = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartTotalCost = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.cost * item.quantity,
    0
  );

export default cartSlice.reducer;
