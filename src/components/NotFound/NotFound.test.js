import React from 'react';
import { shallow, mount } from 'enzyme';
import NotFound from './NotFound';

describe('<NotFound />', () => {
  test('should render successfully withour crashing', () => {
    const wrapper = mount(<NotFound />);
    expect(wrapper).toMatchSnapshot();
  });
});
