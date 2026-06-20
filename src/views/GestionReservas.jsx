import React, { useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';

const GestionReservas = ({ 
  onNavigate, 
  selectedReservaId, 
  mesasMock, 
  onUpdateReservation 
}) => {
  const storedReservations = JSON.parse(localStorage.getItem('reservas')) || [];
  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

  // 1. Cargar la reserva seleccionada
  const currentReserva = storedReservations.find((res) => res.id === selectedReservaId);

  if (!currentReserva) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h2>Error</h2>
          <p style={{ margin: '1rem 0', color: 'var(--text-muted)' }}>No se encontró la reserva seleccionada.</p>
          <Button variant="primary" onClick={() => onNavigate('calendario-admin')}>
            Volver al Calendario
          </Button>
        </div>
      </Layout>
    );
  }

  // Cargar usuario de la reserva
  const cliente = storedUsers.find((u) => u.id === currentReserva.usuarioId);
  const clienteNombre = cliente ? `${cliente.nombre} ${cliente.apellidos}` : 'Cliente';

  // 2. Estados locales para la edición
  const [fecha, setFecha] = useState(currentReserva.fecha);
  const [hora, setHora] = useState(currentReserva.hora);
  const [mesa, setMesa] = useState(currentReserva.mesa);
  const [personas, setPersonas] = useState(currentReserva.personas);
  const [estado, setEstado] = useState(currentReserva.estado);
  const [error, setError] = useState('');

  // Restringir a fechas futuras (hoy en adelante) para que coincida con políticas del negocio
  const getTodayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleCancelDirectly = () => {
    onUpdateReservation(selectedReservaId, {
      ...currentReserva,
      estado: 'cancelada'
    });
    onNavigate('calendario-admin');
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setError('');

    // Validar capacidad de mesa
    const selectedMesaInfo = mesasMock.find((m) => m.codigo === mesa);
    if (selectedMesaInfo && selectedMesaInfo.capacidad < parseInt(personas)) {
      setError(`Capacidad insuficiente. La mesa ${mesa} solo tiene capacidad para ${selectedMesaInfo.capacidad} personas.`);
      return;
    }

    // Validar conflictos de disponibilidad
    const isConflict = storedReservations.some(
      (res) =>
        res.id !== selectedReservaId && // Excluir la reserva actual
        res.fecha === fecha &&
        res.hora === hora &&
        res.mesa === mesa &&
        res.estado === 'confirmada' &&
        estado === 'confirmada'
    );

    if (isConflict) {
      setError(`La mesa ${mesa} ya está reservada para el día ${fecha} a las ${hora}.`);
      return;
    }

    // Actualizar la reserva
    onUpdateReservation(selectedReservaId, {
      ...currentReserva,
      fecha,
      hora,
      mesa,
      personas: parseInt(personas),
      estado
    });

    onNavigate('calendario-admin');
  };

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

  return (
    <Layout>
      <h2 className="form-title" style={{ width: '100%', textAlign: 'left' }}>Gestión de Reserva</h2>
      <p className="form-subtitle" style={{ width: '100%', textAlign: 'left', marginBottom: '2rem' }}>
        Visualiza y modifica los detalles de la reserva seleccionada.
      </p>

      {error && <div className="error-message" style={{ marginBottom: '1rem', fontWeight: 600, width: '100%' }}>{error}</div>}

      <div className="split-detail-container">
        {/* Doble panel */}
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', width: '100%' }}>
          
          {/* Información Actual (Izquierda) */}
          <div className="detail-section" style={{ flex: 1, minWidth: '220px' }}>
            <div className="detail-title">Información actual de la reserva</div>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">👤 Cliente</span>
                <span className="detail-value">{clienteNombre}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">📅 Fecha</span>
                <span className="detail-value">{formatFriendlyDate(currentReserva.fecha)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">🕐 Hora</span>
                <span className="detail-value">{currentReserva.hora}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">🪑 Mesa</span>
                <span className="detail-value">{currentReserva.mesa}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">👥 Personas</span>
                <span className="detail-value">{currentReserva.personas} {currentReserva.personas === 1 ? 'persona' : 'personas'}</span>
              </div>
              <div className="detail-item" style={{ marginTop: '0.5rem' }}>
                <span className="detail-label">Estado</span>
                <span className={`badge ${currentReserva.estado === 'confirmada' ? 'badge-success' : 'badge-danger'}`}>
                  {currentReserva.estado}
                </span>
              </div>
            </div>
          </div>

          {/* Formulario de Edición (Derecha) */}
          <div className="detail-section" style={{ flex: 1.2, minWidth: '250px' }}>
            <div className="detail-title">Editar reserva</div>
            
            <form onSubmit={handleSaveChanges} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {/* Fecha */}
              <div className="input-container" style={{ marginBottom: '0.5rem' }}>
                <label className="input-label">Fecha</label>
                <input
                  type="date"
                  value={fecha}
                  min={getTodayDateString()}
                  onChange={(e) => setFecha(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: '1rem' }}
                  required
                />
              </div>

              {/* Hora */}
              <div className="input-container" style={{ marginBottom: '0.5rem' }}>
                <label className="input-label">Hora</label>
                <select
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: '1rem' }}
                  required
                >
                  <option value="1:00 p.m.">1:00 p.m.</option>
                  <option value="2:00 p.m.">2:00 p.m.</option>
                  <option value="7:00 p.m.">7:00 p.m.</option>
                  <option value="8:00 p.m.">8:00 p.m.</option>
                  <option value="9:00 p.m.">9:00 p.m.</option>
                </select>
              </div>

              {/* Mesa */}
              <div className="input-container" style={{ marginBottom: '0.5rem' }}>
                <label className="input-label">Mesa</label>
                <select
                  value={mesa}
                  onChange={(e) => setMesa(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: '1rem' }}
                  required
                >
                  {mesasMock.map((m) => (
                    <option key={m.codigo} value={m.codigo}>
                      {m.codigo} (Capacidad: {m.capacidad} pers)
                    </option>
                  ))}
                </select>
              </div>

              {/* Personas */}
              <div className="input-container" style={{ marginBottom: '0.5rem' }}>
                <label className="input-label">Personas</label>
                <select
                  value={personas}
                  onChange={(e) => setPersonas(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: '1rem' }}
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

              {/* Estado */}
              <div className="input-container" style={{ marginBottom: '1rem' }}>
                <label className="input-label">Estado</label>
                <select
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  className="input-field"
                  style={{ paddingLeft: '1rem' }}
                  required
                >
                  <option value="confirmada">Confirmada</option>
                  <option value="cancelada">Cancelada</option>
                </select>
              </div>

              <div className="detail-actions-row">
                <Button 
                  type="button" 
                  variant="danger-outline" 
                  onClick={handleCancelDirectly}
                  style={{ flex: 1 }}
                >
                  Cancelar reserva
                </Button>
                <Button 
                  type="submit" 
                  variant="primary"
                  style={{ flex: 1.2 }}
                >
                  Guardar cambios
                </Button>
              </div>
            </form>
          </div>

        </div>
      </div>

      <div style={{ width: '100%', marginTop: '1rem', textAlign: 'center' }}>
        <span className="form-link" onClick={() => onNavigate('calendario-admin')}>
          Volver al Calendario
        </span>
      </div>
    </Layout>
  );
};

export default GestionReservas;
