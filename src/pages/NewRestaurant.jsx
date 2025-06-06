import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { addRestaurant } from '../services/firebaseRestaurantService';
import '../styles/NewRestaurant.css';

const CATEGORIES = ['Mexicana', 'Italiana', 'Japonesa', 'China', 'Americana', 'Española', 'India', 'Francesa', 'Otra'];
const PRICE_RANGES = ['$', '$$', '$$$', '$$$$'];

const NewRestaurant = ({ onRestaurantAdded }) => {

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    address: '',
    phone: '',
    website: '',
    priceRange: '',
    rating: 0,
    imageUrl: '',
    openingHours: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();


  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!formData.description.trim()) newErrors.description = 'La descripción es obligatoria';
    if (!formData.category) newErrors.category = 'Selecciona una categoría';
    if (!formData.address.trim()) newErrors.address = 'La dirección es obligatoria';
    if (!formData.priceRange) newErrors.priceRange = 'Selecciona un rango de precio';
    
    // Validar formato de teléfono básico
    if (formData.phone && !/^[0-9+\s()-]{8,15}$/.test(formData.phone)) {
      newErrors.phone = 'Formato de teléfono inválido';
    }
    
    // Validar formato de URL
    if (formData.website && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(formData.website)) {
      newErrors.website = 'URL inválida';
    }
    
    // Validar URL de imagen
    if (formData.imageUrl && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(formData.imageUrl)) {
      newErrors.imageUrl = 'URL de imagen inválida';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setErrors({});
    
    try {
      const newRestaurant = await addRestaurant(formData);
      if (onRestaurantAdded) {
        onRestaurantAdded(newRestaurant);
      }
      alert('Restaurante guardado exitosamente');
      
      navigate('/');
    } catch (error) {
      console.error('Error al guardar el restaurante:', error);
      setErrors({ submit: 'Error al guardar el restaurante. Inténtalo de nuevo.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <h1 className='form-header'>Añadir Nuevo Restaurante</h1>
      
      <form className="restaurant-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className='form-input'
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className='form-textarea'
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoría *</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className='form-select'
          >
            <option value="">Seleccionar categoría</option>
            {CATEGORIES.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          {errors.category && <span className="error-message">{errors.category}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="address">Dirección *</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className='form-input'
          />
          {errors.address && <span className="error-message">{errors.address}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone">Teléfono</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className='form-input'
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="website">Sitio Web</label>
            <input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className='form-input'
              placeholder="https://ejemplo.com"
            />
            {errors.website && <span className="error-message">{errors.website}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="priceRange">Rango de Precio *</label>
            <select
              id="priceRange"
              name="priceRange"
              value={formData.priceRange}
              onChange={handleChange}
              className='form-select'
            >
              <option value="">Seleccionar precio</option>
              {PRICE_RANGES.map(price => (
                <option key={price} value={price}>{price}</option>
              ))}
            </select>
            {errors.priceRange && <span className="error-message">{errors.priceRange}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="rating">Calificación</label>
            <input
              type="number"
              id="rating"
              name="rating"
              min="0"
              max="5"
              step="0.5"
              value={formData.rating}
              onChange={handleChange}
              className='form-input'
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">URL de Imagen</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className='form-input'
            placeholder="https://ejemplo.com/imagen.jpg"
          />
          {errors.imageUrl && <span className="error-message">{errors.imageUrl}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="openingHours">Horario de Apertura</label>
          <input
            type="text"
            id="openingHours"
            name="openingHours"
            value={formData.openingHours}
            onChange={handleChange}
            placeholder="Lun-Vie: 9:00-22:00, Sab-Dom: 10:00-23:00"
            className='form-input'
          />
        </div>

        {errors.submit && <div className="submit-error">{errors.submit}</div>}
        
        <div className="form-actions">
          <button type="button" onClick={() => navigate('/')}>Cancelar</button>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Guardando...' : 'Guardar Restaurante'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewRestaurant
