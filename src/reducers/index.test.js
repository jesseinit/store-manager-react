import { createStore } from 'redux';

import rootReducer from './index';

const store = createStore(rootReducer);

describe('Root Reducer', () => {
  it('should return the initial auth state', () => {
    const expectedInitialAuthState = {
      isAuthenticated: false,
      userRole: 'guest',
      loginErrors: [],
      isLoading: false
    };
    expect(store.getState().auth).toEqual(expectedInitialAuthState);
  });
});
