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
  CHANGE_CHORE_TYPE,
  CHANGE_OFFSET,
  ADD_CHORE_NOTE
} from '../actions/types';

const uuidv4 = require('uuid/v4');
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();
const fillinDate = `${year}-${month}-${day}`;

const INITIAL_STATE = {
  newChoreListName: '',
  choreNote: '',
  choreType: 'none-selected',
  newChoreName: '',
  newChoreDueDate: fillinDate,
  dueDateEdited: false,
  houseName: '',
  zip: '',
  choreDone: false,
  members: [],
  chores: [],
  groceries: [],
  calendar: [],
  expenses: [],
  biMonthlyOffset: false,
  loading: false,
  choreListModal: false,
  choreModal: false,
  choreEditModal: false,
  choreSelected: { dueDate: new Date(), name: 'hello' },
  choreListEditModal: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_OFFSET:
      return { ...state, biMonthlyOffset: action.payload };

    case ADD_CHORE_NOTE:
      return { ...state, choreNote: action.payload };

    case CHANGE_CHORE_TYPE:
      return { ...state, choreType: action.payload };

    case CHORE_DATE_CHANGED:
      let editedDate;
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
        return {
          ...state,
          newChoreDueDate: action.payload.date,
          dueDateEdited: action.payload.changed
        };
      } else if (action.payload.type === 'monthly') {
        return {
          ...state,
          newChoreDueDate: action.payload.date,
          dueDateEdited: action.payload.changed
        };
      } else if (action.payload.type === 'Bi-monthly') {
        return {
          ...state,
          newChoreDueDate: {
            date: action.payload.date.date,
            offSet: action.payload.date.offSet,
            offSetDoneStatus: {
              one: action.payload.date.offSetDone1,
              two: action.payload.date.offSetDone2
            }
          },
          dueDateEdited: action.payload.changed
        };
      }

    case SAVE_NEW_LIST_CHANGES:
      return {
        ...state,
        chores: state.chores.map(chore => {
          if (chore.chores.length) {
            for (var i = 0; i < chore.chores.length; i++) {
              if (chore.chores[i]._id === action.payload._id) {
                chore.chores[i] = action.payload;
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
            if (choreItem._id === action.payload._id) {
              choreItem = action.payload;
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
        newChoreListName: action.payload.name,
        choreNote: action.payload.note
      };

    case HIDE_CHORE_EDIT_MODAL:
      return { ...state, choreEditModal: false, choreSelected: '' };

    case NEW_GROUP_CREATED:
      return {
        ...state,
        loading: false,
        chores: action.payload.choreData,
        members: action.payload.newGroup.members,
        houseName: action.payload.newGroup.houseName,
        zip: action.payload.newGroup.zip
      };

    case NEW_CHORES_LIST_CREATED:
      return {
        ...state,
        chores: [...state.chores, action.payload],
        newChoreListName: '',
        choreType: 'none-selected'
      };

    case DELETE_CHORES_LIST:
      return {
        chores: state.chores.filter(chore => {
          return chore._id !== action.payload._id;
        }),
        choreType: 'none-selected',
        choreSelected: '',
        choreType: 'none-selected'
      };

    case CREATE_CHORE_NAME:
      return { ...state, newChoreName: action.payload };

    case CREATE_NEW_CHORE:
      console.log('create fron reducer', action.payload);
      return {
        ...state,
        chores: state.chores.map(chore => {
          if (chore._id === action.payload.ListUid) {
            if (chore.chores) {
              chore.chores = [...chore.chores, action.payload.info];
            } else {
              chore.chores = [action.payload.info];
            }
            return chore;
          } else {
            return chore;
          }
        }),
        newChoreName: '',
        choreType: 'none-selected',
        choreDone: false,
        choreNote: ''
      };

    case NEW_CHORES_LIST_NAMED:
      return { ...state, newChoreListName: action.payload };

    case LOADING:
      return { ...state, loading: true };

    case CHORES_FETCH_SUCCESS:
      return {
        chores: action.payload.choresArr,
        houseName: action.payload.groupObj.houseName,
        zip: action.payload.groupObj.zip,
        members: action.payload.groupObj.users,
        choreType: 'none-selected'
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
        choreEditModal: false,
        choreType: 'none-selected'
      };

    case GROUP_ZIP_CHANGED:
      return { ...state, zip: action.payload };

    case GROUP_NAME_CHANGED:
      return { ...state, houseName: action.payload };

    default:
      return state;
  }
};
