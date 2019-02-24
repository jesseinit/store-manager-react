import React from 'react';
import { shallow } from 'enzyme';
import Routes from './index';

describe('<Routes />', () => {
  test('should render successfully withour crashing', () => {
    const wrapper = shallow(<Routes />);
    expect(wrapper).toMatchSnapshot();
  });
});
