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

function Specials() {
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

  return (
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
  );
}

export default Specials;
