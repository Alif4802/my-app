import { render, screen } from '@testing-library/react';
import App from './App';
import BookingForm from './BookingForm';
import { initializeTimes, updateTimes } from './Main';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('Renders the BookingForm heading', () => {
  render(<BookingForm />);
  const headingElement = screen.getByText("Book Now");
  expect(headingElement).toBeInTheDocument();
});

test('initializeTimes returns correct initial list of times', () => {
  const result = initializeTimes();
  const expected = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
  expect(result).toEqual(expected);
});

test('updateTimes returns the correct list of times on dispatch', () => {
  const initialState = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
  const action = { type: 'UPDATE_TIMES', date: '2026-07-18' };
  const result = updateTimes(initialState, action);
  expect(result).toEqual(initialState);
});
