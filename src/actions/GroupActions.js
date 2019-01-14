import firebase from "firebase";
import { Actions } from "react-native-router-flux";
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
  CHORE_DATE_CHANGED
} from "./types";
const uuidv4 = require("uuid/v4");

const addInitialChores = {
  chores: [
    {
      uid: uuidv4(),
      note: "Weekly",
      warningColor: "green",
      chores: [
        {
          note: "clean room",
          uid: uuidv4(),
          warningColor: "green",
          dueDate: "2018-01-19"
        },
        {
          note: "mop floor",
          uid: uuidv4(),
          warningColor: "green",
          dueDate: "2018-01-19"
        },
        {
          note: "go to bed",
          uid: uuidv4(),
          warningColor: "green",
          dueDate: "2018-01-19"
        }
      ]
    },
    {
      uid: uuidv4(),
      note: "Monthly",
      warningColor: "green",
      chores: []
    },
    {
      uid: uuidv4(),
      note: "Jon's Chores",
      warningColor: "green",
      chores: []
    },
    {
      uid: uuidv4(),
      note: "Cindy's Chores",
      warningColor: "green",
      chores: []
    }
  ],
  groceries: []
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

export const changeChoreDate = date => {
  return {
    type: CHORE_DATE_CHANGED,
    payload: date
  };
};

export const nameNewChoresList = text => {
  return {
    type: NEW_CHORES_LIST_NAMED,
    payload: text
  };
};

export const deleteChore = chore => {
  return {
    type: DELETE_CHORE,
    payload: chore
  };
};

export const createNewChoresList = info => {
  const { currentUser } = firebase.auth();
  const newChore = {
    uid: uuidv4(),
    note: info.newChoreListName,
    warningColor: "green",
    chores: []
  };
  const chore = info.chores.concat([newChore]);
  console.log(chore);
  return dispatch => {
    dispatch({ type: NEW_CHORES_LIST_CREATED, payload: newChore });
    firebase
      .database()
      .ref(`/chores/${currentUser.uid}`)
      .set({ chore })
      .then(() => {
        console.log("chore set");
      });
  };
};

export const choresFetch = () => {
  const { currentUser } = firebase.auth();
  return dispatch => {
    firebase
      .database()
      .ref(`/chores/${currentUser.uid}`)
      .on("value", snapshot => {
        dispatch({ type: CHORES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const deleteChoresList = (text, chores) => {
  const { currentUser } = firebase.auth();
  return dispatch => {
    var index;
    for (var i = 0; i < chores.length; i++) {
      if (chores[i].note === text.note) {
        index = i;
      }
    }
    console.log(text, chores);
    dispatch({ type: DELETE_CHORES_LIST, payload: text });
    firebase
      .database()
      .ref(`/chores/${currentUser.uid}/chore/${index}`)
      .remove()
      .then(() => {
        Actions.employeeList({ type: "reset" });
      });
  };
};

export const createChoreName = text => {
  return {
    type: CREATE_CHORE_NAME,
    payload: text
  };
};

export const showChoreEditModal = info => {
  console.log("inside chore edit modal: ", info);
  return {
    type: SHOW_CHORE_EDIT_MODAL,
    payload: info
  };
};

export const hideChoreEditModal = () => {
  console.log("tried to hide");
  return {
    type: HIDE_CHORE_EDIT_MODAL
  };
};

export const createChoreDate = date => {
  console.log("chore date in actions; ", date);
  return {
    type: CREATE_CHORE_DATE,
    payload: date
  };
};

export const createNewChore = info => {
  const { currentUser } = firebase.auth();
  const chore = info.chores;
  console.log("heres info in create:", info, "and heres chore: ", chore);
  return dispatch => {
    dispatch({ type: CREATE_NEW_CHORE, payload: info });
    firebase
      .database()
      .ref(`/chores/${currentUser.uid}`)
      .set({ chore })
      .then(() => {
        console.log("chore set");
      });
  };
};

export const createGroup = ({ houseName, zip }) => {
  const { currentUser } = firebase.auth();
  const id = currentUser.uid;
  return dispatch => {
    dispatch({ type: LOADING });
    firebase
      .database()
      .ref(`/group/${currentUser.uid}/groupData/`)
      .push({ houseName, zip })
      .then(() => {
        firebase
          .database()
          .ref(`/group/${currentUser.uid}/members/`)
          .push({ id });
      })
      .then(() => {
        firebase
          .database()
          .ref(`/chores/${currentUser.uid}`)
          .push({
            weekly: {
              date: "12/12/18",
              note: "Weekly",
              warningColor: "green",
              chores: addInitialChores.chores[0].chores
            },
            monthly: {
              date: "December",
              note: "Monthly",
              warningColor: "green",
              chores: []
            },
            johns: {
              date: "12/12/18",
              note: "Jon's Chores",
              warningColor: "green",
              chores: []
            },
            cindys: {
              date: "12/12/18",
              note: "Cindy's Chores",
              warningColor: "green",
              chores: []
            }
          });
      })
      .then(() => {
        firebase
          .database()
          .ref(`/groceries/${currentUser.uid}`)
          .push({ Weekly: "Weekly", SpecialRequest: "Special Request" });
      })
      .then(() => {
        firebase
          .database()
          .ref(`/expenses/${currentUser.uid}`)
          .push({ Weekly: "Weekly", SpecialRequest: "Special Request" });
      })
      .then(() => {
        firebase
          .database()
          .ref(`/iou/${currentUser.uid}`)
          .push({ SallysIOU: "Sallys Chores", FredsIOU: "Sallys Chores" });
      })
      .then(() => {
        dispatch({ type: NEW_GROUP_CREATED, payload: addInitialChores.chores });
        Actions.main({ type: "reset" });
      });
  };
};
