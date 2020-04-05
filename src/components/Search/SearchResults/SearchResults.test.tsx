import '@testing-library/jest-dom';
import React from 'react';

import { render } from '@testing-library/react';
import SearchResults from './SearchResults';

test('SearchResults render correctly with null props', () => {
    const container = render(<SearchResults searchResults={{ results: null, nO: 0 }} openSearchResult={jest.fn()} />);
    expect(container.baseElement).toMatchSnapshot();
});

test('SearchResults render correctly with 3 items in array', () => {
    const container = render(
        <SearchResults
            searchResults={{ nO: 0, results: [{ login: '1' }, { login: '2' }, { login: '3' }] }}
            openSearchResult={jest.fn()}
        />,
    );
    expect(container.baseElement).toMatchSnapshot();
});

test('SearchResults render correctly with 9 items in array', () => {
    const container = render(
        <SearchResults
            searchResults={{
                nO: 0,
                results: [
                    { login: '1' },
                    { login: '2' },
                    { login: '3' },
                    { login: '4' },
                    { login: '5' },
                    { login: '6' },
                    { login: '7' },
                    { login: '8' },
                    { login: '9' },
                ],
            }}
            openSearchResult={jest.fn()}
        />,
    );
    expect(container.baseElement).toMatchSnapshot();
});
