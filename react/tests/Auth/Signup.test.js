import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Signup from '../../components/Auth/Signup/Signup';
import { MemoryRouter } from 'react-router';

describe('<Signup />', () => {
  test('fe_react_signup', () => {
    render(<MemoryRouter><Signup /></MemoryRouter>);
    
    const email = screen.queryByTestId('email');
    const password = screen.queryByTestId('password');
    const mobilenumber = screen.queryByTestId('mobileNumber');
    const username = screen.queryByTestId('username');
    const submitButton = screen.queryByTestId('submitButton');
    const signinLink = screen.queryByTestId('signinLink');

    expect(email).toBeTruthy();
    expect(password).toBeTruthy();
    expect(mobilenumber).toBeTruthy();
    expect(username).toBeTruthy();
    expect(submitButton).toBeTruthy();
    expect(signinLink).toBeTruthy();

    fireEvent.change(email, {target : {value : 'test email'}})
    expect(email.value).toBe('test email');
    
    fireEvent.change(password, {target : {value : 'test password'}})
    expect(password.value).toBe('test password');

    fireEvent.change(mobilenumber, {target : {value : '1234567890'}})
    expect(mobilenumber.value).toBe('1234567890');

    fireEvent.change(username, {target : {value : 'test name'}})
    expect(username.value).toBe('test name');
    
  });
});