import Layout from '../components/Layout';
import Button from '../components/Button';

const ReservasAdmin = ({ onNavigate, setSelectedReservaId }) => {
  const storedReservations = JSON.parse(localStorage.getItem('reservas')) || [];
  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

  const getClienteNombre = (usuarioId) => {
    const user = storedUsers.find((u) => u.id === usuarioId);
    return user ? `${user.nombre} ${user.apellidos}` : 'Cliente Registrado';
  };

  const handleRowClick = (reservaId) => {
    setSelectedReservaId(reservaId);
    onNavigate('gestion-reserva-admin');
  };

  return (
    <Layout>
      <h2 className="form-title" style={{ width: '100%', textAlign: 'left' }}>Listado de Reservas</h2>
      <p className="form-subtitle" style={{ width: '100%', textAlign: 'left', marginBottom: '2rem' }}>
        Visualiza todas las reservas registradas en el sistema. Haz clic en una fila para gestionar.
      </p>

      <div className="admin-table-container" style={{ width: '100%' }}>
        {storedReservations.length > 0 ? (
          <table className="admin-table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Cliente</th>
                <th>Mesa</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {storedReservations.map((res) => (
                <tr key={res.id} onClick={() => handleRowClick(res.id)}>
                  <td>{res.fecha}</td>
                  <td style={{ fontWeight: 700 }}>{res.hora}</td>
                  <td>{getClienteNombre(res.usuarioId)}</td>
                  <td style={{ fontWeight: 700, color: 'var(--primary-color)' }}>{res.mesa}</td>
                  <td>
                    <span className={`badge ${res.estado === 'confirmada' ? 'badge-success' : 'badge-danger'}`}>
                      {res.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No hay reservas registradas.
          </div>
        )}
      </div>

      <Button 
        variant="primary" 
        onClick={() => onNavigate('dashboard-admin')}
        style={{ marginTop: '1.5rem' }}
      >
        <span>Volver al Dashboard</span>
      </Button>
    </Layout>
  );
};

export default ReservasAdmin;
