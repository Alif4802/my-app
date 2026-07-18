import React from 'react';
import BookingForm from './BookingForm';

function BookingPage({ availableTimes, dispatch, submitForm }) {
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
          <h2 className="modal-title" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Table Reservation</h2>
          <p style={{ textAlign: 'center', color: '#666666', marginBottom: '2.5rem', fontSize: '15px' }}>
            Please fill out the form below to secure your table at Little Lemon.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <BookingForm 
              availableTimes={availableTimes} 
              dispatch={dispatch} 
              submitForm={submitForm} 
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookingPage;
