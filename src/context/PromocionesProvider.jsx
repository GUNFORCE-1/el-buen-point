import { useState } from 'react';
import { PromocionesContext } from './PromocionesContext';

export const PromocionesProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (plato) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === plato.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === plato.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prevCart, { ...plato, cantidad: 1 }];
    });
  };

  const removeFromCart = (platoId) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === platoId);
      if (existing && existing.cantidad > 1) {
        return prevCart.map((item) =>
          item.id === platoId ? { ...item, cantidad: item.cantidad - 1 } : item
        );
      }
      return prevCart.filter((item) => item.id !== platoId);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <PromocionesContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </PromocionesContext.Provider>
  );
};

