import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import App from './App';

test('App renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});

test('App renders correctly', () => {
    const container = render(<App />);
    expect(container.baseElement).toMatchSnapshot();
});
