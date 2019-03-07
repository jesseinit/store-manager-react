import React from 'react';
import { shallow, mount } from 'enzyme';
import AccountRow from './AccountRow';

describe('<AccountRow />', () => {
  const props = {
    user: { id: 1, name: 'Jesse', email: 'jesse@storemanager.com', role: 'Owner' },
    openUpdateModal: jest.fn(),
    openDeleteModal: jest.fn()
  };

  test('should render successfully withour crashing', () => {
    const wrapper = shallow(<AccountRow {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test("should call openUpdateModal method with user's details", () => {
    const wrapper = mount(
      <table>
        <tbody>
          <AccountRow {...props} />
        </tbody>
      </table>
    );
    wrapper.find('#update-user').simulate('click');
    expect(props.openUpdateModal).toBeCalledWith(props.user);
  });

  test("should call openDeleteModal method with user's details", () => {
    props.user.role = 'Attendant';
    const wrapper = mount(
      <table>
        <tbody>
          <AccountRow {...props} />
        </tbody>
      </table>
    );
    wrapper.find('#delete-user').simulate('click');
    expect(props.openDeleteModal).toBeCalledWith(props.user);
    // console.log(wrapper.find('button').length);
    // expect(wrapper.find('#delete-user'));
  });
});
