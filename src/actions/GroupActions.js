import firebase from "firebase";
import { Actions } from "react-native-router-flux";
import {
  NEW_GROUP_CREATED,
  SEND_TO_HOMEPAGE,
  GROUP_ZIP_CHANGED,
  GROUP_NAME_CHANGED
} from "./types";

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

export const createGroup = ({ name, zip }) => {
  const { currentUser } = firebase.auth();
  console.log("inside createGroup: ", { name, zip, currentUser });
  return dispatch => {
    dispatch({ type: NEW_GROUP_CREATED });
    firebase
      .database()
      .ref(`/group/${currentUser.uid}/groupData`)
      .push({ name, zip })
      .ref(`/group/${currentUser.uid}/members`)
      .push({ currentUser })
      .ref(`/group/${currentUser.uid}/chores`)
      .ref(`/group/${currentUser.uid}/groceries`)
      .ref(`/group/${currentUser.uid}/calendar`)
      .ref(`/group/${currentUser.uid}/iou`)
      .then(() => {
        dispatch({ type: SEND_TO_HOMEPAGE });
        Actions.main({ type: "reset" });
      });
  };
};
