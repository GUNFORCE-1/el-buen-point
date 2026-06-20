import React, { useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';

const ReservaPaso1 = ({ onNavigate, bookingTemp, setBookingTemp }) => {
  const [fecha, setFecha] = useState(bookingTemp.fecha || '');
  const [hora, setHora] = useState(bookingTemp.hora || '');
  const [personas, setPersonas] = useState(bookingTemp.personas || 2);
  const [error, setError] = useState('');

  // Restringir a fechas futuras (hoy en adelante)
  const getTodayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!fecha) {
      setError('Por favor seleccione una fecha.');
      return;
    }
    if (!hora) {
      setError('Por favor seleccione una hora.');
      return;
    }

    // Guardar en el estado temporal
    setBookingTemp({
      ...bookingTemp,
      fecha,
      hora,
      personas: parseInt(personas)
    });

    onNavigate('reserva-paso-2');
  };

  return (
    <Layout>
      <div style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
        Paso 1 de 3
      </div>
      
      {/* Timeline */}
      <div className="timeline-container" style={{ marginBottom: '1.5rem' }}>
        <div className="timeline-line"></div>
        <div className="timeline-step active">1</div>
        <div className="timeline-step">2</div>
        <div className="timeline-step">3</div>
      </div>

      <h2 className="form-title">Reserva tu mesa</h2>
      <p className="form-subtitle">Selecciona los datos de tu reserva</p>

      {error && <div className="error-message" style={{ marginBottom: '1rem', fontWeight: 600 }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* Fecha input with min date */}
        <div className="input-container">
          <label className="input-label">Fecha</label>
          <div className="input-wrapper">
            <span className="input-icon-left">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </span>
            <input
              type="date"
              value={fecha}
              min={getTodayDateString()}
              onChange={(e) => setFecha(e.target.value)}
              className="input-field"
              required
            />
          </div>
        </div>

        {/* Hora select */}
        <div className="input-container">
          <label className="input-label">Hora</label>
          <div className="input-wrapper">
            <span className="input-icon-left">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </span>
            <select
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className="input-field"
              required
            >
              <option value="">Selecciona una hora</option>
              <option value="1:00 p.m.">1:00 p.m.</option>
              <option value="2:00 p.m.">2:00 p.m.</option>
              <option value="7:00 p.m.">7:00 p.m.</option>
              <option value="8:00 p.m.">8:00 p.m.</option>
              <option value="9:00 p.m.">9:00 p.m.</option>
            </select>
          </div>
        </div>

        {/* Personas select */}
        <div className="input-container">
          <label className="input-label">Personas</label>
          <div className="input-wrapper">
            <span className="input-icon-left">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </span>
            <select
              value={personas}
              onChange={(e) => setPersonas(e.target.value)}
              className="input-field"
              required
            >
              <option value="1">1 persona</option>
              <option value="2">2 personas</option>
              <option value="3">3 personas</option>
              <option value="4">4 personas</option>
              <option value="5">5 personas</option>
              <option value="6">6 personas</option>
            </select>
          </div>
        </div>

        <Button type="submit" variant="primary" style={{ marginTop: '1rem' }}>
          <span>Continuar</span>
        </Button>
      </form>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        <span>Reserva fácil, rápida y segura</span>
      </div>
    </Layout>
  );
};

export default ReservaPaso1;
