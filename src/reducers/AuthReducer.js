import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  PHONE_CHANGED,
  FIRST_CHANGED,
  LAST_CHANGED,
  USER_CREATE,
  BIRTHDAY_CHANGED,
  SEND_TO_ACCOUNT_CREATION
} from '../actions/types';

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  birthday: '',
  phoneNumber: '',
  user: null,
  error: '',
  loading: false
};

// console.log(...state);

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case FIRST_CHANGED:
      console.log('first changed;', action.payload);
      return { ...state, firstName: action.payload };
    case BIRTHDAY_CHANGED:
      return { ...state, birthday: action.payload };
    case LAST_CHANGED:
      console.log('last changed;', action.payload);
      return { ...state, lastName: action.payload };
    case PHONE_CHANGED:
      return { ...state, phoneNumber: action.payload };
    case USER_CREATE:
      return { ...state, loading: false };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case SEND_TO_ACCOUNT_CREATION:
      return { ...state, loading: false };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, user: action.payload };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        error: 'Authentication Failed.',
        password: '',
        loading: false
      };
    default:
      return state;
  }
};
