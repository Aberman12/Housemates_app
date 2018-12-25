import {
  NEW_GROUP_CREATED,
  LOADING,
  GROUP_ZIP_CHANGED,
  GROUP_NAME_CHANGED,
  NEW_CHORES_LIST_CREATED,
  NEW_CHORES_LIST_NAMED,
  DELETE_CHORES_LIST
} from "../actions/types";
const uuidv4 = require("uuid/v4");

const INITIAL_STATE = {
  newChoreListName: "",
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
      return { ...state, loading: false, chores: action.payload };
    case NEW_CHORES_LIST_CREATED:
      return {
        ...state,
        chores: [
          ...state.chores,
          {
            uid: uuidv4(),
            note: state.newChoreListName,
            warningColor: "green",
            chores: []
          }
        ],
        newChoreListName: ""
      };
    case DELETE_CHORES_LIST:
      return {
        chores: state.chores.filter(chore => {
          return chore.uid !== action.payload.uid;
        })
      };
    case NEW_CHORES_LIST_NAMED:
      return { ...state, newChoreListName: action.payload };
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
