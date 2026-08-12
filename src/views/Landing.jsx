import fondoBalanceado from '../assets/fondo-balanceado.jpg';

const Landing = ({ onNavigate }) => {
  return (
    <div 
      className="landing-container" 
      style={{ backgroundImage: `url(${fondoBalanceado})` }}
    >
      <div className="landing-overlay"></div>
      
      <div className="landing-content">
        <div className="landing-logo">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        </div>
        <h1 className="landing-title">EL BUEN POINT</h1>
        <p className="landing-slogan">Reserva fácil. Disfruta mejor.</p>
        
        <button 
          className="landing-btn"
          onClick={() => onNavigate('login-cliente')}
        >
          Haz click aquí para comenzar la experiencia
        </button>
      </div>
    </div>
  );
};

export default Landing;
