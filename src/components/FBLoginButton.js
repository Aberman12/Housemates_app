import firebase from "firebase";
import React, { Component } from "react";
import { FBLoginManager, FBLogin } from "react-native-facebook-login";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { logInFBUser } from "../actions";
import PropTypes from "prop-types";
// var { FBLogin, FBLoginManager } = require("react-native-facebook-login");
// var provider = new firebase.auth.FacebookAuthProvider();
// firebase.auth().useDeviceLanguage();
class Login extends Component {
  render() {
    var _this = this;
    return (
      <FBLogin
        style={{ marginLeft: 83, marginTop: -10 }}
        ref={fbLogin => {
          this.fbLogin = fbLogin;
        }}
        permissions={["email", "public_profile"]}
        loginBehavior={FBLoginManager.LoginBehaviors.Native}
        onLogin={function(data) {
          console.log("Logged in!");
          console.log(data);
          console.log("heres loginmanager", LoginManager);
        }}
        onLogout={function() {
          console.log("Logged out.");
          _this.setState({ user: null });
        }}
        onLoginFound={function(data) {
          console.log("Existing login found.");
          console.log(data);
          // Actions.main();
        }}
        onLoginNotFound={function() {
          console.log("No user logged in.");
          _this.setState({ user: null });
        }}
        onError={function(data) {
          console.log("ERROR");
          console.log(data);
        }}
        onCancel={function() {
          console.log("User cancelled.");
        }}
        onPermissionsMissing={function(data) {
          console.log("Check permissions!");
          console.log(data);
        }}
      />
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { logInFBUser } = auth;

  return { logInFBUser };
};

export default connect(
  mapStateToProps,
  {
    logInFBUser
  }
)(Login);
