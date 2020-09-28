import { LOGIN, SIGNUP } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return {
        token: payload.token,
        userId: payload.userId,
      };
    case SIGNUP:
      return {
        token: payload.token,
        userId: payload.userId,
      };
    default:
      return state;
  }
};
