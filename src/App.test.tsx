import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App', () => {
  render(<App />);
  const elem = screen.getByText(/User Records/i);
  expect(elem).toBeInTheDocument();
});
