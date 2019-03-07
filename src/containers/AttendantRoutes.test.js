import React from 'react';
import { shallow, mount } from 'enzyme';
import { Route, MemoryRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import AttendantRoutesHOC, { AttendantRoute } from './AttendantRoutes';

const mockStore = configureMockStore();
let store;

describe('<AttendantRoutesHOC />', () => {
  let wrapper;

  it('should render succesfully', () => {
    wrapper = shallow(<AttendantRoutesHOC />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should be a route component', () => {
    wrapper = shallow(<AttendantRoute />);
    expect(wrapper.is(Route)).toEqual(true);
  });

  it('renders authenticated route with render prop without crashing', () => {
    const wrapper = shallow(<AttendantRoute component={() => <div />} isAuthenticated userRole="Attendant" />);
    const render = wrapper.prop('render')({ location: {} });
    const renderWrapper = shallow(render);
    expect(renderWrapper.is('div')).toBe(true);
  });

  it('should redirect unauthenticated request to authenticatd route', () => {
    const wrapper = shallow(<AttendantRoute isAuthenticated={false} />);
    const render = wrapper.prop('render')({ location: {} });
    expect(render.props.to).toEqual('/');
  });

  test('should ', () => {
    store = mockStore({ auth: { isAuthenticated: false, userRole: 'Attendant' } });
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <AttendantRoutesHOC />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
