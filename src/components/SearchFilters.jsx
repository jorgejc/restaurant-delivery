import React, { useState, useEffect } from 'react';
import { FaSearch, FaStar, FaFilter, FaHeart } from 'react-icons/fa';
import '../styles/SearchFilters.css';

const CATEGORIES = ['Mexicana', 'Italiana', 'Japonesa', 'China', 'Americana', 'Española', 'India', 'Francesa', 'Otra'];
const PRICE_RANGES = ['$', '$$', '$$$', '$$$$'];

const SearchFilters = ({ onSearchChange, onFilterChange, filters }) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearchChange]);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterToggle = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleCategoryChange = (e) => {
    onFilterChange({ category: e.target.value });
  };

  const handlePriceChange = (e) => {
    onFilterChange({ priceRange: e.target.value });
  };

  const handleRatingChange = (e) => {
    onFilterChange({ rating: Number(e.target.value) });
  };

  const handleFavoritesChange = (e) => {
    onFilterChange({ onlyFavorites: e.target.checked });
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    onSearchChange('');
    onFilterChange({
      category: '',
      priceRange: '',
      rating: 0,
      onlyFavorites: false
    });
  };


  return (
    <div className="search-filters">
      <div className="search-bar">
        <div className="search-input-wrapper">
          {/* <FaSearch className="search-icon" /> */}
          <input
            type="text"
            placeholder="Buscar restaurantes por nombre o descripción..."
            value={searchTerm}
            onChange={handleSearchInputChange}
            className="search-input"
          />
        </div>
        {/* <button 
          className={`filter-toggle-button ${isFilterOpen ? 'active' : ''}`}
          onClick={handleFilterToggle}
        >
          <FaFilter />
          <span>Filtros</span>
        </button> */}
      </div>

      {isFilterOpen && (
        <div className="filters">
          {/* <div className="filter-group"> */}
            {/* <label htmlFor="category">Categoría</label> */}
            <select
              id="category"
              value={filters.category}
              onChange={handleCategoryChange}
            >
              <option value="">Todas las categorías</option>
              {CATEGORIES.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          {/* </div> */}

          {/* <div className="filter-group">
            <label htmlFor="priceRange">Precio</label> */}
            <select
              id="priceRange"
              value={filters.priceRange}
              onChange={handlePriceChange}
            >
              <option value="">Cualquier precio</option>
              {PRICE_RANGES.map(price => (
                <option key={price} value={price}>{price}</option>
              ))}
            </select>
          {/* </div> */}

          {/* <div className="filter-group">
            <label htmlFor="rating">Calificación mínima</label>
            <div className="rating-filter">
              <input
                type="range"
                id="rating"
                min="0"
                max="5"
                step="0.5"
                value={filters.rating}
                onChange={handleRatingChange}
              />
              <div className="rating-display">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < filters.rating ? 'star-filled' : 'star-empty'}
                  />
                ))}
                <span>{filters.rating > 0 ? filters.rating : 'Cualquiera'}</span>
              </div>
            </div>
          </div> */}

          <select
            value={filters.rating}
            onChange={handleRatingChange}
            >
            <option value="">Rating</option>
            <option value="4">⭐ 4+</option>
            <option value="4.5">⭐ 4.5+</option>
          </select>

          <div className="filter-group favorites-filter">
            <label htmlFor="onlyFavorites" className="checkbox-label">
              <input
                type="checkbox"
                id="onlyFavorites"
                checked={filters.onlyFavorites}
                onChange={handleFavoritesChange}
              />
              <FaHeart className="heart-icon" />
              <span>Solo favoritos</span>
            </label>
          </div>

          <div className="filter-actions">
            {/* <button 
              className="clear-filters-button"
              onClick={handleClearFilters}
            >
              Limpiar filtros
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchFilters
