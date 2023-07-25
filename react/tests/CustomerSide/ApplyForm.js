import { queryByTestId, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import ApplyForm from '../../components/Customer/ApplyForm/ApplyForm';


describe('HomePage Component', () => {
    
    render(<MemoryRouter><ApplyForm /></MemoryRouter>)

    test('fe_react_customerHome', () => {
       const  customerName = screen.queryByTestId('customerName');
       const  amount = screen.queryByTestId('amount');
       const  dueMonths = screen.queryByTestId('dueMonths');
       const  aadharNumber = screen.queryByTestId('aadharNumber');
       const  PANCardNumber = screen.queryByTestId('PANCardNumber');
       const  submitFormButton = screen.queryByTestId('submitFormButton');

       expect(customerName).toBeTruthy();
       expect(amount).toBeTruthy();
       expect(dueMonths).toBeTruthy();
       expect(aadharNumber).toBeTruthy();
       expect(PANCardNumber).toBeTruthy();
       expect(submitFormButton).toBeTruthy();
    })

})