import React, { useState } from 'react';

const ReviewForm = ({ serviceId, onSubmit, onCancel }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      alert('Пожалуйста, выберите оценку');
      return;
    }

    if (!comment.trim()) {
      alert('Пожалуйста, напишите отзыв');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        serviceId,
        rating,
        comment: comment.trim()
      });
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Submit review error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="review-form">
      <h3>Оставить отзыв</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Оценка:</label>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                className={`star-btn ${star <= rating ? 'active' : ''}`}
                onClick={() => setRating(star)}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="comment">Комментарий:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Расскажите о вашем опыте..."
            rows={4}
            maxLength={500}
          />
          <div className="char-count">{comment.length}/500</div>
        </div>

        <div className="form-actions">
          {onCancel && (
            <button
              type="button"
              className="btn-secondary"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Отмена
            </button>
          )}
          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting || rating === 0 || !comment.trim()}
          >
            {isSubmitting ? 'Отправка...' : 'Отправить отзыв'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;