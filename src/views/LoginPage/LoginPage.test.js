import React from 'react';
import { shallow } from 'enzyme';
import LoginPage from './LoginPage';

describe('<LoginPage />', () => {
  test('should render successfully withour crashing', () => {
    const wrapper = shallow(<LoginPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
