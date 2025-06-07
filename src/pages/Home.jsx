import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RestaurantCard from '../components/RestaurantCard';
import SearchFilters from '../components/SearchFilters';
import { getRestaurants } from '../services/firebaseRestaurantService';
import '../styles/Home.css';

const Home = ({ favorites, onToggleFavorite }) => {

  const [ restaurants, setRestaurants ] = useState([]);
  const [ filteredRestaurants, setFilteredRestaurants ] = useState(restaurants);
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ filters, setFilters ] = useState({ 
    category: '',
    priceRange: '',
    rating: 0,
    onlyFavorites: false
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const navigate = useNavigate();

// Cargadomos los datos desde firbase
  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        setLoading(true);
        setError(null);
        const restaurantsData = await getRestaurants();
        setRestaurants(restaurantsData);
        setFilteredRestaurants(restaurantsData);
      } catch (err) {
        console.error('Error loading restaurants:', err);
        setError('Error al cargar los restaurantes. Por favor, recarga la página.');
      } finally {
        setLoading(false);
      }
    };

    loadRestaurants();
  }, []);


// Se aplican filtros
useEffect(() =>{
  let filtered = [...restaurants];

    if (searchTerm) {
      filtered = filtered.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por categoría
    if (filters.category) {
      filtered = filtered.filter(restaurant => restaurant.category === filters.category);
    }

    // Filtrar por rango de precio
    if (filters.priceRange) {
      filtered = filtered.filter(restaurant => restaurant.priceRange === filters.priceRange);
    }

    // Filtrar por calificación mínima
    if (filters.rating > 0) {
      filtered = filtered.filter(restaurant => restaurant.rating >= filters.rating);
    }

    // Filtrar solo favoritos
    if (filters.onlyFavorites) {
      filtered = filtered.filter(restaurant => favorites.includes(restaurant.id));
    }

    setFilteredRestaurants(filtered);
  }, [restaurants, searchTerm, filters, favorites]);


  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

const handleAddNew = () => {
    navigate('/new');
  };


  const handleRefresh = async () => {
  try {
    setLoading(true);
    setError(null);
    const restaurantsData = await getRestaurants();
    setRestaurants(restaurantsData);
  } catch (err) {
    console.error('Error refreshing restaurants:', err);
    setError('Error al actualizar los restaurantes.');
  } finally {
    setLoading(false);
  }
};

const addRestaurantToList = (newRestaurant) => {
    setRestaurants(prev => [newRestaurant, ...prev]);
  };


  if (loading) {
    return (
      <div className="home-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando restaurantes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-container">
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={handleRefresh} className="refresh-button">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Directorio de Restaurantes</h1>
        <div className="header-actions">

          <button
            className="add-button"
            onClick={handleAddNew}
          >
            ➕ Agregar Restaurante
          </button>
        </div>
      </div>
      
      <SearchFilters
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
        filters={filters}
        restaurants={restaurants}
      />
      
      {filteredRestaurants.length === 0 ? (
        <div className="no-results">
          <p>No se encontraron restaurantes con estos criterios</p>
        </div>
      ) : (
        <div className="restaurants-grid">
          {filteredRestaurants.map(restaurant => (
            <RestaurantCard 
              key={restaurant.id}
              restaurant={restaurant}
              isFavorite={favorites.includes(restaurant.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home
