import React from 'react';
import { screen, render } from '@testing-library/react';
import Register from './Register';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

// test('testing register form', async () => {
//   render(<Register userType='Artist' />);
//   userEvent.type(screen.getByPlaceholderText(/Name/i), 'Fatima');
//   userEvent.type(
//     screen.getByPlaceholderText(/Enter email/i),
//     'fatima15@gmail.com'
//   );
//   userEvent.type(
//     screen.getByPlaceholderText(/Enter New Password/i),
//     'secret1234'
//   );
//   userEvent.click(await screen.findByRole('button', { name: /Create User/i }));
// });

it('blah', async () => {
  const setUser = jest.fn();
  const credentials = {
    name: 'Fatima',
    email: 'fatima15@gmail.com',
    password: 'secret1234',
    type: 'Artist',
  };

  render(<Register userType='Artist' />);

  userEvent.type(screen.getByPlaceholderText(/Name/i), 'Fatima');
  userEvent.type(
    screen.getByPlaceholderText(/Enter email/i),
    'fatima15@gmail.com'
  );
  userEvent.type(
    screen.getByPlaceholderText(/Enter New Password/i),
    'secret1234'
  );
  userEvent.click(await screen.findByRole('button', { name: /Create User/i }));

  expect(setUser).toHaveBeenCalled(credentials);
});
