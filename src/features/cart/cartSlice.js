import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const initialState = {
  isCartOpen: false,
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, { payload }) => {
      const existingCartItem = state.cartItems.find(
        (cartItem) => cartItem.id === payload.id
      );
      if (existingCartItem)
        state.cartItems = state.cartItems.map((cartItem) =>
          cartItem.id === payload.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      state.cartItems = [state.cartItems, { ...payload, quantity: 1 }];
    },
    removeItemFromCart: (state, { payload }) => {
      const existingCartItem = state.cartItems.find(
        (cartItem) => cartItem.id === payload.id
      );
      if (existingCartItem.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== payload.id
        );
      }
      state.cartItems = state.cartItems.map((cartItem) =>
        cartItem.id === payload.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
    },
    clearItemFromCart: (state, { payload }) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== payload.id
      );
    },
    setIsCartOpen: (state, action) => {
        state.isCartOpen = action.payload
    }
  },
});

// const addCartItem = (cartItems, productToAdd) => {
//   const existingCartItem = cartItems.find(
//     (cartItem) => cartItem.id === productToAdd.id
//   );

//   if (existingCartItem) {
//     return cartItems.map((cartItem) =>
//       cartItem.id === productToAdd.id
//         ? { ...cartItem, quantity: cartItem.quantity + 1 }
//         : cartItem
//     );
//   }

//   return [...cartItems, { ...productToAdd, quantity: 1 }];
// };

// const removeCartItem = (cartItems, cartItemToRemove) => {
//   // find the cart item to remove
//   const existingCartItem = cartItems.find(
//     (cartItem) => cartItem.id === cartItemToRemove.id
//   );

//   // check if quantity is equal to 1, if it is remove that item from the cart
//   if (existingCartItem.quantity === 1) {
//     return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
//   }

//   // return back cartitems with matching cart item with reduced quantity
//   return cartItems.map((cartItem) =>
//     cartItem.id === cartItemToRemove.id
//       ? { ...cartItem, quantity: cartItem.quantity - 1 }
//       : cartItem
//   );
// };

// const clearCartItem = (cartItems, cartItemToClear) =>
//   cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

// export const addItemToCart = (cartItems, productToAdd) => {
//   const newCartItems = addCartItem(cartItems, productToAdd);
//   return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
// };

// export const removeItemFromCart = (cartItems, cartItemToRemove) => {
//   const newCartItems = removeCartItem(cartItems, cartItemToRemove);
//   return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
// };

// export const clearItemFromCart = (cartItems, cartItemToClear) => {
//   const newCartItems = clearCartItem(cartItems, cartItemToClear);
//   return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
// };

// export const setIsCartOpen = (boolean) =>
//   createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

// const CART_INITIAL_STATE = {
//   isCartOpen: false,
//   cartItems: [],
// };

// export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
//   const { type, payload } = action;

//   switch (type) {
//     case CART_ACTION_TYPES.SET_CART_ITEMS:
//       return {
//         ...state,
//         cartItems: payload,
//       };
//     case CART_ACTION_TYPES.SET_IS_CART_OPEN:
//       return {
//         ...state,
//         isCartOpen: payload,
//       };
//     default:
//       return state;
//   }
// };

const selectCartReducer = (state) => state.cart;

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  )
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

export const { addItemToCart, removeItemFromCart, clearItemFromCart, setIsCartOpen } = cartSlice.actions;

export default cartSlice.reducer;
