import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import Review from '../../components/Customer/Review/Review';

describe ('User Review' ,() => {
	const {  container } = render(<MemoryRouter><Review /></MemoryRouter>) ;
        
    test('fe_react_customerReview', () => {
       const  comments = screen.queryByTestId('comments');
       const  submitReview = screen.queryByTestId('submitReview');
	   
	   expect(comments).toBeTruthy();
	   expect(submitReview).toBeTruthy();
    })
})