import React from 'react';
import { shallow } from 'enzyme';
import ErrorToast from './ErrorToast';

describe('<ErrorToast />', () => {
  test('should render successfully withour crashing', () => {
    const wrapper = shallow(<ErrorToast />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render list of errors', () => {
    const wrapper = shallow(<ErrorToast errors={['Sample Error']} />);
    expect(wrapper.find('li')).toBeDefined();
  });
});
