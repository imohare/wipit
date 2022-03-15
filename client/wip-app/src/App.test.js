import React from 'react';
import { screen, render } from '@testing-library/react';
import App from './App';
import Register from './screens/Register';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { useEventListener } from '@chakra-ui/react';

test('testing if Artist button is enabled', async () => {
  render(<App />);
  screen.getByText('Are you an Artist or a Gallerist?');
  expect(await screen.findByRole('button', { name: /Artist/i })).toBeEnabled();
});
