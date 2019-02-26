import React from 'react';
import { shallow, mount } from 'enzyme';
import { Route, MemoryRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import AdminRouteHOC, { AdminRoute } from './AdminRoutes';

const mockStore = configureMockStore();
let store;

describe('<AdminRouteHOC />', () => {
  let wrapper;

  it('should render succesfully', () => {
    wrapper = shallow(<AdminRouteHOC />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should be a route component', () => {
    wrapper = shallow(<AdminRoute />);
    expect(wrapper.is(Route)).toEqual(true);
  });

  it('renders authenticated route with render prop without crashing', () => {
    const wrapper = shallow(<AdminRoute component={() => <div />} isAuthenticated userRole="Admin" />);
    const render = wrapper.prop('render')({ location: {} });
    const renderWrapper = shallow(render);
    expect(renderWrapper.is('div')).toBe(true);
  });

  it('renders authenticated route with render prop without crashing', () => {
    const wrapper = shallow(<AdminRoute component={() => <div />} isAuthenticated userRole="Owner" />);
    const render = wrapper.prop('render')({ location: {} });
    const renderWrapper = shallow(render);
    expect(renderWrapper.is('div')).toBe(true);
  });

  it('should redirect unauthenticated request to authenticatd route', () => {
    const wrapper = shallow(<AdminRoute isAuthenticated={false} />);
    const render = wrapper.prop('render')({ location: {} });
    expect(render.props.to).toEqual('/');
  });

  test('should ', () => {
    store = mockStore({ auth: { isAuthenticated: false, userRole: 'Attendant' } });
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <AdminRouteHOC />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
