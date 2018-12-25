import firebase from "firebase";
import { Actions } from "react-native-router-flux";
import {
  LOADING,
  NEW_GROUP_CREATED,
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
            SallysChores: "Sallys Chores",
            FredsChores: "Freds Chores",
            Weekly: "Weekly",
            Monthly: "Monthly"
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
        dispatch({ type: NEW_GROUP_CREATED });
        Actions.main({ type: "reset" });
      });
  };
};
