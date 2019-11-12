import React from 'react';
import { shallow, mount } from 'enzyme';
import HTML5Backend from 'react-dnd-html5-backend';
import renderer from 'react-test-renderer';
import { DndProvider } from 'react-dnd';
import Column from '../Column';

describe('<Column>', () => {
  it('renders without crashing', () => {
    shallow(
      <DndProvider backend={HTML5Backend}>
        <Column header="To-Do" status="todo" />
      </DndProvider>
    );
  });

  it('renders in edit mode', () => {
    const wrapper = mount(
      <DndProvider backend={HTML5Backend}>
        <Column header="To-Do" status="todo" />
      </DndProvider>
    );
    wrapper.find('div button').first().simulate('click');
    expect(wrapper.find('div div input').length).toEqual(1);
  });

  it('renders in edit mode', () => {
    const wrapper = mount(
      <DndProvider backend={HTML5Backend}>
        <Column header="To-Do" status="todo" />
      </DndProvider>
    );
    wrapper.find('div button').first().simulate('click');
    expect(wrapper.find('div div input').length).toEqual(1);
  });

  it('renders a just created ticket', () => {
    const wrapper = mount(
      <DndProvider backend={HTML5Backend}>
        <Column header="To-Do" status="todo" />
      </DndProvider>
    );
    wrapper.find('div button').first().simulate('click');
    wrapper.find('div div input').simulate('change', { target: { value: 'Test' } });
    wrapper.find('div div input').simulate('blur');
    expect(wrapper.find('div div div').contains('Test')).toEqual(true);
  });

  it('triggers onChange event', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <DndProvider backend={HTML5Backend}>
        <Column header="To-Do" status="todo" onChange={onChange} />
      </DndProvider>
    );
    wrapper.find('div button').first().simulate('click');
    wrapper.find('div div input').simulate('change', { target: { value: 'Test' } });
    wrapper.find('div div input').simulate('blur');
    expect(onChange.mock.calls.length).toEqual(2);
  });


  it('renders correctly with no tickets', () => {
    const tree = renderer
      .create(
        <DndProvider backend={HTML5Backend}>
          <Column header="To-Do" status="todo" />
        </DndProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with tickets', () => {
    const tree = renderer
      .create(
        <DndProvider backend={HTML5Backend}>
          <Column header="To-Do" status="todo"
            tickets={{
              1: { id: 1, description: 'Test 1', status: 'todo' },
              2: { id: 2, description: 'Test 2', status: 'todo' },
            }} />
        </DndProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
