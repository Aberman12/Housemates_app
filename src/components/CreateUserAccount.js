import React, { Component } from "react";
import { Text } from "react-native";
import { connect } from "react-redux";
import {
  emailChanged,
  passwordChanged,
  birthdayChanged,
  loginUser,
  firstNameChanged,
  lastNameChanged,
  phoneChanged,
  createNewUserAccount
} from "../actions";
import { Card, CardSection, Input, Button, Spinner } from "./common";

class CreateUserAccount extends Component {
  //   onEmailChange(text) {
  //     this.props.emailChanged(text);
  //   }

  //   onPasswordChange(text) {
  //     this.props.passwordChanged(text);
  //   }

  onfirstNameChange(text) {
    this.props.firstNameChanged(text);
  }

  onlastNameChange(text) {
    this.props.lastNameChanged(text);
  }

  onphoneChange(text) {
    this.props.phoneChanged(text);
  }

  onBirthdayChange(text) {
    this.props.birthdayChanged(text);
  }

  onButtonPress() {
    const { firstName, lastName, phoneNumber, birthday } = this.props;

    this.props.createNewUserAccount({
      firstName,
      lastName,
      phoneNumber,
      birthday
    });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return <Button onPress={this.onButtonPress.bind(this)}>Done</Button>;
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="First"
            placeholder="name"
            onChangeText={this.onfirstNameChange.bind(this)}
            value={this.props.firstName}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Last"
            placeholder="name"
            onChangeText={this.onlastNameChange.bind(this)}
            value={this.props.lastName}
          />
        </CardSection>
        {/* <CardSection>
          <Input
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection> */}
        <CardSection>
          <Input
            label="Phone"
            placeholder="#"
            onChangeText={this.onphoneChange.bind(this)}
            value={this.props.phoneNumber}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Birthday"
            placeholder="(optional)"
            onChangeText={this.onBirthdayChange.bind(this)}
            value={this.props.birthday}
          />
        </CardSection>
        <Text style={styles.errorTextStyle}>{this.props.error}</Text>
        <CardSection>{this.renderButton()}</CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "red"
  }
};

const mapStateToProps = ({ auth }) => {
  const { firstName, lastName, phoneNumber, birthday, error, loading } = auth;
  console.log("insid emaptoprops: ", firstName, lastName, phoneNumber);
  return { firstName, lastName, phoneNumber, error, birthday, loading };
};

export default connect(
  mapStateToProps,
  {
    loginUser,
    firstNameChanged,
    lastNameChanged,
    phoneChanged,
    birthdayChanged,
    createNewUserAccount
  }
)(CreateUserAccount);
