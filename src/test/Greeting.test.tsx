import { render } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import Greeting from '../Greeting';

test('renders greeting with name', () => {
  const { getByText } = render(<Greeting name="John" />);
  expect(getByText('Hello, John!')).toBeInTheDocument(); 
});