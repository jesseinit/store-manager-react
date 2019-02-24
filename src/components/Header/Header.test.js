import React from 'react';
import { shallow, mount } from 'enzyme';

import Header, { Header as HeaderUnit } from './Header';

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
});
