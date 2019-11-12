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

  it('renders correctly with no columns', () => {
    const tree = renderer
      .create(
        <DndProvider backend={HTML5Backend}>
          <Board />
        </DndProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with columns', () => {
    const tree = renderer
      .create(
        <DndProvider backend={HTML5Backend}>
          <Board columns={{
            todo: 'To-Do',
            ongoing: 'In progress',
            done: 'Done',
          }} />
        </DndProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with tickets', () => {
    const tree = renderer
      .create(
        <DndProvider backend={HTML5Backend}>
          <Board
            columns={{
              todo: 'To-Do',
              ongoing: 'In progress',
              done: 'Done',
            }}
            tickets={{
              todo: {
                1: { id: 1, description: 'Test 1', status: 'todo' },
              },
              ongoing: {
                2: { id: 2, description: 'Test 2', status: 'ongoing' },
                4: { id: 4, description: 'Test 4', status: 'ongoing' },
              },
              done: {
                3: { id: 3, description: 'Test 3', status: 'done' },
              },
            }}
          />
        </DndProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
