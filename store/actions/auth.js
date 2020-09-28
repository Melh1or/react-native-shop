export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

export const signup = (email, password) => async (dispatch) => {
  const res = await fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAl-uirLOsSCZe5QUXdeC5cIhRTKpeLjZo",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
    }
  );

  if (!res.ok) {
    const errorResData = await res.json();
    const errorId = errorResData.error.message;
    let message = "Something went wrong";

    if (errorId === "EMAIL_EXISTS") {
      message = "This email exists already!";
    }

    throw new Error(message);
  }

  const resData = await res.json();

  dispatch({
    type: SIGNUP,
    payload: {
      token: resData.idToken,
      userId: resData.localId,
    },
  });
};

export const login = (email, password) => async (dispatch) => {
  const res = await fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAl-uirLOsSCZe5QUXdeC5cIhRTKpeLjZo",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
    }
  );

  if (!res.ok) {
    const errorResData = await res.json();
    const errorId = errorResData.error.message;
    let message = "Something went wrong";

    if (errorId === "EMAIL_NOT_FOUND") {
      message = "This email could not be found!";
    } else if (errorId === "INVALID_PASSWORD") {
      message = "This password is not valid!";
    }

    throw new Error(message);
  }

  const resData = await res.json();

  dispatch({
    type: LOGIN,
    payload: {
      token: resData.idToken,
      userId: resData.localId,
    },
  });
};
