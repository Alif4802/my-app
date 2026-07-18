import { render, screen } from '@testing-library/react';
import App from './App';
import BookingForm from './BookingForm';
import { initializeTimes, updateTimes, fetchAPI, submitAPI } from './Main';

test('renders App and logo heading', () => {
  render(<App />);
  const headingElements = screen.getAllByText(/Little Lemon/i);
  expect(headingElements.length).toBeGreaterThan(0);
});

test('Renders the BookingForm heading', () => {
  render(<BookingForm />);
  const headingElement = screen.getByText("Book Now");
  expect(headingElement).toBeInTheDocument();
});

test('initializeTimes returns correct initial list of times', () => {
  const result = initializeTimes();
  const expected = fetchAPI(new Date());
  expect(result).toEqual(expected);
});

test('updateTimes returns correct updated list of times based on date', () => {
  const initialState = [];
  const action = { type: 'UPDATE_TIMES', date: '2026-07-18' };
  const expected = fetchAPI(new Date('2026-07-18'));
  const result = updateTimes(initialState, action);
  expect(result).toEqual(expected);
});

test('submitAPI writes booking to localStorage', () => {
  localStorage.clear();
  const mockBooking = { date: '2026-07-20', time: '18:00', guests: '2', occasion: 'Anniversary' };
  
  submitAPI(mockBooking);
  
  const savedBookings = JSON.parse(localStorage.getItem('bookings'));
  expect(savedBookings).toBeDefined();
  expect(savedBookings).toContainEqual(mockBooking);
});

test('fetchAPI filters out already booked slots from localStorage (reading from localStorage)', () => {
  localStorage.clear();
  const mockDate = new Date('2026-07-20');
  const baseTimes = fetchAPI(mockDate);
  
  // Choose one slot to book and write to localStorage
  const slotToBook = baseTimes[0];
  const mockBooking = { date: '2026-07-20', time: slotToBook, guests: '4', occasion: 'Birthday' };
  
  localStorage.setItem('bookings', JSON.stringify([mockBooking]));
  
  const updatedTimes = fetchAPI(mockDate);
  
  expect(updatedTimes).not.toContain(slotToBook);
  expect(updatedTimes.length).toBe(baseTimes.length - 1);
});
