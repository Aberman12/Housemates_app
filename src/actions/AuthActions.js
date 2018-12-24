import firebase from "firebase";
import { Actions } from "react-native-router-flux";
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  PHONE_CHANGED,
  FIRST_CHANGED,
  LAST_CHANGED,
  BIRTHDAY_CHANGED
} from "./types";

export const emailChanged = text => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const birthdayChanged = text => {
  return {
    type: BIRTHDAY_CHANGED,
    payload: text
  };
};

export const firstNameChanged = text => {
  return {
    type: FIRST_CHANGED,
    payload: text
  };
};

export const lastNameChanged = text => {
  return {
    type: LAST_CHANGED,
    payload: text
  };
};

export const passwordChanged = text => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const phoneChanged = text => {
  return {
    type: PHONE_CHANGED,
    payload: text
  };
};

export const loginUser = ({
  email,
  password,
  firstName,
  lastName,
  phoneNumber
}) => {
  return dispatch => {
    dispatch({ type: LOGIN_USER });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(error => {
        console.log(error);

        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(user => {
            user.updateProfile({
              displayName: `${firstName} ${lastName}`
              // photoURL: // some photo url
            });
            user
              .sendEmailVerification()
              .then(function() {
                window.alert("we have sent you a verification email");
                Actions.HouseSignup({ type: "reset" });
                console.log("email sent");
              })
              .catch(function(error) {
                console.log("error sending confirmation email: ", error);
              });
          })
          .catch(() => loginUserFail(dispatch));
      });
  };
};

const loginUserFail = dispatch => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
  Actions.main();
};
