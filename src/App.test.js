import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import BookingForm from './BookingForm';
import LoginPage from './LoginPage';
import { initializeTimes, updateTimes, fetchAPI, submitAPI } from './Main';
import Nav from './Nav';

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

test('BookingForm HTML5 validation attributes exist', () => {
  render(<BookingForm />);
  
  const dateInput = screen.getByLabelText(/Choose date/i);
  expect(dateInput).toHaveAttribute('required');
  expect(dateInput).toHaveAttribute('type', 'date');

  const guestsInput = screen.getByLabelText(/Number of guests/i);
  expect(guestsInput).toHaveAttribute('required');
  expect(guestsInput).toHaveAttribute('type', 'number');
  expect(guestsInput).toHaveAttribute('min', '1');
  expect(guestsInput).toHaveAttribute('max', '10');
});

test('BookingForm submit button is disabled if form is invalid', () => {
  render(<BookingForm />);
  
  const submitButton = screen.getByDisplayValue('Make Your reservation');
  expect(submitButton).toBeDisabled();
});

test('BookingForm submit button is enabled and triggers submit if form inputs are valid', () => {
  const mockSubmitForm = jest.fn();
  const mockAvailableTimes = ['17:00', '18:00'];
  
  render(
    <BookingForm 
      availableTimes={mockAvailableTimes} 
      submitForm={mockSubmitForm} 
    />
  );
  
  const dateInput = screen.getByLabelText(/Choose date/i);
  const timeSelect = screen.getByLabelText(/Choose time/i);
  const guestsInput = screen.getByLabelText(/Number of guests/i);
  const occasionSelect = screen.getByLabelText(/Occasion/i);
  const submitButton = screen.getByDisplayValue('Make Your reservation');

  // Populate valid entries
  fireEvent.change(dateInput, { target: { value: '2026-07-20' } });
  fireEvent.change(timeSelect, { target: { value: '18:00' } });
  fireEvent.change(guestsInput, { target: { value: '4' } });
  fireEvent.change(occasionSelect, { target: { value: 'Anniversary' } });

  // Now the form is valid, submit button should be enabled
  expect(submitButton).not.toBeDisabled();

  // Submit the form
  fireEvent.click(submitButton);
  expect(mockSubmitForm).toHaveBeenCalledWith({
    date: '2026-07-20',
    time: '18:00',
    guests: 4,
    occasion: 'Anniversary'
  });
});

test('BookingForm displays errors and disables submit when guests count is out of bounds', () => {
  render(<BookingForm availableTimes={['17:00']} />);
  
  const dateInput = screen.getByLabelText(/Choose date/i);
  const guestsInput = screen.getByLabelText(/Number of guests/i);
  const submitButton = screen.getByDisplayValue('Make Your reservation');

  // Input valid date, but invalid guests
  fireEvent.change(dateInput, { target: { value: '2026-07-20' } });
  fireEvent.change(guestsInput, { target: { value: '12' } });
  fireEvent.blur(guestsInput);

  // Assert error message and disabled button
  const errorMessage = screen.getByText(/Number of guests cannot exceed 10/i);
  expect(errorMessage).toBeInTheDocument();
  expect(submitButton).toBeDisabled();
});

test('LoginPage displays errors for invalid input values', () => {
  render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );

  // Switch to sign up tab
  const signUpTabButton = screen.getByText('Sign Up');
  fireEvent.click(signUpTabButton);

  const nameInput = screen.getByLabelText(/Full Name/i);
  const emailInput = screen.getByLabelText(/Email Address/i);
  const passwordInput = screen.getByLabelText(/^Password/i); // Only match start-of-line Password, not Confirm Password
  const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);

  // Input invalid values
  fireEvent.change(nameInput, { target: { value: 'A' } }); // Short name
  fireEvent.blur(nameInput);
  fireEvent.change(emailInput, { target: { value: 'invalid-email' } }); // Bad email format
  fireEvent.blur(emailInput);
  fireEvent.change(passwordInput, { target: { value: '123' } }); // Short password
  fireEvent.blur(passwordInput);
  fireEvent.change(confirmPasswordInput, { target: { value: '123456' } }); // Mismatched passwords
  fireEvent.blur(confirmPasswordInput);

  // Assert validation errors are visible
  expect(screen.getByText(/Name must be at least 2 characters/i)).toBeInTheDocument();
  expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
  expect(screen.getByText(/Password must be at least 6 characters/i)).toBeInTheDocument();
  expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
});

test('LoginPage submit button matches validation state', () => {
  const mockLogin = jest.fn();
  const { container } = render(
    <BrowserRouter>
      <LoginPage onLogin={mockLogin} />
    </BrowserRouter>
  );

  // Login form is empty initially -> button should be disabled
  const submitButton = container.querySelector('button[type="submit"]');
  expect(submitButton).toBeDisabled();

  // Input valid credentials
  const emailInput = screen.getByLabelText(/Email Address/i);
  const passwordInput = screen.getByLabelText(/Password/i);

  fireEvent.change(emailInput, { target: { value: 'valid@mail.com' } });
  fireEvent.change(passwordInput, { target: { value: '123456' } });

  // Button should now be enabled
  expect(submitButton).not.toBeDisabled();
});

test('Nav hamburger menu toggles menu visibility', () => {
  render(
    <BrowserRouter>
      <Nav />
    </BrowserRouter>
  );
  
  const hamburgerButton = screen.getByLabelText(/Toggle navigation menu/i);
  const navLinksContainer = screen.getByRole('list');

  // Initially, it should not have the 'active' class
  expect(navLinksContainer).not.toHaveClass('active');

  // Click to open
  fireEvent.click(hamburgerButton);
  expect(navLinksContainer).toHaveClass('active');

  // Click to close
  fireEvent.click(hamburgerButton);
  expect(navLinksContainer).not.toHaveClass('active');
});

