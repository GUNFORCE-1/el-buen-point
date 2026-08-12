import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';

const IntroReserva = ({ onNavigate }) => {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error al cargar la sugerencia del chef');
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.meals && data.meals.length > 0) {
          setMeal(data.meals[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      <h2 className="form-title">Reserva tu mesa</h2>
      <p className="form-subtitle">Realiza tu reserva en pocos pasos.</p>

      {/* Progress tracker timeline */}
      <div className="timeline-container">
        <div className="timeline-line"></div>
        <div className="timeline-step">1</div>
        <div className="timeline-step">2</div>
        <div className="timeline-step">3</div>
      </div>
      
      <div className="timeline-labels">
        <div className="timeline-label">Paso 1<br/>Selecciona fecha y hora</div>
        <div className="timeline-label">Paso 2<br/>Elige tu mesa</div>
        <div className="timeline-label">Paso 3<br/>Completa tus datos</div>
      </div>

      {/* Sugerencia del Chef */}
      <div style={{
        marginTop: '1.5rem',
        padding: '1rem',
        borderRadius: 'var(--border-radius)',
        backgroundColor: 'var(--primary-light)',
        border: '1px solid var(--primary-color)',
        textAlign: 'left'
      }}>
        <h4 style={{ color: 'var(--primary-color)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
          <span>👨‍🍳</span> Sugerencia del Chef para hoy:
        </h4>
        {loading && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Cargando recomendación...</p>}
        {error && <p style={{ fontSize: '0.8rem', color: 'var(--danger-color)' }}>No se pudo cargar la recomendación del día.</p>}
        {meal && (
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <img 
              src={meal.strMealThumb} 
              alt={meal.strMeal} 
              style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} 
            />
            <div>
              <p style={{ fontWeight: '700', fontSize: '0.85rem', margin: 0 }}>{meal.strMeal}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.1rem 0 0 0' }}>Categoría: {meal.strCategory} | Región: {meal.strArea}</p>
            </div>
          </div>
        )}
      </div>

      <Button 
        variant="primary" 
        onClick={() => onNavigate('reserva-paso-1')}
        style={{ marginTop: '2rem' }}
      >
        <span>Comenzar reserva</span>
      </Button>
    </Layout>
  );
};

export default IntroReserva;
