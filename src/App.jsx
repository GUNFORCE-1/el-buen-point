import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Landing from './views/Landing';
import LoginCliente from './views/LoginCliente';
import RegistroCliente from './views/RegistroCliente';
import RegistroExitoso from './views/RegistroExitoso';

// Vistas de reservas (Bloque 2)
import IntroReserva from './views/IntroReserva';
import ReservaPaso1 from './views/ReservaPaso1';
import ReservaPaso2 from './views/ReservaPaso2';
import ReservaPaso3 from './views/ReservaPaso3';
import ReservaExitosa from './views/ReservaExitosa';

// Nuevas vistas del Administrador (Bloque 3)
import LoginAdmin from './views/LoginAdmin';
import DashboardAdmin from './views/DashboardAdmin';
import CalendarioAdmin from './views/CalendarioAdmin';
import GestionReservas from './views/GestionReservas';

// Mesas Mock del restaurante
const MESAS_MOCK = [
  { codigo: 'M01', capacidad: 2 },
  { codigo: 'M02', capacidad: 2 },
  { codigo: 'M03', capacidad: 4 },
  { codigo: 'M04', capacidad: 4 },
  { codigo: 'M05', capacidad: 6 },
  { codigo: 'M06', capacidad: 6 },
  { codigo: 'M07', capacidad: 2 },
  { codigo: 'M08', capacidad: 4 },
  { codigo: 'M09', capacidad: 6 },
  { codigo: 'M10', capacidad: 4 }
];

function App() {
  const [screen, setScreen] = useState('landing');
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedReservaId, setSelectedReservaId] = useState(null);

  // Estado temporal de la reserva en curso
  const [bookingTemp, setBookingTemp] = useState({
    fecha: '',
    hora: '',
    personas: 2,
    mesa: ''
  });

  // Código de la última reserva exitosa
  const [lastBookingCode, setLastBookingCode] = useState('');

  // Inicializar LocalStorage con datos demo académicos
  useEffect(() => {
    // 1. Inicializar usuarios si está vacío
    const storedUsers = localStorage.getItem('users');
    let loadedUsers = [];
    
    if (!storedUsers) {
      const defaultUsers = [
        { id: 'u1', nombre: 'Juan Carlos', apellidos: 'Pérez', correo: 'juan.carlos@mail.com', contrasena: '123456' },
        { id: 'u2', nombre: 'María', apellidos: 'Gómez', correo: 'maria.gomez@mail.com', contrasena: '123456' },
        { id: 'u3', nombre: 'Pedro', apellidos: 'Ramírez', correo: 'pedro.ramirez@mail.com', contrasena: '123456' },
        { id: 'u4', nombre: 'Ana', apellidos: 'Torres', correo: 'ana.torres@mail.com', contrasena: '123456' },
        { id: 'u5', nombre: 'Luis', apellidos: 'Fernández', correo: 'luis.fernandez@mail.com', contrasena: '123456' },
        {
          id: 'admin',
          nombre: 'Administrador',
          apellidos: 'Buen Point',
          correo: 'admin',
          contrasena: 'admin123',
          rol: 'admin'
        }
      ];
      localStorage.setItem('users', JSON.stringify(defaultUsers));
      loadedUsers = defaultUsers;
    } else {
      loadedUsers = JSON.parse(storedUsers);
    }

    // 2. Inicializar array de reservas si no existe con datos demo del figma
    const storedReservas = localStorage.getItem('reservas');
    if (!storedReservas || JSON.parse(storedReservas).length === 0) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      const todayStr = `${yyyy}-${mm}-${dd}`;

      const defaultReservas = [
        // Reservas de Hoy (Para el Dashboard - Pantalla 11)
        { id: 'RSV-2026-00101', usuarioId: 'u1', fecha: todayStr, hora: '7:00 p.m.', personas: 2, mesa: 'M02', estado: 'confirmada' },
        { id: 'RSV-2026-00102', usuarioId: 'u2', fecha: todayStr, hora: '7:30 p.m.', personas: 4, mesa: 'M05', estado: 'confirmada' },
        { id: 'RSV-2026-00103', usuarioId: 'u3', fecha: todayStr, hora: '8:00 p.m.', personas: 3, mesa: 'M03', estado: 'confirmada' },
        { id: 'RSV-2026-00104', usuarioId: 'u4', fecha: todayStr, hora: '8:30 p.m.', personas: 2, mesa: 'M01', estado: 'confirmada' },
        { id: 'RSV-2026-00105', usuarioId: 'u5', fecha: todayStr, hora: '9:00 p.m.', personas: 6, mesa: 'M07', estado: 'confirmada' },
        
        // Reservas para el 15 de Junio de 2026 (Para el Calendario - Pantalla 12)
        { id: 'RSV-2026-00201', usuarioId: 'u1', fecha: '2026-06-15', hora: '1:00 p.m.', personas: 2, mesa: 'M02', estado: 'confirmada' },
        { id: 'RSV-2026-00202', usuarioId: 'u2', fecha: '2026-06-15', hora: '3:00 p.m.', personas: 4, mesa: 'M05', estado: 'confirmada' },
        { id: 'RSV-2026-00203', usuarioId: 'u3', fecha: '2026-06-15', hora: '5:00 p.m.', personas: 3, mesa: 'M03', estado: 'confirmada' },
        { id: 'RSV-2026-00204', usuarioId: 'u4', fecha: '2026-06-15', hora: '7:30 p.m.', personas: 2, mesa: 'M01', estado: 'confirmada' },
        { id: 'RSV-2026-00205', usuarioId: 'u5', fecha: '2026-06-15', hora: '9:00 p.m.', personas: 6, mesa: 'M07', estado: 'confirmada' },
        
        // Reserva para el 20 de Junio de 2026 (Para la Edición - Pantalla 13)
        { id: 'RSV-2026-00125', usuarioId: 'u1', fecha: '2026-06-20', hora: '8:00 p.m.', personas: 2, mesa: 'M03', estado: 'confirmada' }
      ];
      localStorage.setItem('reservas', JSON.stringify(defaultReservas));
    }

    // 3. Cargar sesión activa si existe
    const activeSession = localStorage.getItem('currentUser');
    if (activeSession) {
      setCurrentUser(JSON.parse(activeSession));
    }
  }, []);

  const handleNavigate = (targetScreen) => {
    // Si entramos al inicio de reservas, limpiamos la selección temporal
    if (targetScreen === 'intro-reserva') {
      setBookingTemp({
        fecha: '',
        hora: '',
        personas: 2,
        mesa: ''
      });
    }
    
    // Si intentamos ingresar a una pantalla protegida sin haber iniciado sesión, forzamos login
    const clientFlows = ['intro-reserva', 'reserva-paso-1', 'reserva-paso-2', 'reserva-paso-3', 'reserva-exitosa'];
    const adminFlows = ['dashboard-admin', 'calendario-admin', 'gestion-reserva-admin'];
    
    const activeUser = currentUser || JSON.parse(localStorage.getItem('currentUser'));
    
    if (clientFlows.includes(targetScreen) && !activeUser) {
      setScreen('login-cliente');
      return;
    }
    
    if (adminFlows.includes(targetScreen)) {
      if (!activeUser || activeUser.rol !== 'admin') {
        setScreen('login-admin');
        return;
      }
    }

    setScreen(targetScreen);
  };

  const handleLoginSuccess = (user, redirectScreen) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setScreen(redirectScreen);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setScreen('landing');
  };

  const handleConfirmBooking = () => {
    const activeUser = currentUser || JSON.parse(localStorage.getItem('currentUser'));
    if (!activeUser) {
      setScreen('login-cliente');
      return;
    }

    // Generar código único: RSV-[AÑO]-[random 5 digitos]
    const yearStr = bookingTemp.fecha ? bookingTemp.fecha.split('-')[0] : new Date().getFullYear();
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const generatedCode = `RSV-${yearStr}-${randomNum}`;

    const newReserva = {
      id: generatedCode,
      usuarioId: activeUser.id,
      fecha: bookingTemp.fecha,
      hora: bookingTemp.hora,
      personas: bookingTemp.personas,
      mesa: bookingTemp.mesa,
      estado: 'confirmada'
    };

    // Almacenar reserva en LocalStorage
    const storedReservas = JSON.parse(localStorage.getItem('reservas')) || [];
    const updatedReservas = [...storedReservas, newReserva];
    localStorage.setItem('reservas', JSON.stringify(updatedReservas));

    // Guardar código en estado para mostrarlo
    setLastBookingCode(generatedCode);

    // Navegar a éxito
    setScreen('reserva-exitosa');
  };

  const handleUpdateReservation = (reservaId, updatedReserva) => {
    const storedReservas = JSON.parse(localStorage.getItem('reservas')) || [];
    const updatedList = storedReservas.map((res) => {
      if (res.id === reservaId) {
        return updatedReserva;
      }
      return res;
    });
    localStorage.setItem('reservas', JSON.stringify(updatedList));
  };

  // Renderizar la vista activa según el estado 'screen'
  const renderScreen = () => {
    switch (screen) {
      case 'landing':
        return <Landing onNavigate={handleNavigate} />;
      
      case 'login-cliente':
        return (
          <LoginCliente 
            onNavigate={handleNavigate} 
            onLoginSuccess={handleLoginSuccess} 
          />
        );
      
      case 'registro-cliente':
        return <RegistroCliente onNavigate={handleNavigate} />;
      
      case 'registro-exitoso':
        return <RegistroExitoso onNavigate={handleNavigate} />;
      
      // Módulo Cliente - Reservas
      case 'intro-reserva':
        return <IntroReserva onNavigate={handleNavigate} />;
      
      case 'reserva-paso-1':
        return (
          <ReservaPaso1 
            onNavigate={handleNavigate}
            bookingTemp={bookingTemp}
            setBookingTemp={setBookingTemp}
          />
        );
      
      case 'reserva-paso-2':
        return (
          <ReservaPaso2 
            onNavigate={handleNavigate}
            bookingTemp={bookingTemp}
            setBookingTemp={setBookingTemp}
            mesasMock={MESAS_MOCK}
          />
        );
      
      case 'reserva-paso-3':
        return (
          <ReservaPaso3 
            onNavigate={handleNavigate}
            bookingTemp={bookingTemp}
            onConfirmBooking={handleConfirmBooking}
          />
        );
      
      case 'reserva-exitosa':
        return (
          <ReservaExitosa 
            onNavigate={handleNavigate}
            bookingCode={lastBookingCode}
          />
        );

      // Módulo Administrador - Bloque 3
      case 'login-admin':
        return (
          <LoginAdmin 
            onNavigate={handleNavigate} 
            onLoginSuccess={handleLoginSuccess} 
          />
        );

      case 'dashboard-admin':
        return <DashboardAdmin onNavigate={handleNavigate} />;
      
      case 'calendario-admin':
        return (
          <CalendarioAdmin 
            onNavigate={handleNavigate} 
            setSelectedReservaId={setSelectedReservaId} 
          />
        );
      
      case 'gestion-reserva-admin':
        return (
          <GestionReservas 
            onNavigate={handleNavigate} 
            selectedReservaId={selectedReservaId}
            mesasMock={MESAS_MOCK}
            onUpdateReservation={handleUpdateReservation}
          />
        );
      
      default:
        return <Landing onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="app-container">
      {/* Mostrar el Navbar en todas las pantallas excepto la Landing page */}
      {screen !== 'landing' && (
        <Navbar 
          currentUser={currentUser} 
          onNavigate={handleNavigate} 
          onLogout={handleLogout} 
        />
      )}
      
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {renderScreen()}
      </main>
    </div>
  );
}

export default App;
