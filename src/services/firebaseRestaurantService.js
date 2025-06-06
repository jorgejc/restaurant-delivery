import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  writeBatch 
} from "firebase/firestore";

import { FirebaseFirestore } from '../firebase/config';

const COLLECTION_NAME = 'restaurants';

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9); 
};

// Listar todos los restaurantes
export const getRestaurants = async () => {
  try {
    const querySnapshot = await getDocs(collection(FirebaseFirestore, COLLECTION_NAME));
    const restaurants = [];
    
    querySnapshot.forEach((doc) => {
      restaurants.push({
        id: doc.id,
        ...doc.data()
      });
    });

    if (restaurants.length === 0) {
      const initialRestaurants = await initializeRestaurants();
      return initialRestaurants;
    }

    return restaurants.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (error) {
    console.error('Error al obtener restaurantes:', error);
    throw error;
  }
};

// Obtener restaurante por Id
export const getRestaurantById = async (id) => {
  try {
    const docRef = doc(FirebaseFirestore, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error al buscar restaurante:', error);
    throw error;
  }
};

// Buscar restaurante por nombre
export const searchRestaurantsByName = async (searchTerm) => {
  try {
    const restaurants = await getRestaurants();
    
    if (!searchTerm) {
      return restaurants;
    }
    const filteredRestaurants = restaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredRestaurants;
  } catch (error) {
    console.error('Error al buscar restaurantes:', error);
    throw error;
  }
};


export const addRestaurant = async (restaurantData) => {
  try {
    const newRestaurant = {
      ...restaurantData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const docRef = await addDoc(collection(FirebaseFirestore, COLLECTION_NAME), newRestaurant);
    
    return {
      id: docRef.id,
      ...newRestaurant
    };
  } catch (error) {
    console.error('Error al añadir restaurante:', error);
    throw error;
  }
};


export const updateRestaurant = async (id, updatedData) => {
  try {
    const docRef = doc(FirebaseFirestore, COLLECTION_NAME, id);
    
    const updateData = {
      ...updatedData,
      updatedAt: new Date().toISOString()
    };
    
    await updateDoc(docRef, updateData);

    const updatedRestaurant = await getRestaurantById(id);
    return updatedRestaurant;
  } catch (error) {
    console.error('Error al actualizar restaurante:', error);
    throw error;
  }
};

export const deleteRestaurant = async (id) => {
  try {
    const docRef = doc(FirebaseFirestore, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error al eliminar restaurante:', error);
    throw error;
  }
};


export const getRestaurantsByCategory = async (category) => {
  try {
    const q = query(
      collection(FirebaseFirestore, COLLECTION_NAME), 
      where("category", "==", category),
      orderBy("createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    const restaurants = [];
    
    querySnapshot.forEach((doc) => {
      restaurants.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return restaurants;
  } catch (error) {
    console.error('Error al filtrar por categoría:', error);
    throw error;
  }
};


const initializeRestaurants = async () => {
  try {
    const initialRestaurants = getInitialRestaurants();
    const batch = writeBatch(FirebaseFirestore);
    const addedRestaurants = [];

    initialRestaurants.forEach((restaurant) => {
      const docRef = doc(collection(FirebaseFirestore, COLLECTION_NAME));
      batch.set(docRef, restaurant);
      addedRestaurants.push({
        id: docRef.id,
        ...restaurant
      });
    });

    await batch.commit();
    
    console.log('Restaurantes inicializados correctamente');
    return addedRestaurants;
  } catch (error) {
    console.error('Error al inicializar restaurantes:', error);
    throw error;
  }
};



const getInitialRestaurants = () => {
  return [
    {
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