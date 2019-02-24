import React from 'react';
import { shallow, mount } from 'enzyme';
import { Redirect } from 'react-router-dom';

import LoginForm, { LoginForm as LoginFormUnit } from './LoginForm';

describe('<LoginForm />', () => {
  let wrapper;
  const props = {
    auth: { isAuthenticated: true, userRole: 'Admin', isLoading: false, loginErrors: [] },
    loginUser: jest.fn(),
    clearLoginErrors: jest.fn()
  };

  test('should render successfully withour crashing', () => {
    wrapper = shallow(<LoginForm />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should redirect if user is authenticated', () => {
    props.auth.userRole = 'Attendant';
    wrapper = shallow(<LoginFormUnit {...props} />);
    expect(wrapper.is(Redirect)).toEqual(true);

    props.auth.userRole = 'Admin';
    wrapper = shallow(<LoginFormUnit {...props} />);
    expect(wrapper.is(Redirect)).toEqual(true);
  });

  test('should render the form when user is not authenticated', () => {
    props.auth.isAuthenticated = false;
    props.auth.loginErrors = ['sample error'];
    wrapper = shallow(<LoginFormUnit {...props} />);
    expect(wrapper.exists('.form__wrapper')).toEqual(true);
  });

  test('should login the user after providing logon information', () => {
    wrapper = mount(<LoginFormUnit {...props} />);

    const email = wrapper.find('#login-email');
    const password = wrapper.find('#login-email');
    const loginForm = wrapper.find('#login-form');

    email.simulate('focus');
    expect(props.clearLoginErrors).toHaveBeenCalled();

    email.simulate('change', { taget: { value: 'owner@storemangercom' } });
    password.simulate('change', { taget: { value: 'blahbalh' } });
    loginForm.simulate('submit');

    expect(props.loginUser).toHaveBeenCalled();
  });
});
