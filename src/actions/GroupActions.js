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
  CREATE_NEW_CHORE
} from "./types";
const uuidv4 = require("uuid/v4");

const addInitialChores = {
  chores: [
    {
      uid: uuidv4(),
      note: "Weekly",
      warningColor: "green",
      chores: ["clean room", "go to bed", "go to store"]
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

export const nameNewChoresList = text => {
  return {
    type: NEW_CHORES_LIST_NAMED,
    payload: text
  };
};
//need to add this to database as well
export const createNewChoresList = () => {
  return {
    type: NEW_CHORES_LIST_CREATED
  };
};

export const deleteChoresList = text => {
  return {
    type: DELETE_CHORES_LIST,
    payload: text
  };
};

export const createChoreName = text => {
  return {
    type: CREATE_CHORE_NAME,
    payload: text
  };
};

export const createNewChore = info => {
  const { currentUser } = firebase.auth();
  const chore = info.chores;
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
              chores: ["hello", "goodby", "adios"]
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
