const CardMesa = ({ codigo, capacidad, estado, onClick }) => {
  const isOcupada = estado === 'ocupada';

  // SVG representation of a dining table with chairs
  const renderTableIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mesa-card-icon">
      {/* Top chair */}
      <path d="M9 3h6v4H9z" opacity="0.6"/>
      {/* Table top */}
      <rect x="4" y="8" width="16" height="8" rx="2"/>
      {/* Table legs */}
      <line x1="7" y1="16" x2="7" y2="21" />
      <line x1="17" y1="16" x2="17" y2="21" />
      {/* Bottom chairs */}
      <path d="M7 21h3v-2H7z" opacity="0.6"/>
      <path d="M14 21h3v-2h-3z" opacity="0.6"/>
    </svg>
  );

  return (
    <div
      className={`mesa-card ${estado}`}
      onClick={isOcupada ? null : onClick}
    >
      {renderTableIcon()}
      <span className="mesa-card-code">{codigo}</span>
      <span className="mesa-card-capacity" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
        Cap: {capacidad} pers
      </span>
      <span className="mesa-card-status">{estado}</span>
    </div>
  );
};

export default CardMesa;
