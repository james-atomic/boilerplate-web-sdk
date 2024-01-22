import React from 'react';
import TestRenderer from 'react-test-renderer';
import { SingleCard } from '../src/components/singleCard';
import {VerticalStream} from "../src/components/verticalStream";
import {Launcher} from "../src/components/launcher";

const mock_config =  { streamContainerId: 'abc'};
it('render a single card container without crashing', () => {
    TestRenderer.create(<SingleCard config={ mock_config }/>);
});

it('render a vertical stream container without crashing', () => {
    TestRenderer.create(<VerticalStream config={ mock_config }/>);
});

it('render a launcher without crashing', () => {
    TestRenderer.create(<Launcher config={ mock_config }/>);
});

