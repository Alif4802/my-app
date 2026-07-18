import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
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
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            LOGIN
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
