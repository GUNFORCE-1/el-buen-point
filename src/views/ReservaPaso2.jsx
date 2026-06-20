import React, { useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import CardMesa from '../components/CardMesa';

const ReservaPaso2 = ({ onNavigate, bookingTemp, setBookingTemp, mesasMock }) => {
  const [selectedMesa, setSelectedMesa] = useState(bookingTemp.mesa || '');
  const [error, setError] = useState('');

  // 1. Obtener todas las reservas de LocalStorage para verificar disponibilidad
  const storedReservations = JSON.parse(localStorage.getItem('reservas')) || [];

  // 2. Determinar el estado de cada mesa
  const getMesaEstado = (mesa) => {
    // Regla 1: Validar capacidad (capacidad de mesa debe ser >= personas a reservar)
    if (mesa.capacidad < bookingTemp.personas) {
      return 'ocupada'; // Deshabilitada por capacidad insuficiente
    }

    // Regla 2: Verificar si ya existe una reserva confirmada en la misma fecha y hora
    const isReserved = storedReservations.some(
      (res) => 
        res.fecha === bookingTemp.fecha && 
        res.hora === bookingTemp.hora && 
        res.mesa === mesa.codigo &&
        res.estado === 'confirmada'
    );

    if (isReserved) {
      return 'ocupada'; // Ocupada en esa fecha/hora
    }

    // Regla 3: Si coincide con la selección actual del usuario
    if (selectedMesa === mesa.codigo) {
      return 'seleccionada';
    }

    return 'disponible';
  };

  const handleMesaClick = (codigo, estado) => {
    if (estado === 'ocupada') return;
    setSelectedMesa(codigo);
  };

  const handleContinue = () => {
    setError('');
    if (!selectedMesa) {
      setError('Por favor seleccione una mesa para continuar.');
      return;
    }

    // Guardar en el estado temporal
    setBookingTemp({
      ...bookingTemp,
      mesa: selectedMesa
    });

    onNavigate('reserva-paso-3');
  };

  return (
    <Layout>
      <div style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
        Paso 2 de 3
      </div>
      
      {/* Timeline */}
      <div className="timeline-container" style={{ marginBottom: '1.5rem' }}>
        <div className="timeline-line"></div>
        <div className="timeline-step completed">✓</div>
        <div className="timeline-step active">2</div>
        <div className="timeline-step">3</div>
      </div>

      <h2 className="form-title">Selecciona tu mesa</h2>
      <p className="form-subtitle">Elige una mesa disponible para tu reserva</p>

      {error && <div className="error-message" style={{ marginBottom: '1rem', fontWeight: 600 }}>{error}</div>}

      <div style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.75rem', textAlign: 'left', width: '100%' }}>
        Mesas disponibles:
      </div>

      <div className="mesas-grid">
        {mesasMock.map((mesa) => {
          const estado = getMesaEstado(mesa);
          return (
            <CardMesa
              key={mesa.codigo}
              codigo={mesa.codigo}
              capacidad={mesa.capacidad}
              estado={estado}
              onClick={() => handleMesaClick(mesa.codigo, estado)}
            />
          );
        })}
      </div>

      <div className="mesa-seleccionada-info">
        Mesa seleccionada: <span style={{ color: 'var(--primary-color)', fontSize: '1.25rem', fontWeight: 800 }}>{selectedMesa || 'Ninguna'}</span>
      </div>

      <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
        <Button 
          variant="outline" 
          onClick={() => onNavigate('reserva-paso-1')}
          style={{ flex: 1 }}
        >
          Volver
        </Button>
        <Button 
          variant="primary" 
          onClick={handleContinue}
          style={{ flex: 2 }}
        >
          Continuar
        </Button>
      </div>
    </Layout>
  );
};

export default ReservaPaso2;
