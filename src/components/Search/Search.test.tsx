import '@testing-library/jest-dom';
import React from 'react';

import { render } from '@testing-library/react';
import Search from './Search';

test('Search render correctly', () => {
    const container = render(<Search />);
    expect(container.baseElement).toMatchSnapshot();
});
