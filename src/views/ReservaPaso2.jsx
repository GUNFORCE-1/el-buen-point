import { useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import CardMesa from '../components/CardMesa';

const ReservaPaso2 = ({ onNavigate, bookingTemp, setBookingTemp, mesasMock }) => {
  const [selectedMesa, setSelectedMesa] = useState(bookingTemp.mesa || '');
  const [error, setError] = useState('');
  const [filterCapacidad, setFilterCapacidad] = useState('todas');
  const [showPrompt, setShowPrompt] = useState(false);

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

    setShowPrompt(true);
  };

  // Filtrar mesas según la capacidad elegida y compatibilidad con las personas
  const filteredMesas = mesasMock.filter((mesa) => {
    if (mesa.capacidad < bookingTemp.personas) return false;
    if (filterCapacidad === 'todas') return true;
    return mesa.capacidad === parseInt(filterCapacidad);
  });

  if (showPrompt) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍽️</div>
          <h2 className="form-title" style={{ marginBottom: '1rem' }}>¿Desea agregar platos?</h2>
          <p className="form-subtitle" style={{ marginBottom: '2.5rem' }}>
            Puedes seleccionar platos y promociones exclusivas para acompañar tu reserva en la mesa <strong>{selectedMesa}</strong>.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
            <Button 
              variant="primary" 
              onClick={() => onNavigate('promociones')}
            >
              Sí, ver promociones y agregar platos
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onNavigate('reserva-paso-3')}
            >
              No, continuar sin platos
            </Button>
            
            <span 
              className="form-link" 
              style={{ display: 'inline-block', marginTop: '1.5rem', fontSize: '0.9rem' }} 
              onClick={() => setShowPrompt(false)}
            >
              Volver a seleccionar mesa
            </span>
          </div>
        </div>
      </Layout>
    );
  }

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
      <p className="form-subtitle">
        Mostrando mesas compatibles para <strong>{bookingTemp.personas} {bookingTemp.personas === 1 ? 'persona' : 'personas'}</strong>.
      </p>

      {error && <div className="error-message" style={{ marginBottom: '1rem', fontWeight: 600 }}>{error}</div>}

      {/* Botones de filtro de capacidad */}
      <div style={{ display: 'flex', gap: '0.35rem', marginBottom: '1.25rem', width: '100%', overflowX: 'auto', paddingBottom: '0.25rem' }}>
        <button
          onClick={() => setFilterCapacidad('todas')}
          style={{
            padding: '0.35rem 0.75rem',
            fontSize: '0.75rem',
            fontWeight: 600,
            borderRadius: '20px',
            border: '1px solid var(--border-color)',
            backgroundColor: filterCapacidad === 'todas' ? 'var(--primary-color)' : 'var(--bg-color)',
            color: filterCapacidad === 'todas' ? 'white' : 'var(--text-color)',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s'
          }}
        >
          Todas ({mesasMock.filter(m => m.capacidad >= bookingTemp.personas).length})
        </button>
        {[2, 4, 6].map((cap) => {
          if (cap < bookingTemp.personas) return null;
          const count = mesasMock.filter(m => m.capacidad === cap).length;
          return (
            <button
              key={cap}
              onClick={() => setFilterCapacidad(cap.toString())}
              style={{
                padding: '0.35rem 0.75rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                borderRadius: '20px',
                border: '1px solid var(--border-color)',
                backgroundColor: filterCapacidad === cap.toString() ? 'var(--primary-color)' : 'var(--bg-color)',
                color: filterCapacidad === cap.toString() ? 'white' : 'var(--text-color)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s'
              }}
            >
              Capacidad {cap} ({count})
            </button>
          );
        })}
      </div>

      <div style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.75rem', textAlign: 'left', width: '100%' }}>
        Mesas disponibles:
      </div>

      <div className="mesas-grid">
        {filteredMesas.map((mesa) => {
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
