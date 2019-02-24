import React from 'react';
import { shallow } from 'enzyme';
import CartButton from './CartButton';

describe('<CartButton />', () => {
  test('should render successfully withour crashing', () => {
    const wrapper = shallow(<CartButton />);
    expect(wrapper).toMatchSnapshot();
  });
});
