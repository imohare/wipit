import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import Register from './Register';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { UserContext } from '../userContext';
import { Router, Routes, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

it('blah', async () => {
  const setUser = jest.fn();
  const user = {
    name: 'hello',
    email: 'hello15@gmail.com',
    password: 'secret1234',
    type: 'Artist',
  };
  const history = createBrowserHistory();
  history.push('/register');
  render(
    <Router location={history.location} navigator={history}>
      <Routes>
        <Route
          path='/register'
          element={
            <UserContext.Provider value={{ user, setUser }}>
              <Register userType='Artist' />
            </UserContext.Provider>
          }
        ></Route>
      </Routes>
    </Router>
  );
  userEvent.type(screen.getByPlaceholderText(/Name/i), 'Fatima');
  userEvent.type(
    screen.getByPlaceholderText(/Enter email/i),
    'fatima1598@gmail.com'
  );
  userEvent.type(
    screen.getByPlaceholderText(/Enter New Password/i),
    'secret1234'
  );
  userEvent.click(screen.getByRole('button', { name: /Create User/i }));
  await waitFor(() => {
    expect(setUser.mock.calls.length).toBe(1);
  });
});
