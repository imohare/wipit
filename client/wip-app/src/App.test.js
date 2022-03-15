import React from 'react';
import { screen, render } from '@testing-library/react';
import App from './App';

test('trying things', async () => {
  render(<App />);
  screen.getByText('Are you an Artist or a Gallerist?');
  // console.log(screen.getByRole('button', { name: /Artist/i }));
  expect(await screen.findByRole('button', { name: /Artist/i })).toBeEnabled();
  // const element = await screen.getByRole('');
  // expect(element).toBeInTheDocument();
});
