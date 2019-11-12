import React from 'react';
import { shallow, mount } from 'enzyme';
import HTML5Backend from 'react-dnd-html5-backend';
import renderer from 'react-test-renderer';
import { DndProvider } from 'react-dnd';
import Board from '../Board';

describe('<Board>', () => {
  it('renders without crashing', () => {
    shallow(
      <DndProvider backend={HTML5Backend}>
        <Board />
      </DndProvider>
    );
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <DndProvider backend={HTML5Backend}>
          <Board />
        </DndProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
