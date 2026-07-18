import React, { useState } from 'react';
import OccasionDropdown from './OccasionDropdown';

function ReservationModal({ isOpen, onClose }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('17:00');
  const [guests, setGuests] = useState('2');
  const [occasion, setOccasion] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate booking API call
    console.log('Booking details:', { date, time, guests, occasion });
    setIsSubmitted(true);
  };

  const handleModalClick = (e) => {
    // Prevent modal close when clicking inside modal box
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleModalClick}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        
        {!isSubmitted ? (
          <>
            <h2 className="modal-title">Table Reservation</h2>
            <p className="modal-subtitle">Please fill out the form below to secure your table at Little Lemon.</p>
            
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
              
              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Confirm Reservation
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <h2 className="modal-title" style={{ color: 'var(--primary-green)' }}>Booking Confirmed!</h2>
            <p className="body-paragraph" style={{ margin: '1.5rem 0', fontSize: '18px' }}>
              Your table at Little Lemon has been reserved.
            </p>
            <div style={{ background: '#f4f4f4', padding: '1.5rem', borderRadius: '12px', textAlign: 'left', marginBottom: '2rem' }}>
              <p><strong>Date:</strong> {date}</p>
              <p><strong>Time:</strong> {time}</p>
              <p><strong>Guests:</strong> {guests} people</p>
              {occasion && <p><strong>Occasion:</strong> {occasion}</p>}
            </div>
            <button className="btn-primary" onClick={onClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReservationModal;
