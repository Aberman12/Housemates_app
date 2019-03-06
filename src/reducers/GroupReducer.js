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
  DELETE_CHORE,
  CHORE_DATE_CHANGED,
  CHANGE_DONE_STATUS,
  SAVE_NEW_LIST_CHANGES,
  CHANGE_CHORE_TYPE
} from '../actions/types';

const uuidv4 = require('uuid/v4');
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();
const fillinDate = `${year}-${month}-${day}`;

const INITIAL_STATE = {
  newChoreListName: '',
  choreType: 'none-selected',
  newChoreName: '',
  newChoreDueDate: fillinDate,
  dueDateEdited: false,
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
    case CHANGE_CHORE_TYPE:
      return { ...state, choreType: action.payload };
    case CHORE_DATE_CHANGED:
      let editedDate;
      console.log('reducer: ', action.payload);
      if (action.payload.type === 'one-time') {
        if (action.payload.date[5] === '0') {
          editedDate =
            action.payload.date.slice(0, 5) +
            action.payload.date.slice(6, action.payload.date.length);
          return {
            ...state,
            newChoreDueDate: editedDate,
            dueDateEdited: action.payload.changed
          };
        }
      } else if (action.payload.type === 'weekly' && !action.payload.changed) {
        delete action.payload.date.message;
        delete action.payload.date.displayed;
        console.log('made it to weekly reducer: ', action.payload.date);
        return {
          ...state,
          newChoreDueDate: action.payload.date,
          dueDateEdited: action.payload.changed
        };
      }

    case SAVE_NEW_LIST_CHANGES:
      return {
        ...state,
        chores: state.chores.map(chore => {
          if (chore.chores.length) {
            for (var i = 0; i < chore.chores.length; i++) {
              if (chore.chores[i] === action.payload.listToUpdate) {
                if (state.newChoreListName !== '') {
                  chore.chores[i].note = state.newChoreListName;
                }
                console.log('heres the rop: ', fillinDate, state.newChoreDueDate);
                if (state.newChoreDueDate !== fillinDate || state.dueDateEdited) {
                  if (fillinDate[5] === '0') {
                    fillinDate.slice(5, 1);
                  }
                  console.log('problem here: ', state.newChoreDueDate);
                  chore.chores[i].dueDate = state.newChoreDueDate;
                }
              }
            }
            return chore;
          }
          return chore;
        }),
        choreEditModal: false,
        newChoreListName: '',
        newChoreDueDate: fillinDate,
        dueDateEdited: false,
        choreType: 'none-selected'
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
        done: false,
        type: state.choreType
      };
      return {
        ...state,
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
        }),
        newChoreName: '',
        choreType: 'none-selected'
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
