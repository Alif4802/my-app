import React from 'react';
import Logo from './Logo';
import Nav from './Nav';

function Header({ currentUser, onLogout }) {
  return (
    <nav className="nav-bar">
      <div className="grid-12">
        <div className="nav-logo-container">
          <a href="/" style={{ textDecoration: 'none' }}>
            <Logo type="secondary" mode="color" height="40" />
          </a>
        </div>
        <Nav currentUser={currentUser} onLogout={onLogout} />
      </div>
    </nav>
  );
}

export default Header;
