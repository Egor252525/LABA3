import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import ReviewForm from './Reviews/ReviewForm';
import ReviewList from './Reviews/ReviewList';
import { ReviewService } from '../services/ReviewService';

const ServiceCard = ({ service }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [showReviews, setShowReviews] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  const handleAddToCart = () => {
    addToCart(service);
  };

  const loadReviews = async () => {
    if (!showReviews && reviews.length === 0) {
      setReviewsLoading(true);
      try {
        const data = await ReviewService.getServiceReviews(service.serviceId);
        setReviews(data);
      } catch (error) {
        console.error('Load reviews error:', error);
      } finally {
        setReviewsLoading(false);
      }
    }
    setShowReviews(!showReviews);
  };

  const handleSubmitReview = async (reviewData) => {
    try {
      await ReviewService.createReview(reviewData);
      const data = await ReviewService.getServiceReviews(service.serviceId);
      setReviews(data);
      setShowReviewForm(false);
      alert('Отзыв успешно добавлен!');
    } catch (error) {
      console.error('Submit review error:', error);
      alert('Ошибка при добавлении отзыва');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Удалить отзыв?')) {
      try {
        await ReviewService.deleteReview(reviewId);
        setReviews(reviews.filter(r => r.reviewId !== reviewId));
        alert('Отзыв удален');
      } catch (error) {
        console.error('Delete review error:', error);
        alert('Ошибка при удалении отзыва');
      }
    }
  };

  return (
    <div className="service-card">
      <h3>{service.serviceName}</h3>
      <p>{service.description}</p>
      <div className="service-details">
        <span className="price">{service.price} ₽</span>
        <span className="duration">{service.durationMinutes} мин.</span>
      </div>

      <div className="service-actions">
        <button onClick={handleAddToCart} className="add-to-cart-btn">
          Добавить в корзину
        </button>
        
        <button onClick={loadReviews} className="reviews-btn">
          Отзывы ({reviews.length})
        </button>

        {user && !showReviewForm && (
          <button 
            onClick={() => setShowReviewForm(true)}
            className="add-review-btn"
          >
            Написать отзыв
          </button>
        )}
      </div>

      {showReviews && (
        <div className="service-reviews">
          {reviewsLoading ? (
            <p>Загрузка отзывов...</p>
          ) : (
            <ReviewList 
              reviews={reviews} 
              onDelete={user ? handleDeleteReview : null}
            />
          )}
        </div>
      )}

      {showReviewForm && (
        <ReviewForm
          serviceId={service.serviceId}
          onSubmit={handleSubmitReview}
          onCancel={() => setShowReviewForm(false)}
        />
      )}
    </div>
  );
};

export default ServiceCard;