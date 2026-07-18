import React, { useReducer } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './HomePage';
import BookingPage from './BookingPage';
import ConfirmedBooking from './ConfirmedBooking';

// Mock fetchAPI local implementation integrated with localStorage persistence
export const fetchAPI = (date) => {
  let times = [];

  // 1. Get raw base times from the external API if available, or fall back to local mock
  if (window.fetchAPI) {
    times = window.fetchAPI(date);
  } else {
    // Seeded random number generator based on date
    const seededRandom = function (seed) {
      var m = 2**35 - 31;
      var a = 185852;
      var s = seed % m;
      return function () {
        return (s = s * a % m) / m;
      };
    };

    let random = seededRandom(date.getDate());
    for (let i = 17; i <= 23; i++) {
      if (random() < 0.5) {
        times.push(i + ':00');
      }
      if (random() < 0.5) {
        times.push(i + ':30');
      }
    }
  }

  // 2. Filter out times that have already been booked and saved to localStorage
  try {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const bookedTimes = bookings
      .filter((b) => b.date === formattedDate)
      .map((b) => b.time);

    return times.filter((t) => !bookedTimes.includes(t));
  } catch (e) {
    console.error('LocalStorage read error:', e);
    return times;
  }
};

// Mock submitAPI local implementation integrated with localStorage persistence
export const submitAPI = (formData) => {
  try {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push(formData);
    localStorage.setItem('bookings', JSON.stringify(bookings));
  } catch (e) {
    console.error('LocalStorage write error:', e);
  }

  if (window.submitAPI) {
    return window.submitAPI(formData);
  }
  return true;
};

// Reducer function to update times based on selected date
export const updateTimes = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMES':
      const dateObject = new Date(action.date);
      return fetchAPI(dateObject);
    default:
      return state;
  }
};

// Initializer function for available booking times (today's date)
export const initializeTimes = () => {
  const today = new Date();
  return fetchAPI(today);
};

function Main() {
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);
  const navigate = useNavigate();

  // Submit form handler connecting to submitAPI
  const submitForm = (formData) => {
    const success = submitAPI(formData);
    if (success) {
      navigate('/confirmed');
    }
  };

  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/booking" 
          element={
            <BookingPage 
              availableTimes={availableTimes} 
              dispatch={dispatch} 
              submitForm={submitForm}
            />
          } 
        />
        <Route path="/confirmed" element={<ConfirmedBooking />} />
      </Routes>
    </main>
  );
}

export default Main;
