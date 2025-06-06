import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import '../styles/RestaurantCard.css'


const RestaurantCard = ({ restaurant, isFavorite, onToggleFavorite }) => {

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(restaurant.id);
  };

  return (
    <Link to={`/restaurant/${restaurant.id}`} className="restaurant-card">
      <div className="restaurant-image">
        <img 
          src={restaurant.imageUrl || placeholderImage}
          alt={restaurant.name}
          onError={(e) => {
            e.target.src = placeholderImage;
          }}
        />
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
      
      <div className="restaurant-info">
        <div className="restaurant-header">
          <h3 className="restaurant-name">{restaurant.name}</h3>
          <span className="restaurant-price">{restaurant.priceRange}</span>
        </div>
        
        <div className="restaurant-meta">
          <span className="restaurant-category">{restaurant.category}</span>
          <div className="restaurant-rating">
            <FaStar className="star-icon" />
            <span>{restaurant.rating}</span>
          </div>
        </div>
        
        <p className="restaurant-description">
          {restaurant.description.length > 100 
            ? `${restaurant.description.substring(0, 100)}...` 
            : restaurant.description}
        </p>
        
        <div className="restaurant-location">
          {restaurant.address}
        </div>
      </div>
    </Link>
  );
}

export default RestaurantCard
