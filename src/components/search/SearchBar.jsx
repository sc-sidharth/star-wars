import React, { useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

function SearchBar({ onSearch, placeholder = "Search characters..." }) {
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 500);

  // Call onSearch when debounced value changes
  React.useEffect(() => {
    if (onSearch) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue, onSearch]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClear = () => {
    setInputValue('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <div className="search-bar" style={{ position: 'relative', marginBottom: 'var(--spacing-lg)' }}>
      <input
        type="text"
        className="holo-input"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        style={{ paddingRight: inputValue ? '3rem' : 'var(--spacing-md)' }}
      />
      {inputValue && (
        <button
          onClick={handleClear}
          className="holo-button"
          style={{
            position: 'absolute',
            right: '0.5rem',
            top: '50%',
            transform: 'translateY(-50%)',
            padding: '0.25rem 0.75rem',
            fontSize: 'var(--font-size-sm)'
          }}
        >
          ✕
        </button>
      )}
      {inputValue && !debouncedValue && (
        <div style={{
          position: 'absolute',
          top: '50%',
          right: '3.5rem',
          transform: 'translateY(-50%)'
        }}>
          <div className="holo-loading" style={{ width: '16px', height: '16px', borderWidth: '2px' }}></div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;


