import { queryByTestId, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import InsurenceStatus from '../../components/Customer/InsurenceStatus/InsurenceStatus';


describe('Status', () => {
    
    render(<MemoryRouter><InsurenceStatus /></MemoryRouter>)

    test('fe_react_customerInsurenceStatus', () => {
       const  loanStatus = screen.queryByTestId('insurenceStatus');
	   
	   expect(loanStatus).toBeTruthy();
    })

})