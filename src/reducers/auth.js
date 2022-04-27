import { REGISTER, LOGIN } from '../constants';

const initialState = {
  isAuthenticated: false,
  token: null,
  loggedInUser: null,
};

const authReducer = (state = initialState, action) => {
  const type = action.type;
  const payload = action.payload;

  switch (type) {
    case REGISTER:
      return { ...state, loggedInUser: payload.user };
    case LOGIN:
      localStorage.setItem('token', payload.token);
      return { ...state, isAuthenticated: true, token: payload.token };
    default:
      return state;
  }
};

export default authReducer;
