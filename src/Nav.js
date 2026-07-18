import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <ul className="nav-links-container">
        <li>
          <Link to="/" className="nav-link">HOME</Link>
        </li>
        <li>
          <a href="/#about" className="nav-link">ABOUT</a>
        </li>
        <li>
          <a href="/#menu" className="nav-link">MENU</a>
        </li>
        <li>
          <Link to="/booking" className="nav-link">RESERVATIONS</Link>
        </li>
        <li>
          <a href="/#menu" className="nav-link">ORDER ONLINE</a>
        </li>
        <li>
          <Link to="/" className="nav-link">LOGIN</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
