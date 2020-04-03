import '@testing-library/jest-dom';
import React from 'react';

import { render } from '@testing-library/react';
import SearchResult from './SearchResult';

test('SearchResults render correctly closed with null searchResult', () => {
    const container = render(<SearchResult open={false} onClose={jest.fn()} searchResult={null} />);
    expect(container.baseElement).toMatchSnapshot();
});

test('SearchResults render correctly closed without null searchResult', () => {
    const container = render(<SearchResult open={false} onClose={jest.fn()} searchResult={'Test'} />);
    expect(container.baseElement).toMatchSnapshot();
});

test('SearchResults render correctly open with null searchResult', () => {
    const container = render(<SearchResult open={true} onClose={jest.fn()} searchResult={null} />);
    expect(container.baseElement).toMatchSnapshot();
});

test('SearchResults render correctly open without null searchResult', () => {
    const container = render(<SearchResult open={true} onClose={jest.fn()} searchResult={'Test'} />);
    expect(container.baseElement).toMatchSnapshot();
});
