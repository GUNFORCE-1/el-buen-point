import React from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';

const ReservaPaso3 = ({ onNavigate, bookingTemp, onConfirmBooking }) => {
  
  // Format Date for nice visualization (e.g. YYYY-MM-DD to friendly Spanish)
  const formatFriendlyDate = (dateStr) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    const year = parts[0];
    const months = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    const month = months[parseInt(parts[1]) - 1];
    const day = parseInt(parts[2]);
    return `${day} de ${month} de ${year}`;
  };

  const handleConfirm = () => {
    onConfirmBooking();
  };

  return (
    <Layout>
      <div style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
        Paso 3 de 3
      </div>
      
      {/* Timeline */}
      <div className="timeline-container" style={{ marginBottom: '1.5rem' }}>
        <div className="timeline-line"></div>
        <div className="timeline-step completed">✓</div>
        <div className="timeline-step completed">✓</div>
        <div className="timeline-step active">3</div>
      </div>

      <h2 className="form-title">Confirmar reserva</h2>
      <p className="form-subtitle">Verifica los datos antes de finalizar</p>

      {/* Summary table */}
      <div className="resumen-container">
        <div className="resumen-row">
          <span className="resumen-label">Fecha</span>
          <span className="resumen-value">{formatFriendlyDate(bookingTemp.fecha)}</span>
        </div>
        <div className="resumen-row">
          <span className="resumen-label">Hora</span>
          <span className="resumen-value">{bookingTemp.hora}</span>
        </div>
        <div className="resumen-row">
          <span className="resumen-label">Mesa</span>
          <span className="resumen-value">{bookingTemp.mesa}</span>
        </div>
        <div className="resumen-row">
          <span className="resumen-label">Personas</span>
          <span className="resumen-value">{bookingTemp.personas} {bookingTemp.personas === 1 ? 'persona' : 'personas'}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
        <Button 
          variant="outline" 
          onClick={() => onNavigate('reserva-paso-2')}
          style={{ flex: 1 }}
        >
          Volver
        </Button>
        <Button 
          variant="primary" 
          onClick={handleConfirm}
          style={{ flex: 2 }}
        >
          Confirmar reserva
        </Button>
      </div>

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

export default ReservaPaso3;
