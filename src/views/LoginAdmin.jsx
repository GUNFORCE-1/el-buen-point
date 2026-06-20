import React, { useState } from 'react';
import Layout from '../components/Layout';
import Input from '../components/Input';
import Button from '../components/Button';

const LoginAdmin = ({ onNavigate, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Por favor complete todos los campos.');
      return;
    }

    // Validar credenciales de administrador (admin / admin123)
    if (
      (username.trim().toLowerCase() === 'admin' || username.trim().toLowerCase() === 'admin@elbuenpoint.com') && 
      password === 'admin123'
    ) {
      const adminUser = {
        id: 'admin',
        nombre: 'Admin',
        apellidos: 'Buen Point',
        correo: username.trim(),
        rol: 'admin'
      };
      onLoginSuccess(adminUser, 'dashboard-admin');
    } else {
      setError('Credenciales de administrador incorrectas.');
    }
  };

  return (
    <Layout>
      <h2 className="form-title">Acceso Administrador</h2>
      <p className="form-subtitle">Ingresa tus datos para gestionar las reservas</p>
      
      {error && <div className="error-message" style={{ marginBottom: '1rem', fontWeight: 600 }}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <Input
          label="Usuario / Correo electrónico"
          type="text"
          placeholder="Ingresa tu usuario o correo electrónico"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          iconType="user"
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
        
        <Button type="submit" variant="primary" style={{ marginTop: '1.5rem' }}>
          <span>Iniciar sesión</span>
        </Button>
      </form>
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '2rem', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
        <span>Acceso seguro y exclusivo para administradores</span>
      </div>

      <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem' }}>
        <span className="form-link" onClick={() => onNavigate('login-cliente')}>
          Volver a Login Cliente
        </span>
      </div>
    </Layout>
  );
};

export default LoginAdmin;
