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
  CHANGE_OFFSET
} from './types';

const remotedb = new PouchDB('housematesTest1');
const db = new PouchDB('housematesLocalTest1');
db.sync(remotedb, {
  live: true,
  retry: true
});
const uuidv4 = require('uuid/v4');

const addInitialChores = {
  chores: [
    {
      _id: uuidv4(),
      note: 'Weekly',
      warningColor: 'green',
      chores: [
        {
          note: 'clean room',
          _id: uuidv4(),
          warningColor: 'green',
          dueDate: '2018-01-19',
          done: false
        },
        {
          note: 'mop floor',
          _id: uuidv4(),
          warningColor: 'green',
          dueDate: '2018-01-19',
          done: false
        },
        {
          note: 'go to bed',
          _id: uuidv4(),
          warningColor: 'green',
          dueDate: '2018-01-19',
          done: false
        }
      ]
    },
    {
      _id: uuidv4(),
      note: 'Monthly',
      warningColor: 'green',
      chores: []
    },
    {
      _id: uuidv4(),
      note: "Jon's Chores",
      warningColor: 'green',
      chores: []
    },
    {
      _id: uuidv4(),
      note: "Cindy's Chores",
      warningColor: 'green',
      chores: []
    }
  ],
  groceries: []
};

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

export const changeDone = chore => {
  return {
    type: CHANGE_DONE_STATUS,
    payload: chore
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
      console.log('chores chore:: ', chores[i], chore);
      if (chores[i].chores.includes(chore)) {
        choreToGet = chores[i]._id;
        console.log('chore to get: ', choreToGet);
      }
    }
    db.get(choreToGet).then(function(doc) {
      console.log('did i get the right one? ', doc);
      for (var i = 0; i < doc.chores.length; i++) {
        if (doc.chores[i]._id === chore._id) {
          doc.chores.splice(i, 1);
        }
      }
      console.log('and heres doc: ', doc);
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

export const createNewChoresList = info => {
  const newChore = {
    _id: uuidv4(),
    note: info.newChoreListName,
    warningColor: 'green',
    chores: []
  };
  return dispatch => {
    db.put(newChore)
      .then(function(result) {
        dispatch({ type: NEW_CHORES_LIST_CREATED, payload: newChore });
      })
      .catch(function(err) {
        console.log(err);
      });
  };
};

export const choresFetch = () => {
  let choresArr = [];
  return dispatch => {
    db.allDocs({ include_docs: true, descending: true }, function(err, doc) {
      doc.rows.forEach(item => {
        choresArr.push(item.doc);
      });
      choresArr = choresArr.reverse();
      dispatch({ type: CHORES_FETCH_SUCCESS, payload: choresArr });
    });
  };
};

export const deleteChoresList = (text, chores) => {
  const { currentUser } = firebase.auth();
  console.log('list before delete: ', chores, text);
  return dispatch => {
    dispatch({ type: DELETE_CHORES_LIST, payload: text });
    db.get(text._id).then(function(doc) {
      console.log('heres doc in deleteList: ', doc);
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

export const saveNewListChanges = listToUpdate => {
  return {
    type: SAVE_NEW_LIST_CHANGES,
    payload: listToUpdate
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
  return dispatch => {
    dispatch({ type: CREATE_NEW_CHORE, payload: { ListUid, info } });
    db.get(ListUid)
      .then(function(doc) {
        console.log('doc i received in createNewChore', doc);
        doc.chores.push(info);
        // put them back
        return db.put(doc);
      })
      .then(function() {
        // fetch mittens again
        return db.get(ListUid);
      })
      .then(function(doc) {
        console.log('edited doc in createNewChore', doc);
      });
  };
};

export const createGroup = ({ houseName, zip }) => {
  const { currentUser } = firebase.auth();
  const id = currentUser.uid;
  return dispatch => {
    dispatch({ type: LOADING });
    //   firebase
    //     .database()
    //     .ref(`/group/${currentUser.uid}/groupData/`)
    //     .push({ houseName, zip })
    //     .then(() => {
    //       firebase
    //         .database()
    //         .ref(`/group/${currentUser.uid}/members/`)
    //         .push({ id });
    //     })
    //     .then(() => {
    //       firebase
    //         .database()
    //         .ref(`/chores/${currentUser.uid}`)
    //         .push({
    //           weekly: {
    //             date: '12/12/18',
    //             note: 'Weekly',
    //             warningColor: 'green',
    //             chores: addInitialChores.chores[0].chores
    //           },
    //           monthly: {
    //             date: 'December',
    //             note: 'Monthly',
    //             warningColor: 'green',
    //             chores: []
    //           },
    //           johns: {
    //             date: '12/12/18',
    //             note: "Jon's Chores",
    //             warningColor: 'green',
    //             chores: []
    //           },
    //           cindys: {
    //             date: '12/12/18',
    //             note: "Cindy's Chores",
    //             warningColor: 'green',
    //             chores: []
    //           }
    //         });
    //     })
    //     .then(() => {
    //       firebase
    //         .database()
    //         .ref(`/groceries/${currentUser.uid}`)
    //         .push({ Weekly: 'Weekly', SpecialRequest: 'Special Request' });
    //     })
    //     .then(() => {
    //       firebase
    //         .database()
    //         .ref(`/expenses/${currentUser.uid}`)
    //         .push({ Weekly: 'Weekly', SpecialRequest: 'Special Request' });
    //     })
    //     .then(() => {
    //       firebase
    //         .database()
    //         .ref(`/iou/${currentUser.uid}`)
    //         .push({ SallysIOU: 'Sallys Chores', FredsIOU: 'Sallys Chores' });
    //     })
    //     .then(() => {
    //       dispatch({ type: NEW_GROUP_CREATED, payload: addInitialChores.chores });
    //       Actions.main({ type: 'reset' });
    //     });
  };
};
