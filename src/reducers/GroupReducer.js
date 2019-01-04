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
  CHORES_FETCH_SUCCESS,
  SHOW_CHORE_EDIT_MODAL,
  HIDE_CHORE_EDIT_MODAL,
  CREATE_CHORE_DATE,
  DELETE_CHORE,
  CHORE_DATE_CHANGED
} from "../actions/types";

const uuidv4 = require("uuid/v4");

const INITIAL_STATE = {
  newChoreListName: "",
  newChoreName: "",
  newChoreDueDate: "",
  houseName: "",
  zip: "",
  members: [],
  chores: [],
  groceries: [],
  calendar: [],
  expenses: [],
  loading: false,
  choreListModal: false,
  choreModal: false,
  choreEditModal: false,
  choreSelected: "",
  choreListEditModal: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_CHORE_DATE:
      return { ...state, newChoreDate: action.payload };
    case CHORE_DATE_CHANGED:
      return { ...state, newChoreDueDate: action.payload };
    case SHOW_CHORE_EDIT_MODAL:
      return { ...state, choreEditModal: true, choreSelected: action.payload };
    case HIDE_CHORE_EDIT_MODAL:
      return { ...state, choreEditModal: false, choreSelected: "" };
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
        warningColor: "green",
        dueDate: state.newChoreDueDate
      };
      console.log("this thign: ", newChore);
      return {
        chores: state.chores.map(chore => {
          if (chore.uid === action.payload.val.uid) {
            if (chore.chores) {
              chore.chores = [...chore.chores, newChore.note];
            } else {
              chore.chores = [newChore.note];
            }

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
        chores: action.payload.chore
      };
    case DELETE_CHORE:
      return {
        chores: state.chores.filter(chore => {
          if (chore.chores) {
            if (chore.chores.includes(action.payload)) {
              let index = chore.chores.indexOf(action.payload);
              chore.chores.splice(index, 1);
              return chore;
            } else {
              return chore;
            }
          } else {
            return chore;
          }
        }),
        choreEditModal: false
      };
    case GROUP_ZIP_CHANGED:
      return { ...state, zip: action.payload };
    case GROUP_NAME_CHANGED:
      return { ...state, houseName: action.payload };
    default:
      return state;
  }
};
