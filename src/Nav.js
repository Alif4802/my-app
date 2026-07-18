import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav({ currentUser, onLogout }) {
  return (
    <nav>
      <ul className="nav-links-container">
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} 
            end
          >
            HOME
          </NavLink>
        </li>
        <li>
          <a href="/#about" className="nav-link">ABOUT</a>
        </li>
        <li>
          <a href="/#menu" className="nav-link">MENU</a>
        </li>
        <li>
          <NavLink 
            to="/booking" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            RESERVATIONS
          </NavLink>
        </li>
        <li>
          <a href="/#menu" className="nav-link">ORDER ONLINE</a>
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
                onClick={onLogout} 
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
