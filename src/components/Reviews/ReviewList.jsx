import React from 'react';

const ReviewList = ({ reviews, onDelete }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="reviews-empty">
        <p>Пока нет отзывов</p>
      </div>
    );
  }

  return (
    <div className="reviews-list">
      {reviews.map(review => (
        <div key={review.reviewId} className="review-item">
          <div className="review-header">
            <span className="review-author">{review.userName}</span>
            <span className="review-date">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
            {onDelete && (
              <button
                className="review-delete-btn"
                onClick={() => onDelete(review.reviewId)}
                title="Удалить отзыв"
              >
                ×
              </button>
            )}
          </div>
          <div className="review-rating">
            {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
          </div>
          <p className="review-comment">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;