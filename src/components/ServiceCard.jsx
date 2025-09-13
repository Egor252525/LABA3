import React from 'react';
import { useCart } from '../context/CartContext';

const ServiceCard = ({ service }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(service);
  };

  return (
    <div className="service-card">
      <h3>{service.serviceName}</h3>
      <p>{service.description}</p>
      <div className="service-details">
        <span className="price">{service.price} ₽</span>
        <span className="duration">{service.durationMinutes} мин.</span>
      </div>
      <button onClick={handleAddToCart} className="add-to-cart-btn">
        Добавить в корзину
      </button>
    </div>
  );
};

export default ServiceCard;
