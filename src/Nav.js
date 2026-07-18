import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Nav({ currentUser, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    }
    closeMenu();
  };

  return (
    <nav className="nav-container">
      {/* Hamburger button visible only on mobile */}
      <button 
        className="hamburger-menu" 
        onClick={toggleMenu} 
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
      >
        <span className={`bar ${isMenuOpen ? 'open' : ''}`}></span>
        <span className={`bar ${isMenuOpen ? 'open' : ''}`}></span>
        <span className={`bar ${isMenuOpen ? 'open' : ''}`}></span>
      </button>

      <ul className={`nav-links-container ${isMenuOpen ? 'active' : ''}`}>
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} 
            end
            onClick={closeMenu}
          >
            HOME
          </NavLink>
        </li>
        <li>
          <a href="/#about" className="nav-link" onClick={closeMenu}>ABOUT</a>
        </li>
        <li>
          <a href="/#menu" className="nav-link" onClick={closeMenu}>MENU</a>
        </li>
        <li>
          <NavLink 
            to="/booking" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            onClick={closeMenu}
          >
            RESERVATIONS
          </NavLink>
        </li>
        <li>
          <a href="/#menu" className="nav-link" onClick={closeMenu}>ORDER ONLINE</a>
        </li>
        {currentUser ? (
          <>
            <li style={{ display: 'flex', alignItems: 'center' }}>
              <span className="nav-link" style={{ color: 'var(--primary-green)', cursor: 'default' }}>
                HELLO, {currentUser.name.toUpperCase()}
              </span>
            </li>
            <li>
              <button 
                onClick={handleLogoutClick} 
                className="nav-link" 
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  fontFamily: 'inherit', 
                  fontSize: 'inherit',
                  fontWeight: 'inherit',
                  padding: 0
                }}
              >
                LOGOUT
              </button>
            </li>
          </>
        ) : (
          <li>
            <NavLink 
              to="/login" 
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              onClick={closeMenu}
            >
              LOGIN
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
