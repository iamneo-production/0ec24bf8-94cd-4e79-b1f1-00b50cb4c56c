import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from '../../components/Auth/Login/Login';
import { MemoryRouter } from 'react-router';

describe('<Login />', () => {
  test('fe_react_login', () => {
    render(<MemoryRouter><Login /></MemoryRouter>);

    const loginBox = screen.getByTestId('loginBox');
    const email = screen.getByTestId('email');
    const password = screen.getByTestId('password');
    const loginButton = screen.getByTestId('loginButton');
    const signupLink = screen.getByTestId('signupLink');

    expect(loginBox).toBeTruthy();
    expect(email).toBeTruthy();
    expect(password).toBeTruthy();
    expect(loginButton).toBeTruthy();
    expect(signupLink).toBeTruthy();

    fireEvent.change(email, {target : {value : 'test email'}})
    expect(email.value).toBe('test email');
    
    fireEvent.change(password, {target : {value : 'test password'}})
    expect(password.value).toBe('test password');
    
  });
});