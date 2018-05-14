import { AsyncStorage } from 'react-native';

export const UPDATE_USER = 'UPDATE_USER';
export const CLEAR_USER = 'CLEAR_USER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const UPDATE_USERDATA = 'UPDATE_USERDATA';
export const UPDATE_SIGNUP_EMAIL = 'UPDATE_SIGNUP_EMAIL';
export const UPDATE_SIGNUP_PASSWORD = 'UPDATE_SIGNUP_PASSWORD';
export const UPDATE_SIGNUP_PASSWORD2 = 'UPDATE_SIGNUP_PASSWORD2';
export const UPDATE_SIGNUP_USERID = 'UPDATE_SIGNUP_USERID';
export const UPDATE_SIGNUP_NAME = 'UPDATE_SIGNUP_NAME';
export const CLEAR_SIGNUP_VALUES = 'CLEAR_SIGNUP_VALUES';
export const UPDATE_IDTOKEN = 'UPDATE_IDTOKEN';
export const CLEAR_IDTOKEN = 'CLEAR_IDTOKEN';
export const UPDATE_LOGIN_EMAIL = 'UPDATE_LOGIN_EMAIL';
export const UPDATE_LOGIN_PASSWORD = 'UPDATE_LOGIN_PASSWORD';
export const CLEAR_LOGIN_VALUES = 'CLEAR_LOGIN_VALUES';

export const updateUser = user => ({ type: UPDATE_USER, user });
export const clearUser = () => ({ type: CLEAR_USER });
export const login = () => {
  return { type: LOGIN };
};
export const logout = () => {
  return { type: LOGOUT };
};
export const updateUserData = userData => ({ type: UPDATE_USERDATA, userData });
export const updateSignUpEmail = value => ({ type: UPDATE_SIGNUP_EMAIL, value });
export const updateSignUpPassword = value => ({ type: UPDATE_SIGNUP_PASSWORD, value });
export const updateSignUpPassword2 = value => ({ type: UPDATE_SIGNUP_PASSWORD2, value });
export const updateSignUpUserId = value => ({ type: UPDATE_SIGNUP_USERID, value });
export const updateSignUpName = value => ({ type: UPDATE_SIGNUP_NAME, value });
export const clearSignUpValue = () => ({ type: CLEAR_SIGNUP_VALUES });
export const updateIdToken = value => ({ type: UPDATE_IDTOKEN, value });
export const clearIdToken = () => ({ type: CLEAR_IDTOKEN });
export const updateLoginEmail = value => ({ type: UPDATE_LOGIN_EMAIL, value });
export const updateLoginPassword = value => ({ type: UPDATE_LOGIN_PASSWORD, value });
export const clearLoginValue = () => ({ type: CLEAR_LOGIN_VALUES });
