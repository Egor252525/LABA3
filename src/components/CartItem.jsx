import React from 'react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    updateQuantity(item.serviceId, newQuantity);
  };

  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <h4>{item.serviceName}</h4>
        <p>{item.description}</p>
      </div>
      <div className="cart-item-controls">
        <div className="quantity-controls">
          <button 
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button onClick={() => handleQuantityChange(item.quantity + 1)}>
            +
          </button>
        </div>
        <div className="cart-item-price">
          {item.price * item.quantity} ₽
        </div>
        <button 
          onClick={() => removeFromCart(item.serviceId)} 
          className="remove-btn"
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export default CartItem;