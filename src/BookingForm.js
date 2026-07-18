import React, { useState } from 'react';

function BookingForm({ availableTimes = [], dispatch, submitForm }) {
  // State variables for controlled inputs
  const [date, setDate] = useState('');
  const [time, setTime] = useState('17:00');
  const [guests, setGuests] = useState('1');
  const [occasion, setOccasion] = useState('Birthday');

  // Error feedback states
  const [dateTouched, setDateTouched] = useState(false);
  const [guestsTouched, setGuestsTouched] = useState(false);

  const getValidationError = () => {
    const errors = {};
    if (dateTouched && !date) {
      errors.date = 'Please select a date.';
    }
    const parsedGuests = parseInt(guests, 10);
    if (guestsTouched) {
      if (isNaN(parsedGuests) || parsedGuests < 1) {
        errors.guests = 'Number of guests must be at least 1.';
      } else if (parsedGuests > 10) {
        errors.guests = 'Number of guests cannot exceed 10.';
      }
    }
    return errors;
  };

  const errors = getValidationError();
  const parsedGuests = parseInt(guests, 10);
  const isFormValid = date !== '' && !isNaN(parsedGuests) && parsedGuests >= 1 && parsedGuests <= 10;

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    setDateTouched(true);
    if (dispatch) {
      dispatch({ type: 'UPDATE_TIMES', date: selectedDate });
    }
  };

  const handleGuestsChange = (e) => {
    setGuests(e.target.value);
    setGuestsTouched(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitForm && isFormValid) {
      submitForm({ date, time, guests: parseInt(guests, 10), occasion });
    }
  };

  return (
    <form 
      style={{ display: 'grid', width: '100%', maxWidth: '350px', gap: '20px' }} 
      onSubmit={handleSubmit}
    >
      <h2>Book Now</h2>
      
      <div style={{ display: 'grid', gap: '5px' }}>
        <label className="form-label" htmlFor="res-date">Choose date</label>
        <input 
          type="date" 
          id="res-date" 
          className="form-input"
          style={{ borderColor: errors.date ? 'var(--secondary-salmon)' : '' }}
          value={date} 
          onChange={handleDateChange} 
          onBlur={() => setDateTouched(true)}
          required
        />
        {errors.date && (
          <span style={{ color: 'var(--secondary-salmon)', fontSize: '13px', fontWeight: '500' }}>
            {errors.date}
          </span>
        )}
      </div>

      <div style={{ display: 'grid', gap: '5px' }}>
        <label className="form-label" htmlFor="res-time">Choose time</label>
        <select 
          id="res-time" 
          className="form-input"
          value={time} 
          onChange={(e) => setTime(e.target.value)}
          required
        >
          {availableTimes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div style={{ display: 'grid', gap: '5px' }}>
        <label className="form-label" htmlFor="guests">Number of guests</label>
        <input 
          type="number" 
          placeholder="1" 
          min="1" 
          max="10" 
          id="guests" 
          className="form-input"
          style={{ borderColor: errors.guests ? 'var(--secondary-salmon)' : '' }}
          value={guests} 
          onChange={handleGuestsChange} 
          onBlur={() => setGuestsTouched(true)}
          required
        />
        {errors.guests && (
          <span style={{ color: 'var(--secondary-salmon)', fontSize: '13px', fontWeight: '500' }}>
            {errors.guests}
          </span>
        )}
      </div>

      <div style={{ display: 'grid', gap: '5px' }}>
        <label className="form-label" htmlFor="occasion">Occasion</label>
        <select 
          id="occasion" 
          className="form-input"
          value={occasion} 
          onChange={(e) => setOccasion(e.target.value)}
          required
        >
          <option value="Birthday">Birthday</option>
          <option value="Anniversary">Anniversary</option>
        </select>
      </div>

      <input 
        type="submit" 
        className="btn-primary" 
        style={{ 
          width: '100%', 
          marginTop: '1rem', 
          cursor: isFormValid ? 'pointer' : 'not-allowed',
          opacity: isFormValid ? 1 : 0.5 
        }}
        value="Make Your reservation" 
        disabled={!isFormValid}
      />
    </form>
  );
}

export default BookingForm;
