import React from 'react';

function HoloButton({ children, onClick, className = '', style = {}, ...props }) {
  return (
    <button
      className={`holo-button ${className}`}
      onClick={onClick}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
}

export default HoloButton;


