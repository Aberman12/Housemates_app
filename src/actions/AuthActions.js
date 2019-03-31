import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import PouchDB from 'pouchdb-react-native';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  PHONE_CHANGED,
  FIRST_CHANGED,
  LAST_CHANGED,
  BIRTHDAY_CHANGED,
  PROFILE_PICTURE_SELECTED
} from './types';

const uuidv4 = require('uuid/v4');
const remotedb = new PouchDB('housematesTest1');
const db = new PouchDB('housematesLocalTest1');
db.sync(remotedb, {
  live: true,
  retry: true
});

export const emailChanged = text => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const setProfilePicture = text => {
  return {
    type: PROFILE_PICTURE_SELECTED,
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
  phoneNumber,
  profilePicture
}) => {
  console.log('picture ifno 1', profilePicture);
  return dispatch => {
    dispatch({ type: LOGIN_USER });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        window.alert('It looks like you already have an account. Signing you in...');
        loginUserSuccess(dispatch, user);
      })
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
            let userInfo = {
              userToken: user,
              firstName,
              lastName,
              picture: profilePicture,
              phoneNumber,
              email,
              password,
              _id: user.uid,
              groupNumber: user.uid
            };
            console.log('picture ifno ', profilePicture);
            db.put(userInfo)
              .then(function(result) {
                db.allDocs({ include_docs: true, descending: true }, function(err, doc) {
                  console.log('docs fetched: ', doc);
                });
              })
              .catch(function(err) {
                console.log(err);
              });
            user
              .sendEmailVerification()
              .then(function() {
                window.alert('we have sent you a verification email');
                Actions.HouseSignup({ type: 'reset' });
                console.log('email sent');
              })
              .catch(function(error) {
                console.log('error sending confirmation email: ', error);
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
  console.log('heres the user that was saved: ', user);

  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
  Actions.main();
};
