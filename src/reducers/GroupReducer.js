import {
  NEW_GROUP_CREATED,
  SEND_TO_HOMEPAGE,
  GROUP_ZIP_CHANGED,
  GROUP_NAME_CHANGED
} from "../actions/types";

const INITIAL_STATE = {
  name: "",
  zip: "",
  members: [],
  chores: [],
  groceries: [],
  calendar: [],
  expenses: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEW_GROUP_CREATED:
      return INITIAL_STATE;
    case GROUP_ZIP_CHANGED:
      return { ...state, zip: action.payload };
    case GROUP_NAME_CHANGED:
      return { ...state, name: action.payload };
    default:
      return state;
  }
};
