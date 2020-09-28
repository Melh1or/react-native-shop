import { AUTHENTICATE, LOGOUT } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTHENTICATE:
      return {
        token: payload.token,
        userId: payload.userId,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
