import React from 'react';

function ConfirmedBooking() {
  return (
    <section style={{ padding: '6rem 0', minHeight: '80vh', backgroundColor: '#fcfcfc', textAlign: 'center' }}>
      <div 
        className="grid-12" 
        style={{ 
          maxWidth: '600px', 
          margin: '0 auto', 
          background: '#ffffff', 
          padding: '4rem 3rem', 
          borderRadius: '20px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)' 
        }}
      >
        <div style={{ gridColumn: '1 / 13' }}>
          <h2 className="modal-title" style={{ color: 'var(--primary-green)', marginBottom: '1.5rem' }}>Booking Confirmed!</h2>
          <p className="body-paragraph" style={{ marginBottom: '2.5rem', fontSize: '18px' }}>
            Your table reservation at Little Lemon has been successfully submitted and confirmed.
          </p>
          <p className="body-paragraph" style={{ color: '#666666', marginBottom: '3rem', fontSize: '15px' }}>
            We look forward to hosting you. A confirmation email has been sent with your reservation details.
          </p>
          <a 
            href="/" 
            className="btn-primary" 
            style={{ textDecoration: 'none', display: 'inline-block', padding: '0.8rem 3rem' }}
          >
            Back to Home
          </a>
        </div>
      </div>
    </section>
  );
}

export default ConfirmedBooking;
