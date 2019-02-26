import React from 'react';
import { shallow } from 'enzyme';
import TableRow from './TableRow';

describe('<TableRow />', () => {
  const props = {
    latestsales: []
  };

  test('should render successfully withour crashing', () => {
    delete props.latestsales;
    const wrapper = shallow(<TableRow {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should render table rows when passed in data withour crashing', () => {
    props.latestsales = [{ s_date: new Date(), s_description: 'Sample Desc', s_qty: 100, s_price: 200, s_total: 500 }];
    const wrapper = shallow(<TableRow {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
