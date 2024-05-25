import { render, fireEvent, screen, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import Login from '../pages/Auth/Login';

test('submits the form with correct values', async () => {
  render(
    <Router> {/* Wrap Login component inside Router */}
      <Login />
    </Router>
  );

  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
  fireEvent.click(screen.getByLabelText(/remember me/i));

  await act(async () => {
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
  });
});
