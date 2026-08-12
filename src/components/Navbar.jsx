const Navbar = ({ currentUser, onNavigate, onLogout }) => {
  const isAdmin = currentUser && currentUser.rol === 'admin';

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => onNavigate(isAdmin ? 'dashboard-admin' : 'landing')}>
        <div className="navbar-logo-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        </div>
        <span>EL BUEN POINT</span>
      </div>

      <ul className="navbar-links">
        {isAdmin ? (
          <>
            <li className="navbar-link" onClick={() => onNavigate('dashboard-admin')}>Dashboard</li>
            <li className="navbar-link" onClick={() => onNavigate('calendario-admin')}>Calendario</li>
            <li className="navbar-link" onClick={() => onNavigate('reservas-admin')}>Reservas</li>
          </>
        ) : (
          <>
            <li className="navbar-link" onClick={() => onNavigate(currentUser ? 'intro-reserva' : 'login-cliente')}>Reservas</li>
            <li className="navbar-link" onClick={() => onNavigate('promociones')}>Promociones</li>
            <li className="navbar-link" onClick={() => alert('Sección Nosotros (Solo demostrativo)')}>Nosotros</li>
            <li className="navbar-link" onClick={() => alert('Sección de Contacto (Solo demostrativo)')}>Contacto</li>
          </>
        )}
      </ul>

      <div className="navbar-actions">
        {currentUser ? (
          <>
            <button 
              className="btn btn-outline" 
              style={{ width: 'auto', padding: '0.4rem 1rem', fontSize: '0.85rem' }}
              onClick={() => alert(`Usuario conectado: ${currentUser.nombre} ${currentUser.apellidos} (${currentUser.correo})`)}
            >
              Mi cuenta
            </button>
            <button 
              className="btn btn-primary" 
              style={{ width: 'auto', padding: '0.4rem 1rem', fontSize: '0.85rem' }}
              onClick={onLogout}
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <button 
              className="btn btn-outline" 
              style={{ width: 'auto', padding: '0.4rem 1rem', fontSize: '0.85rem' }}
              onClick={() => onNavigate('login-cliente')}
            >
              Mi cuenta
            </button>
            <button 
              className="btn btn-primary" 
              style={{ width: 'auto', padding: '0.4rem 1rem', fontSize: '0.85rem' }}
              onClick={() => onNavigate('login-cliente')}
            >
              Iniciar sesión
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
