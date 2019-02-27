import userReducer from './userReducer';
import { CREATE_USERS_SUCCESS, GET_USERS, USERS_LOADING } from '../../actions/usersActions/usersActions';

describe('User Reducer', () => {
  const initalState = {
    users: [],
    actionMessage: '',
    isLoading: false
  };

  test('should return initial state ', () => {
    expect(userReducer(initalState, { type: 'DUMB_ACTION' })).toEqual(initalState);
  });

  test('should dispatch USERS_LOADING with the right payload', () => {
    const expectedPayload = { ...initalState };
    expect(userReducer(initalState, { type: USERS_LOADING, payload: { isLoading: false } })).toEqual(expectedPayload);
  });

  test('should dispatch GET_USERS with the right payload', () => {
    const expectedPayload = { ...initalState };
    expect(userReducer(initalState, { type: GET_USERS, payload: {} })).toEqual(expectedPayload);
  });

  test('should dispatch CREATE_USERS_SUCCESS with the right payload', () => {
    const expectedPayload = {
      ...initalState,
      users: [...initalState.users, []]
    };
    expect(userReducer(initalState, { type: CREATE_USERS_SUCCESS, payload: [] })).toEqual(expectedPayload);
  });
});
