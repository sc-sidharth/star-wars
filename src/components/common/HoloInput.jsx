import React from 'react';

function HoloInput({ value, onChange, placeholder, className = '', style = {}, ...props }) {
  return (
    <input
      type="text"
      className={`holo-input ${className}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={style}
      {...props}
    />
  );
}

export default HoloInput;


