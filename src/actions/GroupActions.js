import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import PouchDB from 'pouchdb-react-native';
import {
  LOADING,
  NEW_GROUP_CREATED,
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
  SAVE_NEW_LIST_CHANGES,
  CHANGE_CHORE_TYPE,
  CHANGE_OFFSET,
  ADD_CHORE_NOTE
} from './types';

const remotedb = new PouchDB('housematesTest1');
const db = new PouchDB('housematesLocalTest1');
db.sync(remotedb, {
  live: true,
  retry: true
});
const uuidv4 = require('uuid/v4');

export const changeOffSet = offSet => {
  return {
    type: CHANGE_OFFSET,
    payload: offSet
  };
};

export const setChoreType = type => {
  return {
    type: CHANGE_CHORE_TYPE,
    payload: type
  };
};

export const changeDone = (listToUpdate, choreListId) => {
  let chore = listToUpdate;
  return dispatch => {
    dispatch({ type: CHANGE_DONE_STATUS, payload: listToUpdate });
    db.get(choreListId)
      .then(function(doc) {
        for (var i = 0; i < doc.chores.length; i++) {
          if (doc.chores[i]._id === chore._id) {
            doc.chores[i] = chore;
          }
        }
        return db.put(doc);
      })
      .then(function() {});
  };
};

export const createNewHouseName = text => {
  return {
    type: GROUP_NAME_CHANGED,
    payload: text
  };
};

export const houseZipChange = text => {
  return {
    type: GROUP_ZIP_CHANGED,
    payload: text
  };
};

export const changeChoreDate = (date, changed, type) => {
  return {
    type: CHORE_DATE_CHANGED,
    payload: { date, changed, type }
  };
};

export const nameNewChoresList = text => {
  return {
    type: NEW_CHORES_LIST_NAMED,
    payload: text
  };
};

export const deleteChore = (chore, chores) => {
  let choreToGet;
  return dispatch => {
    for (var i = 0; i < chores.length; i++) {
      if (chores[i].chores.includes(chore)) {
        choreToGet = chores[i]._id;
      }
    }
    db.get(choreToGet).then(function(doc) {
      for (var i = 0; i < doc.chores.length; i++) {
        if (doc.chores[i]._id === chore._id) {
          doc.chores.splice(i, 1);
        }
      }
      db.put(doc)
        .then(function(result) {
          dispatch({
            type: DELETE_CHORE,
            payload: chore
          });
        })
        .catch(function(err) {
          console.log(err);
        });
    });
  };
};

export const createChoreNote = text => {
  return {
    type: ADD_CHORE_NOTE,
    payload: text
  };
};

export const createNewChoresList = info => {
  const { currentUser } = firebase.auth();
  const userId = currentUser.uid;
  const newChore = {
    _id: uuidv4(),
    name: info.newChoreListName,
    warningColor: 'green',
    chores: [],
    dateCreated: Date.now()
  };
  return dispatch => {
    db.get(userId)
      .then(function(doc) {
        newChore.groupNumber = doc.groupNumber;
      })
      .then(function(result) {
        db.put(newChore)
          .then(function(result) {
            dispatch({ type: NEW_CHORES_LIST_CREATED, payload: newChore });
          })
          .catch(function(err) {
            console.log(err);
          });
      });
  };
};

export const choresFetch = () => {
  const { currentUser } = firebase.auth();
  const id = currentUser.uid;
  let choresArr = [];
  let groupObj;
  let users = [];
  return dispatch => {
    db.allDocs({ include_docs: true, descending: true }, function(err, doc) {
      doc.rows.forEach(item => {
        console.log(item);
        if (item.doc.groupNumber === id) {
          console.log('is right thing: ', item);
          if (item.doc.hasOwnProperty('chores')) {
            choresArr.push(item.doc);
          } else if (item.doc.hasOwnProperty('userToken')) {
            users.push(item.doc);
          } else if (item.doc.hasOwnProperty('houseName')) {
            groupObj = item.doc;
          }
        }
      });
      console.log(choresArr, ' 1');
      choresArr = choresArr.sort((a, b) => b.dateCreated - a.dateCreated);
      console.log('choresArr: ', choresArr);
      choresArr = choresArr.reverse();
      dispatch({ type: CHORES_FETCH_SUCCESS, payload: { groupObj, choresArr, users } });
    });
  };
};

export const deleteChoresList = (text, chores) => {
  const { currentUser } = firebase.auth();
  return dispatch => {
    dispatch({ type: DELETE_CHORES_LIST, payload: text });
    db.get(text._id).then(function(doc) {
      return db.remove(doc);
    });
  };
};

export const createChoreName = text => {
  return {
    type: CREATE_CHORE_NAME,
    payload: text
  };
};

export const saveNewListChanges = (listToUpdate, chores) => {
  this.choreListId;
  chores.forEach(item => {
    item.chores.forEach(choreItem => {
      if (choreItem._id === listToUpdate._id) {
        this.choreListId = item._id;
      }
    });
  });
  return dispatch => {
    db.get(this.choreListId)
      .then(function(doc) {
        for (var i = 0; i < doc.chores.length; i++) {
          if (doc.chores[i]._id === listToUpdate._id) {
            doc.chores[i] = listToUpdate;
            found = true;
          }
        }
        if (!found) {
          doc.chores.push(info);
        }
        return db.put(doc);
      })
      .then(function() {
        dispatch({ type: SAVE_NEW_LIST_CHANGES, payload: listToUpdate });
      });
  };
};

export const showChoreEditModal = info => {
  return {
    type: SHOW_CHORE_EDIT_MODAL,
    payload: info
  };
};

export const hideChoreEditModal = () => {
  return {
    type: HIDE_CHORE_EDIT_MODAL
  };
};

export const createChoreDate = date => {
  return {
    type: CREATE_CHORE_DATE,
    payload: date
  };
};

export const createNewChore = (ListUid, info) => {
  console.log('inside createNewChore: ', ListUid, info);
  return dispatch => {
    dispatch({ type: CREATE_NEW_CHORE, payload: { ListUid, info } });
    db.get(ListUid)
      .then(function(doc) {
        doc.chores.push(info);
        return db.put(doc);
      })
      .then(function() {
        console.log('successfully created new chore!');
        // return db.get(ListUid);
      });
  };
};

export const createGroup = ({ houseName, zip }) => {
  const { currentUser } = firebase.auth();
  const groupNumber = currentUser.uid;
  let newGroup = {
    _id: uuidv4(),
    groupNumber,
    members: [groupNumber],
    houseName,
    zip
  };
  console.log('groupNumber: ', groupNumber);
  const choreData = [
    {
      _id: uuidv4(),
      name: 'Weekly',
      warningColor: 'green',
      chores: [],
      groupNumber,
      dateCreated: 1
    },
    {
      _id: uuidv4(),
      name: 'Monthly',
      warningColor: 'green',
      chores: [],
      groupNumber,
      dateCreated: 2
    },
    {
      _id: uuidv4(),
      name: "John's Chores",
      warningColor: 'green',
      chores: [],
      groupNumber,
      dateCreated: 3
    },
    {
      _id: uuidv4(),
      name: "Amy's Chores",
      warningColor: 'green',
      chores: [],
      groupNumber,
      dateCreated: 4
    }
  ];

  return dispatch => {
    dispatch({ type: LOADING });
    db.put(newGroup)
      .then(function(results) {
        console.log('group created: ', results);
        db.bulkDocs(choreData)
          .then(function(results) {
            console.log('practice chores set: ', results);
            dispatch({ type: NEW_GROUP_CREATED, payload: { newGroup, choreData } });
            Actions.main({ type: 'reset' });
          })
          .catch(function(err) {
            console.log('chore seed data creation error: ', err);
            // return db.get(ListUid);
          });
      })
      .catch(function(err) {
        console.log('group creation error: ', err);
        // return db.get(ListUid);
      });
  };
};
