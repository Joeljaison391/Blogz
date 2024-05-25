import { render, fireEvent, screen, act, waitFor } from '@testing-library/react';
import Register from '../pages/Auth/Register';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

test('renders the registration form correctly', () => {
  render(<Router><Register /></Router>);
  
  expect(screen.getByLabelText('Username')).toBeInTheDocument();
  expect(screen.getByLabelText('Email')).toBeInTheDocument();
  expect(screen.getByLabelText('Date of Birth')).toBeInTheDocument();
  expect(screen.getByLabelText('Actual Name')).toBeInTheDocument();
  expect(screen.getByLabelText('Password')).toBeInTheDocument();
  expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
});

test('submits the registration form with correct values', async () => {
  render(<Router><Register /></Router>);
  
  fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText('Date of Birth'), { target: { value: '1990-01-01' } });
  fireEvent.change(screen.getByLabelText('Actual Name'), { target: { value: 'Test User' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
  fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'password123' } });

  // Wrap the form submission in an act() call to ensure async behavior is properly handled
  await act(async () => {
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));
    // Wait for the async validation and submission to complete
    await waitFor(() => {
      // Assert on any success message or redirection after form submission if applicable
    });
  });
});
