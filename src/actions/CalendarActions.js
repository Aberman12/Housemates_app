import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import PouchDB from 'pouchdb-react-native';
import { CREATE_NEW_CALENDAR_EVENT, SET_SELECTED_CALENDAR_DATE } from './types';

const uuidv4 = require('uuid/v4');
const remotedb = new PouchDB('housematesTest1');
const db = new PouchDB('housematesLocalTest1');
db.sync(remotedb, {
  live: true,
  retry: true
});

export const createCalendarEvent = (createdEvent, endDate) => {
  console.log('made it to first step', createdEvent);
  if (endDate) {
    return {
      type: CREATE_NEW_CALENDAR_EVENT,
      payload: { createdEvent, endDate }
    };
  } else {
    return {
      type: CREATE_NEW_CALENDAR_EVENT,
      payload: createdEvent
    };
  }
};

export const setSelectedCalendarDate = date => {
  console.log('set date: ', date);
  return {
    type: SET_SELECTED_CALENDAR_DATE,
    payload: date
  };
};
