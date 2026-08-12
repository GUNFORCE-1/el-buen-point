import { useState } from 'react';
import Layout from '../components/Layout';
import Input from '../components/Input';
import Button from '../components/Button';

const LoginCliente = ({ onNavigate, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Por favor complete todos los campos.');
      return;
    }

    // 1. Validar si es administrador
    if ((email === 'admin' || email === 'admin@elbuenpoint.com') && password === 'admin123') {
      const adminUser = {
        id: 'admin',
        nombre: 'Admin',
        apellidos: 'Buen Point',
        correo: email,
        rol: 'admin'
      };
      onLoginSuccess(adminUser, 'dashboard-admin');
      return;
    }

    // 2. Validar si es cliente (buscar en LocalStorage)
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = storedUsers.find(
      (u) => u.correo.toLowerCase() === email.toLowerCase().trim() && u.contrasena === password
    );

    if (foundUser) {
      const clientUser = {
        id: foundUser.id,
        nombre: foundUser.nombre,
        apellidos: foundUser.apellidos,
        correo: foundUser.correo,
        rol: 'cliente'
      };
      onLoginSuccess(clientUser, 'intro-reserva');
    } else {
      setError('Correo electrónico o contraseña incorrectos.');
    }
  };

  return (
    <Layout>
      <h2 className="form-title">Bienvenido a EL BUEN POINT</h2>
      <p className="form-subtitle">Inicia sesión para realizar tu reserva</p>
      
      {error && <div className="error-message" style={{ marginBottom: '1rem', fontWeight: 600 }}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <Input
          label="Correo electrónico"
          type="email"
          placeholder="Ingresa tu correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          iconType="email"
          required
        />
        
        <Input
          label="Contraseña"
          type="password"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          iconType="password"
          required
        />
        
        <Button type="submit" variant="primary" style={{ marginTop: '1rem' }}>
          <span>Iniciar sesión</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Button>
      </form>
      
      <div className="form-footer-text">
        ¿No tienes cuenta?{' '}
        <span className="form-link" onClick={() => onNavigate('registro-cliente')}>
          Registrarse
        </span>
      </div>
      
      <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.75rem', color: '#9CA3AF' }}>
        <span className="form-link" onClick={() => onNavigate('login-admin')}>
          Acceso Administradores
        </span>
      </div>
    </Layout>
  );
};

export default LoginCliente;
