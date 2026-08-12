import { useState } from 'react';
import Layout from '../components/Layout';
import Input from '../components/Input';
import Button from '../components/Button';

const RegistroCliente = ({ onNavigate }) => {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validar coincidencia de contraseña
    if (contrasena !== confirmarContrasena) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    // Buscar si el correo ya existe
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const emailExists = storedUsers.some(
      (u) => u.correo.toLowerCase() === correo.toLowerCase().trim()
    );

    if (emailExists) {
      setError('Este correo electrónico ya está registrado.');
      return;
    }

    // Guardar nuevo usuario
    const newUser = {
      id: 'u' + Date.now(),
      nombre: nombre.trim(),
      apellidos: apellidos.trim(),
      correo: correo.toLowerCase().trim(),
      contrasena: contrasena
    };

    const updatedUsers = [...storedUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Navegar a pantalla de éxito
    onNavigate('registro-exitoso');
  };

  return (
    <Layout>
      <h2 className="form-title">Crear una cuenta</h2>
      <p className="form-subtitle">Regístrate para realizar tu reserva</p>
      
      {error && <div className="error-message" style={{ marginBottom: '1rem', fontWeight: 600 }}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <Input
          label="Nombre"
          type="text"
          placeholder="Ingresa tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          iconType="user"
          required
        />
        
        <Input
          label="Apellidos"
          type="text"
          placeholder="Ingresa tus apellidos"
          value={apellidos}
          onChange={(e) => setApellidos(e.target.value)}
          iconType="user"
          required
        />
        
        <Input
          label="Correo electrónico"
          type="email"
          placeholder="Ingresa tu correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          iconType="email"
          required
        />
        
        <Input
          label="Contraseña"
          type="password"
          placeholder="Crea una contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          iconType="password"
          required
        />
        
        <Input
          label="Confirmar contraseña"
          type="password"
          placeholder="Confirma tu contraseña"
          value={confirmarContrasena}
          onChange={(e) => setConfirmarContrasena(e.target.value)}
          iconType="password"
          required
        />
        
        <Button type="submit" variant="primary" style={{ marginTop: '1rem' }}>
          <span>Registrarse</span>
        </Button>
      </form>
      
      <div className="form-footer-text">
        ¿Ya tienes una cuenta?{' '}
        <span className="form-link" onClick={() => onNavigate('login-cliente')}>
          Iniciar sesión
        </span>
      </div>
    </Layout>
  );
};

export default RegistroCliente;
