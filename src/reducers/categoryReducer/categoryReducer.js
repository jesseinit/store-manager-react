import { GET_CATEGORIES, GET_CATEGORIES_START } from '../../actions/categoryActions/categoryActions';

const initialState = {
  allCategories: [],
  isLoading: false
};

const categoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CATEGORIES_START:
      return { ...state, ...payload };
    case GET_CATEGORIES:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default categoryReducer;
