import React from 'react';
import TestRenderer from 'react-test-renderer';
import { SingleCard } from '../src/components/singleCard';

it('render a single card container without crashing', () => {
    const id = "abc"
    TestRenderer.create(<SingleCard containerId={ id }/>);
});
