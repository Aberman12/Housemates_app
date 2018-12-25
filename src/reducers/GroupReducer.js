import {
  NEW_GROUP_CREATED,
  LOADING,
  GROUP_ZIP_CHANGED,
  GROUP_NAME_CHANGED
} from "../actions/types";

const INITIAL_STATE = {
  houseName: "",
  zip: "",
  members: [],
  chores: [],
  groceries: [],
  calendar: [],
  expenses: [],
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEW_GROUP_CREATED:
      return { ...state, loading: false };
    case LOADING:
      return { ...state, loading: true };
    case GROUP_ZIP_CHANGED:
      return { ...state, zip: action.payload };
    case GROUP_NAME_CHANGED:
      return { ...state, houseName: action.payload };
    default:
      return state;
  }
};
