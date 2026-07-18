import React from 'react';

function Chicago() {
  return (
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
  );
}

export default Chicago;
