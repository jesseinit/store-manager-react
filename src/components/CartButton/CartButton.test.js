import React from 'react';
import { shallow } from 'enzyme';
import CartButton from './CartButton';

describe('<CartButton />', () => {
  const props = {
    cart: {
      cartItems: []
    }
  };
  test('should render successfully withour crashing', () => {
    const wrapper = shallow(<CartButton {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
