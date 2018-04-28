export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_SIGNUP_EMAIL = 'UPDATE_SIGNUP_EMAIL';
export const UPDATE_SIGNUP_PASSWORD = 'UPDATE_SIGNUP_PASSWORD';
export const UPDATE_SIGNUP_USERID = 'UPDATE_SIGNUP_USERID';
export const CLEAR_SIGNUP_VALUE = 'CLEAR_SIGNUP_VALUE';

export const updateUser = user => ({ type: UPDATE_USER, user });
export const updateSignUPEmail = value => ({ type: UPDATE_SIGNUP_EMAIL, value });
export const updateSignUPPassWord = value => ({ type: UPDATE_SIGNUP_PASSWORD, value });
export const updateSignUPUserId = value => ({ type: UPDATE_SIGNUP_USERID, value });
export const clearSignUPValue = () => ({ type: CLEAR_SIGNUP_VALUE });
