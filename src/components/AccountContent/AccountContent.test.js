import React from 'react';
import { shallow, mount } from 'enzyme';

import AccountContentDefault, { AccountContent } from './AccountContent';

describe('<AccountContent />', () => {
  const props = {
    auth: {},
    users: {
      users: [{ id: '1', name: 'Jesse', email: 'email@email.com', role: 'Admin' }],
      isLoading: false,
      modalLoading: false,
      modalErrors: ['Jesse']
    },
    getUsers: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
    clearModalErrors: jest.fn()
  };

  test('should render successfully withour crashing', () => {
    const wrapper = shallow(<AccountContentDefault />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should show a loader when component is fetching user accounts.', () => {
    props.users.isLoading = true;
    const wrapper = mount(<AccountContent {...props} />);
    expect(wrapper.exists('Loading')).toEqual(true);
  });

  test('should open modal when create user button is clicked', () => {
    props.users.isLoading = false;
    const wrapper = mount(<AccountContent {...props} />);
    wrapper.find('#show-user-modal').simulate('click');
    expect(wrapper.state('setCreateModalOpen')).toEqual(true);
  });

  test('should close modal when modal close button is clicked', () => {
    const wrapper = mount(<AccountContent {...props} />);
    wrapper
      .find('Modal')
      .at(0)
      .prop('onRequestClose')();
    expect(wrapper.state('setCreateModalOpen')).toEqual(false);
  });

  test('should submit modal form and call the action creator', () => {
    const wrapper = mount(<AccountContent {...props} />);
    wrapper.find('#show-user-modal').simulate('click');
    wrapper.find('#create-user-form').simulate('submit');
    expect(props.createUser).toBeCalled();
  });
});
