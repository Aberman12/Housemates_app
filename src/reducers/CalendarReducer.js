import { CREATE_NEW_CALENDAR_EVENT, SET_SELECTED_CALENDAR_DATE } from '../actions/types';

const INITIAL_STATE = {
  customCalendarEventItems: {},
  currentlySelectedEvent: '',
  calendarDateSelected: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_NEW_CALENDAR_EVENT:
      console.log('reducer');
      let newItems = {};
      Object.keys(state.customCalendarEventItems).forEach(key => {
        newItems[key] = state.customCalendarEventItems[key];
      });
      if (newItems[action.payload.date]) {
        newItems[action.payload.date].push(action.payload);
      } else {
        newItems[action.payload.date] = [action.payload];
      }
      console.log('items in reducer: ', newItems);
      return { ...state, customCalendarEventItems: newItems };
    case SET_SELECTED_CALENDAR_DATE:
      console.log('set date: 2ap ', action.payload);
      return { ...state, calendarDateSelected: action.payload };
    default:
      return state;
  }
};
