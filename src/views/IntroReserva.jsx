import React from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';

const IntroReserva = ({ onNavigate }) => {
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
