import React, { useState } from 'react';
import OccasionDropdown from './OccasionDropdown';

function BookingPage() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('17:00');
  const [guests, setGuests] = useState('2');
  const [occasion, setOccasion] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking details:', { date, time, guests, occasion });
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
              
              <form className="reservation-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="res-date">Choose Date</label>
                  <input 
                    type="date" 
                    id="res-date" 
                    className="form-input"
                    required 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="res-time">Choose Time</label>
                  <select 
                    id="res-time" 
                    className="form-input"
                    value={time} 
                    onChange={(e) => setTime(e.target.value)}
                  >
                    <option value="17:00">5:00 PM</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="20:00">8:00 PM</option>
                    <option value="21:00">9:00 PM</option>
                    <option value="22:00">10:00 PM</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="guests">Number of Guests</label>
                  <input 
                    type="number" 
                    placeholder="1" 
                    min="1" 
                    max="10" 
                    id="guests" 
                    className="form-input"
                    required
                    value={guests} 
                    onChange={(e) => setGuests(e.target.value)} 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Occasion</label>
                  <OccasionDropdown onChange={setOccasion} />
                </div>
                
                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>
                  Confirm Reservation
                </button>
              </form>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <h2 className="modal-title" style={{ color: 'var(--primary-green)', marginBottom: '1.5rem' }}>Booking Confirmed!</h2>
              <p className="body-paragraph" style={{ marginBottom: '2rem', fontSize: '18px' }}>
                Your table at Little Lemon has been reserved.
              </p>
              <div style={{ background: '#f4f4f4', padding: '2rem', borderRadius: '12px', textAlign: 'left', marginBottom: '2.5rem', lineHeight: '1.8' }}>
                <p><strong>Date:</strong> {date}</p>
                <p><strong>Time:</strong> {time}</p>
                <p><strong>Guests:</strong> {guests} people</p>
                {occasion && <p><strong>Occasion:</strong> {occasion}</p>}
              </div>
              <a href="/" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block', padding: '0.8rem 3rem' }}>
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
