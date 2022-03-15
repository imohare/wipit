import React from 'react';
import { screen, render } from '@testing-library/react';
import Register from './Register';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
// import ShallowRenderer from 'react-test-renderer/shallow';
import { UserContext } from '../userContext';
import { Button } from 'rebass';

test('testing register form', async () => {
  const valueUser = {
    name: 'Hello',
    email: 'hello@gamil.com',
    password: 'secret',
  };
  render(<App></App>);
  userEvent.click(screen.getByRole('link', { name: /Artist/i }));
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
});

// it('blah', async () => {
//   const setUser = jest.fn();
//   const credentials = {
//     name: 'Fatima',
//     email: 'fatima15@gmail.com',
//     password: 'secret1234',
//     type: 'Artist',
//   };
//   render(<App></App>);
//   userEvent.click(screen.getByRole('link', { name: /Artist/i }));
//   // render(<Register userType='Artist' />);

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
//   const Button = screen.getByRole('button', { name: /Create User/i });
//   // btn.prototype.onClick = jest.fn();
//   // setUser(credentials);
//   // renderedNode.prototype.setUser = jest.fn()
//   const handleClick = jest.fn();
//   render(<Button onClick={handleClick}></Button>);
//   expect(handleClick).toHaveBeenCalledWith(credentials);
// });
