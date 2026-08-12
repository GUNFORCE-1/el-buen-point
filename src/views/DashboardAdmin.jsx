import Layout from '../components/Layout';
import Button from '../components/Button';

const DashboardAdmin = ({ onNavigate }) => {
  // 1. Obtener datos de LocalStorage
  const storedReservations = JSON.parse(localStorage.getItem('reservas')) || [];
  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

  // Obtener fecha de hoy en formato YYYY-MM-DD
  const getTodayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const todayStr = getTodayDateString();

  // Filtrar reservas activas (confirmadas) para el día de hoy
  const todayReservations = storedReservations.filter(
    (res) => res.fecha === todayStr && res.estado === 'confirmada'
  );

  // Calcular métricas
  const totalReservasHoy = todayReservations.length;
  
  // Mesas ocupadas hoy (únicas)
  const mesasOcupadasHoy = new Set(todayReservations.map((res) => res.mesa)).size;
  
  // Mesas libres hoy (total 10 mesas menos ocupadas)
  const totalMesas = 10;
  const mesasLibresHoy = Math.max(0, totalMesas - mesasOcupadasHoy);

  // Próximas reservas (todas las reservas futuras, hoy en adelante)
  const proximasReservasCount = storedReservations.filter(
    (res) => res.fecha >= todayStr && res.estado === 'confirmada'
  ).length;

  // Obtener nombre del cliente por id de usuario
  const getClienteNombre = (usuarioId) => {
    const user = storedUsers.find((u) => u.id === usuarioId);
    return user ? `${user.nombre} ${user.apellidos}` : 'Cliente Registrado';
  };

  // Obtener las últimas 5 reservas futuras para mostrar en la tabla
  const upcomingReservationsForTable = [...storedReservations]
    .filter((res) => res.fecha >= todayStr && res.estado === 'confirmada')
    .sort((a, b) => {
      // Ordenar por fecha y hora (orden cronológico ascendente)
      if (a.fecha !== b.fecha) return a.fecha.localeCompare(b.fecha);
      return a.hora.localeCompare(b.hora);
    })
    .slice(0, 5);

  return (
    <Layout>
      <h2 className="form-title" style={{ width: '100%', textAlign: 'left' }}>Dashboard Administrador</h2>
      <p className="form-subtitle" style={{ width: '100%', textAlign: 'left', marginBottom: '2rem' }}>
        Resumen general del estado actual del restaurante.
      </p>

      {/* Metrics Row */}
      <div className="admin-metrics">
        {/* Card 1 */}
        <div className="metric-card">
          <div className="metric-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <div className="metric-details">
            <div className="metric-value">{totalReservasHoy}</div>
            <div className="metric-label">Reservas hoy</div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="metric-card">
          <div className="metric-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="8" width="16" height="8" rx="2"/>
              <line x1="7" y1="16" x2="7" y2="21" />
              <line x1="17" y1="16" x2="17" y2="21" />
            </svg>
          </div>
          <div className="metric-details">
            <div className="metric-value">{mesasOcupadasHoy}</div>
            <div className="metric-label">Mesas ocupadas</div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="metric-card">
          <div className="metric-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <div className="metric-details">
            <div className="metric-value">{mesasLibresHoy}</div>
            <div className="metric-label">Mesas libres</div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="metric-card">
          <div className="metric-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <div className="metric-details">
            <div className="metric-value">{proximasReservasCount}</div>
            <div className="metric-label">Próximas reservas</div>
          </div>
        </div>
      </div>

      {/* Upcoming Reservations List */}
      <div style={{ width: '100%', textAlign: 'left', marginBottom: '0.75rem', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-color)' }}>
        Próximas reservas:
      </div>
      
      <div className="admin-table-container">
        {upcomingReservationsForTable.length > 0 ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Hora</th>
                <th>Cliente</th>
                <th>Personas</th>
                <th>Mesa</th>
              </tr>
            </thead>
            <tbody>
              {upcomingReservationsForTable.map((res) => (
                <tr key={res.id}>
                  <td style={{ fontWeight: 700 }}>{res.hora}</td>
                  <td>{getClienteNombre(res.usuarioId)}</td>
                  <td>{res.personas} personas</td>
                  <td style={{ fontWeight: 700, color: 'var(--primary-color)' }}>{res.mesa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            No hay próximas reservas registradas.
          </div>
        )}
      </div>

      <Button 
        variant="primary" 
        onClick={() => onNavigate('calendario-admin')}
        style={{ marginTop: '1rem' }}
      >
        <span>Ver calendario de reservas</span>
      </Button>
    </Layout>
  );
};

export default DashboardAdmin;
