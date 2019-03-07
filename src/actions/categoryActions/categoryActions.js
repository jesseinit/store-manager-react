import Util from '../../utils';
import { logOutUser } from '../authActions/authActions';

export const GET_CATEGORIES = 'GET_CATEGORIES';

export const getCategories = () => async dispatch => {
  try {
    const { data } = await Util.makeRequest('/category');
    dispatch({ type: GET_CATEGORIES, payload: { allCategories: data } });
  } catch (error) {
    const { response } = error;
    if (response.status === 401) {
      dispatch(logOutUser());
    }
  }
};
