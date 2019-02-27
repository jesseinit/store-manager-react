import Util from '../../utils';
import { logOutUser } from '../authActions/authActions';

export const USERS_LOADING = 'GET_USERS_START';
export const GET_USERS = 'GET_USERS_SUCCESS';
export const CREATE_USERS_SUCCESS = 'CREATE_USERS_SUCCESS';
export const CREATE_USERS_FAILURE = 'CREATE_USERS_FAILURE';

export const userLoading = loadingStatus => ({
  type: USERS_LOADING,
  payload: { isLoading: loadingStatus }
});

export const getUsers = () => async dispatch => {
  try {
    dispatch(userLoading(true));

    const { data, message } = await Util.makeRequest('/users/');

    dispatch({
      type: GET_USERS,
      payload: { users: data, actionMessage: message, isLoading: false }
    });
  } catch (error) {
    const { response } = error;
    if (response.status === 401) {
      dispatch(logOutUser());
    }
  }
};

export const createUser = (newUser, closeModal) => async dispatch => {
  try {
    dispatch(userLoading(true));

    const options = {
      method: 'POST',
      body: newUser
    };

    const { data } = await Util.makeRequest('/auth/signup', options);

    closeModal();

    dispatch({
      type: CREATE_USERS_SUCCESS,
      payload: data
    });
  } catch (error) {
    const { response } = error;
    if (response.status === 401) {
      dispatch(logOutUser());
    }
  }
};
