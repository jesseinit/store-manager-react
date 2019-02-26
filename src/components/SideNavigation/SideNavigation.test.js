import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import SideNavigation from './SideNavigation';

const mockStore = configureMockStore();
let store;

describe('<>SideNavigation</>', () => {
  test('should render Attendant sidebar', () => {
    store = mockStore({ auth: { isAuthenticated: false, userRole: 'Attendant' } });
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <SideNavigation />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test('should render Owner sidebar', () => {
    store = mockStore({ auth: { isAuthenticated: false, userRole: 'Admin' } });
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <SideNavigation />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
