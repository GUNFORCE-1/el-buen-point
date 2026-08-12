import { useContext } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { PromocionesContext } from '../context/PromocionesContext';

const PLATOS_MOCK = [
  {
    id: 'p1',
    nombre: 'Ceviche Clásico',
    descripcion: 'Pescado fresco marinado en limón norteño, cebolla roja, camote y choclo.',
    precio: 38.00,
    imagen: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'p2',
    nombre: 'Lomo Saltado',
    descripcion: 'Jugosos trozos de lomo fino salteados al wok con cebolla, tomate y papas crujientes.',
    precio: 45.00,
    imagen: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'p3',
    nombre: 'Ají de Gallina',
    descripcion: 'Deshilachado de gallina en una crema sedosa de ají amarillo, nueces y parmesano.',
    precio: 32.00,
    imagen: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'p4',
    nombre: 'Arroz con Mariscos',
    descripcion: 'Arroz criollo al wok con mixtura de mariscos frescos, pimientos y un toque de cilantro.',
    precio: 42.00,
    imagen: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&auto=format&fit=crop&q=80'
  }
];

const Promociones = ({ onNavigate, bookingTemp }) => {
  const { cart, addToCart, removeFromCart, clearCart } = useContext(PromocionesContext);

  const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.cantidad * item.precio, 0);

  return (
    <Layout>
      <h2 className="form-title">Promociones Especiales</h2>
      <p className="form-subtitle">Agrega platos exclusivos a tu carrito como parte de tu reserva.</p>

      <div style={{ marginBottom: '1.5rem' }}>
        {PLATOS_MOCK.map((plato) => {
          const itemInCart = cart.find((item) => item.id === plato.id);
          const cantidad = itemInCart ? itemInCart.cantidad : 0;
          const isSelected = cantidad > 0;
          return (
            <div 
              key={plato.id} 
              style={{
                display: 'flex',
                gap: '1rem',
                padding: '0.75rem',
                borderRadius: 'var(--border-radius)',
                border: isSelected ? '2px solid var(--primary-color)' : '1px solid var(--border-color)',
                backgroundColor: isSelected ? 'var(--primary-light)' : 'var(--bg-color)',
                transition: 'all 0.2s ease',
                marginBottom: '1rem',
                cursor: 'pointer',
                position: 'relative'
              }}
              onClick={() => addToCart(plato)}
            >
              <img 
                src={plato.imagen} 
                alt={plato.nombre} 
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '6px',
                  objectFit: 'cover'
                }}
              />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '0.5rem' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '700', margin: 0, color: 'var(--text-color)' }}>{plato.nombre}</h4>
                    <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--primary-color)', whiteSpace: 'nowrap' }}>S/ {plato.precio.toFixed(2)}</span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.25rem 0 0 0', lineHeight: '1.25' }}>{plato.descripcion}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                  {cantidad === 0 ? (
                    <button
                      style={{
                        padding: '0.35rem 0.75rem',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        borderRadius: '4px',
                        border: 'none',
                        cursor: 'pointer',
                        backgroundColor: 'var(--primary-color)',
                        color: '#fff',
                        transition: 'all 0.2s'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(plato);
                      }}
                    >
                      Seleccionar
                    </button>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={(e) => e.stopPropagation()}>
                      <button
                        style={{
                          width: '24px',
                          height: '24px',
                          fontSize: '0.9rem',
                          fontWeight: 'bold',
                          borderRadius: '50%',
                          border: '1px solid var(--primary-color)',
                          backgroundColor: 'transparent',
                          color: 'var(--primary-color)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        onClick={() => removeFromCart(plato.id)}
                      >
                        -
                      </button>
                      <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-color)', minWidth: '15px', textAlign: 'center' }}>
                        {cantidad}
                      </span>
                      <button
                        style={{
                          width: '24px',
                          height: '24px',
                          fontSize: '0.9rem',
                          fontWeight: 'bold',
                          borderRadius: '50%',
                          border: 'none',
                          backgroundColor: 'var(--primary-color)',
                          color: '#fff',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        onClick={() => addToCart(plato)}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {totalItems > 0 && (
        <div style={{
          padding: '1rem',
          borderRadius: 'var(--border-radius)',
          backgroundColor: 'var(--primary-light)',
          border: '1px solid var(--primary-color)',
          marginBottom: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Platos seleccionados: {totalItems}</p>
            <p style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: 'var(--primary-color)' }}>Total: S/ {totalPrice.toFixed(2)}</p>
          </div>
          <button 
            style={{
              padding: '0.35rem 0.75rem',
              fontSize: '0.75rem',
              fontWeight: '700',
              color: 'var(--danger-color)',
              background: 'transparent',
              border: '1px solid var(--danger-color)',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            onClick={clearCart}
          >
            Vaciar
          </button>
        </div>
      )}

      <Button 
        variant="primary" 
        onClick={() => onNavigate(bookingTemp && bookingTemp.mesa ? 'reserva-paso-3' : 'intro-reserva')}
        style={{ marginTop: '0.5rem' }}
      >
        <span>{totalItems > 0 ? 'Continuar con reserva' : (bookingTemp && bookingTemp.mesa ? 'Continuar' : 'Ir a reservar')}</span>
      </Button>
    </Layout>
  );
};

export default Promociones;
