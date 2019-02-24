import React from 'react';
import { shallow } from 'enzyme';
import Main from './Main';

describe('<Main />', () => {
  test('should render successfully withour crashing', () => {
    const wrapper = shallow(<Main />);
    expect(wrapper).toMatchSnapshot();
  });
});
