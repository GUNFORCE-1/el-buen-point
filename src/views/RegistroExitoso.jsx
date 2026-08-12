import Layout from '../components/Layout';
import Button from '../components/Button';

const RegistroExitoso = ({ onNavigate }) => {
  return (
    <Layout>
      <div className="success-card">
        <div className="success-icon-wrapper">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        
        <h2 className="form-title" style={{ marginBottom: '0.5rem' }}>¡Registro exitoso!</h2>
        <p className="form-subtitle" style={{ marginBottom: '2.5rem' }}>Tu cuenta fue creada correctamente.</p>
        
        <Button 
          variant="primary" 
          onClick={() => onNavigate('login-cliente')}
        >
          <span>Continuar</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Button>
      </div>
    </Layout>
  );
};

export default RegistroExitoso;
