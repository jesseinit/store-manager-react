import React from 'react';
import { shallow } from 'enzyme';
import AccountsPage from './AccountsPage';

describe('<AccountsPage />', () => {
  test('should render successfully withour crashing', () => {
    const wrapper = shallow(<AccountsPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
