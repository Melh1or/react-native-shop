export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

export const signup = (email, password) => async (dispatch) => {
  const res = await fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAl-uirLOsSCZe5QUXdeC5cIhRTKpeLjZo",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
    }
  );

  if (!res.ok) {
    throw new Error("Something went wrong!");
  }

  const resData = await res.json();

  dispatch({
    type: SIGNUP,
  });
};

export const login = (email, password) => async (dispatch) => {
  const res = await fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAl-uirLOsSCZe5QUXdeC5cIhRTKpeLjZo",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
    }
  );

  if (!res.ok) {
    throw new Error("Something went wrong!");
  }

  const resData = await res.json();

  dispatch({
    type: LOGIN,
  });
};
