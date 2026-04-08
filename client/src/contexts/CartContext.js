import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { cartAPI } from '../services/api';
import toast from 'react-hot-toast';

// Initial state
const initialState = {
  items: [],
  subtotal: 0,
  isLoading: false,
  isOpen: false,
};

// Action types
const CART_ACTIONS = {
  LOAD_CART_START: 'LOAD_CART_START',
  LOAD_CART_SUCCESS: 'LOAD_CART_SUCCESS',
  LOAD_CART_FAILURE: 'LOAD_CART_FAILURE',
  ADD_TO_CART_START: 'ADD_TO_CART_START',
  ADD_TO_CART_SUCCESS: 'ADD_TO_CART_SUCCESS',
  ADD_TO_CART_FAILURE: 'ADD_TO_CART_FAILURE',
  UPDATE_CART_START: 'UPDATE_CART_START',
  UPDATE_CART_SUCCESS: 'UPDATE_CART_SUCCESS',
  UPDATE_CART_FAILURE: 'UPDATE_CART_FAILURE',
  REMOVE_FROM_CART_START: 'REMOVE_FROM_CART_START',
  REMOVE_FROM_CART_SUCCESS: 'REMOVE_FROM_CART_SUCCESS',
  REMOVE_FROM_CART_FAILURE: 'REMOVE_FROM_CART_FAILURE',
  CLEAR_CART_START: 'CLEAR_CART_START',
  CLEAR_CART_SUCCESS: 'CLEAR_CART_SUCCESS',
  CLEAR_CART_FAILURE: 'CLEAR_CART_FAILURE',
  TOGGLE_CART: 'TOGGLE_CART',
  SET_CART: 'SET_CART',
};

// Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.LOAD_CART_START:
    case CART_ACTIONS.ADD_TO_CART_START:
    case CART_ACTIONS.UPDATE_CART_START:
    case CART_ACTIONS.REMOVE_FROM_CART_START:
    case CART_ACTIONS.CLEAR_CART_START:
      return {
        ...state,
        isLoading: true,
      };

    case CART_ACTIONS.LOAD_CART_SUCCESS:
    case CART_ACTIONS.ADD_TO_CART_SUCCESS:
    case CART_ACTIONS.UPDATE_CART_SUCCESS:
    case CART_ACTIONS.REMOVE_FROM_CART_SUCCESS:
    case CART_ACTIONS.CLEAR_CART_SUCCESS:
    case CART_ACTIONS.SET_CART:
      return {
        ...state,
        items: action.payload.items,
        subtotal: action.payload.subtotal,
        isLoading: false,
      };

    case CART_ACTIONS.LOAD_CART_FAILURE:
    case CART_ACTIONS.ADD_TO_CART_FAILURE:
    case CART_ACTIONS.UPDATE_CART_FAILURE:
    case CART_ACTIONS.REMOVE_FROM_CART_FAILURE:
    case CART_ACTIONS.CLEAR_CART_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case CART_ACTIONS.TOGGLE_CART:
      return {
        ...state,
        isOpen: !state.isOpen,
      };

    default:
      return state;
  }
};

// Create context
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart on mount
  useEffect(() => {
    const loadCart = async () => {
      try {
        dispatch({ type: CART_ACTIONS.LOAD_CART_START });
        const response = await cartAPI.getCart();
        dispatch({
          type: CART_ACTIONS.LOAD_CART_SUCCESS,
          payload: response.data.cart,
        });
      } catch (error) {
        console.error('Failed to load cart:', error);
        dispatch({ type: CART_ACTIONS.LOAD_CART_FAILURE });
      }
    };

    loadCart();
  }, []);

  // Add item to cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      dispatch({ type: CART_ACTIONS.ADD_TO_CART_START });
      const response = await cartAPI.addToCart({ productId, quantity });
      dispatch({
        type: CART_ACTIONS.ADD_TO_CART_SUCCESS,
        payload: response.data.cart,
      });
      toast.success('Item added to cart!');
      return { success: true };
    } catch (error) {
      dispatch({ type: CART_ACTIONS.ADD_TO_CART_FAILURE });
      const message = error.message || 'Failed to add item to cart';
      toast.error(message);
      return { success: false, message };
    }
  };

  // Update cart item quantity
  const updateCart = async (productId, quantity) => {
    try {
      dispatch({ type: CART_ACTIONS.UPDATE_CART_START });
      const response = await cartAPI.updateCart({ productId, quantity });
      dispatch({
        type: CART_ACTIONS.UPDATE_CART_SUCCESS,
        payload: response.data.cart,
      });
      toast.success('Cart updated!');
      return { success: true };
    } catch (error) {
      dispatch({ type: CART_ACTIONS.UPDATE_CART_FAILURE });
      const message = error.message || 'Failed to update cart';
      toast.error(message);
      return { success: false, message };
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      dispatch({ type: CART_ACTIONS.REMOVE_FROM_CART_START });
      const response = await cartAPI.removeFromCart(productId);
      dispatch({
        type: CART_ACTIONS.REMOVE_FROM_CART_SUCCESS,
        payload: response.data.cart,
      });
      toast.success('Item removed from cart!');
      return { success: true };
    } catch (error) {
      dispatch({ type: CART_ACTIONS.REMOVE_FROM_CART_FAILURE });
      const message = error.message || 'Failed to remove item from cart';
      toast.error(message);
      return { success: false, message };
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      dispatch({ type: CART_ACTIONS.CLEAR_CART_START });
      const response = await cartAPI.clearCart();
      dispatch({
        type: CART_ACTIONS.CLEAR_CART_SUCCESS,
        payload: response.data.cart,
      });
      toast.success('Cart cleared!');
      return { success: true };
    } catch (error) {
      dispatch({ type: CART_ACTIONS.CLEAR_CART_FAILURE });
      const message = error.message || 'Failed to clear cart';
      toast.error(message);
      return { success: false, message };
    }
  };

  // Toggle cart sidebar
  const toggleCart = () => {
    dispatch({ type: CART_ACTIONS.TOGGLE_CART });
  };

  // Get item count
  const getItemCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  // Check if item is in cart
  const isItemInCart = (productId) => {
    return state.items.some(item => item.product._id === productId);
  };

  // Get item quantity
  const getItemQuantity = (productId) => {
    const item = state.items.find(item => item.product._id === productId);
    return item ? item.quantity : 0;
  };

  const value = {
    ...state,
    addToCart,
    updateCart,
    removeFromCart,
    clearCart,
    toggleCart,
    getItemCount,
    isItemInCart,
    getItemQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
