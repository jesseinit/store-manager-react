import { GET_USERS, CREATE_USERS_SUCCESS, USERS_LOADING } from '../../actions/usersActions/usersActions';

const initalState = {
  users: [],
  actionMessage: '',
  isLoading: false
};

const userReducer = (state = initalState, { type, payload }) => {
  switch (type) {
    case USERS_LOADING:
      return { ...state, ...payload };
    case GET_USERS:
      return { ...state, ...payload };
    case CREATE_USERS_SUCCESS:
      return { ...state, users: [...state.users, payload] };
    default:
      return state;
  }
};
export default userReducer;
