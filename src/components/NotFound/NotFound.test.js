import React from 'react';
import { shallow } from 'enzyme';
import NotFound from './NotFound';

describe('<NotFound />', () => {
  test('should render successfully withour crashing', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper).toMatchSnapshot();
  });
});
