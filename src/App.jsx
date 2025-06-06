import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
// import { getRestaurants } from './services/restaurantService';
import NewRestaurant from './pages/NewRestaurant';

function App() {
  const [favorites, setFavorites] = useState([]);


  useEffect(() => {

    // Cargamos favoritos de localstorage
      const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
          setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error al cargar datos:', error);

        setFavorites([]);
      }
    };

  }, []);


//  Guardasmos los favoritos desde localstorage cuando estos cambien
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

    const toggleFavorite = (restaurantId) => {
      setFavorites(prevFavorites => {
        const isFavorite = prevFavorites.includes(restaurantId);

        if (isFavorite) {
          return prevFavorites.filter(id => id !== restaurantId);
        } else {
          return [...prevFavorites, restaurantId];
        }
      });
    };

  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="container">
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                />
              } 
            />
            <Route 
              path='/new'
              element= {
                <NewRestaurant />
              }
            />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App
