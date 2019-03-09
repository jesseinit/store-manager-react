import Util from '../../utils';
import { logOutUser } from '../authActions/authActions';

export const GET_CATEGORIES_START = 'GET_CATEGORIES_START';
export const GET_CATEGORIES = 'GET_CATEGORIES_SUCCESS';

export const getCategories = () => async dispatch => {
  try {
    dispatch({ type: GET_CATEGORIES_START, payload: { isLoading: true } });
    const { data } = await Util.makeRequest('/category');
    dispatch({ type: GET_CATEGORIES, payload: { allCategories: data, isLoading: false } });
  } catch (error) {
    const { response } = error;
    if (response.status === 401) {
      dispatch(logOutUser());
    }
  }
};
