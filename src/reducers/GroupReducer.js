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
  CHORE_DATE_CHANGED,
  CHANGE_DONE_STATUS,
  SAVE_NEW_LIST_CHANGES
} from '../actions/types';

const uuidv4 = require('uuid/v4');

const INITIAL_STATE = {
  newChoreListName: '',
  newChoreName: '',
  newChoreDueDate: null,
  houseName: '',
  zip: '',
  members: [],
  chores: [],
  groceries: [],
  calendar: [],
  expenses: [],
  loading: false,
  choreListModal: false,
  choreModal: false,
  choreEditModal: false,
  choreSelected: { dueDate: new Date(), note: 'hello' },
  choreListEditModal: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case CREATE_CHORE_DATE:
    //   return { ...state, newChoreDate: action.payload };
    case CHORE_DATE_CHANGED:
      return { ...state, newChoreDueDate: action.payload };
    case SAVE_NEW_LIST_CHANGES:
      return {
        ...state,
        chores: state.chores.map(chore => {
          if (chore.chores.length) {
            for (var i = 0; i < chore.chores.length; i++) {
              if (chore.chores[i] === action.payload.listToUpdate) {
                chore.chores[i].note = action.payload.newName;
              }
            }
            return chore;
          }
          return chore;
        }),
        choreEditModal: false
      };
    case CHANGE_DONE_STATUS:
      return {
        ...state,
        chores: state.chores.map(chore => {
          chore.chores.map(choreItem => {
            if (choreItem.uid === action.payload.uid) {
              choreItem.done = !choreItem.done;
              return choreItem;
            } else {
              return choreItem;
            }
          });
          return chore;
        })
      };
    case SHOW_CHORE_EDIT_MODAL:
      return {
        ...state,
        choreEditModal: true,
        choreSelected: action.payload,
        newChoreListName: action.payload.note
      };
    case HIDE_CHORE_EDIT_MODAL:
      return { ...state, choreEditModal: false, choreSelected: '' };
    case NEW_GROUP_CREATED:
      return { ...state, loading: false, chores: action.payload };
    case NEW_CHORES_LIST_CREATED:
      return {
        ...state,
        chores: [...state.chores, action.payload],
        newChoreListName: ''
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
        warningColor: 'green',
        dueDate: state.newChoreDueDate,
        done: false
      };

      return {
        chores: state.chores.map(chore => {
          if (chore.uid === action.payload.val.uid) {
            if (chore.chores) {
              chore.chores = [...chore.chores, newChore];
            } else {
              chore.chores = [newChore];
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
