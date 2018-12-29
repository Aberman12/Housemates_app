import {
  NEW_GROUP_CREATED,
  LOADING,
  GROUP_ZIP_CHANGED,
  GROUP_NAME_CHANGED,
  NEW_CHORES_LIST_CREATED,
  NEW_CHORES_LIST_NAMED,
  DELETE_CHORES_LIST,
  CREATE_CHORE_NAME,
  CREATE_NEW_CHORE,
  CHORES_FETCH_SUCCESS
} from "../actions/types";

const uuidv4 = require("uuid/v4");

const INITIAL_STATE = {
  newChoreListName: "",
  newChoreName: "",
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
        chores: [...state.chores, action.payload],
        newChoreListName: ""
      };
    case DELETE_CHORES_LIST:
      return {
        chores: state.chores.filter(chore => {
          return chore.uid !== action.payload.uid;
        })
      };
    case CREATE_CHORE_NAME:
      return { ...state, newChoreName: action.payload };
    case CREATE_NEW_CHORE:
      let newChore = {
        note: state.newChoreName,
        uid: uuidv4(),
        warningColor: "green"
      };
      return {
        chores: state.chores.map(chore => {
          if (chore.uid === action.payload.val.uid) {
            chore.chores = [...chore.chores, newChore.note];
            return chore;
          } else {
            return chore;
          }
        })
      };
    case NEW_CHORES_LIST_NAMED:
      return { ...state, newChoreListName: action.payload };
    case LOADING:
      return { ...state, loading: true };
    case CHORES_FETCH_SUCCESS:
      return {
        chores: action.payload.choresLists
      };
    case GROUP_ZIP_CHANGED:
      return { ...state, zip: action.payload };
    case GROUP_NAME_CHANGED:
      return { ...state, houseName: action.payload };
    default:
      return state;
  }
};
