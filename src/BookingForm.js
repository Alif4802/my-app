import React, { useState } from 'react';

function BookingForm({ availableTimes = [], dispatch, onSubmit }) {
  // State variables for controlled inputs
  const [date, setDate] = useState('');
  const [time, setTime] = useState('17:00');
  const [guests, setGuests] = useState('1');
  const [occasion, setOccasion] = useState('Birthday');

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    if (dispatch) {
      dispatch({ type: 'UPDATE_TIMES', date: selectedDate });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ date, time, guests, occasion });
    }
  };

  return (
    <form 
      style={{ display: 'grid', width: '100%', maxWidth: '350px', gap: '20px' }} 
      onSubmit={handleSubmit}
    >
      <h2>Book Now</h2>
      <label className="form-label" htmlFor="res-date">Choose date</label>
      <input 
        type="date" 
        id="res-date" 
        className="form-input"
        value={date} 
        onChange={handleDateChange} 
        required
      />

      <label className="form-label" htmlFor="res-time">Choose time</label>
      <select 
        id="res-time" 
        className="form-input"
        value={time} 
        onChange={(e) => setTime(e.target.value)}
      >
        {availableTimes.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      <label className="form-label" htmlFor="guests">Number of guests</label>
      <input 
        type="number" 
        placeholder="1" 
        min="1" 
        max="10" 
        id="guests" 
        className="form-input"
        value={guests} 
        onChange={(e) => setGuests(e.target.value)} 
        required
      />

      <label className="form-label" htmlFor="occasion">Occasion</label>
      <select 
        id="occasion" 
        className="form-input"
        value={occasion} 
        onChange={(e) => setOccasion(e.target.value)}
      >
        <option value="Birthday">Birthday</option>
        <option value="Anniversary">Anniversary</option>
      </select>

      <input 
        type="submit" 
        className="btn-primary" 
        style={{ width: '100%', marginTop: '1rem', cursor: 'pointer' }}
        value="Make Your reservation" 
      />
    </form>
  );
}

export default BookingForm;
