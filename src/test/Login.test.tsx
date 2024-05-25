import { render, fireEvent, screen, act } from '@testing-library/react';
import Login from '../pages/Auth/Login';

test('submits the form with correct values', async () => {
  render(<Login />);


  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
  fireEvent.click(screen.getByLabelText(/remember me/i));

 
  await act(async () => {
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
  });
});
