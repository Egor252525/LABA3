import React from 'react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

const Cart = () => {
  const { items, getTotalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart">
        <h1>Корзина</h1>
        <p>Ваша корзина пуста</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <h1>Корзина</h1>
      <div className="cart-items">
        {items.map(item => (
          <CartItem key={item.serviceID} item={item} />
        ))}
      </div>
      <div className="cart-summary">
        <h3>Итого: {getTotalPrice()} ₽</h3>
        <button className="checkout-btn">Оформить заказ</button>
        <button onClick={clearCart} className="clear-cart-btn">
          Очистить корзину
        </button>
      </div>
    </div>
  );
};

export default Cart;
