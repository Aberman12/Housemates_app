import firebase from "firebase";
import { Actions } from "react-native-router-flux";
import {
  LOADING,
  NEW_GROUP_CREATED,
  GROUP_ZIP_CHANGED,
  GROUP_NAME_CHANGED,
  NEW_CHORES_LIST_CREATED,
  NEW_CHORES_LIST_NAMED,
  DELETE_CHORES_LIST
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
  console.log("made it to action house: ", text);
  return {
    type: GROUP_NAME_CHANGED,
    payload: text
  };
};

export const houseZipChange = text => {
  console.log("made it to action zip: ", text);
  return {
    type: GROUP_ZIP_CHANGED,
    payload: text
  };
};

export const nameNewChoresList = text => {
  console.log("made it to action chores list: ", text);
  return {
    type: NEW_CHORES_LIST_NAMED,
    payload: text
  };
};

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

export const createGroup = ({ houseName, zip }) => {
  const { currentUser } = firebase.auth();
  const id = currentUser.uid;
  return dispatch => {
    dispatch({ type: LOADING });
    firebase
      .database()
      .ref(`/group/${currentUser.uid}/groupData`)
      .push({ houseName, zip })
      .then(() => {
        firebase
          .database()
          .ref(`/group/${currentUser.uid}/members`)
          .push({ id });
      })
      .then(() => {
        firebase
          .database()
          .ref(`/group/${currentUser.uid}/chores`)
          .push({
            chores: [
              {
                date: "12/12/18",
                note: "Weekly",
                warningColor: "green",
                chores: ["clean room", "go to bed", "go to store"]
              },
              {
                date: "December",
                note: "Monthly",
                warningColor: "green",
                chores: []
              },
              {
                date: "12/12/18",
                note: "Jon's Chores",
                warningColor: "green",
                chores: []
              },
              {
                date: "12/12/18",
                note: "Cindy's Chores",
                warningColor: "green",
                chores: []
              }
            ]
          });
      })
      .then(() => {
        firebase
          .database()
          .ref(`/group/${currentUser.uid}/groceries`)
          .push({ Weekly: "Weekly", SpecialRequest: "Special Request" });
      })
      .then(() => {
        firebase
          .database()
          .ref(`/group/${currentUser.uid}/groceries`)
          .push({ Weekly: "Weekly", SpecialRequest: "Special Request" });
      })
      .then(() => {
        firebase
          .database()
          .ref(`/group/${currentUser.uid}/iou`)
          .push({ SallysIOU: "Sallys Chores", FredsIOU: "Sallys Chores" });
      })
      .then(() => {
        dispatch({ type: NEW_GROUP_CREATED, payload: addInitialChores.chores });
        Actions.main({ type: "reset" });
      });
  };
};
