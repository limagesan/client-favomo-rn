import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import reducer from '../reducers';
import { LOGIN, LOGOUT } from '../actions';

const storageMiddleware = store => next => async (action) => {
  switch (action.type) {
    case LOGIN:
      await AsyncStorage.setItem('logined', 'true');
      break;
    case LOGOUT:
      await AsyncStorage.removeItem('logined');
      break;
    default:
      break;
  }

  next(action);
};

const store = createStore(reducer, applyMiddleware(logger, storageMiddleware));

export default store;
