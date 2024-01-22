/** @jest-environment jsdom */
import React from 'react';
import TestRenderer from 'react-test-renderer';
import App from '../src/App';


it('renders without crashing', () => {
    TestRenderer.create(<App />);
});
