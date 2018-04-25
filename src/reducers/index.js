import { UPDATE_USER } from '../actions';

const initialState = {
  user: null,
  name: 'yamada tarou',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return { ...state, user: action.user };
    case 'UPDATE_NAME':
      return { ...state, name: action.name };
    default:
      return state;
  }
};
