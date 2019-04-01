import { CREATE_NEW_CALENDAR_EVENT, SET_SELECTED_CALENDAR_DATE } from '../actions/types';

const INITIAL_STATE = {
  customCalendarEventItems: {},
  currentlySelectedEvent: '',
  calendarDateSelected: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_NEW_CALENDAR_EVENT:
      let newCalEvent;
      let endDateEvent;
      let newItems = {};

      //   if (action.payload.hasOwnProperty('endDate')) {
      //     newCalEvent = action.payload.createdEvent;
      //     endDateEvent = action.payload.endDate;
      //   }

      Object.keys(state.customCalendarEventItems).forEach(key => {
        newItems[key] = state.customCalendarEventItems[key];
      });

      if (!endDateEvent) {
        if (newItems[action.payload.date]) {
          newItems[action.payload.date].push(action.payload);
        } else {
          newItems[action.payload.date] = [action.payload];
        }
      } else {
        // console.log('made it into correct if in recuder:', newCalEvent, endDateEvent);
        // if (newItems[newCalEvent.date]) {
        //   newItems[newCalEvent.date].push(newCalEvent);
        // } else {
        //   newItems[newCalEvent.date] = [newCalEvent];
        // }
        // if (newItems[endDateEvent.endDate]) {
        //   newItems[endDateEvent.endDate].push(endDateEvent);
        // } else {
        //   newItems[endDateEvent.endDate] = [endDateEvent];
        // }
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
