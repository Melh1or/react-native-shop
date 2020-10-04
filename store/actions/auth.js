import { AsyncStorage } from "react-native";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const SET_DID_TRY_AL = "SET_DID_TRY_AL";

let timer;

export const setDidTryAL = () => {
  return {
    type: SET_DID_TRY_AL
  }
}

export const authenticate = (userId, token, expiryTime) => (dispatch) => {
  dispatch(setLogoutTimer(expiryTime));
  dispatch({ type: AUTHENTICATE, payload: { userId, token } });
};

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

  dispatch(
    authenticate(resData.localId, resData.idToken, +resData.expiresIn * 1000)
  );

  const expirationDate = new Date(
    new Date().getTime() + +resData.expiresIn * 1000
  );
  saveDataToStorage(resData.idToken, resData.localId, expirationDate);
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

  dispatch(
    authenticate(resData.localId, resData.idToken, +resData.expiresIn * 1000)
  );

  const expirationDate = new Date(
    new Date().getTime() + +resData.expiresIn * 1000
  );
  saveDataToStorage(resData.idToken, resData.localId, expirationDate);
};

export const logout = () => (dispatch) => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  dispatch({ type: LOGOUT });
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime) => (dispatch) => {
  timer = setTimeout(() => {
    dispatch(logout());
  }, expirationTime);
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({ token, userId, expiryDate: expirationDate.toISOString() })
  );
};
