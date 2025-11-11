import React from 'react';

function HoloCard({ children, className = '', style = {}, onClick, ...props }) {
  return (
    <div
      className={`holo-card ${className}`}
      style={{
        ...style,
        ...(onClick && { cursor: 'pointer' })
      }}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}

export default HoloCard;


