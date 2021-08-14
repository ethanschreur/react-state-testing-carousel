import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Carousel from './Carousel';

it('renders without crashing', () => {
	render(<Carousel />);
});

it('matches snapshot', () => {
	const { asFragment } = render(<Carousel />);
	expect(asFragment()).toMatchSnapshot();
});

it('works when you click on the right arrow', function() {
	const { queryByTestId, queryByAltText } = render(<Carousel />);

	// expect the first image to show, but not the second
	expect(queryByAltText('Photo by Richard Pasquarella on Unsplash')).toBeInTheDocument();
	expect(queryByAltText('Photo by Pratik Patel on Unsplash')).not.toBeInTheDocument();

	// move forward in the carousel
	const rightArrow = queryByTestId('right-arrow');
	fireEvent.click(rightArrow);

	// expect the second image to show, but not the first
	expect(queryByAltText('Photo by Richard Pasquarella on Unsplash')).not.toBeInTheDocument();
	expect(queryByAltText('Photo by Pratik Patel on Unsplash')).toBeInTheDocument();
});

it('works when you click on the left arrow', () => {
	const { queryByTestId, queryByAltText } = render(<Carousel />);

	// move forward in the carousel
	const rightArrow = queryByTestId('right-arrow');
	fireEvent.click(rightArrow);

	// move backward in the carousel
	const leftArrow = queryByTestId('left-arrow');
	fireEvent.click(leftArrow);

	// expect the first image to show, but not the second
	expect(queryByAltText('Photo by Richard Pasquarella on Unsplash')).toBeInTheDocument();
	expect(queryByAltText('Photo by Pratik Patel on Unsplash')).not.toBeInTheDocument();
});

it('left or right arrow when you reach the end of the list on the respective side', () => {
	const { queryByTestId } = render(<Carousel />);
	let rightArrow = queryByTestId('right-arrow');
	const leftArrow = queryByTestId('left-arrow');

	// test reaching the end on the left side
	expect(leftArrow).toEqual(null);

	// test reaching the end on the right side
	fireEvent.click(rightArrow);
	fireEvent.click(rightArrow);
	rightArrow = queryByTestId('right-arrow');
	expect(rightArrow).toEqual(null);
});
