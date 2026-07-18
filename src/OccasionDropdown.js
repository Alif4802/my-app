import React, { useState, useRef, useEffect } from 'react';

// Toasting wine glasses SVG icon
const ToastingGlassesIcon = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dropdown-icon">
    {/* Left glass */}
    <path d="M5 3h5v5c0 1.5-1 3-2.5 3H7.5C6 11 5 9.5 5 8V3z" />
    <path d="M7.5 11v6" />
    <path d="M5 17h5" />
    
    {/* Right glass */}
    <path d="M19 3h-5v5c0 1.5 1 3 2.5 3h0c1.5 0 2.5-1.5 2.5-3V3z" />
    <path d="M16.5 11v6" />
    <path d="M14 17h5" />
    
    {/* Clink Sparkles */}
    <path d="M12 3v3" />
    <path d="M10 5.5l1.5-1.5" />
    <path d="M14 5.5l-1.5-1.5" />
  </svg>
);

function OccasionDropdown({ onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const dropdownRef = useRef(null);

  // Close dropdown if user clicks outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleSelect = (option, e) => {
    e.preventDefault();
    setSelected(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option);
    }
  };

  // Determine state styling
  const isSelectedState = selected !== null;
  const btnClass = `dropdown-closed-btn ${isSelectedState ? 'state-selected' : ''}`;
  const iconColor = isSelectedState ? '#ffffff' : '#495E57';

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <button className={btnClass} onClick={handleToggle}>
        <div className="dropdown-left">
          <ToastingGlassesIcon color={iconColor} />
          <span 
            className="dropdown-label" 
            style={{ color: isSelectedState ? '#ffffff' : '#333333' }}
          >
            {selected || 'Occasion'}
          </span>
        </div>
        <span 
          className="dropdown-arrow" 
          style={{ color: isSelectedState ? '#ffffff' : '#333333' }}
        >
          {isOpen ? '^' : 'v'}
        </span>
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <button 
            className="dropdown-option" 
            onClick={(e) => handleSelect('Birthday', e)}
          >
            Birthday
          </button>
          <hr className="dropdown-divider" />
          
          <button 
            className="dropdown-option" 
            onClick={(e) => handleSelect('Engagement', e)}
          >
            Engagement
          </button>
          <hr className="dropdown-divider" />
          
          <button 
            className="dropdown-option" 
            onClick={(e) => handleSelect('Anniversary', e)}
          >
            Anniversary
          </button>
        </div>
      )}
    </div>
  );
}

export default OccasionDropdown;
