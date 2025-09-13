import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.serviceId === action.payload.serviceId); 
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.serviceId === action.payload.serviceId 
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.serviceId !== action.payload) 
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.serviceId === action.payload.serviceId 
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };

    default:
      return state;
  }
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  const addToCart = (service) => {
    dispatch({ type: 'ADD_TO_CART', payload: service });
  };

  const removeFromCart = (serviceID) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: serviceID });
  };

  const updateQuantity = (serviceID, quantity) => {
    if (quantity <= 0) {
      removeFromCart(serviceID);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { serviceID, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getTotalPrice = () => {
    return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    items: cart.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
