import React from 'react';
import { shallow, mount } from 'enzyme';
import { Redirect, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Dashboard, { DashboardContent } from './Dashboard';
import Loading from '../Loading/Loading';

const mockStore = configureMockStore();
let store;

describe('<Dashboard />', () => {
  const props = {
    auth: {
      isAuthenticated: true
    },
    sales: {
      misc: {
        latestsales: []
      },
      isLoading: true
    },
    populateDashboard: jest.fn()
  };
  test('should render successfully withour crashing', () => {
    const wrapper = shallow(<DashboardContent {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should redirect when users is not authenticated', () => {
    props.auth.isAuthenticated = false;
    const wrapper = shallow(<DashboardContent {...props} />);
    expect(wrapper.is(Redirect)).toEqual(true);
  });

  test('should render loading component when loading data from store', () => {
    props.auth.isAuthenticated = true;
    props.sales.isLoading = true;
    const wrapper = shallow(<DashboardContent {...props} />);
    expect(wrapper.exists(Loading)).toEqual(true);
  });

  test('should render dashboard component when loading is completed', () => {
    props.auth.isAuthenticated = true;
    props.sales.isLoading = false;
    const wrapper = shallow(<DashboardContent {...props} />);
    expect(wrapper.exists()).toEqual(true);
  });
});
