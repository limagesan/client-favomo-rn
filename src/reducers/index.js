import { AsyncStorage } from 'react-native';

import {
  UPDATE_USER,
  CLEAR_USER,
  LOGIN,
  LOGOUT,
  UPDATE_SIGNUP_EMAIL,
  UPDATE_SIGNUP_PASSWORD,
  UPDATE_SIGNUP_PASSWORD2,
  UPDATE_SIGNUP_USERID,
  CLEAR_SIGNUP_VALUE,
  UPDATE_IDTOKEN,
  CLEAR_IDTOKEN,
  UPDATE_LOGIN_EMAIL,
  UPDATE_LOGIN_PASSWORD,
  CLEAR_LOGIN_VALUE,
} from '../actions';

import log, { sub } from '../utils/log';

let initialState = {};
async function initializeState() {
  try {
    const logined = await !!AsyncStorage.getItem('logined');

    initialState = {
      user: null,
      idToken: null,
      logined,
      signUpEmail: '',
      signUpPassword: '',
      signUpPassword2: '',
      signUpUserid: '',
      loginEmail: '',
      loginPassword: '',
    };
  } catch (error) {
    log(sub.localStorage, 'getItem error', error);
  }
}

initializeState();

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return { ...state, user: action.user };
    case CLEAR_USER:
      return { ...state, user: null };
    case LOGIN:
      AsyncStorage.setItem('logined', 'true');
      return { ...state, logined: true };
    case LOGOUT:
      AsyncStorage.removeItem('logined');
      return { ...state, logined: false };
    case UPDATE_SIGNUP_EMAIL:
      return { ...state, signUpEmail: action.value };
    case UPDATE_SIGNUP_PASSWORD:
      return { ...state, signUpPassword: action.value };
    case UPDATE_SIGNUP_PASSWORD2:
      return { ...state, signUpPassword2: action.value };
    case UPDATE_SIGNUP_USERID:
      return { ...state, signUpUserid: action.value };
    case CLEAR_SIGNUP_VALUE:
      return {
        ...state,
        signUpEmail: '',
        signUpPassword: '',
        signUpPassword2: '',
        signUpUserid: '',
      };
    case UPDATE_IDTOKEN:
      return { ...state, idToken: action.value };
    case CLEAR_IDTOKEN:
      return { ...state, idToken: null };
    case UPDATE_LOGIN_EMAIL:
      return { ...state, loginEmail: action.value };
    case UPDATE_LOGIN_PASSWORD:
      return { ...state, loginPassword: action.value };
    case CLEAR_LOGIN_VALUE:
      return { ...state, loginEmail: '', loginPassword: '' };
    default:
      return state;
  }
};
