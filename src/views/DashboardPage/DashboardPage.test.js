import React from 'react';
import { shallow } from 'enzyme';
import DashboardPage from './DashboardPage';

describe('<DashboardPage />', () => {
  test('should render successfully withour crashing', () => {
    const wrapper = shallow(<DashboardPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
