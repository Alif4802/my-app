import React, { useState } from 'react';

function BookingForm({ availableTimes = [], dispatch, submitForm }) {
  // State variables for controlled inputs
  const [date, setDate] = useState('');
  const [time, setTime] = useState('17:00');
  const [guests, setGuests] = useState('1');
  const [occasion, setOccasion] = useState('Birthday');

  // Touched states to handle progressive disclosure of errors
  const [dateTouched, setDateTouched] = useState(false);
  const [timeTouched, setTimeTouched] = useState(false);
  const [guestsTouched, setGuestsTouched] = useState(false);
  const [occasionTouched, setOccasionTouched] = useState(false);

  // Client-side validation logic
  const getValidationErrors = () => {
    const errors = {};
    
    // 1. Date Input Validation
    if (dateTouched) {
      if (!date) {
        errors.date = 'Date is required.';
      } else {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selected = new Date(date);
        selected.setHours(0, 0, 0, 0);
        if (selected < today) {
          errors.date = 'Reservation date cannot be in the past.';
        }
      }
    }

    // 2. Time Input (Select Element) Validation
    if (timeTouched) {
      if (!time) {
        errors.time = 'Please select a reservation time.';
      } else if (!availableTimes.includes(time)) {
        errors.time = 'Selected time slot is no longer available.';
      }
    }

    // 3. Number Input (Guests) Validation
    const parsedGuests = parseInt(guests, 10);
    if (guestsTouched) {
      if (isNaN(parsedGuests) || parsedGuests < 1) {
        errors.guests = 'Number of guests must be at least 1.';
      } else if (parsedGuests > 10) {
        errors.guests = 'Number of guests cannot exceed 10.';
      }
    }

    // 4. Occasion (Select Element) Validation
    if (occasionTouched) {
      if (!occasion) {
        errors.occasion = 'Please choose an occasion.';
      } else if (!['Birthday', 'Anniversary'].includes(occasion)) {
        errors.occasion = 'Please select a valid occasion.';
      }
    }

    return errors;
  };

  const errors = getValidationErrors();
  
  // Overall form validity condition
  const parsedGuests = parseInt(guests, 10);
  const isFormValid = 
    date !== '' && 
    !isNaN(parsedGuests) && 
    parsedGuests >= 1 && 
    parsedGuests <= 10 && 
    time !== '' && 
    availableTimes.includes(time) &&
    ['Birthday', 'Anniversary'].includes(occasion) &&
    Object.keys(errors).length === 0;

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

  const handleTimeChange = (e) => {
    setTime(e.target.value);
    setTimeTouched(true);
  };

  const handleOccasionChange = (e) => {
    setOccasion(e.target.value);
    setOccasionTouched(true);
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
      
      {/* Date Input field */}
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

      {/* Time Input select element */}
      <div style={{ display: 'grid', gap: '5px' }}>
        <label className="form-label" htmlFor="res-time">Choose time</label>
        <select 
          id="res-time" 
          className="form-input"
          style={{ borderColor: errors.time ? 'var(--secondary-salmon)' : '' }}
          value={time} 
          onChange={handleTimeChange}
          onBlur={() => setTimeTouched(true)}
          required
        >
          <option value="">-- Select Time --</option>
          {availableTimes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        {errors.time && (
          <span style={{ color: 'var(--secondary-salmon)', fontSize: '13px', fontWeight: '500' }}>
            {errors.time}
          </span>
        )}
      </div>

      {/* Guests Number Input field */}
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

      {/* Occasion Select Element */}
      <div style={{ display: 'grid', gap: '5px' }}>
        <label className="form-label" htmlFor="occasion">Occasion</label>
        <select 
          id="occasion" 
          className="form-input"
          style={{ borderColor: errors.occasion ? 'var(--secondary-salmon)' : '' }}
          value={occasion} 
          onChange={handleOccasionChange}
          onBlur={() => setOccasionTouched(true)}
          required
        >
          <option value="">-- Select Occasion --</option>
          <option value="Birthday">Birthday</option>
          <option value="Anniversary">Anniversary</option>
        </select>
        {errors.occasion && (
          <span style={{ color: 'var(--secondary-salmon)', fontSize: '13px', fontWeight: '500' }}>
            {errors.occasion}
          </span>
        )}
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
        aria-label="On Click"
      />
    </form>
  );
}

export default BookingForm;
