import React from 'react';
import Logo from './Logo';

function Footer() {
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-section">
      <div className="grid-12">
        {/* Column 1: Monochrome Logo */}
        <div className="footer-col footer-logo-container">
          <Logo type="primary" mode="monochrome-white" width="120px" height="145px" />
        </div>

        {/* Column 2: Doormat Navigation */}
        <div className="footer-col">
          <h4 className="footer-heading">Navigation</h4>
          <ul className="footer-list">
            <li>
              <a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Home</a>
            </li>
            <li>
              <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>About</a>
            </li>
            <li>
              <a href="#menu" onClick={(e) => handleNavClick(e, 'menu')}>Menu</a>
            </li>
            <li>
              <a href="#reservations" onClick={(e) => handleNavClick(e, 'home')}>Reservations</a>
            </li>
            <li>
              <a href="#order" onClick={(e) => handleNavClick(e, 'menu')}>Order Online</a>
            </li>
            <li>
              <a href="#login">Login</a>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div className="footer-col">
          <h4 className="footer-heading">Contact Us</h4>
          <address style={{ fontStyle: 'normal' }} className="footer-list">
            <p className="footer-text">
              <strong>Address:</strong><br />
              123 Lemon Way,<br />
              Chicago, IL 60611
            </p>
            <p className="footer-text">
              <strong>Phone:</strong><br />
              (312) 555-0199
            </p>
            <p className="footer-text">
              <strong>Email:</strong><br />
              info@littlelemon.com
            </p>
          </address>
        </div>

        {/* Column 4: Social Media Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Connect</h4>
          <ul className="footer-list">
            <li>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter/X</a>
            </li>
            <li>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
