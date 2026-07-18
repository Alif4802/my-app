import React, { useState } from 'react';
import BookingForm from './BookingForm';

function BookingPage({ availableTimes, dispatch }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  const handleFormSubmit = (data) => {
    setBookingData(data);
    setIsSubmitted(true);
  };

  return (
    <section style={{ padding: '4rem 0', minHeight: '80vh', backgroundColor: '#fcfcfc' }}>
      <div 
        className="grid-12" 
        style={{ 
          maxWidth: '600px', 
          margin: '0 auto', 
          background: '#ffffff', 
          padding: '3rem', 
          borderRadius: '20px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)' 
        }}
      >
        <div style={{ gridColumn: '1 / 13' }}>
          {!isSubmitted ? (
            <>
              <h2 className="modal-title" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Table Reservation</h2>
              <p style={{ textAlign: 'center', color: '#666666', marginBottom: '2.5rem', fontSize: '15px' }}>
                Please fill out the form below to secure your table at Little Lemon.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <BookingForm 
                  availableTimes={availableTimes} 
                  dispatch={dispatch} 
                  onSubmit={handleFormSubmit} 
                />
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <h2 className="modal-title" style={{ color: 'var(--primary-green)', marginBottom: '1.5rem' }}>Booking Confirmed!</h2>
              <p className="body-paragraph" style={{ marginBottom: '2rem', fontSize: '18px' }}>
                Your table at Little Lemon has been reserved.
              </p>
              <div 
                style={{ 
                  background: '#f4f4f4', 
                  padding: '2rem', 
                  borderRadius: '12px', 
                  textAlign: 'left', 
                  marginBottom: '2.5rem', 
                  lineHeight: '1.8' 
                }}
              >
                <p><strong>Date:</strong> {bookingData.date}</p>
                <p><strong>Time:</strong> {bookingData.time}</p>
                <p><strong>Guests:</strong> {bookingData.guests} people</p>
                <p><strong>Occasion:</strong> {bookingData.occasion}</p>
              </div>
              <a 
                href="/" 
                className="btn-primary" 
                style={{ textDecoration: 'none', display: 'inline-block', padding: '0.8rem 3rem' }}
              >
                Back to Home
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default BookingPage;
