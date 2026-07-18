import React from 'react';

// Star SVG for Rating
const StarIcon = () => (
  <span style={{ marginRight: '2px' }}>★</span>
);

function CustomersSay() {
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
  );
}

export default CustomersSay;
