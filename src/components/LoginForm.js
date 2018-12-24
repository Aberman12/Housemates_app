import React, { Component } from "react";
import { Text, View } from "react-native";
import { Actions } from "react-native-router-flux";
import { goToEmail } from "../actions";
// import FBbutton from "./FBLoginButton";
import {
  Card,
  CardSection,
  Button,
  SignUpButton,
  SignUpButtonEmail,
  Spinner
} from "./common";
import SlideShow from "./common/Slideshow.js";
import img1 from "./common/demo1.gif";
import img2 from "./common/demo2.gif";

class LoginForm extends Component {
  usePhoneAuth() {
    Actions.FirebaseAuth();
  }

  logInEmail() {
    Actions.emailLogIn();
  }

  signUpEmail() {
    Actions.emailSignUp();
  }

  goToEmailLogIn() {}

  render() {
    return (
      <Card style={styles.loginStyle}>
        <SlideShow
          height={400}
          indicatorSelectedColor="orange"
          indicatorColor="black"
          dataSource={[img1, img2]}
        />
        <CardSection />

        <Text style={styles.errorTextStyle}>{this.props.error}</Text>
        <CardSection>
          <Button>Login With Facebook</Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.usePhoneAuth.bind(this)}>
            Sign Up With Phone Number
          </Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.signUpEmail.bind(this)}>
            Sign Up With Email
          </Button>
        </CardSection>
        {/* <CardSection>
          <Button onPress={this.logInEmail.bind(this)}>
            Log In with Email
          </Button>
          <Button onPress={this.signUpEmail.bind(this)}>
            Sign Up with Email
          </Button>
        </CardSection> */}
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "red"
  },
  loginStyle: {
    marginBottom: 653
  }
};

export default LoginForm;
