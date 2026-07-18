import React from 'react';

// Bicycle Vector Icon
const BicycleIcon = () => (
  <svg 
    className="delivery-icon" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="5" cy="18" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
    <circle cx="19" cy="18" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
    <path d="M19 18l-4-8h-8l-2 8" fill="none" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 18V10h3l2-4h3" fill="none" stroke="currentColor" strokeWidth="2"/>
    <circle cx="20" cy="5" r="1" fill="currentColor"/>
  </svg>
);

// Star SVG for Rating
const StarIcon = () => (
  <span style={{ marginRight: '2px' }}>★</span>
);

function Main({ onOpenReservation }) {
  const specials = [
    {
      title: 'Greek salad',
      price: '$12.99',
      image: '/greek_salad.png',
      description: 'The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.'
    },
    {
      title: 'Bruchetta',
      price: '$5.89',
      image: '/bruschetta.png',
      description: 'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.'
    },
    {
      title: 'Lemon Dessert',
      price: '$5.00',
      image: '/lemon_dessert.png',
      description: "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined."
    }
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      rating: 5,
      avatar: '/avatar1.png',
      review: 'The Greek Salad was incredible. Authentic Mediterranean flavors!'
    },
    {
      name: 'John D.',
      rating: 5,
      avatar: '/avatar2.png',
      review: 'Cozy atmosphere, outstanding food, and top-tier service.'
    },
    {
      name: 'Elena R.',
      rating: 5,
      avatar: '/avatar3.png',
      review: 'Their Lemon Dessert takes me back to my summers in Italy.'
    },
    {
      name: 'Marcus K.',
      rating: 5,
      avatar: '/avatar4.png',
      review: 'Mario and Adrian are fantastic hosts. Highly recommend!'
    }
  ];

  return (
    <main id="home">
      {/* Block 2: Hero Section */}
      <section className="hero-section">
        <div className="grid-12">
          <div className="hero-left">
            <h1 className="display-title hero-title">Little Lemon</h1>
            <h2 className="display-subtitle hero-subtitle">Chicago</h2>
            <p className="lead-text hero-description">
              We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
            </p>
            <button className="btn-primary" onClick={onOpenReservation}>
              Reserve a Table
            </button>
          </div>
          <div className="hero-right">
            <div className="hero-image-wrapper">
              <img src="/hero_dish.png" alt="Featured Dish" className="hero-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Block 3: Highlights Section (Specials) */}
      <section className="specials-section" id="menu">
        <div className="grid-12">
          <div className="specials-header">
            <h2 className="section-title">This Week's Specials</h2>
            <button className="btn-primary" style={{ backgroundColor: 'var(--highlight-dark)', color: '#ffffff' }}>
              Online Menu
            </button>
          </div>
          <div className="specials-grid">
            {specials.map((item, index) => (
              <article className="special-card" key={index}>
                <div className="card-img-container">
                  <img src={item.image} alt={item.title} className="card-img" />
                </div>
                <div className="card-content">
                  <div className="card-header-row">
                    <h3 className="card-title">{item.title}</h3>
                    <span className="card-price">{item.price}</span>
                  </div>
                  <p className="body-paragraph card-description">{item.description}</p>
                  <a href="#order" className="card-footer" onClick={(e) => { e.preventDefault(); alert('Online ordering coming soon!'); }}>
                    <span>Order a delivery</span>
                    <BicycleIcon />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Block 4: Testimonials Banner */}
      <section className="testimonials-section">
        <div className="grid-12">
          <div className="testimonials-title-row">
            <h2 className="section-title">Testimonials</h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((item, index) => (
              <div className="testimonial-card" key={index}>
                <div className="rating-stars">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                <div className="user-profile-row">
                  <img src={item.avatar} alt={item.name} className="avatar-circle" />
                  <span className="user-name">{item.name}</span>
                </div>
                <p className="testimonial-text">"{item.review}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Block 5: About Section */}
      <section className="about-section" id="about">
        <div className="grid-12">
          <div className="about-left">
            <h2 className="about-title">Little Lemon</h2>
            <h3 className="about-subtitle">Chicago</h3>
            <p className="body-paragraph about-description">
              Little Lemon is a charming neighborhood bistro that serves simple food and classic cocktails in a lively but casual environment. The restaurant features a locally-sourced menu with daily specials.
            </p>
            <p className="body-paragraph about-description">
              Founded by Adrian and Mario, our bistro brings the authentic tastes of the Mediterranean to the heart of Chicago. With a commitment to fresh ingredients and traditional family recipes, we invite you to experience hospitality at its finest.
            </p>
          </div>
          <div className="about-right">
            <div className="collage-img-box img1">
              <img src="/about_founders_1.png" alt="Founders Adrian and Mario" className="collage-img" />
            </div>
            <div className="collage-img-box img2">
              <img src="/about_founders_2.png" alt="Little Lemon Bistro Interior" className="collage-img" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Main;
