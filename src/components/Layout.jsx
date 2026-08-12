import fondoBalanceado from '../assets/fondo-balanceado.jpg';

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <div 
        className="layout-left" 
        style={{ backgroundImage: `url(${fondoBalanceado})` }}
      >
        {/* Left side contains the brand background image */}
      </div>
      <div className="layout-right">
        <div className="layout-content-box">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
