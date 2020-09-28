import { AUTHENTICATE } from "../actions/auth";

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
    default:
      return state;
  }
};
