import {
  GET_USERS,
  CREATE_USERS_SUCCESS,
  USERS_LOADING,
  CREATE_USERS_FAILURE,
  CREATE_USERS_START,
  CLEAR_MODAL_ERRORS
} from '../../actions/usersActions/usersActions';

const initalState = {
  users: [],
  actionMessage: '',
  isLoading: false,
  modalLoading: false,
  createErrors: []
};

const userReducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case USERS_LOADING:
      return { ...state, ...payload };
    case CREATE_USERS_START:
      return { ...state, modalLoading: payload };
    case CLEAR_MODAL_ERRORS:
      return { ...state, createErrors: [] };
    case GET_USERS:
      return { ...state, ...payload };
    case CREATE_USERS_FAILURE:
      return { ...state, createErrors: [...payload], modalLoading: false };
    case CREATE_USERS_SUCCESS:
      return { ...state, users: [...state.users, payload], modalLoading: false };
    default:
      return state;
  }
};
export default userReducer;
