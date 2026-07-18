import React from 'react';
import Logo from './Logo';

function Header({ onOpenReservation }) {
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    if (sectionId === 'reservations') {
      if (onOpenReservation) onOpenReservation();
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="nav-bar">
      <div className="grid-12">
        <div className="nav-logo-container">
          <a href="/" style={{ textDecoration: 'none' }}>
            <Logo type="secondary" mode="color" height="40" />
          </a>
        </div>
        <ul className="nav-links-container">
          <li>
            <a href="#home" className="nav-link" onClick={(e) => handleNavClick(e, 'home')}>
              HOME
            </a>
          </li>
          <li>
            <a href="#about" className="nav-link" onClick={(e) => handleNavClick(e, 'about')}>
              ABOUT
            </a>
          </li>
          <li>
            <a href="#menu" className="nav-link" onClick={(e) => handleNavClick(e, 'menu')}>
              MENU
            </a>
          </li>
          <li>
            <a href="#reservations" className="nav-link" onClick={(e) => handleNavClick(e, 'reservations')}>
              RESERVATIONS
            </a>
          </li>
          <li>
            <a href="#order" className="nav-link" onClick={(e) => handleNavClick(e, 'menu')}>
              ORDER ONLINE
            </a>
          </li>
          <li>
            <a href="#login" className="nav-link" onClick={(e) => handleNavClick(e, 'login')}>
              LOGIN
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
