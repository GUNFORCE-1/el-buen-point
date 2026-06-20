import React from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';

const ReservaExitosa = ({ onNavigate, bookingCode }) => {
  return (
    <Layout>
      <div className="success-card">
        <div style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          Paso 3 de 3
        </div>
        
        <h2 className="form-title" style={{ marginBottom: '0.25rem' }}>¡Reserva confirmada!</h2>
        <p className="form-subtitle" style={{ marginBottom: '1.5rem' }}>Tu reserva ha sido registrada correctamente.</p>
        
        <div className="success-icon-wrapper">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>Tu número de reserva es:</p>
        
        <div className="reserva-codigo-box">
          {bookingCode || 'RSV-2026-00000'}
        </div>
        
        <Button 
          variant="primary" 
          onClick={() => onNavigate('intro-reserva')}
          style={{ marginTop: '1rem' }}
        >
          <span>Volver al inicio</span>
        </Button>
      </div>
    </Layout>
  );
};

export default ReservaExitosa;
