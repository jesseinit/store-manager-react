import React from 'react';
import { shallow } from 'enzyme';
import Spinner from './Spinner';

describe('<Spinner />', () => {
  test('should render successfully withour crashing', () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper).toMatchSnapshot();
  });
});
