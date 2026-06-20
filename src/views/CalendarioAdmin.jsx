import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';

const CalendarioAdmin = ({ onNavigate, setSelectedReservaId }) => {
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(5); // Junio es index 5 (0-11)
  const [selectedDay, setSelectedDay] = useState(15); // Día 15 por defecto como en el figma
  const [selectedResId, setSelectedResId] = useState(null);

  const storedReservations = JSON.parse(localStorage.getItem('reservas')) || [];
  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

  const monthsList = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Formatear fecha para busqueda: YYYY-MM-DD
  const getFormattedDateString = (year, month, day) => {
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  };

  const selectedDateStr = getFormattedDateString(currentYear, currentMonth, selectedDay);

  // Navegación de Meses
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDay(1); // Restablecer al primer día al cambiar mes
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDay(1);
  };

  // Generar matriz de días para el calendario
  const getDaysArray = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    // Obtener primer día de la semana (0=Domingo, 1=Lunes, etc.)
    const firstDayIndexRaw = new Date(currentYear, currentMonth, 1).getDay();
    // Convertir a Mon=0 ... Sun=6
    const firstDayIndex = firstDayIndexRaw === 0 ? 6 : firstDayIndexRaw - 1;

    const cells = [];
    
    // Rellenar días del mes anterior vacíos
    for (let i = 0; i < firstDayIndex; i++) {
      cells.push({ day: '', isCurrentMonth: false });
    }

    // Rellenar días del mes actual
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ day: d, isCurrentMonth: true });
    }

    return cells;
  };

  const calendarCells = getDaysArray();

  // Verificar si un día del mes actual tiene reservas
  const dayHasReservations = (day) => {
    const dateStr = getFormattedDateString(currentYear, currentMonth, day);
    return storedReservations.some(
      (res) => res.fecha === dateStr && res.estado === 'confirmada'
    );
  };

  // Filtrar reservas del día seleccionado
  const dayReservations = storedReservations.filter(
    (res) => res.fecha === selectedDateStr && res.estado === 'confirmada'
  );

  const getClienteNombre = (usuarioId) => {
    const user = storedUsers.find((u) => u.id === usuarioId);
    return user ? `${user.nombre} ${user.apellidos}` : 'Cliente';
  };

  const handleEdit = () => {
    if (!selectedResId) {
      alert('Por favor seleccione una reserva del listado de la derecha.');
      return;
    }
    setSelectedReservaId(selectedResId);
    onNavigate('gestion-reserva-admin');
  };

  // Formato amigable de la fecha seleccionada
  const getFriendlySelectedDate = () => {
    return `${selectedDay} de ${monthsList[currentMonth].toLowerCase()} de ${currentYear}`;
  };

  return (
    <Layout>
      <h2 className="form-title" style={{ width: '100%', textAlign: 'left' }}>Calendario de Reservas</h2>
      <p className="form-subtitle" style={{ width: '100%', textAlign: 'left', marginBottom: '2rem' }}>
        Visualiza las reservas y disponibilidad del restaurante.
      </p>

      <div className="calendar-layout">
        {/* Columna Izquierda: Calendario */}
        <div className="calendar-col">
          <div className="calendar-header">
            <button className="calendar-btn-nav" onClick={handlePrevMonth}>&lt;</button>
            <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>
              {monthsList[currentMonth]} {currentYear}
            </span>
            <button className="calendar-btn-nav" onClick={handleNextMonth}>&gt;</button>
          </div>

          <table className="calendar-table">
            <thead>
              <tr>
                <th>Lun</th>
                <th>Mar</th>
                <th>Mié</th>
                <th>Jue</th>
                <th>Vie</th>
                <th>Sáb</th>
                <th>Dom</th>
              </tr>
            </thead>
            <tbody>
              {/* Dividir celdas en filas de 7 */}
              {Array.from({ length: Math.ceil(calendarCells.length / 7) }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {calendarCells.slice(rowIndex * 7, rowIndex * 7 + 7).map((cell, colIndex) => {
                    const isSelected = cell.isCurrentMonth && cell.day === selectedDay;
                    const hasRes = cell.isCurrentMonth && dayHasReservations(cell.day);

                    return (
                      <td
                        key={colIndex}
                        className={`${isSelected ? 'selected' : ''} ${!cell.isCurrentMonth ? 'other-month' : ''}`}
                        onClick={() => {
                          if (cell.isCurrentMonth) {
                            setSelectedDay(cell.day);
                            setSelectedResId(null); // Reset seleccion al cambiar dia
                          }
                        }}
                      >
                        {cell.day && (
                          <>
                            <div className="calendar-day-num">{cell.day}</div>
                            {/* Mostrar punto: Rojo si tiene reservas, Verde si está libre */}
                            <div className={`calendar-dot ${hasRes ? 'rojo' : 'verde'}`}></div>
                          </>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="calendar-legends">
            <div className="legend-item">
              <span className="calendar-dot verde" style={{ display: 'inline-block', margin: 0 }}></span>
              <span>Disponible</span>
            </div>
            <div className="legend-item">
              <span className="calendar-dot rojo" style={{ display: 'inline-block', margin: 0 }}></span>
              <span>Reservado</span>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Reservas del día */}
        <div className="reservations-col">
          <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.75rem', textAlign: 'left' }}>
            Reservas del {getFriendlySelectedDate()}:
          </div>

          <div className="admin-table-container" style={{ flex: 1, minHeight: '200px' }}>
            {dayReservations.length > 0 ? (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Hora</th>
                    <th>Cliente</th>
                    <th>Mesa</th>
                  </tr>
                </thead>
                <tbody>
                  {dayReservations.map((res) => (
                    <tr 
                      key={res.id} 
                      className={selectedResId === res.id ? 'selected' : ''}
                      onClick={() => setSelectedResId(res.id)}
                    >
                      <td style={{ fontWeight: 700 }}>{res.hora}</td>
                      <td>{getClienteNombre(res.usuarioId)}</td>
                      <td style={{ fontWeight: 700, color: 'var(--primary-color)' }}>{res.mesa}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                No hay reservas para este día.
              </div>
            )}
          </div>

          <Button
            variant="primary"
            onClick={handleEdit}
            disabled={!selectedResId}
            style={{ marginTop: '1rem' }}
          >
            <span>Ver detalle de reserva</span>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default CalendarioAdmin;
