import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import Header, { Header as HeaderUnit } from './Header';

const mockStore = configureMockStore();
let store;

describe('<Header />', () => {
  const props = { auth: { userRole: 'Attendant' }, logOutUser: jest.fn() };

  test('should render successfully withour crashing', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render navigation links based on user role', () => {
    const wrapper = mount(<HeaderUnit {...props} />);
    expect(wrapper.exists('.cart')).toEqual(true);
  });

  test('should call the logout method when the button is clicked', () => {
    const wrapper = mount(<HeaderUnit {...props} />);
    wrapper.find('#logout-btn').simulate('click');
    expect(props.logOutUser).toBeCalled();
  });

  test('should render Attendant sidebar', () => {
    store = mockStore({ auth: { isAuthenticated: false, userRole: 'Attendant' } });
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
