import Util from '../../utils';
import { logOutUser } from '../authActions/authActions';

export const USERS_LOADING = 'GET_USERS_START';
export const GET_USERS = 'GET_USERS_SUCCESS';
export const USER_ACTION_START = 'USER_ACTION_START';
export const UPDATE_USERS_START = 'UPDATE_USERS_START';
export const UPDATE_USERS_SUCCESS = 'UPDATE_USERS_SUCCESS';
export const DELETE_USERS_SUCCESS = 'DELETE_USERS_SUCCESS';
export const CREATE_USERS_SUCCESS = 'CREATE_USERS_SUCCESS';
export const CREATE_USERS_FAILURE = 'USER_ACTION_ERROR';
export const CLEAR_MODAL_ERRORS = 'CLEAR_MODAL_ERRORS';

export const userLoading = loadingStatus => ({
  type: USERS_LOADING,
  payload: { isLoading: loadingStatus }
});

export const clearModalErrors = () => ({ type: CLEAR_MODAL_ERRORS });

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
    dispatch({ type: USER_ACTION_START, payload: true });

    const options = {
      method: 'POST',
      body: newUser
    };

    const { data, message } = await Util.makeRequest('/auth/signup', options);

    dispatch({
      type: CREATE_USERS_SUCCESS,
      payload: { data, message }
    });

    closeModal();
  } catch (error) {
    const { response } = error;
    if (response.status === 401) {
      dispatch(logOutUser());
      return;
    }
    dispatch({
      type: CREATE_USERS_FAILURE,
      payload: response.data.error ? [...response.data.error] : [response.data.message]
    });
  }
};

export const updateUser = (userInfo, closeModal) => async dispatch => {
  try {
    dispatch({ type: USER_ACTION_START, payload: true });

    const options = {
      method: 'PUT',
      body: userInfo
    };

    const data = await Util.makeRequest(`/users/${userInfo.id}`, options).then(async () => {
      const { data: updatedList } = await Util.makeRequest('/users/');
      return updatedList;
    });

    dispatch({
      type: UPDATE_USERS_SUCCESS,
      payload: { users: data, actionMessage: `${userInfo.name} was updated successfully`, modalLoading: false }
    });

    closeModal();
  } catch (error) {
    const { response } = error;
    if (response.status === 401) {
      dispatch(logOutUser());
      return;
    }
    dispatch({
      type: CREATE_USERS_FAILURE,
      payload: response.data.error ? [...response.data.error] : [response.data.message]
    });
  }
};

export const deleteUser = (userInfo, closeModal) => async dispatch => {
  try {
    dispatch({ type: USER_ACTION_START, payload: true });

    await Util.makeRequest(`/users/${userInfo.id}`, {
      method: 'DELETE'
    });

    const { data } = await Util.makeRequest('/users/');

    dispatch({
      type: DELETE_USERS_SUCCESS,
      payload: { users: data, actionMessage: `${userInfo.name} was deleted successfully`, modalLoading: false }
    });

    closeModal();
  } catch (error) {
    const { response } = error;

    switch (response.status) {
      case 401:
        dispatch(logOutUser());
        break;
      default:
        dispatch({
          type: CREATE_USERS_FAILURE,
          payload: response.data.error ? [...response.data.error] : [response.data.message]
        });
        break;
    }
  }
};
