import React from 'react';
import { Link } from 'react-router-dom';

function CallToAction() {
  return (
    <section className="hero-section">
      <div className="grid-12">
        <div className="hero-left">
          <h1 className="display-title hero-title">Little Lemon</h1>
          <h2 className="display-subtitle hero-subtitle">Chicago</h2>
          <p className="lead-text hero-description">
            We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
          </p>
          <Link 
            to="/booking" 
            className="btn-primary" 
            style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}
          >
            Reserve a Table
          </Link>
        </div>
        <div className="hero-right">
          <div className="hero-image-wrapper">
            <img src="/hero_dish.png" alt="Featured Dish" className="hero-image" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
