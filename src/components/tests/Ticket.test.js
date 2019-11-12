import React from 'react';
import { shallow, mount } from 'enzyme';
import HTML5Backend from 'react-dnd-html5-backend';
import renderer from 'react-test-renderer';
import { DndProvider } from 'react-dnd';
import Ticket from '../Ticket';

describe('<Ticket>', () => {
  it('renders without crashing', () => {
    shallow(
      <DndProvider backend={HTML5Backend}>
        <Ticket />
      </DndProvider>
    );
  });

  it('renders default description', () => {
    const wrapper = mount(
      <DndProvider backend={HTML5Backend}>
        <Ticket />
      </DndProvider>
    );
    expect(wrapper.find('div').at(1).contains('(no description)')).toBe(true);
  });

  it('renders in edit mode', () => {
    const wrapper = mount(
      <DndProvider backend={HTML5Backend}>
        <Ticket />
      </DndProvider>
    );
    wrapper.find('div').first().simulate('dblclick');
    expect(wrapper.find('input').length).toEqual(1);
  });

  it('triggers onChange event', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <DndProvider backend={HTML5Backend}>
        <Ticket onChange={onChange} />
      </DndProvider>
    );
    wrapper.find('div').first().simulate('dblclick');
    wrapper.find('input').simulate('change', { target: { value: 'Test' } });
    wrapper.find('input').simulate('blur');
    expect(onChange.mock.calls.length).toEqual(1);
  });

  it('triggers onDelete event', () => {
    const onDelete = jest.fn();
    const wrapper = mount(
      <DndProvider backend={HTML5Backend}>
        <Ticket onDelete={onDelete} />
      </DndProvider>
    );
    wrapper.find('button').simulate('click');
    expect(onDelete.mock.calls.length).toEqual(1);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <DndProvider backend={HTML5Backend}>
          <Ticket />
        </DndProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
