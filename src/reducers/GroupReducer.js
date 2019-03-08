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
                if (state.newChoreDueDate !== fillinDate || state.dueDateEdited) {
                  if (fillinDate[5] === '0') {
                    fillinDate.slice(5, 1);
                  }
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
      if (action.payload.chore.type === 'one-time') {
        return {
          ...state,
          chores: state.chores.map(chore => {
            chore.chores.map(choreItem => {
              if (choreItem.uid === action.payload.chore.uid) {
                choreItem.done = !choreItem.done;
                return choreItem;
              } else {
                return choreItem;
              }
            });
            return chore;
          })
        };
      } else if (action.payload.chore.type === 'weekly') {
        var d = new Date();
        let isChecked;
        var weekday = new Array(7);
        weekday[0] = 'sunday';
        weekday[1] = 'monday';
        weekday[2] = 'tuesday';
        weekday[3] = 'wednesday';
        weekday[4] = 'thursday';
        weekday[5] = 'friday';
        weekday[6] = 'saturday';

        var n = d.getDay();
        let selectDays = new Array(7);
        let beforeSelectDays = [];
        let deciferIfChoreCompletedInAdvance = true;
        for (let day in action.payload.chore.dueDate.done) {
          if (action.payload.chore.dueDate[day] === '#89cff0') {
            beforeSelectDays.push(day);
          }
        }
        for (var i = 0; i < beforeSelectDays.length; i++) {
          if (beforeSelectDays[i] === 'sunday') {
            selectDays[0] = 'sunday';
          }
          if (beforeSelectDays[i] === 'monday') {
            selectDays[1] = 'monday';
          }
          if (beforeSelectDays[i] === 'tuesday') {
            selectDays[2] = 'tuesday';
          }
          if (beforeSelectDays[i] === 'wednesday') {
            selectDays[3] = 'wednesday';
          }
          if (beforeSelectDays[i] === 'thursday') {
            selectDays[4] = 'thursday';
          }
          if (beforeSelectDays[i] === 'friday') {
            selectDays[5] = 'friday';
          }
          if (beforeSelectDays[i] === 'saturday') {
            selectDays[6] = 'saturday';
          }
        }

        // for (var r = 0; r < weeday.length; r++) {
        //   if (selectDays.includes(action.payload.chore.dueDate.done[weekday[r]]) && r !== n) {
        //     action.payload.chore.dueDate.done[weekday[r]] = true;
        //   }
        // }

        if (!action.payload.isChecked) {
          isChecked = true;
        } else {
          isChecked = false;
        }
        return {
          ...state,
          chores: state.chores.map(chore => {
            chore.chores.map(choreItem => {
              if (choreItem.uid === action.payload.chore.uid) {
                for (var i = 0; i < weekday.length; i++) {
                  if (selectDays.includes(weekday[i]) && i <= n && isChecked) {
                    if (!choreItem.dueDate.done[weekday[i]]) {
                      choreItem.dueDate.done[weekday[i]] = true;
                    }
                  } else if (selectDays.includes(weekday[i]) && i <= n && !isChecked) {
                    for (var j = selectDays.length - 1; j >= 0; j--) {
                      if (choreItem.dueDate.done[selectDays[j]]) {
                        choreItem.dueDate.done[selectDays[j]] = false;
                        break;
                      }
                    }
                    break;
                  } else if (i > n && !choreItem.dueDate.done[weekday[i]] && !isChecked) {
                    console.log('something hit this area');
                  } else if (i > n && choreItem.dueDate.done[weekday[i]] && isChecked) {
                    console.log('part3');
                    for (var j = selectDays.length - 1; j <= 0; j--) {
                      if (!choreItem.dueDate.done[selectDays[j]]) {
                        choreItem.dueDate.done[selectDays[j]] = true;
                        break;
                      }
                    }
                  }
                }
                return choreItem;
              } else {
                return choreItem;
              }
            });
            return chore;
          })
        };
      }

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
      let dueDate = state.newChoreDueDate;
      let newChore = {
        note: state.newChoreName,
        uid: uuidv4(),
        warningColor: 'green',
        dueDate: dueDate,
        done: false,
        type: state.choreType
      };
      var d = new Date();
      var weekday = new Array(7);
      weekday[0] = 'sunday';
      weekday[1] = 'monday';
      weekday[2] = 'tuesday';
      weekday[3] = 'wednesday';
      weekday[4] = 'thursday';
      weekday[5] = 'friday';
      weekday[6] = 'saturday';
      let selectDays = new Array(7);
      let beforeSelectDays = [];
      var n = d.getDay();

      if (dueDate.hasOwnProperty('done')) {
        for (let day in dueDate) {
          if (dueDate[day] === '#89cff0') {
            beforeSelectDays.push(day);
          }
        }
        console.log('before: ', beforeSelectDays);
        for (var i = 0; i < beforeSelectDays.length; i++) {
          if (beforeSelectDays[i] === 'sunday') {
            selectDays[0] = 'sunday';
          }
          if (beforeSelectDays[i] === 'monday') {
            selectDays[1] = 'monday';
          }
          if (beforeSelectDays[i] === 'tuesday') {
            selectDays[2] = 'tuesday';
          }
          if (beforeSelectDays[i] === 'wednesday') {
            selectDays[3] = 'wednesday';
          }
          if (beforeSelectDays[i] === 'thursday') {
            selectDays[4] = 'thursday';
          }
          if (beforeSelectDays[i] === 'friday') {
            selectDays[5] = 'friday';
          }
          if (beforeSelectDays[i] === 'saturday') {
            selectDays[6] = 'saturday';
          }
        }
        console.log('after: ', selectDays);
        for (var t = 0; t < weekday.length; t++) {
          if (selectDays.includes(weekday[t]) && t < n) {
            dueDate.done[weekday[t]] = true;
          }
        }
      }
      console.log('heres the final chore: ', newChore, dueDate.hasOwnProperty('done'));
      //////////
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
