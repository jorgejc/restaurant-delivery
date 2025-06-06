
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9); 
};

export const getRestaurants = async () => {
  try {
    const savedRestaurants = localStorage.getItem('restaurants');
    if (savedRestaurants) {
      return JSON.parse(savedRestaurants);
    }
    const initialRestaurants = getInitialRestaurants();
    localStorage.setItem('restaurants', JSON.stringify(initialRestaurants));
    return initialRestaurants;
  } catch (error) {
    console.error('Error al obtener restaurantes:', error);
    return [];
  }
};

export const getRestaurantById = async (id) => {   
  try {
    const restaurants = await getRestaurants();
    return restaurants.find(restaurant => restaurant.id === id) || null;
  } catch (error) {
    console.error('Error al buscar restaurante:', error);
    return null;
  }
};

export const addRestaurant = async (restaurantData) => {
  try {
    const restaurants = await getRestaurants();
    const newRestaurant = {
      ...restaurantData,
      id: generateId(),
      createdAt: new Date().toISOString()
    };
    
    restaurants.push(newRestaurant);
    localStorage.setItem('restaurants', JSON.stringify(restaurants));
    return newRestaurant;
  } catch (error) {
    console.error('Error al añadir restaurante:', error);
    throw error;
  }
};

export const updateRestaurant = async (id, updatedData) => {
  try {
    const restaurants = await getRestaurants();
    const index = restaurants.findIndex(restaurant => restaurant.id === id);
    
    if (index === -1) {
      throw new Error('Restaurante no encontrado');
    }
    
    const updatedRestaurant = {
      ...restaurants[index],
      ...updatedData,
      updatedAt: new Date().toISOString()
    };

    restaurants[index] = updatedRestaurant;
    localStorage.setItem('restaurants', JSON.stringify(restaurants));
    return updatedRestaurant;
  } catch (error) {
    console.error('Error al actualizar restaurante:', error);
    throw error;
  }
};


export const deleteRestaurant = async (id) => {
  try {
    const restaurants = await getRestaurants();
    const filteredRestaurants = restaurants.filter(restaurant => restaurant.id !== id);
    
    localStorage.setItem('restaurants', JSON.stringify(filteredRestaurants));
    return true;
  } catch (error) {
    console.error('Error al eliminar restaurante:', error);
    throw error;
  }
};



const getInitialRestaurants = () => {
  return [
    {
      id: "abc123",
      name: "La Cocina Mexicana",
      description: "Auténtica comida mexicana con los mejores tacos y margaritas de la ciudad. Ambiente cálido y acogedor con música en vivo los fines de semana.",
      category: "Mexicana",
      address: "Calle Principal 123, Ciudad",
      phone: "555-123-4567",
      website: "https://lacocina.ejemplo.com",
      priceRange: "$$",
      rating: 4.5,
      imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      openingHours: "Lun-Vie: 12:00-22:00, Sab-Dom: 13:00-23:00",
      createdAt: "2024-01-15T10:30:00Z"
    },
    {
      id: "def456",
      name: "Pasta Bella",
      description: "Deliciosa pasta italiana hecha a mano con recetas tradicionales traídas directamente de Italia. Amplia selección de vinos italianos.",
      category: "Italiana",
      address: "Avenida Central 45, Ciudad",
      phone: "555-987-6543",
      website: "https://pastabella.ejemplo.com",
      priceRange: "$$$",
      rating: 4.8,
      imageUrl: "https://images.unsplash.com/photo-1498579397066-22750a3cb424",
      openingHours: "Mar-Dom: 13:00-23:00, Lunes: Cerrado",
      createdAt: "2024-01-10T14:15:00Z"
    },
    {
      id: "ghi789",
      name: "Sushi House",
      description: "El mejor sushi y sashimi con pescado fresco importado diariamente. Chefs con experiencia en la cocina japonesa tradicional y contemporánea.",
      category: "Japonesa",
      address: "Calle Oriente 78, Ciudad",
      phone: "555-789-0123",
      website: "https://sushihouse.ejemplo.com",
      priceRange: "$$$",
      rating: 4.6,
      imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
      openingHours: "Todos los días: 11:30-15:00, 18:00-22:30",
      createdAt: "2024-01-05T09:20:00Z"
    },
    {
      id: "jkl012",
      name: "Burger King",
      description: "Hamburguesas gourmet con ingredientes de primera calidad. Variedad de opciones vegetarianas y veganas disponibles.",
      category: "Americana",
      address: "Plaza Mayor 12, Ciudad",
      phone: "555-456-7890",
      website: "https://burgerking.ejemplo.com",
      priceRange: "$$",
      rating: 4.2,
      imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
      openingHours: "Lun-Dom: 11:00-23:00",
      createdAt: "2023-12-20T16:40:00Z"
    },
    {
      id: "mno345",
      name: "La Paella",
      description: "Auténtica paella valenciana y otras especialidades españolas. Ambiente rústico con terraza al aire libre.",
      category: "Española",
      address: "Calle Sol 56, Ciudad",
      phone: "555-234-5678",
      website: "https://lapaella.ejemplo.com",
      priceRange: "$$$",
      rating: 4.7,
      imageUrl: "https://images.unsplash.com/photo-1515443961218-a51367888e4b",
      openingHours: "Mar-Dom: 13:00-16:00, 20:00-23:30, Lunes: Cerrado",
      createdAt: "2023-12-15T12:10:00Z"
    }
  ];
};